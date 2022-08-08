import { useRef, useEffect } from "react";
import * as d3 from "d3";
const data = [
  { group: "banana", Nitrogen: 12, normal: 1, stress: 13 },
  { group: "poacee", Nitrogen: 6, normal: 6, stress: 33 },
  { group: "sorgho", Nitrogen: 11, normal: 28, stress: 12 },
  { group: "triticum", Nitrogen: 19, normal: 6, stress: 1 },
];
const useGroupedBarChart = () => {
  const ref = useRef();
  const renderChart = () => {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    // List of subgroups = header of the csv files = soil condition here
  };
  useEffect(() => {
    renderChart();
  });
  return ref;
};

export default useGroupedBarChart;
