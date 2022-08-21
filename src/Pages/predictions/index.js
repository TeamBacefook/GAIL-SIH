import {
  Box,
  Grid,
  Typography,
  Divider,
  TextField,
  Autocomplete,
} from "@mui/material";
import ComboChart from "../../components/prediction/combo";
import BarCharts from "../../charts/barchart";
import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import Checkbox from "@mui/material/Checkbox";
import IOSSlider from "../../components/common/slider";
import withLayout from "../../layout";
import { getPredictions, getModelEval } from "../../actions/predictions";
import "./style.css";

const Errors = [{ label: "RMSE" }, { label: "MAPE" }, { label: "AIC" }];

const Predictions = () => {
  const [current, setCurrent] = useState();
  const [barData, setBarData] = useState([]);
  const [warIntensity, setWarIntensity] = useState(0);
  const [recessionIntensity, setRecessionIntensity] = useState(0);
  const [check, setCheck] = useState({ war: false, recession: false });
  useEffect(() => {
    const getData2 = async () => {
      const data2 = await getModelEval();
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
      });
      setCurrent(data2.data[0]["index"]);
      setBarData(final);
    };
    getData2();
  }, []);

  return (
    <Box sx={{ my: 12, px: { xs: 1, md: 4 } }}>
      <Helmet>
        <title>GAIL SIH | Dashboard</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ComboChart
        name="6 year"
        getPredictionsFunction={getPredictions}
        warIntensity={check.war ? warIntensity : undefined}
        recessionIntensity={check.recession ? recessionIntensity : undefined}
        parameter={true}
      />
      <Grid item container xs={12}>
        <Grid item sx={{ mb: 3 }} xs={12}>
          <Typography color="#00116A" fontSize={40}>
            {" "}
            Global Parameters
          </Typography>
          <Divider />
          <Grid
            item
            xs={12}
            justifyContent="space-evenly"
            sx={{ pt: 1, pb: 2 }}
            alignItems="center"
            container
          >
            <Grid item xs={2}>
              <Box sx={{ display: "flex" }}>
                <Checkbox
                  value={check.war}
                  onChange={(e) => {
                    setCheck((prev) => {
                      return { ...prev, war: e.target.value };
                    });
                  }}
                />{" "}
                <Typography color="#00116A" fontSize={30}>
                  {" "}
                  War
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate Start" />
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate End" />
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                Intensity
              </Typography>
              <IOSSlider
                onChange={(e) => {
                  let val = 0;
                  switch (e.target.value) {
                    case 1:
                      val = 1.1238;
                      break;
                    case 2:
                      val = 1.2476;
                      break;
                    case 3:
                      val = 1.3714;
                      break;
                    case 4:
                      val = 1.4952;
                      break;
                    case 5:
                      val = 1.6192;
                      break;
                    default:
                      val = 0;
                      break;
                  }
                  setWarIntensity(val);
                }}
                track={false}
                marks={[
                  { label: "very low", value: 1 },
                  { label: "low", value: 2 },
                  { label: "moderate", value: 3 },
                  { label: "high", value: 4 },
                  { label: "very high", value: 5 },
                ]}
                min={1}
                max={5}
                step={1}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid
            item
            xs={12}
            justifyContent="space-evenly"
            sx={{ pt: 1, pb: 2 }}
            alignItems="center"
            container
          >
            <Grid item xs={2}>
              <Box sx={{ display: "flex" }}>
                <Checkbox
                  value={check.recession}
                  onChange={(e) => {
                    setCheck((prev) => {
                      return { ...prev, recession: e.target.value };
                    });
                  }}
                />{" "}
                <Typography color="#00116A" fontSize={30}>
                  {" "}
                  Recession
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate Start" />
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate End" />
            </Grid>
            <Grid item xs={3} container justifyContent="center">
              <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                Intensity
              </Typography>
              <IOSSlider
                onChange={(e) => {
                  let val = 0;
                  switch (e.target.value) {
                    case 1:
                      val = 1.11664;
                      break;
                    case 2:
                      val = 1.3328;
                      break;
                    case 3:
                      val = 1.4992;
                      break;
                    case 4:
                      val = 1.6656;
                      break;
                    case 5:
                      val = 1.8302;
                      break;
                    default:
                      val = 0;
                      break;
                  }
                  setRecessionIntensity(val);
                }}
                track={false}
                marks={[
                  { label: "very low", value: 1 },
                  { label: "low", value: 2 },
                  { label: "moderate", value: 3 },
                  { label: "high", value: 4 },
                  { label: "very high", value: 5 },
                ]}
                min={1}
                max={5}
                step={1}
              />
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </Grid>{" "}
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
                  g_width={window.innerWidth * 0.9}
                  g_height={window.innerHeight * 0.3}
                  c_id={2}
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
