import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { Box, Grid } from "@mui/material";
import withSubheader from "../../layout/sub-header";
import * as d3 from "d3";
import useBarchart from "../../charts/barchart";

const Analytics = () => {
  const bar = useBarchart();
  return (
    <Box sx={{ my: 2 }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-Continental</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item xs={12} justifyContent="center" container spacing={2}>
        <div ref={bar} />
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
