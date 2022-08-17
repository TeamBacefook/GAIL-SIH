import { Typography, Box, Grid, Divider, useMediaQuery } from "@mui/material";
import React from "react";
import petrol from "../../images/petrol.svg";
import gail from "../../images/gail.svg";
import sih from "../../images/sih.svg";
import dng from "../../images/dng.svg";
import coal from "../../images/coal.svg";
import renewable from "../../images/renewable.svg";
import { Helmet } from "react-helmet";
import World from "../../components/analytics/globe";
import homesvg from "../../images/animated.svg";
import withLayout from "../../layout";
const Card = ({ data }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      justifyContent={{ md: "start", xs: "center" }}
      container
      spacing={1.5}
    >
      <Grid
        item
        xs={12}
        container
        justifyContent={{ md: "start", xs: "center" }}
      >
        <Box
          sx={{
            width: "30%",
            p: 1,
            zIndex: 100,

            borderRadius: "5px",
          }}
        >
          <img
            style={{ zIndex: 1 }}
            layout="responsive"
            src={data.image}
            alt=""
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={{ xs: "center", md: "start" }}>
          {data.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          dangerouslySetInnerHTML={{ __html: data.desc }}
          textAlign={{ xs: "center", md: "start" }}
        >
          {/* {data.desc}{" "} */}
        </Typography>
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const small = useMediaQuery("(max-width:1200px)");
  const data = [
    {
      name: "Petroleum",
      desc: "Production: 1.619  <br/> BTuConsumption: 9.813 BTu",
      image: petrol,
    },
    {
      name: "Dry Natural Gas",
      desc: "Production: 1.158  <br/> BTuConsumption: 2.347 BTu",
      image: dng,
    },
    {
      name: "Coal",
      desc: "Production: 11.666 <br/>  BTuConsumption: 16.265 BTu",
      image: coal,
    },
    {
      name: "Other Energy Sources",
      desc: "Production: 3.342 <br/> BTuConsumption: 3.359 BTu",
      image: renewable,
    },
  ];
  return (
    <Box sx={{ py: 14, px: { xs: 2, md: 9 } }}>
      <Helmet>
        <title>GAIL SIH</title>
        <meta name="description" content="Home page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Grid
        item
        sx={{ my: { sx: 0, md: 4 }, height: "80vh" }}
        spacing={5}
        id="worldmap"
        direction={{ xs: "column-reverse", md: "row" }}
        container
        xs={12}
      >
        <World />
      </Grid>
      <Divider />
      <Grid
        item
        spacing={4}
        container
        sx={{ my: 8, px: 8 }}
        justifyContent="space-between"
        xs={12}
      >
        <Grid item xs={12}>
          {" "}
          <Typography color="rgba(10, 37, 64, 1)" fontSize={{ xs: 25, md: 30 }}>
            A Project for:
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={gail} layout="responsive" alt="" />
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={sih} layout="responsive" alt="" />
        </Grid>
      </Grid>
      <Divider />

      <Grid
        item
        container
        xs={12}
        sx={{ pt: 8 }}
        justifyContent="space-between"
        spacing={{ xs: 3, md: 1 }}
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <Typography fontSize={{ xs: 25, md: 40 }}>Commodities</Typography>
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid spacing={8} sx={{ zIndex: 0 }} item container xs={12} md={7}>
          {data.map((obj, index) => {
            return <Card key={index} data={obj} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(Home);
