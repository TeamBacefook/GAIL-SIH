import React from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
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
    <AnimateSharedLayout>
      <Paper style={{ borderRadius: 15, minWidth: "22vw" }}>
        {/* Photo Top */}
        <motion.div
          style={{
            minHeight: "35vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Top Bar */}
          <motion.div
            style={{
              width: "50%",
              backgroundColor: "#FF5C00",
              minHeight: "1.5em",
              borderRadius: "0 0 10px 10px",
            }}
          />
          {/* Image Circle */}
          <motion.div style={{}} />
          {/* Name */}
          <motion.div></motion.div>
        </motion.div>
        {/* Socials Bottom */}
        <motion.div style={{ minHeight: "7em" }}>
          <Grid container>
            {/* Github */}
            <Grid item></Grid>
            {/* Instagram */}
            <Grid item></Grid>
            {/* Atlassian */}
            <Grid item></Grid>
          </Grid>
        </motion.div>
      </Paper>
    </AnimateSharedLayout>
  );
};

export default Card;
