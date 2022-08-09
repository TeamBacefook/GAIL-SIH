import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import Card from "../../components/news/card";
import CardSmall from "../../components/news/card-small";
import Head from "next/head";
const News = () => {
  return (
    <Box sx={{ mt: 10, py: 4, px: { sx: 1, md: 8 } }}>
      <Head>
        <title>GAIL SIH | News</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography color="#00116A" fontSize={40}>
        Trending
      </Typography>

      <Grid spacing={6} sx={{ mt: 2 }} item container xs={12}>
        <Grid container item xs={12} spacing={6} md={8}>
          <Grid item xs={12}>
            <Card />
          </Grid>
          <Grid item xs={12}>
            <Card />
          </Grid>
          <Grid item xs={12}>
            <Card />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={6} md={4}>
          <Grid item xs={12}>
            <CardSmall />
          </Grid>

          <Grid item xs={12}>
            <CardSmall />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default News;
