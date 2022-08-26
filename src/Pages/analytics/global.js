import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import {
  Box,
  Divider,
  Grid,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import BarCharts from "../../charts/barchart";
import IOSSlider from "../../components/common/slider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import CollatedLineChart from "../../charts/collated trend chart";
import LineChart from "../../charts/globalChart";
import World from "../Home New copy";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { baseurl } from "../../api/url";
import Select from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import { getcontinentaldata } from "../../api/analytics.continental";
import { getGlobalTrends } from "../../actions/analystics.global";
import withLayout from "../../layout";
import withSubheader from "../../layout/sub-header";
import TreeMap from "../../charts/treemap";

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
const countries = [
  { str: "Albania", val: "Albania" },
  { str: "Armenia", val: "Armenia" },
  { str: "Australia", val: "Australia" },
  { str: "Austria", val: "Austria" },
  { str: "Belgium", val: "Belgium" },
  { str: "Bolivia", val: "Bolivia" },
  { str: "Bulgaria", val: "Bulgaria" },
  { str: "Canada", val: "Canada" },
  { str: "Chile", val: "Chile" },
  { str: "Colombia", val: "Colombia" },
  { str: "Costa Rica", val: "Costa Rica" },
  { str: "Croatia", val: "Croatia" },
  { str: "Cuba", val: "Cuba" },
  { str: "Czechia", val: "Czechia" },
  { str: "Finland", val: "Finland" },
  { str: "France", val: "France" },
  { str: "Georgia", val: "Georgia" },
  { str: "Germany", val: "Germany" },
  { str: "Guyana", val: "Guyana" },
  { str: "Hungary", val: "Hungary" },
  { str: "Iceland", val: "Iceland" },
  { str: "Ireland", val: "Ireland" },
  { str: "Italy", val: "Italy" },
  { str: "Japan", val: "Japan" },
  { str: "North Korea", val: "North Korea" },
  { str: "South Korea", val: "South Korea" },
  { str: "Kosovo", val: "Kosovo" },
  { str: "Kyrgyzstan", val: "Kyrgyzstan" },
  { str: "Latvia", val: "Latvia" },
  { str: "Lithuania", val: "Lithuania" },
  { str: "Luxembourg", val: "Luxembourg" },
  { str: "Mexico", val: "Mexico" },
  { str: "Netherlands", val: "Netherlands" },
  { str: "Macedonia", val: "Macedonia" },
  { str: "Peru", val: "Peru" },
  { str: "Poland", val: "Poland" },
  { str: "Portugal", val: "Portugal" },
  { str: "Republic of Moldova", val: "Republic of Moldova" },
  { str: "Romania", val: "Romania" },
  { str: "Russia", val: "Russia" },
  { str: "Serbia", val: "Serbia" },
  { str: "Slovakia", val: "Slovakia" },
  { str: "South Africa", val: "South Africa" },
  { str: "Spain", val: "Spain" },
  { str: "Switzerland", val: "Switzerland" },
  { str: "Tajikistan", val: "Tajikistan" },
  { str: "Thailand", val: "Thailand" },
  { str: "Ukraine", val: "Ukraine" },
  { str: "United Arab Emirates", val: "United Arab Emirates" },
  { str: "United States of America", val: "United States" },
  { str: "Uruguay", val: "Uruguay" },
  { str: "Uzbekistan", val: "Uzbekistan" },
  { str: "Zimbabwe", val: "Zimbabwe" },
  { str: "Bangladesh", val: "Bangladesh" },
  { str: "Brunei Darussalam", val: "Brunei Darussalam" },
  { str: "Cyprus", val: "Cyprus" },
  { str: "Fiji", val: "Fiji" },
  { str: "Greece", val: "Greece" },
  { str: "Jordan", val: "Jordan" },
  { str: "Kazakhstan", val: "Kazakhstan" },
  { str: "Laos", val: "Laos" },
  { str: "Montenegro", val: "Montenegro" },
  { str: "New Zealand", val: "New Zealand" },
  { str: "Slovenia", val: "Slovenia" },
  { str: "Sweden", val: "Sweden" },
  { str: "Turkey", val: "Turkey" },
  { str: "Afghanistan", val: "Afghanistan" },
  { str: "Algeria", val: "Algeria" },
  { str: "Angola", val: "Angola" },
  { str: "Argentina", val: "Argentina" },
  { str: "Azerbaijan", val: "Azerbaijan" },
  { str: "Belarus", val: "Belarus" },
  { str: "Belize", val: "Belize" },
  { str: "Benin", val: "Benin" },
  { str: "Bosnia and Herzegovina", val: "Bosnia and Herzegovina" },
  { str: "Brazil", val: "Brazil" },
  { str: "Cameroon", val: "Cameroon" },
  { str: "Chad", val: "Chad" },
  { str: "China", val: "China" },
  { str: "Congo", val: "Congo" },
  { str: "Ivory Coast", val: "Ivory Coast" },
  {
    str: "Democratic Republic of the Congo",
    val: "Democratic Republic of the Congo",
  },
  { str: "Denmark", val: "Denmark" },
  { str: "Dominican Republic", val: "Dominican Republic" },
  { str: "Ecuador", val: "Ecuador" },
  { str: "Egypt", val: "Egypt" },
  { str: "El Salvador", val: "El Salvador" },
  { str: "Equatorial Guinea", val: "Equatorial Guinea" },
  { str: "Eritrea", val: "Eritrea" },
  { str: "Ethiopia", val: "Ethiopia" },
  { str: "Gabon", val: "Gabon" },
  { str: "Ghana", val: "Ghana" },
  { str: "Guatemala", val: "Guatemala" },
  { str: "Honduras", val: "Honduras" },
  { str: "India", val: "India" },
  { str: "Indonesia", val: "Indonesia" },
  { str: "Iran", val: "Iran" },
  { str: "Iraq", val: "Iraq" },
  { str: "Israel", val: "Israel" },
  { str: "Jamaica", val: "Jamaica" },
  { str: "Kenya", val: "Kenya" },
  { str: "Kuwait", val: "Kuwait" },
  { str: "Lebanon", val: "Lebanon" },
  { str: "Libya", val: "Libya" },
  { str: "Madagascar", val: "Madagascar" },
  { str: "Malaysia", val: "Malaysia" },
  { str: "Mauritania", val: "Mauritania" },
  { str: "Mongolia", val: "Mongolia" },
  { str: "Morocco", val: "Morocco" },
  { str: "Mozambique", val: "Mozambique" },
  { str: "Myanmar", val: "Myanmar" },
  { str: "Nicaragua", val: "Nicaragua" },
  { str: "Niger", val: "Niger" },
  { str: "Nigeria", val: "Nigeria" },
  { str: "Norway", val: "Norway" },
  { str: "Oman", val: "Oman" },
  { str: "Pakistan", val: "Pakistan" },
  { str: "Panama", val: "Panama" },
  { str: "Papua New Guinea", val: "Papua New Guinea" },
  { str: "Paraguay", val: "Paraguay" },
  { str: "Philippines", val: "Philippines" },
  { str: "Qatar", val: "Qatar" },
  { str: "Saudi Arabia", val: "Saudi Arabia" },
  { str: "Senegal", val: "Senegal" },
  { str: "Sierra Leone", val: "Sierra Leone" },
  { str: "Somalia", val: "Somalia" },
  { str: "South Sudan", val: "South Sudan" },
  { str: "Sri Lanka", val: "Sri Lanka" },
  { str: "Sudan", val: "Sudan" },
  { str: "Suriname", val: "Suriname" },
  { str: "Syrian Arab Republic", val: "Syrian Arab Republic" },
  { str: "Timor-Leste", val: "Timor-Leste" },
  { str: "Trinidad and Tobago", val: "Trinidad and Tobago" },
  { str: "Tunisia", val: "Tunisia" },
  { str: "Turkmenistan", val: "Turkmenistan" },
  { str: "United Kingdom", val: "United Kingdom" },
  { str: "Tanzania", val: "Tanzania" },
  { str: "Venezuela", val: "Venezuela" },
  { str: "Vietnam", val: "Vietnam" },
  { str: "Yemen", val: "Yemen" },
  { str: "Zambia", val: "Zambia" },
  { str: "Botswana", val: "Botswana" },
  { str: "Estonia", val: "Estonia" },
  { str: "Falkland Islands", val: "Falkland Islands" },
  { str: "Guinea", val: "Guinea" },
  { str: "Puerto Rico", val: "Puerto Rico" },
  { str: "Rwanda", val: "Rwanda" },
  { str: "Togo", val: "Togo" },
];

const Analytics = () => {
  const [commo, setCommo] = useState(["Natural Gas"]);
  const [consumption, setconsumptiondata] = useState({ data: [], max: 0 }); //parameter = "Final consumption"
  const [productiondata, setproductiondata] = useState(null); //parameter = 'Primary production'
  const [transformationdata, settransformationdata] = useState(null); //parameter = "Transformation"
  const [trends, setTrends] = useState([]);
  const [parameter, setParameter] = useState("all");
  const [collatedTrend, setCollatedTrend] = useState([]);
  const [tabledata, settabledata] = useState(null);

  const [energyYear, setEnergyYear] = useState(2008);
  const [filters, setFilters] = useState([2015, 2020]);
  const [tree, setTree] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommo(
      // On autofill we get a stringified value.
      typeof value === "string" ? [value.split] : value
    );
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getGlobalTrends();
      setTrends(result);
    };
    getData();
    axios
      .post(baseurl + "/data/continents/treemap", {
        startyear: filters[0],
        endyear: filters[1],
        commodity: commo,
      })
      .then((res) => {
        setTree([
          ...res.data.map((obj) => {
            return { ...obj, data: JSON.parse(obj.data) };
          }),
        ]);
      })
      .catch((error) => {});
  }, [filters, commo, setTree]);

  useEffect(() => {
    const getConsumption = async () => {
      const { data } = await getcontinentaldata(
        `?year=${energyYear}&type=Final%20consumption`
      );
      setconsumptiondata(data);
    };
    const getTransformation = async () => {
      const { data } = await getcontinentaldata(
        `?year=${energyYear}&type=Transformation`
      );
      let new_data = data.map((item) => {
        return item;
      });
      settransformationdata(new_data);
    };

    const getProduction = async () => {
      const { data } = await getcontinentaldata(
        `?year=${energyYear}&type=Primary%20production`
      );
      setproductiondata(data);
    };
    getConsumption();
    getTransformation();
    getProduction();
  }, [
    energyYear,
    setconsumptiondata,
    settransformationdata,
    setproductiondata,
  ]);

  useEffect(() => {
    // setCollatedTrend(data);
    let filters = [
      "Biofuels and waste",
      "Coal",
      "Electricity and heat",
      "Natural Gas",
      "Oil",
    ];
    if (trends.length > 0) {
      let collated = filters.map((obj) => {
        let x = trends.filter((item) => item.commodity === obj);
        let consumption = x?.find((item) => item.Type === "Final consumption");
        let production = x?.find((item) => item.Type === "Primary production");
        let transformation = x?.find((item) => item.Type === "Transformation");

        let consumptionData = JSON.parse(consumption?.data);
        let productionData = JSON.parse(production?.data);
        let transformationData = JSON.parse(transformation?.data);

        console.log(consumption);
        let y = consumptionData?.map((item, index) => {
          return {
            year: item.Year,
            Consumption: item.value,
            Production: productionData[index].value,
            Transformation: transformationData[index].value,
          };
        });

        return { commodity: obj, data: y };
      });
      setCollatedTrend(collated);
    }
  }, [trends, setCollatedTrend]);
  console.log(collatedTrend);
  return (
    <Box sx={{ px: { xs: 1, md: 8 } }}>
      {" "}
      <Helmet>
        <title>PEGASUS | Analytics-Continental</title>
        <meta name="description" content="Analytics page for PEGASUS" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <World />
      <Grid item xs={12} sx={{ mt: 8, p: "2%" }}>
        <Typography color="#00116A" fontSize={35}>
          Global Trends for Imports & Exports
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <FormControl sx={{ m: 1, width: "40%" }}>
          <InputLabel id="demo-multiple-chip-label">Commodities</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={commo}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                inputProps={{ style: { borderRadius: "1em" } }}
                label="Chip"
              />
            }
            renderValue={(x) => {
              return (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {x.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              );
            }}
          >
            {[
              "Biofuels and waste",
              "Oil",
              "Electricity and heat",
              "Natural Gas",
              "Coal",
            ].map((obj) => {
              return (
                <MenuItem value={obj} key={obj}>
                  {obj}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container justifyContent="center" sx={{ mt: 4 }} xs={12}>
        <IOSSlider
          step={1}
          sx={{ width: { xs: "90%", md: "50%" } }}
          marks={marks}
          onChange={(e) => setFilters(e.target.value)}
          defaultValue={filters}
          min={2011}
          max={2021}
        />
      </Grid>
      <Grid container item xs={12}>
        {tree?.length !== 0 &&
          commo.map((value, index) => {
            const exportsData = tree?.find((obj) => {
              return obj.commodity === value && obj.type === "Exports";
            })?.data;
            const importsData = tree?.find((obj) => {
              return obj.commodity === value && obj.type === "Imports";
            })?.data;
            return (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                item
                spacing={3}
                xs={12}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", color: "rgb(2,36,96)" }}
                  >
                    {value}
                  </Typography>
                </Grid>
                {exportsData && (
                  <Grid item xs={12} md={5} sx={{ margin: "2%" }}>
                    <Typography
                      variant="h5"
                      sx={{ textAlign: "center", color: "rgb(2,36,96)" }}
                    >
                      Exports
                    </Typography>
                    <TreeMap
                      g_width={0.4 * window.innerWidth}
                      g_height={0.4 * window.innerHeight}
                      data={exportsData}
                    />
                  </Grid>
                )}
                {importsData && (
                  <Grid item xs={12} md={5} sx={{ margin: "2%" }}>
                    <Typography
                      variant="h5"
                      sx={{ textAlign: "center", color: "rgb(2,36,96)" }}
                    >
                      Imports
                    </Typography>
                    <TreeMap
                      g_width={0.4 * window.innerWidth}
                      g_height={0.4 * window.innerHeight}
                      data={importsData}
                    />
                  </Grid>
                )}{" "}
              </Grid>
            );
          })}
      </Grid>
      <Divider />
      <Grid
        item
        sx={{ px: 4, py: 2 }}
        alignItems="center"
        container
        spacing={3}
        xs={12}
      >
        <Grid item xs={12} sx={{ p: "2%" }}>
          <Typography color="#00116A" fontSize={35}>
            Global Trends
          </Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12} sx={{ p: "2%" }}>
          <TextField
            select
            onChange={(e) => setParameter(e.target.value)}
            value={parameter}
            variant="outlined"
            label="Parameter"
            sx={{ width: { xs: "100%", md: "50%" } }}
          >
            <MenuItem value="Primary production">Production</MenuItem>
            <MenuItem value="Final consumption">Consumption</MenuItem>
            <MenuItem value="Transformation">Transformation</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </TextField>
        </Grid>
        {parameter !== "all" &&
          [
            ...trends?.filter((item) => {
              return item.Type === parameter;
            }),
          ]?.map((obj, index) => {
            const newData = JSON.parse(obj.data);
            return (
              <Grid item key={index} xs={12} md={5.8} sx={{ m: 1 }}>
                <Typography sx={{ my: 1 }}>{obj.commodity}</Typography>
                <LineChart
                  option={parameter}
                  width={window.innerWidth / 2.6}
                  height={window.innerHeight / 2}
                  data={newData}
                  COLOR={"#e41a1c"}
                  unit={"Terajoules"}
                />
                <Typography sx={{ my: 1 }}>
                  {parameter === "Primary production"
                    ? "Production"
                    : parameter === "Final consumption"
                    ? "Consumption"
                    : "Transformation"}
                  :
                </Typography>
                <Grid
                  item
                  display={parameter === "all" && "none"}
                  container
                  xs={12}
                  alignItems="center"
                >
                  <Grid
                    item
                    sx={{
                      backgroundColor: obj.yrchange > 0 ? "#D5FFCD" : "#FFC1C1",
                      textAlign: "center",
                      p: 1,
                      borderRadius: 10,
                      m: 0.5,
                    }}
                    xs={12}
                    md={5.5}
                  >
                    <Typography>
                      {`${obj.yrchange > 0 ? "Increased" : "Decreased"}`} by{" "}
                      {Math.abs(Number(obj.yrchange).toPrecision(3))}% since
                      last year
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5.5}
                    sx={{
                      backgroundColor:
                        obj.yr3change > 0 ? "#D5FFCD" : "#FFC1C1",
                      textAlign: "center",
                      p: 1,
                      borderRadius: 10,
                      m: 0.5,
                    }}
                  >
                    <Typography>
                      {`${obj.yr3change > 0 ? "Increased" : "Decreased"}`} by{" "}
                      {Math.abs(Number(obj.yr3change).toPrecision(3))}% since
                      last 3 years
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      backgroundColor:
                        obj.yr5change > 0 ? "#D5FFCD" : "#FFC1C1",
                      textAlign: "center",
                      p: 1,
                      borderRadius: 10,
                      m: 0.5,
                    }}
                    item
                    xs={12}
                    md={5.5}
                  >
                    <Typography>
                      {`${obj.yr5change > 0 ? "Increased" : "Decreased"}`} by{" "}
                      {Math.abs(Number(obj.yr5change).toPrecision(3))}% since
                      last 5 years
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}

        {parameter === "all" &&
          collatedTrend.map((obj, index) => {
            return (
              <Grid item key={index} xs={12} md={5.8} sx={{ m: 1 }}>
                <Typography sx={{ my: 1 }}>{obj.commodity}</Typography>
                <CollatedLineChart
                  width={window.innerWidth / 2.6}
                  height={window.innerHeight / 2}
                  data={obj.data}
                  display={["year"]}
                  unit={"Terajoules"}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default withLayout(withSubheader(Analytics));
