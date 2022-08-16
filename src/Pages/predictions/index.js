import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Helmet from "react-helmet";
// import { useLineChart } from "../../charts/linechart";
import Checkbox from "@mui/material/Checkbox";
import IOSSlider from "../../components/common/slider";
import CSVReader from "react-csv-reader";
import withLayout from "../../layout";
import { getPredictions } from "../../actions/predictions";

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
  const handleForce = async (data) => {
    const pred = await getPredictions(data);
    console.log(pred);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const small = useMediaQuery("(max-width:756px)");
  // const lineChart = useLineChart(500, 1300);
  // const bar = useBarChart();
  return (
    <Box sx={{ my: 12, px: { xs: 1, md: 4 } }}>
      <Helmet>
        <title>GAIL SIH | Predictions</title>
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
        <Grid item xs={3}>
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={handleForce}
            parserOptions={papaparseOptions}
          />
        </Grid>
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
          >
            Download Graph
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{ mt: 8, display: "flex", justifyContent: "center", width: "100%" }}
      >
        {/* <svg width="100%" height={"500"} ref={lineChart}></svg> */}
      </Box>
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
          <Grid item xs={6}>
            {/* <svg ref={bar} height={500} width="100%" /> */}
          </Grid>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(Predictions);
