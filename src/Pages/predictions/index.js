import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import BarCharts from "../../charts/barchart";
import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!["csv"].includes(fileExtension)) {
        toast.error("Please input a csv file");
        return;
      }
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        if (!columns.includes("date") || !columns.includes("close")) {
          toast.error("Please input correct csv file");
        } else {
          toast.info("Predicting ...");
          parsedData.pop();
          const pred = await getPredictions(parsedData);
          setData(pred.data);
        }
      };
      reader.readAsText(inputFile);
    }
  };

  const [commo, setCommo] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    const arr = [];
    for (var key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        if (key !== "index") {
          arr.push(key);
        }
      }
    }
    console.log(arr);
    setAll(arr);
    setCommo(arr);
  }, [data]);
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommo(typeof value === "string" ? value.split(",") : value);
  };
  console.log(data);
  return (
    <Box sx={{ my: 12, px: { xs: 1, md: 4 } }}>
      <Helmet>
        <title>GAIL SIH | Dashboard</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        item
        xs={12}
      >
        <Grid item sx={1}>
          <Typography color="#00116A" fontSize={30}>
            Model Prediction
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <input type="file" id="file" onChange={handleFileChange} />
          <label for="file" className="btn-3" style={{ textAlign: "center" }}>
            <span>Upload CSV File</span>
          </label>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
              width: "70%",
            }}
            disabled={data.length !== 0 ? false : true}
          >
            Download Graph
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(180deg, #005CB9 0%, #270097 100%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
              width: "70%",
            }}
            disabled={data.length !== 0 ? false : true}
            onClick={() => {
              window.downloadCSV(data, commo, "Predictions");
            }}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>
      {data.length !== 0 && (
        <>
          <Grid item justify="center" xs={12} md={12} lg={12} align="center">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={commo}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    inputProps={{ style: { borderRadius: "1em" } }}
                    label="Chip"
                  />
                }
                renderValue={(x) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {x.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  );
                }}
              >
                {all.map((obj, index) => {
                  return (
                    <MenuItem value={obj} key={index}>
                      {obj}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={12}
            style={{ display: "flex", alignItems: "center", height: "60vh" }}
          >
            <LineChart width="100%" height="100%" data={data} display={commo} />
          </Grid>
        </>
      )}
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
