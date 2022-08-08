import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
const data = {
  parent: "none",
  "Sub-Region": "Continent",
  "Natural Gas Exports": "0",
  leaves: [
    {
      "Sub-region": "Western Europe",
      parent: "Continent",
      "Natural Gas Exports": "63,475,773.52",
    },
    {
      "Sub-region": "Western Asia",
      parent: "Continent",

      "Natural Gas Exports": "79,567,582.09",
    },
    {
      "Sub-region": "Sub-Saharan Africa",
      parent: "Continent",
      "Natural Gas Exports": "18,076,947.34",
    },
    {
      "Sub-region": "Southern Europe",
      parent: "Continent",
      "Natural Gas Exports": "1,783,127.60",
    },
    {
      "Sub-region": "Southern Asia",
      parent: "Continent",
      "Natural Gas Exports": "5,275,718.44",
    },
    {
      "Sub-region": "South-eastern Asia",
      "Natural Gas Exports": "78,927,175.05",
      parent: "Continent",
    },
    {
      "Sub-region": "Polynesia",
      "Natural Gas Exports": 0,
      parent: "Continent",
    },
    {
      "Sub-region": "Northern Europe",
      "Natural Gas Exports": "90,922,976.75",
      parent: "Continent",
    },
    {
      "Sub-region": "Northern America",
      "Natural Gas Exports": "119,812,845.76",
      parent: "Continent",
    },
    {
      "Sub-region": "Northern Africa",
      "Natural Gas Exports": "62,185,732.37",
      parent: "Continent",
    },
    {
      "Sub-region": "Micronesia",
      "Natural Gas Exports": 0,
      parent: "Continent",
    },
  ],
};

const getTreeMap = () => {
  const ref = useRef();

  const renderTreemap = () => {};

  useEffect(() => {
    renderTreemap();
  });

  return ref;
};

export default getTreeMap;
