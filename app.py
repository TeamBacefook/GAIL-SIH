from flask_cors import CORS
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
import datetime
import pandas as pd
from flask import Flask, request ,current_app
import json
from gnews import GNews
from tensorflow import keras as k
import requests
from modelfuncs import  get_model_evals, get_models, blended_models, data_fetch
from yahoo_fin import stock_info as si
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from seleniumwire import webdriver
from urllib.parse import urlparse, parse_qs, quote_plus

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}} , support_credentials=True)

@app.route('/data/countries', methods=['GET'])
def getcountriesdata1():
    data =request.args
    countrydataparameter = pd.read_csv("country.csv")
    columns = {
        "Anthracite":{ "rename" :{"Anthracite_imports" : "Imports","Anthracite_exports": "Exports","Anthracite_production": "Production", "Anthracite_final_energy_consumption": "Consumption", "Anthracite_metric": "Metric"}, "keep": ["Anthracite_imports", "Anthracite_exports", "Anthracite_production", "Anthracite_final_energy_consumption", "Anthracite_metric" ]},
        "Lignite": { "rename": {"Lignite_Imports" : "Imports", "Lignite_Exports": "Exports", "Lignite_Production": "Production", "Lignite_Final_consumption": "Consumption", "Lignite_metric": "Metric"}, "keep": ["Lignite_Imports", "Lignite_Exports", "Lignite_Production", "Lignite_Final_consumption", "Lignite_metric"] },
        "Crude oil": {"rename" : {"Crude_imports" : "Imports", "Crude_exports": "Exports", "Crude_Production": "Production", "Crude_Consumption": "Consumption", "Crude_metric": "Metric"}, "keep": ["Crude_imports","Crude_exports","Crude_Production","Crude_Consumption","Crude_exports","Crude_metric"] },
        "Natural gas": { "rename" : {"Natural_gas_Imports" : "Imports", "Natural_gas_Exports": "Exports", "Natural_gas_Production": "Production", "Natural_gas_Consumption": "Consumption", "Natural_gas_metric": "Metric"}, "keep": ["Natural_gas_metric", "Natural_gas_Consumption", "Natural_gas_Production", "Natural_gas_Exports", "Natural_gas_Imports"] }
    }
    countrydataparameter = countrydataparameter[(int(data["endyear"]) > countrydataparameter['Year']) & (countrydataparameter['Year'] > int(data["startyear"])) & (countrydataparameter["Country"] == data["country"])]
    countrydataparameter = countrydataparameter.rename(columns =columns[data["parameter"]]["rename"])
    countrydataparameter = countrydataparameter.groupby(["Country"], as_index=False).sum()
    return countrydataparameter.to_json(orient="records")


def getYahooFinancePrice(ticker):
    df = {}
    df = si.get_data(ticker)
    df = pd.DataFrame(df)
    resampled_df = df.resample('1D').mean()
    resampled_df = resampled_df.reset_index()
    resampled_df = resampled_df [['index','low', 'open', 'close','high']].round(3)
    resampled_df = resampled_df.drop_duplicates(subset=["index"], keep='first')
    resampled_df.interpolate(method='ffill', axis = 0, inplace= True, limit_direction='forward')
    resampled_df['index'] = resampled_df['index'].dt.strftime('%d-%m-%Y')
    return resampled_df.to_json(orient="split")


global AUTH
AUTH = ""


def getTradingEconomicsPrice(ticker):
    response = requests.get(f"https://markets.tradingeconomics.com/chart?s={ticker}&span=max&securify=new&url=/commodity/natural-gas&AUTH={AUTH}&ohlc=1")
    if str(response.json()) == "{'Message': 'Invalid authorization'}":
        updateauthvaluefortradingeconomics()
        response = requests.get(f"https://markets.tradingeconomics.com/chart?s={ticker}&span=max&securify=new&url=/commodity/natural-gas&AUTH={AUTH}&ohlc=1")
    if response.status_code == 200:
        das = pd.DataFrame(response.json()["series"][0]['data'])
        das['date'] = pd.to_datetime(das.date)
        das['date'] = das['date'].dt.strftime('%d-%m-%Y')
        das = das.drop(columns=["y", "x", "percentChange","change"])
        das = das.rename(columns={"date": "index"})
        das = das[["index","low","open","close","high"]]
        return das.to_json(orient="split")

