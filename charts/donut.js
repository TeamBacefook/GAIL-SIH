import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
var data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

const useDonut = (data = data, height, width) => {
  const ref = useRef(null);
  const renderChart = () => {
    const margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create dummy data
    const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };

    // set the color scale
    const color = d3
      .scaleOrdinal()
      .range(["#B3E0EE", "#48B5D6", "#0196C1", "#046C95", "#083346"]);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .value((d) => d[1])
      .padAngle(0.01);

    const data_ready = pie(Object.entries(data).sort());
    const arc = d3
      .arc()
      .innerRadius(100) // This is the size of the donut hole
      .outerRadius(radius);

    const arcOver = d3
      .arc()
      .innerRadius(100) // This is the size of the donut hole
      .outerRadius(radius + 20);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("#chart")
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .on("mouseover", function (d) {
        d3.select(this).transition().duration(200).attr("d", arcOver);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration(200).attr("d", arc);
      })
      .attr("fill", (d) => color(d.data[0]))
      .transition()

      .duration(750)
      .attrTween("d", function (d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });
  };
  useEffect(() => {
    renderChart();
  });

  return ref;
};

export default useDonut;
