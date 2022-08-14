import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import IOSSlider from "../../components/common/slider";
import useBarChart from "../../charts/barchart";
import withSubheader from "../../layout/sub-header";
import dynamic from "next/dynamic";
import { getCountriesData } from "../../actions/analystics.global";
import useGroupedBarChart from "../../charts/groupedbarchart";

const marks = [
  { label: 1990, value: 1990 },
  { label: 1995, value: 1995 },
  { label: 2000, value: 2000 },
  { label: 2005, value: 2005 },
  { label: 2010, value: 2010 },
  { label: 2015, value: 2015 },
  { label: 2020, value: 2020 },
  { label: 2025, value: 2025 },
];
const countries = [
  "Albania",
  "Armenia",
  "Australia",
  "Austria",
  "Belgium",
  "Bolivia",
  "Bulgaria",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Czechia",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Guyana",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Japan",
  "North Korea",
  "South Korea",
  "Kosovo",
  "Kyrgyzstan",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Mexico",
  "Netherlands",
  "Macedonia",
  "Peru",
  "Poland",
  "Portugal",
  "Republic of Moldova",
  "Romania",
  "Russia",
  "Serbia",
  "Slovakia",
  "South Africa",
  "Spain",
  "Switzerland",
  "Tajikistan",
  "Thailand",
  "Ukraine",
  "United Arab Emirates",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Zimbabwe",
  "Bangladesh",
  "Brunei Darussalam",
  "Cyprus",
  "Fiji",
  "Greece",
  "Jordan",
  "Kazakhstan",
  "Laos",
  "Montenegro",
  "New Zealand",
  "Slovenia",
  "Sweden",
  "Turkey",
  "Afghanistan",
  "Algeria",
  "Angola",
  "Argentina",
  "Azerbaijan",
  "Belarus",
  "Belize",
  "Benin",
  "Bosnia and Herzegovina",
  "Brazil",
  "Cameroon",
  "Chad",
  "China",
  "Congo",
  "Ivory Coast",
  "Democratic Republic of the Congo",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Ethiopia",
  "Gabon",
  "Ghana",
  "Guatemala",
  "Honduras",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Israel",
  "Jamaica",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Madagascar",
  "Malaysia",
  "Mauritania",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Philippines",
  "Qatar",
  "Saudi Arabia",
  "Senegal",
  "Sierra Leone",
  "Somalia",
  "South Sudan",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Syrian Arab Republic",
  "Timor-Leste",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkmenistan",
  "United Kingdom",
  "Tanzania",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Botswana",
  "Estonia",
  "Falkland Islands",
  "Guinea",
  "Puerto Rico",
  "Rwanda",
  "Togo",
];
const Analytics = () => {
  const WorldMap = dynamic(() => import("../../components/analytics/globe"));
  const [data, setdata] = useState({
    start_year: "",
    end_year: "",
    country: "",
  });
  const lineChart = useBarChart(500, 400);
  const groupedbarchart = useGroupedBarChart(500, 500);
  useEffect(() => {
    const getData = async () => {
      const data12 = await getCountriesData({
        start_year: "Dwa",
        end_year: "wasd",
        country: "Alabania",
      });
      setdata(data12);
    };
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>GAIL SIH | Analytics</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container padding={"2%"}>
        <Grid id="worldmap" item xs={0} md={6} lg={6}>
          <WorldMap />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              id="standard-select-currency"
              select
              label="Country"
              value={"currency"}
              onChange={(value) => setdata({ ...data, country: value })}
              style={{
                width: "90%",
              }}
              helperText="Please select country"
              variant="standard"
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              select
              label="Parameter"
              value={"currency"}
              onChange={(value) => {
                console.log(value);
              }}
              style={{
                width: "90%",
              }}
              helperText="Please select your parameter"
              variant="standard"
            >
              {[
                { value: "Natural gas", id: "NG" },
                { value: "Crude oil", id: "CO" },
                { value: "Anthracite", id: "An" },
                { value: "Lignite", id: "LI" },
              ].map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <IOSSlider
              step={1}
              sx={{ width: { xs: "90%", md: "50%" } }}
              marks={marks}
              defaultValue={[2010, 2022]}
              min={1990}
              max={2025}
            />
            <Button> Get data</Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            style={{
              border: "2px solid #404D8F",
              borderRadius: "50px",
              padding: "5%",
            }}
          >
            <Typography variant="h4">Russia:</Typography>
            <Typography>dwa</Typography>
            <svg width="100%" height={"500"} ref={lineChart}></svg>
          </Grid>
        </Grid>
      </Grid>
      <Grid container padding={"2%"}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h4">Compare Nations:</Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TextField
            id="standard-select-currency"
            select
            label="Country"
            value={"currency"}
            onChange={(value) => {
              console.log(value);
            }}
            style={{
              width: "90%",
              margin: "2%",
            }}
            helperText="Please select country"
            variant="standard"
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            id="standard-select-currency"
            select
            label="Country"
            value={"currency"}
            onChange={(value) => {
              console.log(value);
            }}
            style={{
              width: "90%",
              margin: "2%",
            }}
            helperText="Please select country"
            variant="standard"
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6} lg={4} alignContent="bottom">
          <IOSSlider
            step={1}
            sx={{ width: { xs: "90%", md: "50%" } }}
            marks={marks}
            defaultValue={[2010, 2022]}
            min={1990}
            max={2025}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <svg width="100%" height={"500"} ref={groupedbarchart}></svg>
        </Grid>
      </Grid>
    </>
  );
};

export default withSubheader(Analytics);
