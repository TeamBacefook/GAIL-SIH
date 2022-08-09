import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import placeholder from "../../images/placeholder.svg";
const Card = () => {
  return (
    <Grid
      sx={{
        border: "1px solid #FF5C00",
        py: 2,
        borderRadius: "1em",
      }}
      item
      container
      xs={12}
      spacing={4}
      alignItems={"center"}
    >
      <Grid item xs={12} md={3}>
        <Image src={placeholder} layout="responsive" />
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography color="00116A" fontSize={30}>
          "Sedutperspiciatis unde omnis
        </Typography>
        <Typography sx={{ mt: 2 }} fontSize={20} color="00116A">
          "But I must explain to you how all this mistaken idea of denouncing
          "But I must explain to youLorem Ipsum has been the industry's standard
          dummy text ever since the 1500s More...
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent={"flex-end"} sx={{ pr: 3 }}>
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
            color: "white",
            borderRadius: "11px",
            textTransform: "none",
          }}
        >
          Explore More
        </Button>
      </Grid>
    </Grid>
  );
};

export default Card;
