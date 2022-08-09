import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import withSubheader from "../../layout/sub-header";
import useDonut from "../../charts/donut";
const Analytics = () => {
  const donut = useDonut();
  return (
    <Box sx={{ my: 10 }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-India</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <svg width="100%" height={500} ref={donut} />
    </Box>
  );
};

export default withSubheader(Analytics);
