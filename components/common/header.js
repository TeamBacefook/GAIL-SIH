import React, { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.svg";
import { LayoutGroup, motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { Nav, Link as Link2 } from "./nav-overlay";
const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Predictions",
    href: "/predictions",
  },
  {
    name: "Analytics",
    href: "/analytics/global",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Team",
    href: "/team",
  },
];

const isActiveLink = (href, currentPathname) => {
  if (href === "/") {
    return href === currentPathname;
  }
  if (
    href.startsWith("/analytics") &&
    currentPathname.startsWith("/analytics")
  ) {
    return true;
  }

  return currentPathname.startsWith(href);
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const small = useMediaQuery("(max-width:1200px)");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!small) {
      setOpen(false);
    }
  }, [small, setOpen]);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const menuVariants = {
    opened: {
      top: 0,
      transition: {
        when: "beforeChildren",
        // staggerChildren: 0.5,
      },
    },
    closed: {
      top: "-100vh",
    },
  };

  const linkVariants = {
    opened: {
      opacity: 1,

      y: 25,
    },
    closed: {
      opacity: 0,
      y: 0,
    },
  };
  return (
    <LayoutGroup id="A">
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: { xs: 2, md: 8 },
          pt: { xs: 1, md: 2 },
          pb: 1,
        }}
        style={{
          position: "fixed",
          zIndex: 1000,
          top: 0,
          backdropFilter: "blur(25px)",
          backgroundColor: `rgba(247, 248, 242,${small ? 1 : 0.7})`,
          boxShadow: "inset 0px -1px 1px #e7ebf0",
        }}
      >
        <Grid container item xs={6} md={6}>
          <Grid item xs={12} style={{ cursor: "pointer" }} md={5}>
            <Link href="/">
              <Image
                src={logo}
                layout="responsive"
                objectFit="cover"
                alt="logo"
              />
            </Link>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
          item
          display={{ xs: "none", md: "flex" }}
          xs={6}
        >
          {links.map(({ name, href }) => (
            <Grid
              item
              key={href}
              onClick={() => {
                document.getElementById("top").scrollIntoView();
                router.push(href);
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
                {mounted && isActiveLink(href, router.pathname) && (
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
        <Grid
          item
          container
          justifyContent={"flex-end"}
          display={{ xs: "flex", md: "none" }}
          xs={6}
        >
          <Hamburger toggled={open} toggle={setOpen} />
        </Grid>
      </Grid>
      <Nav
        style={{ height: "100vh" }}
        initial={false}
        variants={menuVariants}
        animate={open ? "opened" : "closed"}
      >
        <Grid sx={{ py: 8, pb: 12 }} item container xs={12}>
          {links.map((obj, index) => {
            return (
              <Grid key={index} container item xs={12}>
                <Link2
                  style={{
                    width: "90%",
                    textAlign: "center",
                  }}
                  onClick={() => setOpen(false)}
                  key={index}
                  variants={linkVariants}
                >
                  <Link href={obj.href}>{obj.name}</Link>
                </Link2>
              </Grid>
            );
          })}
        </Grid>
      </Nav>
    </LayoutGroup>
  );
};

export default Header;
