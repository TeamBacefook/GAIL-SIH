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
    const margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    // d3.csv(
    //   "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv"
    // ).then(function (data) {
    // List of subgroups = header of the csv files = soil condition here
    const subgroups = ["Nitrogen", "normal", "stress"];
    console.log(subgroups);
    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d) => d.group);

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Another scale for subgroup position?
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05]);

    // color palette = one color per subgroup
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#e41a1c", "#377eb8", "#4daf4a"]);

    // Show the bars

    svg
      .selectAll("bars")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0));
    svg
      .append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d) {
        return "translate(" + x(d.group) + ",0)";
      })
      .selectAll("rect")
      .data(function (d) {
        return subgroups.map(function (key) {
          return { key: key, value: d[key] };
        });
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xSubgroup(d.key);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", function (d) {
        return color(d.key);
      });

   svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
      .attr("transform", d => `translate(${x(d.group)}, 0)`)
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.key));
  };
  useEffect(() => {
    renderChart();
  });
  return ref;
};

export default useGroupedBarChart;
