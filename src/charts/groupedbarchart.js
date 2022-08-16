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

const data = [
  {
    name: "Production",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Transformation",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Production",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Consumption",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

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
            dataKey={value}
            fill={color[index]}
            label={{ fill: "white", fontSize: 10 }}
          />
        );
      })}
    </BarChart>
  );
}
