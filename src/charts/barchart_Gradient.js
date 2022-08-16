import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import ReactDOM from "react-dom";
import React from "react";


const BarCharts = ({ data, bg1, bg2, label }) => {
  return (
    <BarChart width={500} height={500} data={data}>
      <XAxis dataKey="label" />
      <YAxis />
      <defs>
        <linearGradient
          id="colorUv"
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor="#FFE53B" />
          <stop offset="1" stopColor=bg1 />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="url(#colorUv)" />
    </BarChart>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