@app.route('/getstockdata1',methods=['GET'])
def getStockData():
    data = request.args
    if data["type"] == "yahoofinance":
        return getYahooFinancePrice(data["ticker"])
    if data["type"] == "Tradingeconomics":
        return getTradingEconomicsPrice(data["ticker"])

@app.route('/getstockdata',methods=['GET'])
def quotetable2():
    df = {}
    df = si.get_data('NG=F')
    df = pd.DataFrame(df)
    resampled_df = df.resample('1D').mean()
    resampled_df = resampled_df.reset_index()
    resampled_df = resampled_df [['index','low', 'open', 'close','high']].round(3)
    resampled_df = resampled_df.drop_duplicates(subset=["index"], keep='first')
    resampled_df.interpolate(method='ffill', axis = 0, inplace= True, limit_direction='forward')
    resampled_df['index'] = resampled_df['index'].dt.strftime('%d-%m-%Y')
    return resampled_df.to_json(orient="split")

@app.route('/data/continents/energy', methods=['GET'])
def getcontinentdata():
    data = request.args
    continentdata = pd.read_csv("EnergyBalanceSheet.csv")
    continentdata = continentdata[(int(data["year"]) == continentdata['Year']) & (data["type"] == continentdata["Type"])]
    continentdata["label"] = continentdata["Commodity"]
    continentdata.drop(columns=["Type", "Year", "Commodity"], inplace=True)
    continentdata["max"] = continentdata["value"].max()
    # if data["type"] ==  "Transformation":
    #     continentdata["value"] = -continentdata["value"]
    return continentdata.to_json(orient="records")

@app.route("/price/naturalgas", methods=["GET"])
def getprices():
    data = pd.DataFrame(requests.get("https://markets.tradingeconomics.com/chart?s=ng1:com&span=max&securify=new&url=/commodity/natural-gas&AUTH={AUTH}&ohlc=1").json()["series"][0]['data'])
    return data.to_json(orient="records")

