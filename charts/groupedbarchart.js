import { useRef, useEffect } from "react";
import * as d3 from "d3";

const useGroupedBarChart = () => {
  const ref = useRef();
  const renderChart = () => {
    var svg = d3.select("svg"),
      margin = {
        top: 50,
        right: 20,
        bottom: 30,
        left: 40,
      },
      width = 1000 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom;

    var g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // because the plot is grouped by months and then by weekdays it has two scales for the x axis
    // creating x0 scale which is grouped by months
    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

    // creating x1 scale which is grouped by days of week
    var x1 = d3.scaleBand().padding(0.08);

    // creating a linear scale for y axis
    var y = d3.scaleLinear().rangeRound([height, 0]);

    // creating an ordinal scale for color that is going to represent different days of week
    var z = d3
      .scaleOrdinal()
      .range([
        "#66c2a5",
        "#fc8d62",
        "#8da0cb",
        "#e78ac3",
        "#a6d854",
        "#ffd92f",
        "#e5c494",
      ]);

    // reading csv data
    d3.csv("/data.csv").then(function (data, error) {
      console.log(data);
      if (error) return console.log(error);
      // creating var keys containing array of names of days
      var keys = data.columns.slice(1);
      // setting up domain for x0 as a list of all the names of months
      x0.domain(
        data.map(function (d) {
          //console.log(d.Month);
          return d.Month;
        })
      );
      // setting up domain for x1 as a list of all the names of days
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
      // setting up domain for y which will be from 0 to max day of week for any month
      y.domain([0, 5000]).nice();
      // binding data to svg group elements
      g.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          //console.log(x0(d.Month));
          return "translate(" + x0(d.Month) + ",0)";
        })
        .attr("class", "days")
        // binding days of week data to rectangles
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            //console.log({ key: key, value: d[key] });
            return {
              key: key,
              value: d[key],
            };
          });
        })
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          //console.log(x1(d.key));
          return x1(d.key);
        })
        .attr("width", x1.bandwidth())
        .attr("fill", function (d) {
          //console.log(z(d.key));
          return z(d.key);
        })
        // setting up y coordinates and height position to 0 for transition
        .attr("y", function (d, i) {
          return y(i);
        })
        .attr("height", function (d, i) {
          console.log(y(i));
          return height - y(0);
        })
        // setting up tooltip and interactivity

        // setting up transition, delay and duration
        .transition()
        .delay(function (d, i) {
          return i * 250;
        })
        .duration(1500)
        // setting up normal values for y and height
        .attr("y", function (d) {
          return y(Number(d.value));
        })
        .attr("height", function (d) {
          console.log(d);
          return height - y(Number(d.value));
        });
      // setting up x axis
      g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        // setting up x axis opacity to 0 before transition
        .style("opacity", "0")
        .call(d3.axisBottom(x0));
      // setting up transiton for x axis
      g.select(".x")
        .transition()
        .duration(500)
        .delay(800)
        // setting up full opacity after transition
        .style("opacity", "1");
      // setting up y axis
      g.append("g")
        .attr("class", "y axis")
        // setting up y axis opacity to 0 before transition
        .style("opacity", "0")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.90em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .text("Cancellations");
      // setting up y axis transition
      g.select(".y")
        .transition()
        .duration(500)
        .delay(1300)
        // setting up full opacity after transition
        .style("opacity", "1");
      // setting a legend and binding legend data to group
    });
  };
  useEffect(() => {
    renderChart();
  });
  return ref;
};

export default useGroupedBarChart;
