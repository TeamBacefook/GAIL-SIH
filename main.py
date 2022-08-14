from flask_cors import CORS
from yahoo_fin import stock_info as si
from datetime import date, timedelta
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen
import datetime
import pandas as pd
from flask import Flask, request ,jsonify
import json
from gnews import GNews


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}} , support_credentials=True)
# googlenews = GoogleNews(lang='en')

@app.route('/data/countries', methods=['GET'])
def getcountriesdata():
    data = request.args
    countrydata = pd.read_csv("country.csv")
    countrydata = countrydata[(int(data["endyear"]) > countrydata['Year']) & (countrydata['Year'] > int(data["startyear"])) & (countrydata["Country"] == data["country"])]
    return countrydata.to_json(orient="records")

@app.route('/data/continents/energy', methods=['GET'])
def getcontinentdata():
    continentdata = pd.read_csv("EnergyBalanceSheet.csv")
    return continentdata.to_json(orient="records")

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
    natgasdata.set_index("date")
    natgasdata = natgasdata.loc[f"{data['startyear']}-{data['startmonth']}": f"{data['endyear']}-{data['endmonth']}"]
    return natgasdata.to_json(orient="records")



@app.route('/data/petroleum/local', methods=['GET'])
def getlocalpetroleumdata():
    data = request.args
    petroleum = pd.read_csv("yearlypetroleum.csv")
    # petroleum = petroleum.loc[f"{data['startyear']}-{data['startmonth']}": f"{data['endyear']}-{data['endmonth']}"]
    return petroleum.to_json(orient="records")



if __name__ == "__main__":
    app.run(debug=True)