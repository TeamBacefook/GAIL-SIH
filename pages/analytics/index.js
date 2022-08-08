import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";

const Analytics = () => {
  return (
    <Box sx={{ my: 10 }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello
    </Box>
  );
};

export default Analytics;
