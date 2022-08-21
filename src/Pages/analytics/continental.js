import {
  Button,
  Grid,
  Typography,
  Autocomplete,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LineChart from "../../charts/globalChart";
import IOSSlider from "../../components/common/slider";
import BarCharts from "../../charts/barchart";
import withSubheader from "../../layout/sub-header";
import withLayout from "../../layout";
import { Helmet } from "react-helmet";
import GroupedBarChart from "../../charts/groupedbarchart";
import {
  getGlobalData,
  getGlobalTrends,
} from "../../actions/analystics.global";
import Divider from "@mui/material/Divider";

const COLORS = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#ffff33",
  "#a65628",
  "#f781bf",
  "#999999",
];
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
  const [data, setData] = useState({
    start_year: 2000,
    end_year: 2010,
    country: "India",
    data: [],
    parameter: "Natural gas",
  });
  const [trends, setTrends] = useState([]);
  const [compare, setCompare] = useState({
    country1: "India",
    country2: "Russia",
    parameter: "Natural gas",
    start_year: "2000",
    end_year: "2010",
    data1: [],
    data2: [],
  });

  const [parameter, setParameter] = useState("Primary production");

  // const groupedbarchart = useGroupedBarChart(500, 500);
  useEffect(() => {
    const getData = async () => {
      const data = await getGlobalData({
        start_year: "2000",
        end_year: "2010",
        country: "India",
        parameter: "Natural gas",
      });
      const result = await getGlobalTrends();
      setTrends(result);
      const data2 = await getGlobalData({
        start_year: "2000",
        end_year: "2010",
        country: "Russia",
        parameter: "Natural gas",
      });

      setData((prev) => {
        return {
          ...prev,
          data: [
            { label: "Production", value: data?.[0]?.["Production"] },
            { label: "Consumption", value: data?.[0]?.["Consumption"] },
            { label: "Exports", value: data?.[0]?.["Exports"] },
            { label: "Imports", value: data?.[0]?.["Imports"] },
          ],
        };
      });
      setCompare((prev) => {
        return {
          ...prev,
          data1: [
            { label: "Production", value: data?.[0]?.["Production"] },
            { label: "Consumption", value: data?.[0]?.["Consumption"] },
            { label: "Exports", value: data?.[0]?.["Exports"] },
            { label: "Imports", value: data?.[0]?.["Imports"] },
          ],
          data2: [
            { label: "Production", value: data2?.[0]?.["Production"] },
            { label: "Consumption", value: data2?.[0]?.["Consumption"] },
            { label: "Exports", value: data2?.[0]?.["Exports"] },
            { label: "Imports", value: data2?.[0]?.["Imports"] },
          ],
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
      parameter: data.parameter,
    });

    setData((prev) => {
      return {
        ...prev,
        data: [
          { label: "Production", value: Globe?.[0]?.["Production"] },
          { label: "Consumption", value: Globe?.[0]?.["Consumption"] },
          { label: "Exports", value: Globe?.[0]?.["Exports"] },
          { label: "Imports", value: Globe?.[0]?.["Imports"] },
        ],
      };
    });
  };
  const getCompare = async () => {
    const globe = await getGlobalData({
      start_year: compare.start_year,
      end_year: compare.end_year,
      country: compare.country1,
      parameter: compare.parameter,
    });
    const globe2 = await getGlobalData({
      start_year: compare.start_year,
      end_year: compare.end_year,
      country: compare.country2,
      parameter: compare.parameter,
    });
    setCompare((prev) => {
      return {
        ...prev,
        data1: [
          { label: "Production", value: globe?.[0]?.["Production"] },
          { label: "Consumption", value: globe?.[0]?.["Consumption"] },
          { label: "Exports", value: globe?.[0]?.["Exports"] },
          { label: "Imports", value: globe?.[0]?.["Imports"] },
        ],
        data2: [
          { label: "Production", value: globe2?.[0]?.["Production"] },
          { label: "Consumption", value: globe2?.[0]?.["Consumption"] },
          { label: "Exports", value: globe2?.[0]?.["Exports"] },
          { label: "Imports", value: globe2?.[0]?.["Imports"] },
        ],
      };
    });
  };
  return (
    <>
      <Helmet>
        <title>GAIL SIH | Analytics</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Grid container padding={"2%"} sx={{ minHeight: "max-content" }}>
        <Grid id="worldmap" item xs={0} md={6} lg={6}>
          <Grid
            item
            container
            xs={12}
            style={{ border: "1px solid #404D8xF", padding: "2%" }}
          >
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                // border: "2px solid #404D8F",
                borderRadius: "50px",
                padding: "2%",
              }}
            >
              <Typography variant="h4">{data?.country}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              style={{
                // border: "2px solid #404D8xF",
                borderRadius: "50px",
              }}
            >
              <BarCharts
                data={data?.data}
                bg1="#ACB6E5"
                bg2="#74ebd5"
                g_width={window.innerWidth * 0.4}
                g_height={window.innerHeight * 0.5}
                c_id={5}
                orientation={0}
              />
            </Grid>
          </Grid>
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
              value={data.country}
              onChange={(e, value) => {
                setData({ ...data, country: value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Country"
                  placeholder="Country"
                  type="text"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              select
              label="Parameter"
              onChange={(value) => {
                setData({ ...data, parameter: value.target.value });
              }}
              value={data.parameter}
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
                      start_year: e.target.value?.[0],
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
        </Grid>
      </Grid>

      <Grid container padding={"2%"}>
        <Grid item xs={12} md={12} lg={12}>
          <Divider light />
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ padding: "2%" }}>
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
            {countries.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            select
            fullWidth
            style={{
              width: "90%",
              margin: "2%",
            }}
            label="Parameter"
            onChange={(value, values) => {
              setCompare({ ...compare, parameter: value.target.value });
            }}
            value={compare.parameter}
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
        <Grid container item xs={12}>
          <Grid item xs={10} md={10} lg={10}>
            <IOSSlider
              step={1}
              sx={{ ml: { xs: 0, md: 3 }, width: { xs: "90%", md: "80%" } }}
              marks={marks}
              value={[compare.start_year, compare.end_year]}
              min={1990}
              max={2025}
              onChange={(e) => {
                setCompare((prev) => {
                  return {
                    ...prev,
                    start_year: e.target.value?.[0],
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

        <GroupedBarChart
          data={[
            ...compare.data1.map((obj) => {
              return {
                name: obj.label,
                [compare.country1]: obj.value,
                [compare.country2]: compare.data2.find(
                  (item) => item.label === obj.label
                ).value,
              };
            }),
          ]}
          countries={[compare.country1, compare.country2]}
        />
      </Grid>
    </>
  );
};

export default withLayout(withSubheader(Analytics));
