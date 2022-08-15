import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";

import withSubheader from "../../layout/sub-header";
import useBarchart from "../../charts/barchart";
import IOSSlider from "../../components/common/slider";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getcontinentaldata } from "../../api/analytics.continental";

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
  const [selected, setSelected] = useState([]);
  const [consumption, setconsumptiondata] = useState({ data: [], max: 0 }); //parameter = "Final consumption"
  const [productiondata, setproductiondata] = useState(null); //parameter = 'Primary production'
  const [transformationdata, settransformationdata] = useState(null); //parameter = "Transformation"
  const [energyYear, setEnergyYear] = useState(2008);
  const bar1 = useBarchart(
    370,
    400,
    productiondata,
    productiondata?.[0]?.max,
    "#FF0000"
  );

  const bar2 = useBarchart(
    370,
    400,
    transformationdata,
    transformationdata?.[0].max,
    "#69AAA5"
  );
  const bar3 = useBarchart(
    370,
    400,
    consumption,
    consumption?.[0]?.max,
    "#59A14F"
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
      settransformationdata(data);
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
            value={selected}
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
        <Grid item xs={12} style={{ marginBottom: "2%" }}>
          <Typography color="#00116A" fontSize={35}>
            Energy Balance Sheet
          </Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12} md={12}>
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
      <Grid item xs={12} container justifyContent={"space-evenly"} spacing={2}>
        <Grid item sx={12} md={4}>
          <p>Energy Consumption</p>{" "}
          <svg width={"100%"} height={"400"} ref={bar3} />
        </Grid>
        <Grid item sx={12} md={4}>
          <p>Energy Transformation</p>{" "}
          <svg width={"100%"} height={"400"} ref={bar2} />
        </Grid>
        <Grid item sx={12} md={4}>
          <p>Energy Production</p>{" "}
          <svg width={"100%"} height={"400"} ref={bar1} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withSubheader(Analytics);
