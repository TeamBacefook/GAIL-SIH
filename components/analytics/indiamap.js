import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";

const PROJECTION_CONFIG = {
  scale: 1125,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "#008080";

const getRandomInt = () => {
  return parseInt(Math.random() * 100);
};

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#00116A",
    transition: "all 250ms",
  },
  pressed: {
    outline: "none",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: "AP", state: "Andhra Pradesh" },
    { id: "AR", state: "Arunachal Pradesh" },
    { id: "AS", state: "Assam" },
    { id: "BR", state: "Bihar" },
    { id: "CT", state: "Chhattisgarh" },
    { id: "GA", state: "Goa" },
    { id: "GJ", state: "Gujarat" },
    { id: "HR", state: "Haryana" },
    { id: "HP", state: "Himachal Pradesh" },
    { id: "JH", state: "Jharkhand" },
    { id: "KA", state: "Karnataka" },
    { id: "KL", state: "Kerala" },
    { id: "MP", state: "Madhya Pradesh" },
    { id: "MH", state: "Maharashtra" },
    { id: "MN", state: "Manipur" },
    { id: "ML", state: "Meghalaya" },
    { id: "MZ", state: "Mizoram" },
    { id: "NL", state: "Nagaland" },
    { id: "OR", state: "Odisha" },
    { id: "PB", state: "Punjab" },
    { id: "RJ", state: "Rajasthan" },
    { id: "SK", state: "Sikkim" },
    { id: "TN", state: "Tamil Nadu" },
    { id: "TG", state: "Telangana" },
    { id: "TR", state: "Tripura" },
    { id: "UT", state: "Uttarakhand" },
    { id: "UP", state: "Uttar Pradesh" },
    { id: "WB", state: "West Bengal" },
    { id: "WB", state: "West Bengal" },
    { id: "AN", state: "Andaman and Nicobar Islands" },
    { id: "CH", state: "Chandigarh" },
    { id: "DN", state: "Dadra and Nagar Haveli" },
    { id: "DD", state: "Daman and Diu" },
    { id: "DL", state: "Delhi" },
    { id: "JK", state: "Jammu and Kashmir" },
    { id: "LA", state: "Ladakh" },
    { id: "LD", state: "Lakshadweep" },
    { id: "PY", state: "Puducherry" },
  ];
};

function IndiaMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [data, setData] = useState(getHeatMapData());

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="full-width-height container">
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        data-tip=""
      >
        <Geographies geography="/india.topo.json">
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#D4AF37"
                  strokeWidth="2"
                  fill={DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default IndiaMap;
