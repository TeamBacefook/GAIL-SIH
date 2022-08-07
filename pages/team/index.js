import { Typography, Box, Grid } from "@mui/material";

import React from "react";
import withLayout from "../../layout";

const Card = () => {
  return <Box></Box>;
};

const Team = () => {
  return (
    <Box sx={{ my: 16, px: { sx: 2, md: 16 } }}>
      <Box>
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
        <Grid item xs={12}>
          <Typography color="#00116A" fontWeight={600} fontSize={30}>
            Our{" "}
            <span style={{ borderBottom: "5px solid #00116a" }}> Mentors </span>
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <Card />
          </Grid>
          <Grid item xs={6}>
            <Card />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
