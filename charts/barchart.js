import { useRef, useEffect } from "react";
import * as d3 from "d3";
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
export default function useBarChart() {
  const ref = useRef();

  const renderChart = () => {
    var margin = { top: 10, right: 30, bottom: 90, left: 40 },
      width = 460 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var svg = d3
      .select(ref.current)
      .append("svg")

      .attr("width", width + margin.left + margin.right)
      .attr("height", 470 + margin.top + margin.bottom)
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
      .call(d3.axisBottom(x))
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
  console.log(ref);
  useEffect(() => {
    if (ref) renderChart();
  }, [ref]);
  return ref;
}
