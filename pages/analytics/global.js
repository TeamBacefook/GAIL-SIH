import {
  Box,
  Button,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import IOSSlider from "../../components/common/slider";
import useBarChart from "../../charts/barchart";
import withSubheader from "../../layout/sub-header";
import dynamic from "next/dynamic";
import { getGlobalData } from "../../actions/analystics.global";

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
  const { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } =
    dynamic(() => import("recharts"));

  const [data, setData] = useState({
    start_year: "2000",
    end_year: "2010",
    country: "India",
    data: [],
  });
  const [compare, setCompare] = useState({
    country1: "India",
    country2: "Austria",
    start_year: "2000",
    end_year: "2010",
    data1: [],
    data2: [],
  });
  const lineChart = useBarChart(500, 400, data);
  // const groupedbarchart = useGroupedBarChart(500, 500);
  useEffect(() => {
    const getData = async () => {
      const data = await getGlobalData({
        start_year: "2000",
        end_year: "2010",
        country: "India",
      });
      const data2 = await getGlobalData({
        start_year: "2000",
        end_year: "2010",
        country: "Austria",
      });
      setData((prev) => {
        return { ...prev, data: data };
      });
      setCompare((prev) => {
        return {
          ...prev,
          data1: data,
          data2: data2,
        };
      });
    };
    getData();
  }, []);

  const getData = async () => {
    const Globe = await getGlobalData({
      start_year: data.start_year,
      end_year: data.end_year,
      country: data.country,
    });
    setData((prev) => {
      return { ...prev, data: Globe };
    });
  };

  const getCompare = async () => {
    const globe = await getGlobalData({
      start_year: compare.start_year,
      end_year: compare.end_year,
      country: compare.country1,
    });
    const globe2 = await getGlobalData({
      start_year: compare.start_year,
      end_year: compare.end_year,
      country: compare.country2,
    });
    setCompare((prev) => {
      return {
        ...prev,
        data1: globe,
        data2: globe2,
      };
    });
  };
  console.log(compare);
  return (
    <>
      <Head>
        <title>GAIL SIH | Analytics</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container padding={"2%"} sx={{ minHeight: "max-content" }}>
        <Grid id="worldmap" item xs={0} md={6} lg={6}>
          <WorldMap />
        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={1}
          md={6}
          lg={6}
          justifyContent="center"
        >
          <Grid item xs={12} md={12} lg={12}>
            <Autocomplete
              style={{ width: "100%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={countries}
              getOptionLabel={(option) => option}
              onChange={(e, value) => {
                setData({ ...data, country: value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Commodity"
                  placeholder="Commodity"
                  type="text"
                />
              )}
            />
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
                width: "100%",
              }}
              helperText="Please select your parameter"
              variant="outlined"
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
          <Grid container item xs={12} md={12} lg={12}>
            <Grid item xs={10} md={10} lg={10}>
              <IOSSlider
                step={1}
                sx={{ width: { xs: "90%", md: "80%" } }}
                marks={marks}
                value={[data.start_year, data.end_year]}
                min={1990}
                max={2025}
                onChange={(e) => {
                  setData((prev) => {
                    return {
                      ...prev,
                      start_year: e.target.value[0],
                      end_year: e.target.value[1],
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={2} md={2} lg={2} style={{ textAlign: "right" }}>
              <Button
                onClick={getData}
                sx={{
                  background:
                    "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
                  color: "white",
                  borderRadius: "11px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Get data
              </Button>
            </Grid>
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
            <Typography variant="h4">{data.country}:</Typography>
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
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
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
            value={compare.country1}
            onChange={(e) => {
              setCompare((prev) => {
                return { ...prev, country1: e.target.value };
              });
            }}
            style={{
              width: "90%",
              margin: "2%",
              marginBottom: "4%",
            }}
            helperText="Please select country"
            variant="outlined"
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
            value={compare.country2}
            onChange={(e) => {
              setCompare((prev) => {
                return { ...prev, country2: e.target.value };
              });
            }}
            style={{
              width: "90%",
              margin: "2%",
            }}
            helperText="Please select country"
            variant="outlined"
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={10} md={10} lg={10}>
            <IOSSlider
              step={1}
              sx={{ width: { xs: "90%", md: "50%" } }}
              marks={marks}
              value={[compare.start_year, compare.end_year]}
              min={1990}
              max={2025}
              onChange={(e) => {
                setCompare((prev) => {
                  return {
                    ...prev,
                    start_year: e.target.value[0],
                    end_year: e.target.value[1],
                  };
                });
              }}
            />
          </Grid>
          <Grid item xs={2} md={2} lg={2}>
            <Button
              onClick={getCompare}
              sx={{
                background:
                  "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
                color: "white",
                borderRadius: "11px",
                textTransform: "none",
                width: "70%",
              }}
            >
              Compare
            </Button>
          </Grid>
        </Grid>

        {/* <svg width="100%" height={"500"} ref={groupedbarchart}></svg> */}
      </Grid>
    </>
  );
};

export default withSubheader(Analytics);
