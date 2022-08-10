import React from "react";
import Head from "next/head";
import {
  Box,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  Chip,
} from "@mui/material";
import IOSSlider from "../../components/common/slider";
import withSubheader from "../../layout/sub-header";
import dynamic from "next/dynamic";

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
  const WorldMap = dynamic(() => import("../../components/analytics/globe"));
  // const barchart = useBarChart();
  return (
    <Box sx={{ marginBottom: 5, marginRight: 5, marginLeft: 5 }}>
      <Head>
        <title>GAIL SIH | Analytics-Global</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid
        spacing="2"
        style={{ padding: "2%", border: "solid 1px" }}
        container
        sx={{ alignItems: "center" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          id="worldmap"
          style={{ padding: "0%", height: "60vh", border: "solid 1px" }}
        >
          <WorldMap />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              alignItems: "center",
              height: "20vh",
              border: "solid 1px",
              marginBottom: "1vh",
            }}
          >
            <FormControl sx={{ m: 1, width: "40%" }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={[]}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    inputProps={{ style: { borderRadius: "1em" } }}
                    label="Chip"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value={"Coal"}>Coal</MenuItem>
                <MenuItem value={"Petroleum"}>Petroleum</MenuItem>
                <MenuItem value={"Bio-gas"}>Bio Gas</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "40%" }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={[]}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    inputProps={{ style: { borderRadius: "1em" } }}
                    label="Chip"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value={"Coal"}>Coal</MenuItem>
                <MenuItem value={"Petroleum"}>Petroleum</MenuItem>
                <MenuItem value={"Bio-gas"}>Bio Gas</MenuItem>
              </Select>
            </FormControl>
            <Grid
              item
              justifyContent="center"
              style={{
                display: "flex",
                border: "solid 1px",
                marginBottom: "1vh",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <IOSSlider
                step={1}
                sx={{ width: { xs: "90%", md: "50%" } }}
                marks={marks}
                defaultValue={[2016, 2020]}
                min={2011}
                max={2021}
              />
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              height: "20vh",
              border: "solid 1px",
              marginBottom: "1vh",
            }}
          >
            Russia:
            {/* <svg width="100%" height="20vh" ref={barchart} /> */}
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default withSubheader(Analytics);
