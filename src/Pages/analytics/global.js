import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Box, Divider, Grid, Typography, TextField } from "@mui/material";
import BarCharts from "../../charts/barchart";
import IOSSlider from "../../components/common/slider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import LineChart from "../../charts/globalChart";
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

const Analytics = () => {
  const [commo, setCommo] = useState(["Natural Gas"]);
  const [consumption, setconsumptiondata] = useState({ data: [], max: 0 }); //parameter = "Final consumption"
  const [productiondata, setproductiondata] = useState(null); //parameter = 'Primary production'
  const [transformationdata, settransformationdata] = useState(null); //parameter = "Transformation"
  const [trends, setTrends] = useState([]);
  const [parameter, setParameter] = useState("Primary production");

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
        if (item.value >= 0) return item;
        return { label: item.label, value: 0 };
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
  return (
    <Box sx={{ px: { xs: 1, md: 8 } }}>
      {" "}
      <Helmet>
        <title>PEGASUS | Analytics-Continental</title>
        <meta name="description" content="Analytics page for PEGASUS" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
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
          </TextField>
        </Grid>
        {[...trends?.filter((item) => item.Type === parameter)]?.map(
          (obj, index) => {
            const newData = JSON.parse(obj.data);

            return (
              <Grid item key={index} xs={12} md={5.8} sx={{ m: 1 }}>
                <Typography sx={{ my: 1 }}>{obj.commodity}</Typography>
                <LineChart
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
                <Grid item container xs={12} alignItems="center">
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
          }
        )}
      </Grid>
      <Divider />
      <Grid item xs={12} sx={{ p: "2%" }}>
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
      <Divider sx={{ my: 4 }} />
      <Grid sx={{ py: 4 }} item container xs={12}>
        <Grid item xs={12} style={{ marginBottom: "2%" }}>
          <Typography color="#00116A" fontSize={35}>
            Energy Balance Sheet
          </Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12} md={12}>
          <Grid item xs={12}>
            <IOSSlider
              sx={{ width: { xs: "90%", md: "100%" } }}
              track={false}
              step={1}
              onChange={(e) => {
                setEnergyYear(e.target.value);
              }}
              value={energyYear}
              marks={[
                { label: 1990, value: 1990 },
                { label: 1991, value: 1991 },
                { label: 1992, value: 1992 },
                { label: 1993, value: 1993 },
                { label: 1994, value: 1994 },
                { label: 1995, value: 1995 },
                { label: 1996, value: 1996 },
                { label: 1997, value: 1997 },
                { label: 1998, value: 1998 },
                { label: 1999, value: 1999 },
                { label: 2000, value: 2000 },
                { label: 2001, value: 2001 },
                { label: 2002, value: 2002 },
                { label: 2003, value: 2003 },
                { label: 2004, value: 2004 },
                { label: 2005, value: 2005 },
                { label: 2006, value: 2006 },
                { label: 2007, value: 2007 },
                { label: 2008, value: 2008 },
                { label: 2009, value: 2009 },
                { label: 2010, value: 2010 },
                { label: 2011, value: 2011 },
                { label: 2012, value: 2012 },
                { label: 2013, value: 2013 },
                { label: 2014, value: 2014 },
                { label: 2015, value: 2015 },
                { label: 2016, value: 2016 },
                { label: 2017, value: 2017 },
                { label: 2018, value: 2018 },
                { label: 2019, value: 2019 },
              ]}
              min={1990}
              max={2019}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent={"space-evenly"} spacing={2}>
        <Grid item sx={12} md={12}>
          <p>Energy Production</p>{" "}
          <BarCharts
            data={productiondata}
            bg1="#00b09b"
            bg2="#96c93d"
            orientation={0}
            g_width={window.innerWidth * 0.9}
            g_height={window.innerHeight * 0.3}
            c_id={3}
            unit={"Terajoules"}
          />
        </Grid>
        <Grid item sx={12} md={12}>
          <p>Energy Transformation</p>
          <BarCharts
            data={transformationdata}
            bg1="#ACB6E5"
            orientation={0}
            bg2="#74ebd5"
            g_width={window.innerWidth * 0.9}
            g_height={window.innerHeight * 0.3}
            c_id={2}
            unit={"Terajoules"}
          />
        </Grid>
        <Grid item sx={12} md={12}>
          <p>Energy Consumption</p>
          <BarCharts
            data={consumption}
            bg1="#fc4a1a"
            bg2="#f7b733"
            g_width={window.innerWidth * 0.9}
            g_height={window.innerHeight * 0.3}
            orientation={0}
            c_id={1}
            unit={"Terajoules"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLayout(withSubheader(Analytics));
