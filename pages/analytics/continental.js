import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Divider, Grid } from "@mui/material";
import withSubheader from "../../layout/sub-header";
import * as d3 from "d3";
import useBarchart from "../../charts/barchart";
import useDonut from "../../charts/donut";
import useGroupedBarChart from "../../charts/groupedbarchart";

const Analytics = () => {
  const bar1 = useBarchart();
  const donut = useGroupedBarChart();
  return (
    <Box sx={{ my: 2, px: 8 }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-Continental</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Divider sx={{ my: 4 }} />
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item>
          <p>Energy Consumption</p> <svg viewBox="0 0 460 450" ref={donut} />
        </Grid>{" "}
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
