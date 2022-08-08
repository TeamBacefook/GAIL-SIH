import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Head from "next/head";
import { useLineChart } from "../../charts/linechart";

const Predictions = () => {
  const lineChart = useLineChart();
  console.log(lineChart);
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
            }}
          >
            Download Graph
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{ mt: 8, display: "flex", justifyContent: "center", width: "100%" }}
      >
        <svg height={170} width={"500"} ref={lineChart} />
      </Box>
    </Box>
  );
};

export default Predictions;
