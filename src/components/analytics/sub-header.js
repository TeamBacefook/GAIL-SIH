import { Box, Grid, Typography } from "@mui/material";
// import { AnimateSharedLayout as LayoutGroup, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
const isActiveLink = (href, currentPathname) => {
  if (href === "/") {
    return href === currentPathname;
  }

  return currentPathname.includes(href);
};
const links = [
  {
    name: "Global",
    href: "/global",
  },
  {
    name: "Nation wise",
    href: "/continental",
  },
  {
    name: "India",
    href: "/india",
  },
];

const SubHeader = () => {
  const router = useLocation();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ padding: "0em 2em" }}>
      {/* <div id="top" style={{ position: "absolute", top: 0, left: 0 }} /> */}
      {/* <LayoutGroup id="B"> */}
      <Box
        sx={{ marginTop: 16, px: 4, py: 1 }}
        style={{ boxShadow: "inset 0px -1px 1px #e7ebf0" }}
      >
        <Grid
          item
          spacing={8}
          justifyContent={{ sx: "space-evenly" }}
          container
          xs={12}
        >
          {" "}
          {links.map(({ name, href }) => (
            <Grid
              item
              key={href}
              onClick={() => {
                navigate("/analytics" + href);
              }}
            >
              <Typography
                fontFamily="Reem Kufi"
                fontSize={18}
                color={
                  isActiveLink(href, router.pathname)
                    ? "#003973"
                    : " rgba(10, 37, 64, 0.4)"
                }
                style={{
                  cursor: "pointer",
                }}
              >
                {name}
                {isActiveLink(href, router.pathname) && (
                  <div
                    layoutId="navigation-underline"
                    className="navigation-underline"
                    animate="true"
                  />
                )}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* </LayoutGroup> */}
    </div>
  );
};

export default SubHeader;
