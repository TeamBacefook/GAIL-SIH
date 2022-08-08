import React from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Grid, Paper } from "@mui/material";

const variants = {
  bar: {
    initial: {},
    animate: {},
    exit: {},
  },
  img: {
    initial: {},
    animate: {},
    exit: {},
  },
  name: {
    initial: {},
    animate: {},
    exit: {},
  },
  socials: {
    initial: {},
    animate: {},
    exit: {},
  },
};

const Card = () => {
  return (
    <LayoutGroup>
      <motion.div
        style={{
          borderRadius: 15,
          minWidth: "22vw",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "15px",
        }}
      >
        {/* Photo Top */}
        <motion.div
          style={{
            minHeight: "35vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onHoverStart={() => console.log("PT")}
        >
          {/* Top Bar */}
          <motion.div
            style={{
              width: "50%",
              backgroundColor: "#FF5C00",
              minHeight: "1.5em",
              borderRadius: "0 0 10px 10px",
            }}
            onHoverStart={() => console.log("TB")}
          />
          {/* Image Circle */}
          <motion.div style={{}} onHoverStart={() => console.log("I")} />
          {/* Name */}
          <motion.div onHoverStart={() => console.log("N")}></motion.div>
        </motion.div>
        {/* Socials Bottom */}
        <motion.div
          style={{ minHeight: "7em" }}
          onHoverStart={() => console.log("S")}
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
