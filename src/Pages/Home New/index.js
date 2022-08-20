import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import withLayout from "../../layout";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { getNews } from "../../actions/news";
import up from "../../images/dashboard/growth.svg";
import logo from "../../images/dashboard/logo.svg";
import down from "../../images/dashboard/fall.svg";
import World from "../../components/analytics/globe";
import Marquee from "react-fast-marquee";
import { data } from "../../components/analytics/withdata";
import LineChart from "../../charts/homelinechart";

const OutlinedButton = styled(Button)({
  border: "1px solid #FF5C00",
  color: "#FF5C00",
  backgroundColor: "white",
  borderRadius: "10px",
  "&:hover": {
    border: "1px solid #FF5C00",
    color: "#FF5C00",
    backgroundColor: "white",
    borderRadius: "10px",
  },
});

const years = [
  { str: "1990", val: 1990 },
  { str: "1991", val: 1991 },
  { str: "1992", val: 1992 },
  { str: "1993", val: 1993 },
  { str: "1994", val: 1994 },
  { str: "1995", val: 1995 },
  { str: "1996", val: 1996 },
  { str: "1997", val: 1997 },
  { str: "1998", val: 1998 },
  { str: "1999", val: 1999 },
  { str: "2000", val: 2000 },
  { str: "2001", val: 2001 },
  { str: "2002", val: 2002 },
  { str: "2003", val: 2003 },
  { str: "2004", val: 2004 },
  { str: "2005", val: 2005 },
  { str: "2006", val: 2006 },
  { str: "2007", val: 2007 },
  { str: "2008", val: 2008 },
  { str: "2009", val: 2009 },
  { str: "2010", val: 2010 },
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
];

const commodity = [
  { str: "Natural gas", val: "Natural gas" },
  { str: "Anthracite", val: "Anthracite" },
  { str: "Lignite", val: "Lignite" },
  { str: "Crude oil", val: "Crude oil" },
];

