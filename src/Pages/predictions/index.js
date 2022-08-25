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
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import withLayout from "../../layout";
import {
  getPredictions,
  getModelEval,
  getPredictionsFn,
} from "../../actions/predictions";
import "./style.css";

const Errors = [{ label: "RMSE" }, { label: "MAPE" }, { label: "AIC" }];

const Predictions = () => {
  const [current, setCurrent] = useState();
  const [barData, setBarData] = useState([]);

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
        name="for 6 year"
        getPredictionsFunction={getPredictions}
        parameter={true}
        getPredictionsFunction2={getPredictionsFn}
        ticker={"NG=F"}
        time={"M"}
        withcsvfilter={["LSTM - MA Based Predictions"]}
        filter={["LSTM - MA Based Predictions", "Actual Price"]}
        setBarData={(data2) => getData2(data2)}
        unit={"$"}
      />
      <Divider style={{ marginTop: "1em", marginBottom: "2em" }} />
      <ComboChart
        name="Weekly"
        getPredictionsFunction={getPredictions}
        parameter={false}
        ticker={"NG=F"}
        time={"W"}
        withcsvfilter={["LSTM - Derivate based Predictions"]}
        filter={["LSTM - Derivate based Predictions", "Actual Price"]}
        unit={"$"}
      />
      <Divider style={{ marginTop: "1em", marginBottom: "2em" }} />
      <ComboChart
        name="Daywise"
        getPredictionsFunction={getPredictions}
        parameter={false}
        ticker={"NG=F"}
        time={"D"}
        withcsvfilter={["LSTM - Price based Predictions"]}
        filter={["LSTM - Price based Predictions", "Actual Price"]}
        unit={"$"}
      />
      <Divider style={{ marginTop: "1em", marginBottom: "2em" }} />
      <Grid item sx={{ mt: 3, pr: 4 }} container xs={12}>
        <Grid item xs={12} md={6}>
          <Typography color="#00116A" fontSize={40}>
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
                  g_width={window.innerWidth * 0.97}
                  g_height={window.innerHeight * 0.3}
                  c_id={2}
                  unit={""}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(Predictions);
