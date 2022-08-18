import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import withLayout from "../../layout";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { getNews } from "../../actions/news";
import up from "../../images/dashboard/growth.svg";
import logo from "../../images/dashboard/logo.svg";
import down from "../../images/dashboard/fall.svg";
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

const Home = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getNews("natural gas");
      setNews(data);
    };
    getData();
  }, []);
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

        <Grid
          item
          xs={8}
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
          container
        >
          <Grid item>
            {" "}
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
          <Grid item>
            <OutlinedButton component={Link} to="/predictions">
              View Detailed Predictions
            </OutlinedButton>
          </Grid>
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <p> Insert your globe here</p>
      </div>
      <Box sx={{ py: 4 }}>
        <Typography color="#00116A" fontSize="35px">
          Energy Prices
        </Typography>
        <Box sx={{ display: "flex", my: 2 }}>
          <Box
            sx={{
              border: "1px solid #EC82B5 ",
              px: 1,
              py: 1,
              width: "12em",
              borderRadius: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
            <Typography fontSize={20} sx={{ ml: 2, mr: 1 }}>
              Coal
            </Typography>
            <Typography fontSize={20}>₹150</Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #1FA724 ",
              px: 1,
              py: 1,
              width: "12em",
              borderRadius: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
            <Typography fontSize={20} sx={{ ml: 2, mr: 1 }}>
              Nat Gas
            </Typography>
            <Typography fontSize={20}>₹230</Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #EC82B5 ",
              px: 1,
              py: 1,
              width: "12em",
              borderRadius: "2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
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
            <Typography fontSize={20} sx={{ ml: 2, mr: 1 }}>
              Coal
            </Typography>
            <Typography fontSize={20}>₹150</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
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
              <Grid item xs={6}>
                <NewsCard data={obj} key={index} />
              </Grid>
            );
          }
        })}
      </Grid>
    </Box>
  );
};

export default withLayout(Home);
