import { Box, Grid, Typography } from "@mui/material";
import { LayoutGroup, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
    name: "Continental",
    href: "/continental",
  },
  {
    name: "India",
    href: "/india",
  },
];

const SubHeader = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* <div id="top" style={{ position: "absolute", top: 0, left: 0 }} /> */}
      <LayoutGroup id="B">
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
                  document.getElementById("top").scrollIntoView();
                  router.push("/analytics" + href);
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
                    <motion.div
                      layoutId="navigation-underline"
                      className="navigation-underline"
                      animate
                    />
                  )}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </LayoutGroup>
    </>
  );
};

export default SubHeader;
