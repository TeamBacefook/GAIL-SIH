import { Typography, Box, Grid } from "@mui/material";
import Head from "next/head";
import withLayout from "../layout";
const Card = () => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      justifyContent={{ md: "start", xs: "center" }}
      container
      spacing={1}
    >
      <Grid
        item
        xs={12}
        container
        justifyContent={{ md: "start", xs: "center" }}
      >
        <Box
          sx={{
            p: 8,
            width: "30%",
            backgroundColor: "rgba(10, 37, 64, 1)",
            borderRadius: "5px",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={{ xs: "center", md: "start" }}>
          There are many variations of passages
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={{ xs: "center", md: "start" }}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by{" "}
        </Typography>
      </Grid>
    </Grid>
  );
};
const Home = () => {
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 } }}>
      <Head>
        <title>GAIL SIH</title>
        <meta name="description" content="Home page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Typography color="rgba(10, 37, 64, 1)" fontSize={{ xs: 25, md: 50 }}>
          We are Dynamic, Responsible and a Growing Company
        </Typography>
        <Typography
          color="rgba(10, 37, 64, 0.4)"
          fontSize={{ md: 28 }}
          sx={{ mt: 3 }}
        >
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the{" "}
        </Typography>
      </Box>

      <Grid
        item
        container
        xs={12}
        sx={{ pt: 8 }}
        spacing={{ xs: 4, md: 1 }}
        alignItems="center"
      >
        <Grid item xs={12} md={4}>
          <Typography fontSize={{ xs: 25, md: 40 }}>
            Information Of Commodities
          </Typography>
        </Grid>
        <Grid spacing={8} item container xs={12} md={8}>
          {[1, 2, 4, 5].map((obj) => {
            return <Card key={obj} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(Home);
