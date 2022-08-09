import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import placeholder from "../../images/placeholder.svg";
const Card = () => {
  return (
    <Box>
      <Grid
        sx={{
          border: "1px solid #FF5C00",
          px: 1,
          py: 1,
          borderRadius: "1em",
        }}
        item
        container
        xs={12}
        spacing={4}
        alignItems={"center"}
      >
        <Grid item justifyContent={'center'} xs={12}>
          <Grid item xs={5}>
            <Image src={placeholder} layout="responsive" />
          </Grid>{" "}
        </Grid>
        <Grid container item xs={12}>
          <Typography color="00116A" fontSize={25}>
            "Sedutperspiciatis unde omnis
          </Typography>
          <Typography sx={{ mt: 2 }} fontSize={20} color="00116A">
            "But I must explain to you how all this mistaken idea of denouncing
            "But I must explain to youLorem Ipsum has been the industry's
            standard dummy text ever since the 1500s More...
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              width: "70%",
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
    </Box>
  );
};

export default Card;
