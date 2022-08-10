import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useInView } from "framer-motion";
const data = [
  { Country: "United States", Value: 12394 },
  { Country: "Russia", Value: 6148 },
  { Country: "Germany (FRG)", Value: 1653 },
  { Country: "France", Value: 2162 },
  { Country: "United Kingdom", Value: 1214 },
  { Country: "China", Value: 1131 },
  { Country: "Spain", Value: 814 },
  { Country: "Netherlands", Value: 1167 },
  { Country: "Italy", Value: 660 },
  { Country: "Israel", Value: 1263 },
];

export default function useBarChart(data = data, h, w) {
  const ref = useRef();
  const isInView = useInView(ref);
  const renderChart = () => {
    var margin = { top: 10, right: 10, bottom: 10, left: 40 },
      width = h - margin.left - margin.right,
      height = w - margin.top - margin.bottom;

    var svg = d3
      .select(ref.current)
      .append("svg")

      .attr("width", 450 + margin.left + margin.right)
      .attr("height", 500 + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .attr("transform", "translate(-11,10)rotate(-90)")
      .style("text-anchor", "end");
    var y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.Country);
      })
      .attr("width", x.bandwidth())
      .attr("fill", "#FF0000")
      .attr("height", function (d) {
        return height - y(0);
      })
      .attr("y", function (d) {
        return y(0);
      });

    svg
      .selectAll("rect")
      .transition()
      .duration(1000)
      .attr("y", function (d) {
        return y(d.Value);
      })
      .attr("height", function (d) {
        return height - y(d.Value);
      })
      .delay(function (d, i) {
        return i * 200;
      });
  };

  useEffect(() => {
    if (isInView) {
      if (ref) renderChart();
    }
  }, [ref, isInView]);
  return ref;
}