@app.route("/data/getTrend", methods=["GET"])
def gettrend():
    continentsubregions = pd.read_csv("EnergyBalanceSheet.csv")
    continentsubregions =  continentsubregions.groupby(["Commodity", "Type"], as_index=False)
    data = []
    for eachgroup in continentsubregions.__iter__():
        tempdf = pd.DataFrame(eachgroup[1])
        commodity = tempdf.iloc[-1]["Commodity"]
        type12 = tempdf.iloc[-1]["Type"]
        tempdf = tempdf.drop(columns=["Commodity", "Type"])
        yr1change = ((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-2]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        yr3change = ((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-4]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        yr5change =((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-6]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        tempdf = tempdf.abs()
        data.append({
            "commodity": commodity,
            "Type": type12,
            "yrchange": yr1change,
            "yr3change": yr3change,
            "yr5change": yr5change,
            "data": tempdf.to_json(orient="records")
        })
    data = pd.DataFrame(data)
    return data.to_json(orient="records")

@app.route('/data/continents/treemap', methods=['POST'])
def getcontinentdata1():
    data = json.loads(request.data)
    countrydataparameter = pd.read_csv("RawPvotData.csv")
    list1 = ["Exports", "Imports"]
    commoditieslist = ["Biofuels and waste", "Oil", "Electricity and heat", "Natural Gas", "Coal"]
    df = countrydataparameter[countrydataparameter.rowName.isin(list1) == True]
    df = df[df.colName_Dashboard.isin(commoditieslist) == True]
    df = df[(int(data["endyear"]) > df['Year']) & (df['Year'] > int(data["startyear"]))]
    df = df.groupby(["Region Name", "Sub-region Name","colName_Dashboard", "rowName"], as_index=False).sum()
    df = df.rename(columns={"colName_Dashboard" : "name", "Terajoules": "size", "Sub-region Name": "sub_region"})
    df["size"] = df["size"].abs()
    df = df.sort_values(by=['size'], ascending=False)
    data12 = []
    for x in data["commodity"]:
        data12.append({"commodity" : x,  "type": "Exports","data" : df[(df.name == x) & (df.rowName == "Exports")].to_json(orient="records")})
        data12.append({"commodity": x,"type": "Imports" ,"data": df[(df.name == x) & (df.rowName == "Imports")].to_json(orient="records")})
    data = pd.DataFrame(data12)
    return data.to_json(orient="records")

@app.route('/news', methods=['GET'])
def webCrawl():
    print(request.args)
    try:
        search = request.args["search"]
    except KeyError:
        search = "Natural gas"     
    news_df = pd.DataFrame(columns={"Headline", "Date_time", "URL"})
    date = datetime.datetime.now()
    date = date.date() - datetime.timedelta(days=2)
    date = str(date)
    date = date.replace("-", "")
    date = int(date)
    search = search.replace(" ", "%20")
    search = search.replace("Limited", "")
    search = search.replace("ltd", "")
    search = search.replace("INC", "")
    search = search.replace("inc", "")
    search = search.replace("LLC", "")
    newsUrl = "https://news.google.com/rss/?q=" + str(search)
    website = urlopen(newsUrl)
    xml_page = website.read()
    website.close()
    ret_n = pd.DataFrame(columns=[""])
    soup_page = soup(xml_page, "xml")
    news_list = soup_page.findAll("item")
    # Print news title, url and publish date
    for news in news_list:
        day = (news.pubDate.text[5:7])
        wkday = str(news.pubDate.text[0:4])
        pub_time = str(news.pubDate.text[17:25])
        d = {"Jan" : "01", "Feb" : "02", "Mar" : "03", "Apr" : "04", "May" : "05", "Jun" : "06", "Jul" : "07", "Aug" : "08", "Sep" : "09", "Oct" : "10", "Nov" : "11", "Dec" : "12"}
        month = (d.get(news.pubDate.text[8:11]))
        year = (news.pubDate.text[12:16])
        date_t = str(year + "-" + month + "-" + day + " " +pub_time)
        format = "%Y-%m-%d %H:%M:%S"
        date_time = datetime.datetime.strptime(date_t, format) + datetime.timedelta(minutes = 330)
        date_time = wkday + str(date_time)
        date_a = int(str(year + month + day))
        if (date_a >= date):
            headl = news.title.text
            newslink = news.link.text
            news_df = news_df.append({"Headline": headl, "Date_time" : date_time, "URL": newslink}, ignore_index=True)
    return news_df.to_json(orient='records')

@app.route('/new', methods=['GET'])
def webCrawl1():
    print(request.args)
    try:
        search = request.args["search"]
    except KeyError:
        search = "Natural gas"
    google_news = GNews()
    news = google_news.get_news(search)
    news = pd.DataFrame(news)
    return news.to_json(orient="records")

@app.route('/data/naturalgas/local', methods=['GET'])
def getnaturalgasdata():
    data = request.args
    natgasdata = pd.read_csv("natgasdata.csv")
    natgasdata["date"] = pd.to_datetime(natgasdata["date"])
    natgasdata = natgasdata[natgasdata.date.between(f'{data["startyear"]}-{data["startmonth"]}', f'{data["endyear"]}-{data["endmonth"]}')]
    natgasdata["time"] =  natgasdata["Month"]  + "-" + natgasdata["Year"].astype(str)
    natgasdata = natgasdata.drop(columns=["date"])
    return natgasdata.to_json(orient="records")

@app.route('/data/indianbasket/crudeprices', methods=['GET'])
def getcrudeoildata():
    data = request.args
    monthlycrudepriceindia = pd.read_csv("monthlycrudepriceindianbasket.csv")
    monthlycrudepriceindia["date"] = pd.to_datetime(monthlycrudepriceindia["date"])
    monthlycrudepriceindia["time"] =  monthlycrudepriceindia["month"]  + "-" + monthlycrudepriceindia["year"].astype(str)
    monthlycrudepriceindia = monthlycrudepriceindia[monthlycrudepriceindia.date.between(f'{data["startyear"]}-{data["startmonth"]}', f'{data["endyear"]}-{data["endmonth"]}')]
    monthlycrudepriceindia = monthlycrudepriceindia.drop(columns=["date", "year", "month"])
    return monthlycrudepriceindia.to_json(orient="records")

@app.route('/data/petroleum/local', methods=['GET'])
def getlocalpetroleumdata():
    data = request.args
    ya = pd.read_csv("yearlypetroleum.csv")
    ya = ya[(ya["Year"] > int(data["startyear"])) & (ya["Year"] < int(data["endyear"]))]
    ya = ya.groupby(["State"], as_index=False).sum()
    return ya.to_json(orient="records")

@app.route('/data/petroleum/sector', methods=['GET'])
def getlocalpetroleumdata12():
    data = request.args
    petroleum = pd.read_csv("Sectorwisepetroleum.csv")
    petroleum.columns.unique()[1:]
    columns213 = ["Sector"]
    for columns1 in petroleum.columns:
        for columns2 in range(int(data["startyear"]), int(data["endyear"]) + 1, 1):
            if str(columns1) == str(columns2):
                columns213.append(columns1)
    petroleum = petroleum[columns213]
    petroleum.loc[:,'value'] = petroleum.sum(numeric_only=True, axis=1)
    petroleum = petroleum.rename(columns={"Sector": "name"})
    petroleum = petroleum[["name", "value"]]
    return petroleum.to_json(orient="records")

# @app.route("/testenddaye",methods=["GET"])
def getsentiment(enddate):
    data = request.args
    df = pd.read_csv('./colateddata.csv')
    df = df[df.Index.between(f'1990-1-1', f'{"enddate"}')]
    return df

@app.route('/predictions/<ticker>/<period>', methods=['POST'])
def predictions(ticker, period):
    data = json.loads(request.data)
    pred_start = ''
    if 'start_date' in data.keys():
        pred_start = data['start_date']
    if ticker == 'NG=F':
        if period.lower() == "m":
            out = ''
            if not len(data['csv']):
                if pred_start == '': 
                    out = current_app.saved_data
                else:
                    out = blended_models(current_app.dataframe, models=current_app.ng_models_month, end=pred_start)
            else: 
                dataframe = pd.DataFrame.from_records(data['csv'])
                dataframe = dataframe.set_index('date')
                dataframe = dataframe.astype(float)
                dataframe.index = pd.DatetimeIndex(dataframe.index)
                dataframe = data_fetch(dataframe.close)
                if not pred_start == '':
                    out = blended_models(dataframe, models=current_app.ng_models_month, end=pred_start)
                    drop = pd.date_range(start=pred_start, freq='M', periods=1)[0].strftime('%m/%Y')
                    if drop in out.index:
                        out = out.drop(drop)
                else:
                    out = blended_models(dataframe, models=current_app.ng_models_month)
            
            if 'warData' in data.keys():
                war = data['warData']
                actual = out['Actual Price']
                out = out.drop('Actual Price', axis=1)
                out[war['start_date'] : war['end_date']] = out[war['start_date'] : war['end_date']] * data['warIntensity']
                out = pd.concat([actual, out], axis=1)
            else: 
                # Current War data based on Russa Ukraine War
                actual = out['Actual Price']
                out = out.drop('Actual Price', axis=1)
                out['02/2022' : '07/2024'] = out['02/2022' : '07/2024'] * 1.5852 # Intensity of war in numeric value
                out = pd.concat([actual, out], axis=1)

            if 'recessionData' in data.keys():
                recession = data['recessionData']
                actual = out['Actual Price']
                out = out.drop('Actual Price', axis=1)
                out[recession['start_date'] : recession['end_date']] = out[recession['start_date'] : recession['end_date']] * data['recessionIntensity']
                out = pd.concat([actual, out], axis=1).iloc[1:]
            else: 
                # Current Recession data based on US GDP according to BEA as of 28th July 2022
                actual = out['Actual Price']
                out = out.drop('Actual Price', axis=1)
                out['07/2022' : '01/2024'] = out['07/2022' : '01/2024'] * 1.4992 # Intensity of war in numeric value
                out = pd.concat([actual, out], axis=1)
                
            if 'pandemicData' in data.keys():
                pandemic = data['pandemicData']
                actual = out['Actual Price']
                out = out.drop('Actual Price', axis=1)
                out[pandemic['start_date'] : pandemic['end_date']] = out[pandemic['start_date'] : pandemic['end_date']] * data['pandemicIntensity']
                out = pd.concat([actual, out], axis=1).iloc[1:]
                
            evals = get_model_evals(out.drop([ "Past Ensemble Predictions",
                "Past LSTM - Derivative based Predictions",
                "Past LSTM - Double derivative and MA based Predictions",
                "Past LSTM - MA Based Predictions", 'Past ARIMA Predictions',
                "Past Price"], axis=1))
            
            return {
                'predictions': json.loads(out.drop(
                    ['Past Price', 'Past Ensemble Predictions', 
                     'Past LSTM - Derivative based Predictions', 'Past LSTM - Double derivative and MA based Predictions', 
                     'Past LSTM - MA Based Predictions', 'Past ARIMA Predictions',
                     ], axis=1).dropna().to_json(orient='table')), 
                'evals': json.loads(evals.to_json(orient='table')), 
                'model_csv': json.loads(out.drop(
                    ['Past Price', 'Past Ensemble Predictions', 
                     'Past LSTM - Derivative based Predictions', 'Past LSTM - Double derivative and MA based Predictions', 
                     'Past LSTM - MA Based Predictions', 'Past ARIMA Predictions',
                     ], axis=1).dropna().iloc[-72:].to_json(orient='table'))
                }


def updateauthvaluefortradingeconomics():
    global AUTH

    URL = "https://tradingeconomics.com/commodity/natural-gas"
    # Set path Selenium
    CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'
    s = Service(CHROMEDRIVER_PATH)
    WINDOW_SIZE = "1920,1080"
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
    chrome_options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(service=s, options=chrome_options)
    driver.get(URL)
    driver.close()
    for request in driver.requests:  
        if request.response and request.url.startswith("https://markets.tradingeconomics"):  
            parse_result = urlparse(request.url)
            dict_result = parse_qs(parse_result.query)
            AUTH = quote_plus(dict_result['AUTH'][0])
            return ""
    return ""

if __name__ == "__main__":  
    with app.app_context():
        current_app.dataframe = data_fetch()
             
        # NG Monthly Models
        current_app.model_xgb = get_models(f'./models/NG Monthly/XGB-Babbage-4.36err-(1,168)ip-(1,24)op.ubj', 0) # futures
        current_app.model_boole = get_models(f'./models/NG Monthly/Model_V20_Boole.h5', 0.0012) # futures
        current_app.model_babbage_1 = get_models(f'./models/NG Monthly/Model[Babbage]_v3.h5', 0.0027) # futures
        current_app.model_bell_1 = get_models(f'./models/NG Monthly/Model_V22_Bell.h5', 0.009) # yahoo futures
      
        current_app.ng_models_month = [
            ('ARIMA', None, [], 0),
            # ("XGBoost", current_app.model_xgb, ['close', '30ma', '60ma', '180ma', 'close_min', 'close_max', 'gradient'], 0.9),
            ('LSTM - MA Based', current_app.model_boole, ['close', '30ma', '60ma', '180ma', 'close_min', 'close_max'], 0.22),
            ('LSTM - Derivative based', current_app.model_babbage_1, ['close', '180ma', '60ma', '30ma', 'close_min', 'close_max', 'gradient'], 1),
            ('LSTM - Double derivative and MA based', current_app.model_bell_1, ['close', '180ma', '60ma', '30ma', 'close_min', 'close_max', 'gradient', 'd_gradient'], -0.38),
        ]
        current_app.saved_data = blended_models(current_app.dataframe, models=current_app.ng_models_month, end='12/2020')
        
        
    app.run(host='0.0.0.0', port=5000)
    #app.run(debug=True)
