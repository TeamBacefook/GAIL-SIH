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
  Input,
  Typography,
} from "@mui/material";
import IOSSlider from "../../components/common/slider";
import withSubheader from "../../layout/sub-header";
import useGroupedBarChart from "../../charts/groupedbarchart";
// import WorldMap from "../../components/analytics/globe";
// import dynamic from "next/dynamic";

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
  // const WorldMap = dynamic(() => import("../../components/analytics/globe"));
  const lineChart = useGroupedBarChart(500, 500);
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}></Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid item xs={12} md={12} lg={12}></Grid>
        <Grid item xs={12} md={12} lg={12}></Grid>
        <Grid item xs={12} md={12} lg={12}></Grid>
        <Grid item xs={12} md={12} lg={12}>
          <svg width="100%" height={"500"} ref={lineChart}></svg>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withSubheader(Analytics);
