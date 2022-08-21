import { Box, Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import React, { useState, useEffect, useCallback } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import LineChart from "../../charts/predchart";
import Papa from "papaparse";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";

export default function ComboChart({
  getPredictionsFunction,
  name,
  warIntensity,
  recessionIntensity,
  parameter,
}) {
  const [data, setData] = useState([]);
  const handleFileChange = (e) => {
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
        const columns = Object.keys(parsedData[0]);
        if (!columns.includes("date") || !columns.includes("close")) {
          toast.error("Please input correct csv file");
        } else {
          toast.info("Predicting ...");
          parsedData.pop();
          if (parameter) {
            const pred = await getPredictionsFunction(
              parsedData,
              warIntensity,
              recessionIntensity
            );
            setData(pred.data);
          } else {
            const pred = await getPredictionsFunction(parsedData);
            setData(pred.data);
          }
        }
      };
      reader.readAsText(inputFile);
    }
  };

  const [commo, setCommo] = useState([]);
  const [all, setAll] = useState([]);

  useEffect(() => {
    const arr = [];
    for (var key in data[0]) {
      if (data[0].hasOwnProperty(key)) {
        if (key !== "index") {
          arr.push(key);
        }
      }
    }
    setAll(arr);
    setCommo(arr);
  }, [data]);

  useEffect(async () => {
    const pred = await getPredictionsFunction([]);
    setData(pred.data);
  }, []);

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
        justifyContent="space-evenly"
        item
        xs={12}
      >
        <Grid item sx={1} xs={3}>
          <Typography color="#00116A" fontSize={30}>
            Model Prediction for {name}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <input type="file" id="file" onChange={handleFileChange} />
          <label for="file" className="btn-3" style={{ textAlign: "center" }}>
            <span>Upload CSV File</span>
          </label>
        </Grid>

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
            />
          </Grid>
        </>
      )}
    </>
  );
}
