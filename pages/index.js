import { Typography, Box, Grid, Divider } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import petrol from "../images/petrol.svg";
import gail from "../images/gail.svg";
import sih from "../images/sih.svg";
import dng from "../images/dng.svg";
import coal from "../images/coal.svg";
import renewable from "../images/renewable.svg";

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
          <Image layout="responsive" src={data.image} alt="" />
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
  const data = [
    {
      name: "Petroleum",
      desc: "Production: 1.619  <br/> BTuConsumption: 9.813 BTu",
      image: petrol,
    },
    {
      name: "Dry Natural Gas",
      desc: "Production: 1.619  <br/> BTuConsumption: 9.813 BTu",
      image: dng,
    },
    {
      name: "Coal",
      desc: "Production: 1.619 <br/>  BTuConsumption: 9.813 BTu",
      image: coal,
    },
    {
      name: "Other Energy Sources",
      desc: "Production: 1.619 <br/> BTuConsumption: 9.813 BTu",
      image: renewable,
    },
  ];
  return (
    <Box sx={{ py: 14, px: { xs: 2, md: 9 } }}>
      <Head>
        <title>GAIL SIH</title>
        <meta name="description" content="Home page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item sx={{ my: 4 }} spacing={5} container xs={12}>
        <Grid item sx={12} md={7}>
          {" "}
          <Typography color="rgba(10, 37, 64, 1)" fontSize={{ xs: 25, md: 30 }}>
            With evergrowing demand for Energy and Power, analysis of underlying
            power supply with sustainable growth is the future.{" "}
          </Typography>
          <Typography
            color="rgba(10, 37, 64, 0.4)"
            fontSize={{ md: 18 }}
            sx={{ mt: 3 }}
          >
            Primary energy consumption in India has nearly tripled between 1990
            and 2018, reaching an estimated 916 million tons of oil equivalent.6
            Coal continued to supply most (45%) of India’s total energy
            consumption in 2018, followed by petroleum and other liquids (26%),
            and traditional biomass and waste (20%). Other renewable fuel
            sources make up a small portion of primary energy consumption,
            although the capacity potential is significant for several of these
            resources, such as solar, wind, and hydroelectricity.{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} sx={{ mt: { md: -10 } }}>
          <object type="image/svg+xml" data="/animated.svg"></object>
        </Grid>{" "}
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
          <Image src={gail} layout="responsive" />
        </Grid>
        <Grid item xs={12} md={5}>
          <Image src={sih} layout="responsive" />
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
        <Grid spacing={8} item container xs={12} md={7}>
          {data.map((obj, index) => {
            return <Card key={index} data={obj} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