const type = [
  { str: "Production", val: "Production" },
  { str: "Imports", val: "Imports" },
  { str: "Exports", val: "Exports" },
  { str: "Consumption", val: "Consumption" },
];
const marqueedata = [
  {
    commodity: "Methanol\n\nCNY/T",
    price: "2431.00",
    "24hrchange": "12.00",
    "24hrpercentchange": "-0.49%",
    weeklychange: "-3.53%",
    monthlychange: "1.38%",
    "YoY change": "-9.09%",
    date: "Aug/18",
  },
  {
    commodity: "Crude Oil\n\nUSD/Bbl",
    price: "89.236",
    "24hrchange": "1.125",
    "24hrpercentchange": "1.28%",
    weeklychange: "-5.58%",
    monthlychange: "-11.58%",
    "YoY change": "40.28%",
    date: "10:28",
  },
  {
    commodity: "Brent\n\nUSD/Bbl",
    price: "95.115",
    "24hrchange": "1.465",
    "24hrpercentchange": "1.56%",
    weeklychange: "-4.60%",
    monthlychange: "-7.64%",
    "YoY change": "42.99%",
    date: "10:28",
  },
  {
    commodity: "Natural gas\n\nUSD/MMBtu",
    price: "9.3102",
    "24hrchange": "0.0662",
    "24hrpercentchange": "0.72%",
    weeklychange: "5.19%",
    monthlychange: "30.55%",
    "YoY change": "143.72%",
    date: "10:28",
  },
  {
    commodity: "Gasoline\n\nUSD/Gal",
    price: "2.9627",
    "24hrchange": "0.0282",
    "24hrpercentchange": "0.96%",
    weeklychange: "-3.61%",
    monthlychange: "-6.57%",
    "YoY change": "42.24%",
    date: "10:28",
  },
  {
    commodity: "Heating Oil\n\nUSD/Gal",
    price: "3.6384",
    "24hrchange": "0.021",
    "24hrpercentchange": "0.58%",
    weeklychange: "4.61%",
    monthlychange: "2.12%",
    "YoY change": "85.10%",
    date: "10:28",
  },
  {
    commodity: "Coal\n\nUSD/T",
    price: "413.90",
    "24hrchange": "8.90",
    "24hrpercentchange": "2.20%",
    weeklychange: "3.83%",
    monthlychange: "4.51%",
    "YoY change": "142.05%",
    date: "Aug/17",
  },
  {
    commodity: "TTF Gas\n\nEUR/MWh",
    price: "230.40",
    "24hrchange": "4.57",
    "24hrpercentchange": "2.02%",
    weeklychange: "10.52%",
    monthlychange: "48.91%",
    "YoY change": "469.38%",
    date: "10:28",
  },
  {
    commodity: "UK Gas\n\nGBp/thm",
    price: "450.0000",
    "24hrchange": "10.04",
    "24hrpercentchange": "2.28%",
    weeklychange: "12.04%",
    monthlychange: "107.82%",
    "YoY change": "351.16%",
    date: "10:24",
  },
  {
    commodity: "Ethanol\n\nUSD/Gal",
    price: "2.5100",
    "24hrchange": "0.0100",
    "24hrpercentchange": "0.40%",
    weeklychange: "2.03%",
    monthlychange: "-1.95%",
    "YoY change": "10.82%",
    date: "Aug/17",
  },
  {
    commodity: "Naphtha\n\nUSD/T",
    price: "656.58",
    "24hrchange": "11.63",
    "24hrpercentchange": "1.80%",
    weeklychange: "-4.10%",
    monthlychange: "-15.26%",
    "YoY change": "2.43%",
    date: "Aug/17",
  },
  {
    commodity: "Uranium\n\nUSD/Lbs",
    price: "48.7000",
    "24hrchange": "0.1500",
    "24hrpercentchange": "0.31%",
    weeklychange: "0.00%",
    monthlychange: "4.39%",
    "YoY change": "54.60%",
    date: "Aug/17",
  },
  {
    commodity: "Propane\n\nUSD/Gal",
    price: "1.07",
    "24hrchange": "0.01",
    "24hrpercentchange": "0.67%",
    weeklychange: "-0.29%",
    monthlychange: "-6.58%",
    "YoY change": "-4.67%",
    date: "Aug/17",
  },
  {
    commodity: "Urals Oil\n\nUSD/Bbl",
    price: "77.92",
    "24hrchange": "10.84",
    "24hrpercentchange": "16.16%",
    weeklychange: "4.91%",
    monthlychange: "-11.47%",
    "YoY change": "16.73%",
    date: "Aug/17",
  },
];

const NewsCard = ({ data }) => {
  return (
    <Box sx={{ border: "1px solid #00116A", p: 2, borderRadius: 10 }}>
      <Typography fontSize={25}>{data.Headline}</Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%" }}>
          <Button
            onClick={() => window.open(data.URL)}
            sx={{
              width: "40%",
              background:
                "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
            }}
          >
            Read More
          </Button>
        </div>
        <img style={{ height: "4em" }} src={logo} alt="" />
      </Box>
    </Box>
  );
};

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

