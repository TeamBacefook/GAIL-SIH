import { Typography, Box, Grid } from "@mui/material";
import Head from "next/head";
import React from "react";
import Card from "../../components/teams/team_card";

const Team = () => {
  return (
    <Box
      sx={{
        my: 14,
        px: { sx: 2, md: 9 },
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Head>
        <title>GAIL SIH | Team</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ my: 4 }}>
        <Typography color="#00116A" fontSize={30} fontWeight="600">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium
        </Typography>
        <Typography
          color="rgba(10, 37, 64, 0.4)"
          fontSize={{ md: 24 }}
          sx={{ mt: 3 }}
        >
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the{" "}
        </Typography>
      </Box>

      <Grid item sx={{ my: 8 }} container xs={12}>
        <Grid item xs={12} style={{ minHeight: "15vh" }}>
          <Typography color="#00116A" fontWeight={600} fontSize={30}>
            Our{" "}
            <span style={{ borderBottom: "5px solid #00116a" }}> Mentors </span>
          </Typography>
        </Grid>
        <Grid item container xs={12} justifyContent="space-evenly">
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card />
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
