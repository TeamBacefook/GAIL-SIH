import tensorflow as tf
from keras.models import load_model
from keras import backend as k_be
from sklearn.preprocessing import StandardScaler
from yahoo_fin import stock_info as si
import pandas as pd
import numpy as np
import datetime
from dateutil.relativedelta import *
from yahoo_fin import stock_info as si


def rmse(y_pred, y_true):
    return k_be.sqrt(k_be.mean(k_be.square(y_pred - y_true))) 


def get_models(model_loc, learning_rate):
    model = load_model(model_loc, custom_objects={'loss': rmse},compile=False)
    model.compile(loss = rmse, optimizer= tf.keras.optimizers.Adam(learning_rate=learning_rate))
    return model


def data_fetch_lstm(df=None):
  data = df
  if not type(df) == pd.DataFrame:
    data = si.get_data('NG=F')
    data = data[['close']]
    data = data.resample('1D').mean()
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
    columns,
    model, 
    start=get_month_wise_date(datetime.datetime.now()), 
    end=get_month_wise_date(datetime.datetime.now() + relativedelta(years = +2)),
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
          data=data_fetch_lstm(
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


def blended_models(start_date, end_date, dataset, models=[]):
  merged_out = None
  for name, model, attrs, weight in models:
    pred = data_pred_lstm(dataset, attrs, model, start_date, end_date)
    pred.columns = pd.Index([name])
    if not type(merged_out) == pd.DataFrame:
      merged_out = pred * weight
    else:
      merged_out = pd.concat([merged_out, pred * weight], axis=1)
  return merged_out.sum(axis=1)

