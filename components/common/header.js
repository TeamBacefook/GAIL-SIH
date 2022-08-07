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
        px: { xs: 2, md: 10 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Grid container item xs={6} md={6}>
        <Grid item xs={12} md={5}>
          <Image src={logo} layout="responsive" objectFit="cover" alt="logo" />{" "}
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
              color={router.asPath === "/" ? "#003973" : " #9CA4B8"}
              style={{
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
              color={router.asPath === "/predictions" ? "#003973" : " #9CA4B8"}
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
              color={router.asPath === "/analytics" ? "#003973" : " #9CA4B8"}
              style={{
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
              color={router.asPath === "/news" ? "#003973" : " #9CA4B8"}
              style={{
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
              color={router.asPath === "/team" ? "#003973" : " #9CA4B8"}
              style={{
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
