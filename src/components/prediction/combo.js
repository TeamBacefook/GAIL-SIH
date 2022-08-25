import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useState, useEffect, useCallback } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import IOSSlider from "../common/slider";
import LineChart from "../../charts/predchart";
import Papa from "papaparse";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
// import { getpredictionsFn } from "../../api/predictions";
let yourDate = new Date();
const convert = (date) => {
  let dt = new Date(date);
  let month = dt.getMonth() + 1;
  var date1 = "";
  if (month < 10) {
    date1 = `0${month}/${dt.getFullYear()}`;
  } else {
    date1 = `${month}/${dt.getFullYear()}`;
  }
  return date1;
};
export default function ComboChart({
  getPredictionsFunction,
  name,
  getPredictionsFunction2,
  parameter,
  ticker,
  time,
  filter,
  withcsvfilter,
  setBarData,
}) {
  const [csvData, setCsvData] = useState([]);
  const [date, setDate] = useState(yourDate.toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [warIntensity, setWarIntensity] = useState(1.1238);
  const [warData, setWarData] = useState({
    start_date: yourDate.toISOString().split("T")[0], // yyyy-mm-dd
    end_date: "2025-10-01",
  });
  const [recessionIntensity, setRecessionIntensity] = useState(1.11664);
  const [recessionData, setRecessionData] = useState({
    end_date: "2025-10-01",
    start_date: yourDate.toISOString().split("T")[0],
  });
  const [check, setCheck] = useState({ war: false, recession: false });
  const [pandemicData, setpandemicData] = useState({
    end_date: "2025-10-01",
    start_date: yourDate.toISOString().split("T")[0],
  });
  const handleFileChange = (e, time, ticker) => {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      if (!["csv"].includes(fileExtension)) {
        toast.error("Please input a csv file");
        return;
      }
      const reader = new FileReader();
      reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        var columns = Object.keys(parsedData[0]);
        columns = columns.map((item) => item.toLocaleLowerCase());
        if (
          !columns.includes("date") ||
          !columns.includes("close") ||
          parsedData.length < 24
        ) {
          toast.error("Please input correct csv file");
        } else {
          toast.info(`Predicting ...`);
          parsedData.pop();
          setCsvData(parsedData);
        }
      };
      reader.readAsText(inputFile);
      document.getElementById(time).value = "";
    }
  };

  const [commo, setCommo] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    if (data[0] !== undefined) {
      if (data[0]["Actual Price"] === null) {
        const arr = [];
        for (var key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            if (
              key !== "index" &&
              key !== "Actual Price" &&
              key !== "Ensemble Predictions"
            ) {
              arr.push(key);
            }
          }
        }
        console.log(arr);
        setAll(arr);
        setCommo(withcsvfilter);
      } else {
        const arr = [];
        for (var key2 in data[0]) {
          if (data[0].hasOwnProperty(key2)) {
            if (key2 !== "index" && key2 !== "Ensemble Predictions") {
              arr.push(key2);
            }
          }
        }
        console.log(arr);
        setAll(arr);
        setCommo(filter);
      }
    }
  }, [data, filter, withcsvfilter]);

  useEffect(() => {
    if (parameter) {
      if (check.war === true || check.recession === true) {
        const getData = async () => {
          const data = await getPredictionsFunction2({
            csv: csvData,
            warIntensity: check.war === true ? warIntensity : undefined,
            recessionIntensity:
              check.recession === true ? recessionIntensity : undefined,
            warData:
              check.war === true
                ? {
                    start_date: convert(warData.start_date),
                    end_date: convert(warData.end_date),
                  }
                : undefined,
            recessionData:
              check.recession === true
                ? {
                    start_date: convert(recessionData.start_date),
                    end_date: convert(recessionData.end_date),
                  }
                : undefined,
            ticker: ticker,
            time: time,
            start_date: date,
          });
          if (time === "M") {
            setBarData(data.evals);
            setData(data.predictions.data);
          } else {
            setData(data.data);
          }
        };
        getData();
      } else {
        const getData2 = async () => {
          const data = await getPredictionsFunction({
            csv: csvData,
            ticker: ticker,
            time: time,
            start_date: date,
          });

          if (time === "M") {
            setBarData(data.evals);
            setData(data.predictions.data);
          } else {
            setData(data.data);
          }
        };
        getData2();
      }
    } else {
      const getData2 = async () => {
        const data = await getPredictionsFunction({
          csv: csvData,
          ticker: ticker,
          time: time,
          start_date: date,
        });

        if (time === "M") {
          setBarData(data.evals);
          setData(data.predictions.data);
        } else {
          setData(data.data);
        }
      };
      getData2();
    }
  }, [
    check,
    ticker,
    time,
    warIntensity,
    recessionData,
    recessionIntensity,
    getPredictionsFunction2,
    parameter,
    warData,
    csvData,
    setData,
    getPredictionsFunction,
    date,
  ]);

  // useEffect(() => {}, [ticker, time, getPredictionsFunction]);
  console.log("data", data);
  const [getPng, { ref }] = useCurrentPng();
  const handleDownload = useCallback(async () => {
    const png = await getPng();
    if (png) {
      FileSaver.saveAs(png, "Prediction.png");
    }
  }, [getPng]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCommo(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        item
        xs={12}
      >
        <Grid item sx={1} xs={3}>
          <Typography color="#00116A" fontSize={30}>
            Model Prediction {name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <div class="file-input">
            <input
              type="file"
              id={time}
              onChange={(e) => handleFileChange(e, time, ticker)}
            />
            <span class="button">Upload CSV File</span>
          </div>
        </Grid>
        {time === "M" && (
          <Grid xs={2}>
            <TextField
              type="date"
              fullWidth
              variant="outlined"
              label="Predict From"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Grid>
        )}
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
              width: "70%",
            }}
            onClick={handleDownload}
            disabled={data.length !== 0 ? false : true}
          >
            Download Graph
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(180deg, #005CB9 0%, #270097 100%)",
              color: "white",
              borderRadius: "11px",
              textTransform: "none",
              width: "70%",
            }}
            disabled={data.length !== 0 ? false : true}
            onClick={() => {
              window.downloadCSV(data, commo, "Predictions");
            }}
          >
            Download CSV
          </Button>
        </Grid>
      </Grid>
      {parameter && (
        <Grid item container xs={12}>
          <Grid item sx={{ mb: 3 }} xs={12}>
            <Typography color="#00116A" fontSize={20}>
              Global Parameters
            </Typography>
            <Divider />
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              container
            >
              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  label="Estimate Start"
                  value={warData.start_date}
                  onChange={(e) => {
                    setWarData((prev) => {
                      return { ...prev, start_date: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  value={warData.end_date}
                  onChange={(e) => {
                    setWarData((prev) => {
                      return { ...prev, end_date: e.target.value };
                    });
                  }}
                  label="Estimate End"
                />
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                  Intensity
                </Typography>
                <IOSSlider
                  onChange={(e) => {
                    let val = 0;
                    switch (e.target.value) {
                      case 1:
                        val = 1.1238;
                        break;
                      case 2:
                        val = 1.2476;
                        break;
                      case 3:
                        val = 1.3714;
                        break;
                      case 4:
                        val = 1.4952;
                        break;
                      case 5:
                        val = 1.6192;
                        break;
                      default:
                        val = 0;
                        break;
                    }
                    setWarIntensity(val);
                  }}
                  track={false}
                  marks={[
                    { label: "very low", value: 1 },
                    { label: "low", value: 2 },
                    { label: "moderate", value: 3 },
                    { label: "high", value: 4 },
                    { label: "very high", value: 5 },
                  ]}
                  min={1}
                  max={5}
                  step={1}
                />
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(180deg, #005CB9 0%, #270097 100%)",
                      color: "white",
                      borderRadius: "11px",
                      textTransform: "none",
                      width: "70%",
                    }}
                    onClick={(e) => {
                      setCheck((prev) => {
                        return { ...prev, war: !prev.war };
                      });
                    }}
                  >
                    {check.war ? "Remove" : "Add"} War Sentiment
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              sx={{ pt: 1, pb: 2 }}
              alignItems="center"
              container
            >
              <Grid item xs={2.5}>
                <TextField
                  type="date"
                  fullWidth
                  value={recessionData.start_date}
                  variant="outlined"
                  label="Estimate Start"
                  onChange={(e) => {
                    setRecessionData((prev) => {
                      return { ...prev, start_date: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  type="date"
                  fullWidth
                  variant="outlined"
                  label="Estimate End"
                  value={recessionData.end_date}
                  onChange={(e) => {
                    setRecessionData((prev) => {
                      return { ...prev, end_date: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                  Intensity
                </Typography>
                <IOSSlider
                  onChange={(e) => {
                    let val = 0;
                    switch (e.target.value) {
                      case 1:
                        val = 1.11664;
                        break;
                      case 2:
                        val = 1.3328;
                        break;
                      case 3:
                        val = 1.4992;
                        break;
                      case 4:
                        val = 1.6656;
                        break;
                      case 5:
                        val = 1.8302;
                        break;
                      default:
                        val = 0;
                        break;
                    }
                    setRecessionIntensity(val);
                  }}
                  track={false}
                  marks={[
                    { label: "very low", value: 1 },
                    { label: "low", value: 2 },
                    { label: "moderate", value: 3 },
                    { label: "high", value: 4 },
                    { label: "very high", value: 5 },
                  ]}
                  min={1}
                  max={5}
                  step={1}
                />
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(169.84deg, #FFE53B -30.77%, #FF2525 119.39%)",
                      color: "white",
                      borderRadius: "11px",
                      textTransform: "none",
                      width: "70%",
                    }}
                    onClick={(e) => {
                      setCheck((prev) => {
                        return {
                          ...prev,
                          recession: !prev.recession,
                        };
                      });
                    }}
                  >
                    {check.recession ? "Remove" : "Add"} Recession Sentiment
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              alignItems="center"
              container
            >
              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  label="Estimate Start"
                  value={pandemicData.start_date}
                  onChange={(e) => {
                    setpandemicData((prev) => {
                      return { ...prev, start_date: e.target.value };
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  value={pandemicData.end_date}
                  onChange={(e) => {
                    setpandemicData((prev) => {
                      return { ...prev, end_date: e.target.value };
                    });
                  }}
                  label="Estimate End"
                />
              </Grid>
              <Grid item xs={3} container justifyContent="center">
                <Typography fontSize={20} sx={{ opacity: "0.5" }}>
                  Intensity
                </Typography>
                <IOSSlider
                  // onChange={(e) => {
                  //   let val = 0;
                  //   switch (e.target.value) {
                  //     case 1:
                  //       val = 1.1238;
                  //       break;
                  //     case 2:
                  //       val = 1.2476;
                  //       break;
                  //     case 3:
                  //       val = 1.3714;
                  //       break;
                  //     case 4:
                  //       val = 1.4952;
                  //       break;
                  //     case 5:
                  //       val = 1.6192;
                  //       break;
                  //     default:
                  //       val = 0;
                  //       break;
                  //   }
                  //   setWarIntensity(val);
                  // }}
                  track={false}
                  marks={[
                    { label: "very low", value: 1 },
                    { label: "low", value: 2 },
                    { label: "moderate", value: 3 },
                    { label: "high", value: 4 },
                    { label: "very high", value: 5 },
                  ]}
                  min={1}
                  max={5}
                  step={1}
                />
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(180deg, #005CB9 0%, #270097 100%)",
                      color: "white",
                      borderRadius: "11px",
                      textTransform: "none",
                      width: "70%",
                    }}
                  >
                    Add Pandemic Sentiment
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      )}
      {data.length !== 0 && (
        <>
          <Grid item justify="center" xs={12} md={12} lg={12} align="center">
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
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
                {all.map((obj, index) => {
                  return (
                    <MenuItem value={obj} key={index}>
                      {obj}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={12}
            style={{ display: "flex", alignItems: "center", height: "60vh" }}
          >
            <LineChart
              width="100%"
              height="100%"
              data={data}
              display={commo}
              refi={ref}
              unit={"$"}
            />
          </Grid>
        </>
      )}
    </>
  );
}
