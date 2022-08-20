import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const color = ["#ff6600", "#ff2200", "#a34100", "#853500"];

export default function Grouped({ data, countries }) {
  return (
    <BarChart
      width={window.innerWidth * 0.9}
      height={window.innerHeight * 0.7}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {countries.map((value, index) => {
        return (
          <Bar
            key={index}
            dataKey={value}
            fill={color[index]}
            label={{ fill: "white", fontSize: 10 }}
          />
        );
      })}
    </BarChart>
  );
}
