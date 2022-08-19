from flask_cors import CORS
from datetime import date, timedelta
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
import datetime
import pandas as pd
from flask import Flask, request ,jsonify, current_app, Response
import json
from gnews import GNews
import tensorflow as tf
from tensorflow import keras as k

from modelfuncs import get_model_evals, get_models, blended_models, data_fetch


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

@app.route('/data/continents/energy', methods=['GET'])
def getcontinentdata():
    data = request.args
    continentdata = pd.read_csv("EnergyBalanceSheet.csv")
    continentdata = continentdata[(int(data["year"]) == continentdata['Year']) & (data["type"] == continentdata["Type"])]
    continentdata["label"] = continentdata["Commodity"]
    continentdata.drop(columns=["Type", "Year", "Commodity"], inplace=True)
    continentdata["max"] = continentdata["value"].max()
    if data["type"] ==  "Transformation":
        continentdata["value"] = -continentdata["value"]
    return continentdata.to_json(orient="records")

@app.route("/data/getTrend", methods=["GET"])
def gettrend():
    continentsubregions = pd.read_csv("EnergyBalanceSheet.csv")
    continentsubregions =  continentsubregions.groupby(["Commodity", "Type"], as_index=False)
    data = []
    for eachgroup in continentsubregions.__iter__():
        tempdf = pd.DataFrame(eachgroup[1])
        yr1change = ((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-2]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        yr3change = ((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-4]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        yr5change =((int(tempdf.iloc[-1]["value"]) - int(tempdf.iloc[-6]["value"]) )/ int(tempdf.iloc[-5]["value"]))*100
        data.append({
            "commodity": tempdf.iloc[-1]["Commodity"],
            "Type": tempdf.iloc[-1]["Type"],
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
    natgasdata = pd.DataFrame(natgasdata.set_index("date"))
    natgasdata = natgasdata.loc[f"{data['startyear']}-{data['startmonth']}": f"{data['endyear']}-{data['endmonth']}"]
    natgasdata["time"] =  natgasdata["Month"]  + "-" + natgasdata["Year"].astype(str)
    return natgasdata.to_json(orient="records")

@app.route('/data/petroleum/local', methods=['GET'])
def getlocalpetroleumdata():
    data = request.args
    petroleum = pd.read_csv("yearlypetroleum.csv")
    petroleum = petroleum.loc[f"{data['startyear']}-{data['startmonth']}": f"{data['endyear']}-{data['endmonth']}"]
    return petroleum.to_json(orient="records")

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
    
@app.route('/predictions/csv/upload', methods=["POST"])
def csv_func():
    dataframe = pd.DataFrame.from_records(request.data)
    current_app.dataframe = data_fetch(dataframe.close)
    return dataframe.to_json()

@app.route('/predictions/csv/download', methods=["GET"])
def download():
    
    pass

@app.route('/predictions', methods=['POST'])
def predictions():
    data = json.loads(request.data)
    dataframe = pd.DataFrame.from_records(data['csv']).set_index('date')
    dataframe.index = pd.DatetimeIndex(dataframe.index)
    dataframe = data_fetch(dataframe.close)
    return json.loads(blended_models(dataframe, models=current_app.models).to_json(orient='table'))
    
@app.route('/modelEvals', methods=['GET'])
def getEvals():
    return get_model_evals(current_app.models).to_json(orient='table')



if __name__ == "__main__":
    with app.app_context():
        current_app.dataframe = data_fetch()
        
        current_app.model_boole = get_models(f'./Model[Babbage]_v4.h5', 0.0027)
        current_app.model_babbage = get_models(f'./Model[Babbage]_v3.h5', 0.0027)
        current_app.model_bell_1 = get_models(f'./Model_V22_Bell.h5', 0.02)
        current_app.model_bell_2 = get_models(f'./Model_V23_Bell.h5', 0.009)
        
        current_app.models = [
            ('LSTM - Boole', current_app.model_boole, ['close', '30ma', '60ma', '180ma', 'close_min', 'close_max',  'gradient'], 0.5),
            ('LSTM - Babbage', current_app.model_babbage, ['close', '180ma', '60ma', '30ma', 'close_min', 'close_max', 'gradient'], 0.5),
            ('LSTM - Bell v1', current_app.model_bell_1, ['close', '180ma', '60ma', '30ma', 'close_min', 'close_max', 'gradient', 'd_gradient'], -0.12),
            ('LSTM - Bell v2', current_app.model_bell_2, ['close', '180ma', '60ma', '30ma', 'close_min', 'close_max', 'gradient', 'd_gradient'], 1.0),
            ('ARIMA', None, [], 0.1)
        ]

    app.run(host='0.0.0.0', port=5000)
