import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Divider,
} from "@mui/material";
import ComboChart from "../../components/prediction/combo";
import BarCharts from "../../charts/barchart";
import React, { useState, useEffect, useRef } from "react";
import Helmet from "react-helmet";
import { getStockData2 } from "../../actions/predictions";
import up from "../../images/dashboard/growth.svg";
import down from "../../images/dashboard/fall.svg";

import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import Marquee from "react-fast-marquee";
import withLayout from "../../layout";
import {
  getPredictions,
  getModelEval,
  getPredictionsFn,
} from "../../actions/predictions";
import "./style.css";

const Errors = [{ label: "RMSE" }, { label: "MAPE" }, { label: "AIC" }];
const marqueedata = [
  {
    commodity: "Methanol\n\nCNY/T",
    price: "2431.00",
    "24hrchange": "12.00",
    "24hrpercentchange": "-0.49%",
    weeklychange: "-3.53%",
    monthlychange: "1.38%",
    "YoY change": "-9.09%",
    date: "Aug/18",
  },
  {
    commodity: "Crude Oil\n\nUSD/Bbl",
    price: "89.236",
    "24hrchange": "1.125",
    "24hrpercentchange": "1.28%",
    weeklychange: "-5.58%",
    monthlychange: "-11.58%",
    "YoY change": "40.28%",
    date: "10:28",
  },
  {
    commodity: "Brent\n\nUSD/Bbl",
    price: "95.115",
    "24hrchange": "1.465",
    "24hrpercentchange": "1.56%",
    weeklychange: "-4.60%",
    monthlychange: "-7.64%",
    "YoY change": "42.99%",
    date: "10:28",
  },
  {
    commodity: "Natural gas\n\nUSD/MMBtu",
    price: "9.3102",
    "24hrchange": "0.0662",
    "24hrpercentchange": "0.72%",
    weeklychange: "5.19%",
    monthlychange: "30.55%",
    "YoY change": "143.72%",
    date: "10:28",
  },
  {
    commodity: "Gasoline\n\nUSD/Gal",
    price: "2.9627",
    "24hrchange": "0.0282",
    "24hrpercentchange": "0.96%",
    weeklychange: "-3.61%",
    monthlychange: "-6.57%",
    "YoY change": "42.24%",
    date: "10:28",
  },
  {
    commodity: "Heating Oil\n\nUSD/Gal",
    price: "3.6384",
    "24hrchange": "0.021",
    "24hrpercentchange": "0.58%",
    weeklychange: "4.61%",
    monthlychange: "2.12%",
    "YoY change": "85.10%",
    date: "10:28",
  },
  {
    commodity: "Coal\n\nUSD/T",
    price: "413.90",
    "24hrchange": "8.90",
    "24hrpercentchange": "2.20%",
    weeklychange: "3.83%",
    monthlychange: "4.51%",
    "YoY change": "142.05%",
    date: "Aug/17",
  },
  {
    commodity: "TTF Gas\n\nEUR/MWh",
    price: "230.40",
    "24hrchange": "4.57",
    "24hrpercentchange": "2.02%",
    weeklychange: "10.52%",
    monthlychange: "48.91%",
    "YoY change": "469.38%",
    date: "10:28",
  },
  {
    commodity: "UK Gas\n\nGBp/thm",
    price: "450.0000",
    "24hrchange": "10.04",
    "24hrpercentchange": "2.28%",
    weeklychange: "12.04%",
    monthlychange: "107.82%",
    "YoY change": "351.16%",
    date: "10:24",
  },
  {
    commodity: "Ethanol\n\nUSD/Gal",
    price: "2.5100",
    "24hrchange": "0.0100",
    "24hrpercentchange": "0.40%",
    weeklychange: "2.03%",
    monthlychange: "-1.95%",
    "YoY change": "10.82%",
    date: "Aug/17",
  },
  {
    commodity: "Naphtha\n\nUSD/T",
    price: "656.58",
    "24hrchange": "11.63",
    "24hrpercentchange": "1.80%",
    weeklychange: "-4.10%",
    monthlychange: "-15.26%",
    "YoY change": "2.43%",
    date: "Aug/17",
  },
  {
    commodity: "Uranium\n\nUSD/Lbs",
    price: "48.7000",
    "24hrchange": "0.1500",
    "24hrpercentchange": "0.31%",
    weeklychange: "0.00%",
    monthlychange: "4.39%",
    "YoY change": "54.60%",
    date: "Aug/17",
  },
  {
    commodity: "Propane\n\nUSD/Gal",
    price: "1.07",
    "24hrchange": "0.01",
    "24hrpercentchange": "0.67%",
    weeklychange: "-0.29%",
    monthlychange: "-6.58%",
    "YoY change": "-4.67%",
    date: "Aug/17",
  },
  {
    commodity: "Urals Oil\n\nUSD/Bbl",
    price: "77.92",
    "24hrchange": "10.84",
    "24hrpercentchange": "16.16%",
    weeklychange: "4.91%",
    monthlychange: "-11.47%",
    "YoY change": "16.73%",
    date: "Aug/17",
  },
];

