import React from "react";
import Head from "next/head";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import withSubheader from "../../layout/sub-header";
import { State } from "country-state-city";
import useDonut from "../../charts/donut";
import IOSSlider from "../../components/common/slider";
import { useLineChart } from "../../charts/linechart";

const marks = [
  { label: 2011, value: 2011 },
  { label: 2012, value: 2012 },
  { label: 2013, value: 2013 },
  { label: 2014, value: 2014 },
  { label: 2015, value: 2015 },
  { label: 2016, value: 2016 },
  { label: 2017, value: 2017 },
  { label: 2018, value: 2018 },
  { label: 2019, value: 2019 },
  { label: 2020, value: 2020 },
  { label: 2021, value: 2021 },
];
const Analytics = () => {
  const donut = useDonut(450, 450);
  const line = useLineChart(400, 500);
  return (
    <Box sx={{ my: 10, px: { xs: 2, md: 8 } }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-India</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid sx={{ mb: 4 }} item container xs={12}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ px: 4, py: 4 }}
          style={{ border: "1px solid A3A3A3" }}
        >
          Insert India's Map Here
        </Grid>
        <Grid container spacing={2} justifyContent="center" item xs={12} md={6}>
          <Grid container justifyContent="center" item xs={12}>
            <Autocomplete
              style={{ width: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={State.getStatesOfCountry("IN")}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="State"
                  placeholder="User"
                  type="text"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <IOSSlider
              step={1}
              sx={{ xs: "100%", md: "90%" }}
              marks={marks}
              defaultValue={[2016, 2020]}
              min={2011}
              max={2021}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                px: 6,
                py: 2,
                boxShadow: "0px 4px 4px 0px #00000040",
                borderRadius: "2em",
                border: "1px solid #00116A66",
              }}
            >
              <Typography color="#00116A" fontSize={30}>
                Maharashtra(MH)
              </Typography>
              <Typography sx={{ mt: 1 }} color="#004488">
                Petroleum Production: 5.6tJ <br />
                Petroleum Consumption: 1.2tJ
              </Typography>
              <Typography color="#6F7F8EA8" fontSize={10}>
                *Approximate Figures
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        justifyContent={"space-between"}
        spacing={3}
        item
        container
        sx={{ py: 2 }}
        xs={12}
      >
        <Grid item xs={12}>
          <Typography color="#0A2540" fontSize={30}>
            Sectorwise Consumption
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start" item xs={12} md={6}>
          <Grid sx={{ py: 8 }} item xs={12}>
            <TextField
              sx={{ width: "80%" }}
              variant="outlined"
              inputProps={{ style: { color: "#0A2540" } }}
              select
              defaultValue="natural gas"
            >
              <MenuItem value="natural gas">Natural Gas</MenuItem>
            </TextField>
            <IOSSlider
              step={1}
              sx={{ xs: "100%", md: "90%" }}
              marks={marks}
              defaultValue={[2016, 2020]}
              min={2011}
              max={2021}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={12} md={5}>
          <svg height="430" ref={donut} />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        item
        justifyContent="space-between"
        xs={12}
        sx={{ py: 8 }}
        container
      >
        <Grid item xs={6}>
          <Typography fontSize={30} color="#0A2540">
            Monthwise Consumption Trend
          </Typography>
          <Grid sx={{ my: 2 }} item container spacing={2} xs={12}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth variant="outlined" />
            </Grid>
          </Grid>
          <TextField
            sx={{ width: "80%" }}
            variant="outlined"
            inputProps={{ style: { color: "#0A2540" } }}
            select
            defaultValue="natural gas"
          >
            <MenuItem value="natural gas">Natural Gas</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <svg height={400} ref={line} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
