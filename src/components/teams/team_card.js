import React from "react";

import { Grid, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Card = ({ image, f_name, l_name, lnkIn, github, insta }) => {
  // const onCardHover = () => {
  //   barControls.start({ height: 0 });
  //   socialsControls.start({ opacity: 1 });
  //   imgControls.start({
  //     top: 0,
  //     height: "37vh",
  //     width: "100%",
  //     borderRadius: "15px 15px 0 0",
  //   });
  //   nameControls.start({
  //     opacity: 0,
  //   });
  // };

  // const endCardHover = () => {
  //   barControls.start({ height: "1.5em" });
  //   socialsControls.start({ opacity: 0 });
  //   imgControls.start({
  //     top: "17%",
  //     height: "18vh",
  //     width: "18vh",
  //     borderRadius: "300px",
  //   });
  //   nameControls.start({
  //     opacity: 1,
  //   });
  // };

  return (
    <div>
      <div
        style={{
          borderRadius: 15,
          width: "17em",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "15px",
          backgroundColor: "#FFF",
          position: "relative",
        }}
        // onHoverStart={onCardHover}
        // onHoverEnd={endCardHover}
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
          <div
            style={{
              width: "70%",
              backgroundColor: "#FF5C00",
              height: "1.5em",
              borderRadius: "0 0 20px 20px",
            }}
            // animate={barControls}
            transition={{ type: "spring", duration: 1, bounce: 0 }}
          />
          {/* Image Circle */}
          <div
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
            // animate={imgControls}
            transition={{ type: "tween", duration: 0.75, bounce: 0 }}
          />
          {/* Name */}
          <div
            style={{ paddingTop: "25vh", position: "absolute", top: "15%" }}
            // animate={nameControls}
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
          </div>
        </div>
        {/* Socials Bottom */}
        <div
          style={{
            height: "7em",
            backgroundColor: "#FF5C00",
            borderRadius: "0 0 15px 15px",
            opacity: 0,
          }}
          // animate={socialsControls}
          transition={{ type: "spring", duration: 1, bounce: 0 }}
        >
          <Grid
            container
            justifyContent="space-evenly"
            alignItems="center"
            style={{ height: "100%" }}
          >
            {/* Github */}
            <Grid item style={{ height: 40, width: 40 }}>
              <GitHubIcon
                style={{ color: "white", fontSize: 35, cursor: "pointer" }}
                onClick={() => {
                  window.open(github, "_blank");
                }}
              />
            </Grid>
            {/* LinkedIn */}
            <Grid item style={{ height: 40, width: 40 }}>
              <LinkedInIcon
                style={{ color: "white", fontSize: 35, cursor: "pointer" }}
                onClick={() => {
                  window.open(lnkIn, "_blank");
                }}
              />
            </Grid>
            {/* Instagram */}
            <Grid item style={{ height: 40, width: 40 }}>
              <InstagramIcon
                style={{ color: "white", fontSize: 35, cursor: "pointer" }}
                onClick={() => {
                  window.open(insta, "_blank");
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Card;
