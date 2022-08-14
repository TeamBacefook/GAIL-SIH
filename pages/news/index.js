import { Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "../../components/news/card";
import CardSmall from "../../components/news/card-small";
import Head from "next/head";
import { getNews } from "../../actions/news";

const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getNews("natural gas");
      setNews(data);
    };
    getData();
  }, []);
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

      <Grid
        spacing={6}
        sx={{ mt: 0, px: { md: 0, xs: 2 } }}
        item
        container
        xs={12}
      >
        <Grid spacing={2} alignItems="flex-start" item xs={12} md={8}>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Card />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Card />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
            <Card />
          </Grid>
          <Grid sx={{ mt: 2 }} item xs={12}>
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
