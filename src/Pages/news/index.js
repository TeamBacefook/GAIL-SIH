import { Box, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "../../components/news/card";
import CardSmall from "../../components/news/card-small";
import { Helmet } from "react-helmet";
import { getNews } from "../../actions/news";
import withLayout from "../../layout";

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
      <Helmet>
        <title>PEGASUS | News</title>
        <meta name="description" content="Analytics page for PEGASUS" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

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
          {news?.map((obj, index) => {
            if (index > 3 && index < 9) {
              return (
                <Grid sx={{ mt: 2 }} key={index * 5} item xs={12}>
                  <Card data={obj} />
                </Grid>
              );
            } else {
              return <React.Fragment key={index * 100}></React.Fragment>;
            }
          })}
        </Grid>
        <Grid item xs={12} md={4}>
          {news?.map((obj, index) => {
            if (index < 3) {
              return (
                <Grid sx={{ mt: 2 }} key={index} item xs={12}>
                  <CardSmall data={obj} />
                </Grid>
              );
            } else {
              return <React.Fragment key={index}></React.Fragment>;
            }
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(News);
