import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import ComboChart from "../../components/prediction/combo";
import BarCharts from "../../charts/barchart";
import React, { useState, useEffect, useCallback } from "react";
import Helmet from "react-helmet";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import IOSSlider from "../../components/common/slider";
import { toast } from "react-toastify";
import withLayout from "../../layout";
import { getPredictions, getModelEval } from "../../actions/predictions";
import LineChart from "../../charts/predchart";
import "./style.css";
import Papa from "papaparse";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

const marks = [
  { label: "", value: 0 },
  { label: "", value: 0.2 },
  { label: "", value: 0.4 },
  { label: "", value: 0.4 },
  { label: "", value: 0.6 },
  { label: "", value: 0.8 },
  { label: "", value: 1 },
];

const Predictions = () => {
  const [barData, setBarData] = useState([]);
  useEffect(() => {
    const getData2 = async () => {
      const data2 = await getModelEval();
      const arr = [];
      for (var key in data2.data[0]) {
        if (data2.data[0].hasOwnProperty(key)) {
          var val = data2.data[0][key];
          if (key !== "index") {
            arr.push({ label: key, value: val });
          }
        }
      }
      setBarData(arr);
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
      <ComboChart name="6 year" getPredictionsFunction={getPredictions} />
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
            <Grid item xs={3}>
              <Box sx={{ display: "flex" }}>
                <Checkbox />{" "}
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
            <Grid item xs={2} container justifyContent="center">
              <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                Intensity
              </Typography>
              <IOSSlider
                min={0}
                track={false}
                step={0.2}
                max={1}
                marks={marks}
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
            <Grid item xs={3}>
              <Box sx={{ display: "flex" }}>
                <Checkbox />{" "}
                <Typography color="#00116A" fontSize={30}>
                  {" "}
                  Pandemic
                </Typography>{" "}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate Start" />
            </Grid>
            <Grid item xs={3}>
              <TextField variant="outlined" label="Estimate End" />
            </Grid>
            <Grid item xs={2} container justifyContent="center">
              <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                Intensity
              </Typography>
              <IOSSlider
                min={0}
                track={false}
                step={0.2}
                max={1}
                marks={marks}
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
            <Grid item xs={3}>
              <Box sx={{ display: "flex" }}>
                <Checkbox />{" "}
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
            <Grid item xs={2} container justifyContent="center">
              <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                Intensity
              </Typography>
              <IOSSlider
                min={0}
                track={false}
                step={0.2}
                max={1}
                marks={marks}
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
          <TextField
            sx={{ width: "80%" }}
            variant="outlined"
            value="RMSE"
            select
          />
        </Grid>
        <Grid sx={{ mt: 8 }} item container justifyContent="center" xs={12}>
          <Grid item sx={12} md={12}>
            {barData.length !== 0 && (
              <>
                <p>RMSE</p>
                <BarCharts
                  data={barData}
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
