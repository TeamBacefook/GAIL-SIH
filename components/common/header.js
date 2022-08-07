import React from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const router = useRouter();

  return (
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
        backgroundColor: "rgba(247, 248, 242, 0.7)",
        boxShadow: "inset 0px -1px 1px #e7ebf0",
      }}
    >
      <Grid container item xs={6} md={6}>
        <Grid item xs={12} style={{ cursor: "pointer" }} md={5}>
          <Link href="/">
            <Image src={logo} layout="responsive" alt="logo" />
          </Link>
        </Grid>{" "}
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
        <Grid item>
          <Link href="/">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={
                router.asPath === "/" ? "#003973" : " rgba(10, 37, 64, 0.4)"
              }
              style={{
                borderBottom: router.asPath === "/" ? "2px solid #003973" : "",
                cursor: "pointer",
              }}
            >
              Home
            </Typography>
          </Link>
        </Grid>{" "}
        <Grid item>
          <Link href="/">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={
                router.asPath === "/predictions"
                  ? "#003973"
                  : " rgba(10, 37, 64, 0.4)"
              }
              style={{
                cursor: "pointer",
              }}
            >
              Predictions
            </Typography>
          </Link>
        </Grid>{" "}
        <Grid item>
          <Link href="/analytics">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={
                router.asPath === "/analytics"
                  ? "#003973"
                  : " rgba(10, 37, 64, 0.4)"
              }
              style={{
                borderBottom:
                  router.asPath === "/analytics" ? "2px solid #003973" : "",
                cursor: "pointer",
              }}
            >
              Analytics
            </Typography>
          </Link>
        </Grid>{" "}
        <Grid item>
          <Link href="/">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={
                router.asPath === "/news" ? "#003973" : " rgba(10, 37, 64, 0.4)"
              }
              style={{
                borderBottom:
                  router.asPath === "/news" ? "2px solid #003973" : "",
                cursor: "pointer",
              }}
            >
              News
            </Typography>
          </Link>
        </Grid>{" "}
        <Grid item>
          <Link href="/team">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={
                router.asPath === "/team" ? "#003973" : " rgba(10, 37, 64, 0.4)"
              }
              style={{
                borderBottom:
                  router.asPath === "/team" ? "2px solid #003973" : "",
                cursor: "pointer",
              }}
            >
              Team
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid
        item
        xs={4}
        container
        alignItems="center"
        justifyContent="flex-end"
        display={{ xs: "flex", md: "none" }}
      >
        <MenuIcon
          style={{ color: "rgba(10, 37, 64, 1)" }}
          color="rgba(10, 37, 64, 1)"
        />
      </Grid>
    </Grid>
  );
};

export default Header;