const Home = () => {
  const [news, setNews] = useState([]);
  const [filters, setFilter] = useState({
    year: 2020,
    commodity: "Natural gas",
    type: "Production",
    country: "India",
  });
  const globeElement = useRef();
  const [tabledata, settabledata] = useState(null);
  const [selectedCountryonGlobe, setSelectedCountryonGlobe] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const data = await getNews("natural gas");
      setNews(data);
    };
    getData();
  }, []);

  useEffect(() => {
    var countrydata = data.features.find(
      (x) => x.properties.SOVEREIGNT === filters.country
    );
    var tabledata = [];
    for (var year of [
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
    ]) {
      if (countrydata.properties[year] !== undefined) {
        tabledata.push({
          commodity: filters.commodity,
          year: year,
          imports: countrydata.properties[year][filters.commodity]["Imports"],
          exports: countrydata.properties[year][filters.commodity]["Exports"],
          consumption:
            countrydata.properties[year][filters.commodity]["Consumption"],
          production:
            countrydata.properties[year][filters.commodity]["Production"],
          metric: countrydata.properties[year][filters.commodity]["Metric"],
        });
      }
    }
    settabledata(tabledata);
    globeElement.current.pointOfView(
      {
        lat: countrydata.properties.lat,
        lng: countrydata.properties.lon,
        altitude: 1.45,
      },
      1500
    );
    globeElement.current.controls().autoRotate = false;
    globeElement.current.controls().autoRotateSpeed = 0;
    const myTimeout1 = setTimeout(() => {
      setSelectedCountryonGlobe(countrydata);
    }, 1500);
    const myTimeout2 = setTimeout(() => {
      globeElement.current.controls().autoRotate = true;
      globeElement.current.controls().autoRotateSpeed = -1;
      setSelectedCountryonGlobe(null);
    }, 5000);
    return () => {
      clearTimeout(myTimeout1);
      clearTimeout(myTimeout2);
    };
  }, [filters]);
  return (
    <Box sx={{ py: 12, px: { xs: 2, md: 8 } }}>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={4}>
          <Typography color="#00116A" fontSize="40px">
            Global Statistics
          </Typography>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={3}>
          <Button
            component={Link}
            to="/analytics/global"
            variant="contained"
            sx={{
              background:
                "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
            }}
          >
            View More Analytics
          </Button>
        </Grid>
        <Grid item lg={3}>
          <OutlinedButton component={Link} to="/predictions">
            View Detailed Predictions
          </OutlinedButton>
        </Grid>
        <Grid
          item
          xs={12}
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
          container
          style={{ marginTop: "2vh" }}
        >
          <Grid item lg={4}>
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={years}
              value={years.find((item) => item.val === filters.year)}
              getOptionLabel={(option) => option.str}
              onChange={(e, value) => {
                setFilter((prev) => {
                  return {
                    ...prev,
                    year: value === null ? 2020 : value.val,
                  };
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Year"
                  placeholder="Year"
                  type="text"
                />
              )}
            />
          </Grid>
          <Grid item lg={4}>
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={commodity}
              value={commodity.find((item) => item.val === filters.commodity)}
              getOptionLabel={(option) => option.str}
              onChange={(e, value) => {
                setFilter((prev) => {
                  return {
                    ...prev,
                    commodity: value === null ? "Natural gas" : value.val,
                  };
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
            />
          </Grid>
          <Grid item lg={4}>
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={type}
              value={type.find((item) => item.val === filters.type)}
              getOptionLabel={(option) => option.str}
              onChange={(e, value) => {
                setFilter((prev) => {
                  return {
                    ...prev,
                    type: value === null ? "Production" : value.val,
                  };
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Type"
                  placeholder="Type"
                  type="text"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ width: "100%", height: "70vh" }}>
        <Grid sx={{ mt: 2 }} item xs={12} md={6} lg={6} id="worldmap">
          <World
            year={filters.year}
            commodity={filters.commodity}
            type={filters.type}
            settabledata={settabledata}
            globeElement={globeElement}
            selectedCountryonGlobe={selectedCountryonGlobe}
            setCountry={(c) =>
              setFilter((prev) => {
                return { ...prev, country: c };
              })
            }
          />
        </Grid>
        <Grid
          item
          mt="2em"
          container
          style={{ maxHeight: "50vh" }}
          xs={12}
          md={6}
          lg={6}
          spacing={3}
        >
          <Grid item xs={12}>
            <Autocomplete
              style={{ width: "100%", height: "80%", borderRadius: "3em" }}
              id="combo-box-demo"
              options={countries}
              value={countries.find((item) => item.val === filters.country)}
              getOptionLabel={(option) => option.str}
              onChange={(e, value) => {
                setFilter((prev) => {
                  return {
                    ...prev,
                    country: value === null ? "India" : value.val,
                  };
                });
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
          <Grid item xs={12}>
            {tabledata && (
              <LineChart
                width={window.innerWidth / 2}
                height={window.innerHeight / 2}
                data={tabledata}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ py: 4 }}>
        <Typography color="#00116A" fontSize="35px">
          Energy Prices
        </Typography>
      </Box>
      <Marquee>
        {marqueedata.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item["24hrpercentchange"][0] === "-" ? (
                <Box
                  xs={4}
                  sx={{
                    border: "1px solid #EC82B5",
                    px: 1,
                    py: 1,
                    width: "90%",
                    borderRadius: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    margin: "0 0.5em",
                    minHeight: "7vh",
                  }}
                >
                  <object
                    type="image/svg+xml"
                    data={down}
                    style={{
                      height: "1.5em",
                      width: "1.5em",
                    }}
                  >
                    <img src={down} alt="Fall Symbol" />
                  </object>
                  <Typography
                    variant="h1"
                    fontSize={20}
                    id="angdu"
                    sx={{ ml: 2, mr: 1 }}
                  >
                    {item.commodity} {item.price}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    border: "1px solid #1FA724 ",
                    px: 1,
                    py: 1,
                    width: "90%",
                    borderRadius: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginLeft: "2em",
                    marginRight: "2em",
                    minHeight: "7vh",
                  }}
                >
                  <object
                    type="image/svg+xml"
                    data={up}
                    style={{
                      height: "1.5em",
                      width: "1.5em",
                    }}
                  >
                    <img src={up} alt="Fall Symbol" />
                  </object>
                  <Typography variant="h1" fontSize={20} sx={{ ml: 2, mr: 1 }}>
                    {item.commodity} {item.price}
                  </Typography>
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Marquee>
      <Divider style={{ marginTop: "3em" }} />
      <Grid item xs={12} sx={{ mt: 2 }} container>
        <Typography color="#00116A" fontSize="35px">
          Energy Gas Predictions
        </Typography>
        <Grid
          item
          container
          xs={12}
          sx={{ my: 3 }}
          spacing={3}
          justifyContent="center"
        >
          <Grid
            item
            xs={4}
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ border: "1px solid #00116A", borderRadius: "45px" }}
          >
            <Typography color="#00116A" fontSize="25px">
              August Estimated Predictions{" "}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <object
                type="image/svg+xml"
                data={up}
                style={{
                  height: "5em",
                  width: "5em",
                }}
              >
                <img src={up} alt="Fall Symbol" />
              </object>

              <Typography color="#309A30" fontSize={30}>
                ₹270
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ border: "1px solid #00116A", borderRadius: "45px", ml: 3 }}
          >
            <Typography color="#00116A" fontSize="25px">
              Yearly Estimated Predictions{" "}
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <object
                type="image/svg+xml"
                data={up}
                style={{
                  height: "5em",
                  width: "5em",
                }}
              >
                <img src={up} alt="Fall Symbol" />
              </object>

              <Typography color="#309A30" fontSize={30}>
                ₹270
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        item
        xs={12}
        spacing={3}
        alignItems="center"
        sx={{ mt: 2 }}
        container
      >
        <Grid item xs={12}>
          <Typography color="#00116A" fontSize="35px">
            Trending News
          </Typography>
        </Grid>

        {news?.map((obj, index) => {
          if (index < 2) {
            return (
              <Grid item key={index * 12} xs={6}>
                <NewsCard data={obj} />
              </Grid>
            );
          } else {
            return <React.Fragment key={index}></React.Fragment>;
          }
        })}
      </Grid>
    </Box>
  );
};

export default withLayout(Home);
