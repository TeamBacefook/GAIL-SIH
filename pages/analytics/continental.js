import React from "react";
import Head from "next/head";
import { Box, Divider, Grid, Typography } from "@mui/material";

import withSubheader from "../../layout/sub-header";
import useBarchart from "../../charts/barchart";
import IOSSlider from "../../components/common/slider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
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
  const bar1 = useBarchart(500, 500);
  const bar2 = useBarchart(500, 500);
  const bar3 = useBarchart(500, 500);

  return (
    <Box sx={{ px: { xs: 1, md: 8 } }}>
      {" "}
      <Head>
        <title>GAIL SIH | Analytics-Continental</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item container justifyContent="center" xs={12}>
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
      </Grid>
      <Grid item container justifyContent="center" sx={{ mt: 4 }} xs={12}>
        <IOSSlider
          step={1}
          sx={{ width: { xs: "90%", md: "50%" } }}
          marks={marks}
          defaultValue={[2016, 2020]}
          min={2011}
          max={2021}
        />
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid sx={{ py: 4 }} item container xs={12}>
        <Grid item xs={12} md={6}>
          <Typography color="#00116A" fontSize={35}>
            Energy Balance Sheet
          </Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12} md={6}>
          <IOSSlider
            sx={{ width: { xs: "90%", md: "100%" } }}
            track={false}
            step={1}
            marks={marks}
            min={2011}
            max={2021}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent={"space-evenly"} spacing={2}>
        <Grid item>
          <p>Energy Consumption</p>{" "}
          <svg width={"100%"} height={"500"} ref={bar3} />
        </Grid>
        <Grid item>
          <p>Energy Transformation</p>{" "}
          <svg width={"100%"} height={"500"} ref={bar2} />
        </Grid>
        <Grid item>
          <p>Energy Production</p>{" "}
          <svg width={"100%"} height={"500"} ref={bar1} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
