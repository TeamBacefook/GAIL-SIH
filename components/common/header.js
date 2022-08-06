import React from "react";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../public/logo.svg";
// import MenuIcon from "@mui/icons-material/Menu";
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
        px: { xs: 2, md: 16 },
        py: { xs: 2, md: 2 },
        boxShadow: "0px 3px 4px 0px #00000040",
        position: "sticky",
      }}
    >
      <Grid container item xs={6} md={6}>
        <Grid item xs={12} md={5}>
          <Image src={logo} layout="responsive" objectFit="cover" />{" "}
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
              color={router.asPath === "/" ? "#003973" : " #0080FF"}
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
              color={router.asPath === "/predictions" ? "#003973" : " #0080FF"}
              style={{
                borderBottom:
                  router.asPath === "/predictions" ? "2px solid #003973" : "",
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
              color={router.asPath === "/analytics" ? "#003973" : " #0080FF"}
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
              color={router.asPath === "/news" ? "#003973" : " #0080FF"}
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
          <Link href="/">
            <Typography
              fontWeight={500}
              fontSize={18}
              color={router.asPath === "/team" ? "#003973" : " #0080FF"}
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
      <Grid item xs={4} display={{ xs: "flex", md: "hidden" }}>
        {/* <MenuIcon /> */}
      </Grid>
    </Grid>
  );
};

export default Header;
