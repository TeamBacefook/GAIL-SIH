import React from "react";
import { LayoutGroup, motion, useAnimationControls } from "framer-motion";
import { Grid, Typography } from "@mui/material";

const Card = ({ image, f_name, l_name, insta, github, atlas }) => {
  const barControls = useAnimationControls();
  const imgControls = useAnimationControls();
  const nameControls = useAnimationControls();
  const socialsControls = useAnimationControls();

  const onCardHover = () => {
    console.log("card hovered");
    barControls.start({ height: 0 });
    socialsControls.start({ backgroundColor: "#FF5C00" });
    imgControls.start({
      top: 0,
      height: "37vh",
      width: "100%",
      borderRadius: "15px 15px 0 0",
    });
    nameControls.start({
      opacity: 0,
    });
  };

  const endCardHover = () => {
    console.log("card hover stopped");
    barControls.start({ height: "1.5em" });
    socialsControls.start({ backgroundColor: "#FFF" });
    imgControls.start({
      top: "17%",
      height: "18vh",
      width: "18vh",
      borderRadius: "300px",
    });
    nameControls.start({
      opacity: 1,
    });
  };

  return (
    <LayoutGroup id="cards">
      <motion.div
        style={{
          borderRadius: 15,
          width: "75%",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "15px",
          backgroundColor: "#FFF",
          position: "relative",
        }}
        onHoverStart={onCardHover}
        onHoverEnd={endCardHover}
      >
        {/* Photo Top */}
        <div
          style={{
            minHeight: "37vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Top Bar */}
          <motion.div
            style={{
              width: "70%",
              backgroundColor: "#FF5C00",
              height: "1.5em",
              borderRadius: "0 0 20px 20px",
            }}
            animate={barControls}
            transition={{ type: "spring", duration: 1, bounce: 0 }}
          />
          {/* Image Circle */}
          <motion.div
            style={{
              backgroundColor: "#FF5C00",
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "18vh",
              width: "18vh",
              borderRadius: "300px",
              position: "absolute",
              top: "17%",
            }}
            animate={imgControls}
            transition={{ type: "spring", duration: 1, bounce: 0 }}
          />
          {/* Name */}
          <motion.div
            style={{ paddingTop: "25vh", position: "absolute", top: "15%" }}
            animate={nameControls}
            transition={{ type: "spring", duration: 0.8, bounce: 0 }}
          >
            <Grid container flexDirection="column">
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h4">{f_name}</Typography>
              </Grid>
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5">{l_name}</Typography>
              </Grid>
            </Grid>
          </motion.div>
        </div>
        {/* Socials Bottom */}
        <motion.div
          style={{
            minHeight: "7em",
            backgroundColor: "#FFF",
            borderRadius: "0 0 15px 15px",
          }}
          animate={socialsControls}
          transition={{ type: "spring", duration: 1, bounce: 0 }}
        >
          <Grid container>
            {/* Github */}
            <Grid item></Grid>
            {/* Instagram */}
            <Grid item></Grid>
            {/* Atlassian */}
            <Grid item></Grid>
          </Grid>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  );
};

export default Card;
