import tensorflow as tf
from keras.models import load_model
from keras import backend as k_be
from sklearn.preprocessing import StandardScaler
from yahoo_fin import stock_info as si
import pandas as pd
import numpy as np
from dateutil.relativedelta import *
from yahoo_fin import stock_info as si
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error

def rmse(y_pred, y_true):
    return k_be.sqrt(k_be.mean(k_be.square(y_pred - y_true))) 


def get_models(model_loc, learning_rate):
    model = load_model(model_loc, custom_objects={'loss': rmse},compile=False)
    model.compile(loss = rmse, optimizer= tf.keras.optimizers.Adam(learning_rate=learning_rate))
    return model


def data_fetch(df=None):
  data = df
  if not (type(df) == pd.DataFrame or type(df) == pd.Series):
    data = si.get_data('NG=F')
    data = data[['close']]
    data = data.resample('1D').mean()
  data = pd.DataFrame(data)
  data.interpolate(method='linear', axis = 0, inplace=True, limit_direction='forward')
  data = data.resample('1M').mean()
  data['30ma'] = data['close']
  data['60ma'] = data['close'].rolling(2).mean()
  data['180ma'] = data['close'].rolling(6).mean()
  data['close_min'] = data['close'] - data['close'].rolling(12).std()
  data['close_max'] = data['close'] + data['close'].rolling(12).std()
  data['gradient'] = np.gradient(data['close'])
  data['d_gradient'] = np.gradient(np.gradient(data['close']))
  start = data.isna().sum().max()
  data = data[start:]
  return data


def get_month_wise_date(date):
  m_date = pd.date_range(start=date, periods=1, freq='M')
  return m_date.date[0].isoformat()


def batch_gen(df, x_size=24, y_size=24, output=True):
  X = []
  Y = []
  if output:
    for i in range(x_size, df.shape[0]-y_size):
      X.append(df[i-x_size:i])
      Y.append([x[0] for x in df[i:i+y_size]])

    Y = np.array(Y)
    X = np.array(X)
    return X ,Y
  else:
    for i in range(x_size, df.shape[0]):
      X.append(df[i-x_size:i])
    X = np.array(X)
    return X


def data_pred_lstm(
    data,
    start,
    end,
    columns,
    model,
    fhw=3
    ):
  def roll(data, columns, model, start, end, fhw):
    df = data[start:end]
    if len(df) % 24 != 0:
      raise Exception(f'Size of input data must be a multiple of 24, found size: {len(df)}')
    shape = df.shape
    pred = model.predict(df.to_numpy().reshape(1,shape[0],shape[1]))
    final_preds = pred[0]
    if fhw == 1:
      return final_preds
    else:
      dates = pd.date_range(start=start, periods=48, freq='M')
      temp_arr = [ x for x in df.close.copy().values ]
      temp_arr.extend(pred[0])
      preds = roll(
          data=data_fetch(
              pd.DataFrame(temp_arr, index=dates, columns=['close']),
            ).loc[:, columns],
          columns=columns,
          model=model,
          start=dates[-24].isoformat()[:10],
          end=dates[-1].isoformat()[:10],
          fhw=fhw-1
        )
      final_preds = np.hstack([final_preds, preds])
      return final_preds
  data = data.loc[:, columns]
  fit_scaler = StandardScaler().fit(data)
  close_scaler = StandardScaler().fit(data.close.values.reshape(-1,1))
  scaled_df = pd.DataFrame(fit_scaler.transform(data), columns=columns)
  scaled_df.index = data.index
  rolled_prediction = pd.DataFrame(roll(scaled_df, columns, model, start, end, fhw), index=pd.date_range(start=end, periods=73, freq='M')[1:], columns=['Close Prediction'])
  rescaled_df = pd.DataFrame(close_scaler.inverse_transform(rolled_prediction), index=pd.date_range(start=end, periods=73, freq='M')[1:], columns=['Close Prediction'])
  return rescaled_df


def blended_models(dataset, start=None, end=None, models=[]):
  merged_out = None
  weighted_df = pd.DataFrame()
  if not start: start = dataset.index[-24]
  if not end: end = dataset.index[-1]
  for name, model, attrs, weight in models:
    pred=''
    if name == 'ARIMA':
      pred = pd.DataFrame(ARIMA(dataset.close[:end], order=(10, 1, 8)).fit().forecast(steps=72))
    else: 
      pred = data_pred_lstm(dataset, start, end, attrs, model)
    pred.columns = pd.Index([name + ' Predictions'])
    pred.index = pred.index.strftime('%m/%Y')
    if not type(merged_out) == pd.DataFrame:
      merged_out = pred
      weighted_df = pred * weight
    else:
      merged_out = pd.concat([merged_out, pred], axis=1)
      weighted_df = pd.concat([weighted_df, pred * weight], axis=1)
  merged_out['Ensemble Predictions'] = weighted_df.sum(axis=1)
  return merged_out

def get_model_evals(models):
  data = data_fetch()
  evals = pd.DataFrame()
  for name, model, attrs, weight in models:
    if name == 'ARIMA':
      model = ARIMA(data.close[:-72], order=(10, 1, 8)).fit()
      pred = model.forecast(steps=72)
    else:
      pred = data_pred_lstm(data, data.index[-24], data.index[-1], attrs, model)
    evals[name+' RMSE'] = pd.DataFrame([mean_squared_error(data.close[-72:], pred, squared=False)])
  return evals
  
  