import React, { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import withSubheader from "../../layout/sub-header";
import withLayout from "../../layout";
import IOSSlider from "../../components/common/slider";
import IndiaMap from "../../components/analytics/indiamap";
import axios from "axios";
import { Helmet } from "react-helmet";
import { baseurl } from "../../api/url";
import Donut from "../../charts/donut";
import LineChart from "../../charts/linechart";
import { getNaturalGas } from "../../actions/analystics.india.js";
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

const states = [
  "CHANDIGARH",
  "DELHI",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JAMMU & KASHMIR",
  "LADAKH",
  "PUNJAB",
  "RAJASTHAN",
  "UTTAR PRADESH",
  "UTTARAKHAND",
  "ARUNACHAL PRADESH",
  "ASSAM",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "SIKKIM",
  "TRIPURA",
  "ANDAMAN & NICOBAR",
  "BIHAR",
  "JHARKHAND",
  "ODISHA",
  "WEST BENGAL",
  "CHHATTISGARH",
  "DADRA & NAGAR HAVELI AND DAMAN & DIU",
  "GOA",
  "GUJARAT",
  "MADHYA PRADESH",
  "MAHARASHTRA",
  "ANDHRA PRADESH",
  "KARNATAKA",
  "KERALA",
  "LAKSHADWEEP",
  "PUDUCHERRY",
  "TAMIL NADU",
  "TELANGANA",
];

const months = [
  { month: "January", index: 1 },
  { month: "February", index: 2 },
  { month: "March", index: 3 },
  { month: "April", index: 4 },
  { month: "May", index: 5 },
  { month: "June", index: 6 },
  { month: "July", index: 7 },
  { month: "August", index: 8 },
  { month: "September", index: 9 },
  { month: "October", index: 10 },
  { month: " November", index: 11 },
  { month: "December", index: 12 },
];

const years = [
  { str: "2011", val: 2011 },
  { str: "2012", val: 2012 },
  { str: "2013", val: 2013 },
  { str: "2014", val: 2014 },
  { str: "2015", val: 2015 },
  { str: "2016", val: 2016 },
  { str: "2017", val: 2017 },
  { str: "2018", val: 2018 },
  { str: "2019", val: 2019 },
  { str: "2020", val: 2020 },
  { str: "2021", val: 2021 },
  { str: "2022", val: 2022 },
];

const Analytics = () => {
  const [monthlyFilter, setMonthly] = useState({
    parameter: "Consumption",
    start_month: new Date().getMonth() + 1,
    start_year: 2011,
    end_month: new Date().getMonth() + 2,
    end_year: 2018,
  });
  const [coropleth, setCoropleth] = useState({
    state: "DELHI",
    start: 2015,
    end: 2020,
  });
  const [petroleumRange, setPetroleumRange] = useState([2015, 2019]);
  const [petroleum, setPetroleum] = useState([]);
  const [lineChart, setLineChart] = useState([]);
  const getData = useCallback(async () => {
    if (
      monthlyFilter.end_month !== undefined &&
      monthlyFilter.end_year !== undefined &&
      monthlyFilter.start_month !== undefined &&
      monthlyFilter.start_year !== undefined
    ) {
      const data = await getNaturalGas(monthlyFilter);
      setLineChart(data);
    }
  }, [monthlyFilter]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    axios
      .get(
        baseurl +
          `/data/petroleum/sector?startyear=${petroleumRange[0]}&endyear=${petroleumRange[1]}`
      )
      .then((res) => {
        setPetroleum(res.data);
      });
  }, [petroleumRange, setPetroleum]);
  return (
    <Box sx={{ my: { xs: 1, md: 10 }, px: { xs: 2, md: 8 } }}>
      <Helmet>
        <title>GAIL SIH | Analytics-India</title>
        <meta name="description" content="Analytics page for GAIL-SIH" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Grid sx={{ mb: 4 }} item container xs={12}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ px: 4, py: 4 }}
          style={{ border: "1px solid A3A3A3" }}
        >
          <IndiaMap
            onChange={(state) =>
              setCoropleth((prev) => ({ ...prev, state: state }))
            }
          />
        </Grid>
        <Grid container spacing={2} justifyContent="center" item xs={12} md={6}>
          <Grid container justifyContent="center" item xs={12}>
            <Autocomplete
              style={{ width: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              onChange={(x, e) =>
                setCoropleth((state) => ({ ...state, state: e }))
              }
              value={coropleth.state}
              options={states}
              getOptionLabel={(option) => option}
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
          <Grid item container justifyContent={"center"} xs={12}>
            <IOSSlider
              step={1}
              sx={{ width: { xs: "95%", md: "90%", m: "auto" } }}
              marks={marks}
              onChange={(e) =>
                setCoropleth((state) => ({
                  ...state,
                  start: e.target.value[0],
                  end: e.target.value[1],
                }))
              }
              defaultValue={[coropleth.start, coropleth.end]}
              min={2011}
              max={2020}
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
            Sectorwise Petroleum Consumption
          </Typography>
        </Grid>
        <Grid container alignItems="flex-start" item xs={12} md={6}>
          <Grid
            sx={{ py: { md: 8 } }}
            justifyContent="center"
            container
            item
            xs={12}
          >
            <IOSSlider
              step={1}
              sx={{ width: { xs: "95%", md: "90%", m: "auto" } }}
              marks={marks}
              defaultValue={[2016, 2020]}
              onChange={(e) => setPetroleumRange(e.target.value)}
              min={2011}
              max={2021}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} container alignItems="center">
          <Donut
            g_width={window.innerWidth * 0.7}
            g_height={window.innerHeight * 0.7}
            data={petroleum}
          />
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
        <Grid item xs={12} md={5}>
          <Grid sx={{ my: 2 }} item container spacing={2} xs={12}>
            <Typography fontSize={30} color="#0A2540">
              Monthwise Consumption Trend Natural Gas
            </Typography>
          </Grid>
          <Grid sx={{ my: 2 }} item container spacing={2} xs={12}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                style={{ width: "100%", borderRadius: "3em" }}
                id="combo-box-demo"
                options={months}
                value={months.find(
                  (item) => item.index === monthlyFilter.start_month
                )}
                getOptionLabel={(option) => option.month}
                onChange={(e, values) => {
                  setMonthly((prev) => {
                    return { ...prev, start_month: values?.index };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Start month"
                    placeholder="Month"
                    type="text"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                style={{ width: "100%", borderRadius: "3em" }}
                id="combo-box-demo"
                options={years}
                value={years.find(
                  (item) => item.val === monthlyFilter.start_year
                )}
                getOptionLabel={(option) => option.str}
                onChange={(e, value) => {
                  setMonthly((prev) => {
                    return { ...prev, start_year: value?.val };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Start year"
                    placeholder="Year"
                    type="text"
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* <Autocomplete
            style={{ width: "100%", borderRadius: "3em" }}
            id="combo-box-demo"
            value={monthlyFilter.parameter}
            options={["Consumption", "Production", "Imports"]}
            getOptionLabel={(option) => option}
            onChange={(e, value) => {
              setMonthly((prev) => {
                return { ...prev, parameter: value };
              });
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
          /> */}
          <Grid sx={{ my: 2 }} item container spacing={2} xs={12}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                style={{ width: "100%", borderRadius: "3em" }}
                id="combo-box-demo"
                options={months}
                value={months.find(
                  (item) => item.index === monthlyFilter.end_month
                )}
                getOptionLabel={(option) => option.month}
                onChange={(e, values) => {
                  setMonthly((prev) => {
                    return { ...prev, end_month: values?.index };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="End month"
                    placeholder="Month"
                    type="text"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                style={{ width: "100%", borderRadius: "3em" }}
                id="combo-box-demo"
                options={years}
                value={years.find(
                  (item) => item.val === monthlyFilter.end_year
                )}
                getOptionLabel={(option) => option.str}
                onChange={(e, value) => {
                  setMonthly((prev) => {
                    return { ...prev, end_year: value?.val };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="End year"
                    placeholder="Year"
                    type="text"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>

        {lineChart.length !== 0 && (
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", alignItems: "center", height: "40vh" }}
          >
            <LineChart width="100%" height="100%" data={lineChart} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default withLayout(withSubheader(Analytics));
