import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Divider, Grid } from "@mui/material";
import withSubheader from "../../layout/sub-header";
import * as d3 from "d3";
import useBarchart from "../../charts/barchart";

const Analytics = () => {
  const bar1 = useBarchart();

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
          {" "}
          <svg width="450" height="500" ref={bar1} />
        </Grid>{" "}
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
