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
            <Card
              image="https://media.discordapp.net/attachments/1005520464405340272/1006414571055095828/Dr._Radhika_Kotecha_-_Picture.jpg?width=389&height=423"
              f_name="Dr. Radhika"
              l_name="Kotecha"
            />
          </Grid>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              image="https://images-ext-1.discordapp.net/external/aSI0NRyeyJLv6XeMLAQm4PuKwxu48r9D8t9LaTMTYxU/%3Fe%3D2147483647%26v%3Dbeta%26t%3DTdkc1-tVHlXsT2yXQhBsWuw5vr7HeQ-Xx8VKZ-nGAwc/https/media-exp1.licdn.com/dms/image/C4D03AQGPYtTgy_h5zg/profile-displayphoto-shrink_200_200/0/1655836786626"
              f_name="Mr. Ankur"
              l_name="Singh"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ my: 8 }} container xs={12}>
        <Grid item xs={12} style={{ minHeight: "15vh" }}>
          <Typography color="#00116A" fontWeight={600} fontSize={30}>
            Our{" "}
            <span style={{ borderBottom: "5px solid #00116a" }}> Team </span>
          </Typography>
        </Grid>
        <Grid item container spacing={3} xs={12} justifyContent="space-evenly">
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://images-ext-1.discordapp.net/external/aSI0NRyeyJLv6XeMLAQm4PuKwxu48r9D8t9LaTMTYxU/%3Fe%3D2147483647%26v%3Dbeta%26t%3DTdkc1-tVHlXsT2yXQhBsWuw5vr7HeQ-Xx8VKZ-nGAwc/https/media-exp1.licdn.com/dms/image/C4D03AQGPYtTgy_h5zg/profile-displayphoto-shrink_200_200/0/1655836786626"
              f_name="Dhrumil"
              l_name="Vora"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://images-ext-1.discordapp.net/external/aSI0NRyeyJLv6XeMLAQm4PuKwxu48r9D8t9LaTMTYxU/%3Fe%3D2147483647%26v%3Dbeta%26t%3DTdkc1-tVHlXsT2yXQhBsWuw5vr7HeQ-Xx8VKZ-nGAwc/https/media-exp1.licdn.com/dms/image/C4D03AQGPYtTgy_h5zg/profile-displayphoto-shrink_200_200/0/1655836786626"
              f_name="Ehlaam"
              l_name="Hanwari"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://images-ext-1.discordapp.net/external/aSI0NRyeyJLv6XeMLAQm4PuKwxu48r9D8t9LaTMTYxU/%3Fe%3D2147483647%26v%3Dbeta%26t%3DTdkc1-tVHlXsT2yXQhBsWuw5vr7HeQ-Xx8VKZ-nGAwc/https/media-exp1.licdn.com/dms/image/C4D03AQGPYtTgy_h5zg/profile-displayphoto-shrink_200_200/0/1655836786626"
              f_name="Om"
              l_name="Parab"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://media.discordapp.net/attachments/1005520464405340272/1006412135473090640/IMG_20220418_113403_Bokeh-02-02.jpeg?width=423&height=423"
              f_name="Sharvil"
              l_name="Dandekar"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://media.discordapp.net/attachments/724216775776141372/1001352798954340362/unknown-2.png"
              f_name="Taksha"
              l_name="Limbashia"
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <Card
              image="https://images-ext-1.discordapp.net/external/aSI0NRyeyJLv6XeMLAQm4PuKwxu48r9D8t9LaTMTYxU/%3Fe%3D2147483647%26v%3Dbeta%26t%3DTdkc1-tVHlXsT2yXQhBsWuw5vr7HeQ-Xx8VKZ-nGAwc/https/media-exp1.licdn.com/dms/image/C4D03AQGPYtTgy_h5zg/profile-displayphoto-shrink_200_200/0/1655836786626"
              f_name="Vedant"
              l_name="Tamgadge"
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
