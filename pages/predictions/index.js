import { Box, Button, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import Head from "next/head";
import { useLineChart } from "../../charts/linechart";
import useGroupedBarChart from "../../charts/groupedbarchart";

const Predictions = () => {
  const lineChart = useGroupedBarChart();

  return (
    <Box sx={{ my: 12, px: { xs: 1, md: 4 } }}>
      {" "}
      <Head>
        <title>GAIL SIH | Predictions</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <Button
            variant="outlined"
            sx={{ borderRadius: "1em", color: "gray", borderColor: "gray" }}
          >
            Enter a time series csv
          </Button>
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
        <svg width="100%" height={"500"} ref={lineChart}></svg>
      </Box>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography color="#00116A" fontSize={40}>
            {" "}
            Global Parameters
          </Typography>{" "}
          <Divider />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Predictions;
