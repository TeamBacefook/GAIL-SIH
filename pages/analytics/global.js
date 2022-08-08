import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import withSubheader from "../../layout/sub-header";
const Analytics = () => {
  return (
    <Box sx={{ my: 10 }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-Global</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Box>
  );
};

export default withSubheader(Analytics);
