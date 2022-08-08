import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const useDonut = (props) => {
  const ref = useRef(null);
  const renderChart = () => {
    var dataset = {
      apples: [53245, 28479, 19697, 24037, 40245],
    };
    var width = 460,
      height = 300,
      radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();

    var pie = d3.layout.pie().sort(null);

    var arc = d3.svg
      .arc()
      .innerRadius(radius - 100)
      .outerRadius(function () {
        return d3.select(this).classed("clicked")
          ? (radius - 50) * 1.08
          : radius - 50;
      });

    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg
      .selectAll(".arc")
      .data(pie(dataset.apples))
      .enter()
      .append("g")
      .attr("class", "arc")
      .on("mouseover", function () {
        var current = this;
        var others = svg.selectAll(".arc").filter(function (el) {
          return this != current;
        });
        others.selectAll("path").style("opacity", 0.3);
      })
      .on("mouseout", function () {
        var current = this;
        d3.select(this).style("opacity", 1);
        var others = svg.selectAll(".arc").filter(function (el) {
          return this != current;
        });
        others.selectAll("path").style("opacity", 1);
      });

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) {
        return color(i);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function (d) {
        console.log("d is", d);
        return percentageFormat(d.data.percentage);
      });
  };
  useEffect(() => {
    renderChart();
  });

  return ref;
};

export default useDonut;
