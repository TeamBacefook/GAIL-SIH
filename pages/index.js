import { Typography, Box, Grid } from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import withLayout from "../layout";
import petrol from "../images/petrol.svg";
import dng from "../images/dng.svg";
import coal from "../images/coal.svg";
import renewable from "../images/renewable.svg";

const Card = ({ data }) => {
  return (
    <Grid
      item
      xs={12}
      md={6}
      justifyContent={{ md: "start", xs: "center" }}
      container
      spacing={1.5}
    >
      <Grid
        item
        xs={12}
        container
        justifyContent={{ md: "start", xs: "center" }}
      >
        <Box
          sx={{
            width: "30%",
            p: 1,
            zIndex: 100,

            borderRadius: "5px",
          }}
        >
          <Image layout="responsive" src={data.image} alt="" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign={{ xs: "center", md: "start" }}>
          {data.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          dangerouslySetInnerHTML={{ __html: data.desc }}
          textAlign={{ xs: "center", md: "start" }}
        >
          {/* {data.desc}{" "} */}
        </Typography>
      </Grid>
    </Grid>
  );
};
const Home = () => {
  const data = [
    {
      name: "Petroleum",
      desc: "Production: 1.619  <br/> BTuConsumption: 9.813 BTu",
      image: petrol,
    },
    {
      name: "Dry Natural Gas",
      desc: "Production: 1.619  <br/> BTuConsumption: 9.813 BTu",
      image: dng,
    },
    {
      name: "Coal",
      desc: "Production: 1.619 <br/>  BTuConsumption: 9.813 BTu",
      image: coal,
    },
    {
      name: "Other Energy Sources",
      desc: "Production: 1.619 <br/> BTuConsumption: 9.813 BTu",
      image: renewable,
    },
  ];
  return (
    <Box sx={{ py: 14, px: { xs: 2, md: 16 } }}>
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
          <Typography fontSize={{ xs: 25, md: 40 }}>Commodities</Typography>
        </Grid>
        <Grid spacing={8} item container xs={12} md={8}>
          {data.map((obj, index) => {
            return <Card key={index} data={obj} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(Home);