const Predictions = () => {
  const [current, setCurrent] = useState();
  const [barData, setBarData] = useState([]);
  const [filtercommodityprice, setFiltercommodityprice] = useState({
    commodityprice: "NG=F",
    type: "yahoofinance",
    text: "Natural gas prices from Yahoo Finance (NG=F)",
  });
  const [timeseriesDs, settimeseriesDs] = useState();
  const commodityprice = [
    {
      str: "Natural gas - Yahoo Finance",
      val: "NG=F",
      type: "yahoofinance",
      text: "Natural gas prices from Yahoo Finance (NG=F)",
    },
    {
      str: "Natural gas - Trading Economics",
      val: "ng1:com",
      type: "Tradingeconomics",
      text: "Natural gas prices from Trading Economics",
    },

    {
      str: "Crude oil - Trading Economics",
      val: "cl1:com",
      type: "Tradingeconomics",
      text: "Crude oil prices from Trading Economics",
    },
    {
      str: "Crude oil - Yahoo Finance",
      val: "CL=F",
      type: "yahoofinance",
      text: "Crude oil prices from Yahoo Finance (CL=F)",
    },
    {
      str: "Coal - Trading economics",
      val: "xal1:com",
      type: "Tradingeconomics",
      text: "Coal prices from Trading Economics",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await getStockData2(filtercommodityprice);
      const dataSource = {
        chart: {
          exportenabled: 1,
          multicanvas: false,
          theme: "gammel",
        },
        caption: {
          text: filtercommodityprice.text,
        },
        subcaption: {
          text: "Stock prices based on available data",
        },
        yaxis: [
          {
            plot: {
              value: {
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close",
              },
              type: "candlestick",
            },
            format: {
              prefix: "$",
            },
            title: "Stock Value",
          },
        ],
      };
      var schema = [
        {
          name: "Date",
          type: "date",
          format: "%d-%m-%Y",
        },
        {
          name: "Low",
          type: "number",
        },
        {
          name: "Open",
          type: "number",
        },
        {
          name: "Close",
          type: "number",
        },
        {
          name: "High",
          type: "number",
        },
      ];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      var timeseriesDsTemp = Object.assign(
        {},
        {
          type: "timeseries",
          renderAt: "container",
          width: window.innerWidth / 1.2,
          height: "600",
          dataSource,
        }
      );
      timeseriesDsTemp.dataSource.data = fusionTable;
      settimeseriesDs(timeseriesDsTemp);
    };
    getData();
  }, [filtercommodityprice]);

  const getData2 = async (data2) => {
    if (data2.data.length !== 0) {
      var final = {};

      data2.data.map((item, index) => {
        var arr = [];
        for (var key in data2.data[index]) {
          if (data2.data[index].hasOwnProperty(key)) {
            var val = data2.data[index][key];
            if (key !== "index") {
              arr.push({ label: key, value: val });
            }
          }
        }
        final[data2.data[index]["index"]] = arr;
        return "ok";
      });
      setCurrent(data2.data[0]["index"]);
      setBarData(final);
    } else {
      setBarData([]);
      setCurrent("");
    }
  };
  // useEffect(() => {

  //   getData2();
  // }, []);

  return (
    <Box sx={{ my: 12, px: { xs: 1, md: 4 } }}>
      <Helmet>
        <title>PEGASUS | Predictions</title>
        <meta name="description" content="Analytics page for PEGASUS" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <ComboChart
        name="Forecasts for 6 Years"
        getPredictionsFunction={getPredictions}
        parameter={true}
        getPredictionsFunction2={getPredictionsFn}
        ticker={"NG=F"}
        time={"M"}
        withcsvfilter={[
          "LSTM - MA Based Predictions",
          "Ensemble Predictions",
          "Actual Price",
          "Past Price",
        ]}
        filter={[
          "LSTM - MA Based Predictions",
          "Actual Price",
          "Past Price",
          "Ensemble Predictions",
        ]}
        setBarData={(data2) => getData2(data2)}
        unit={"$"}
      />

      <Divider />
      <Grid item sx={{ mt: 3, pr: 4 }} container xs={12}>
        <Grid item xs={12} md={6}>
          <Typography color="#00116A" fontSize={30}>
            Model Comparison
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={"flex-end"} md={6}>
          {barData.length !== 0 && (
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={Errors}
              value={Errors.find((item) => item.label === current)}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) => {
                setCurrent(value === null ? "RMSE" : value.label);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Metric"
                  placeholder="Metric"
                  type="text"
                />
              )}
            />
          )}
        </Grid>
        <Grid sx={{ mt: 8 }} item container justifyContent="center" xs={12}>
          <Grid item sx={12} md={12}>
            {barData.length !== 0 && (
              <>
                <p>{current}</p>
                <BarCharts
                  data={barData[current]}
                  bg1="#ACB6E5"
                  orientation={0}
                  bg2="#74ebd5"
                  g_width={window.innerWidth}
                  g_height={window.innerHeight * 0.3}
                  c_id={2}
                  unit={""}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ py: 8 }}>
        <Typography color="#00116A" fontSize={30}>
          Energy Prices
        </Typography>
      </Box>
      <Marquee>
        {marqueedata.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item["24hrpercentchange"][0] === "-" ? (
                <Box
                  xs={4}
                  sx={{
                    border: "1px solid #EC82B5",

                    px: 1,
                    py: 1,
                    width: "90%",
                    borderRadius: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    margin: "0 0.5em",
                    minHeight: "7vh",
                  }}
                >
                  <object
                    type="image/svg+xml"
                    data={down}
                    style={{
                      height: "1.5em",
                      width: "1.5em",
                    }}
                  >
                    <img src={down} alt="Fall Symbol" />
                  </object>
                  <Typography variant="h1" fontSize={20} sx={{ ml: 2, mr: 1 }}>
                    {item.commodity} {item.price}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    border: "1px solid #1FA724 ",
                    px: 1,
                    py: 1,
                    width: "90%",
                    borderRadius: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginLeft: "2em",
                    marginRight: "2em",
                    minHeight: "7vh",
                  }}
                >
                  <object
                    type="image/svg+xml"
                    data={up}
                    style={{
                      height: "1.5em",
                      width: "1.5em",
                    }}
                  >
                    <img src={up} alt="Fall Symbol" />
                  </object>
                  <Typography variant="h1" fontSize={20} sx={{ ml: 2, mr: 1 }}>
                    {item.commodity} {item.price}
                  </Typography>
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Marquee>

      <Divider />
      <Box sx={{ py: 8 }}>
        <Grid justifyContent="space-between" spacing={1} item container xs={12}>
          <Grid item xs={12} md={6}>
            <Typography color="#00116A" fontSize={30}>
              Spot and Future prices of commodities
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={commodityprice}
              value={commodityprice.find((item) => {
                console.log(commodityprice);
                return item.val === filtercommodityprice.commodityprice;
              })}
              getOptionLabel={(option) => option.str}
              onChange={(e, value) => {
                console.log(value);
                setFiltercommodityprice((prev) => {
                  return {
                    ...prev,
                    commodityprice:
                      value === null
                        ? "Natural gas - Yahoo Finance"
                        : value.val,
                    type: value === null ? "yahoofinance" : value.type,
                    text:
                      value === null
                        ? "Natural gas prices from Yahoo Finance"
                        : value.text,
                  };
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Commodity"
                  placeholder="Commodity"
                  type="text"
                />
              )}
            />
          </Grid>
        </Grid>
        {timeseriesDs && <ReactFC {...timeseriesDs} />}
      </Box>
    </Box>
  );
};

export default withLayout(Predictions);
