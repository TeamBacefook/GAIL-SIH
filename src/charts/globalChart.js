import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DataLineChart({ width, height, data, COLOR, unit }) {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Year" />
      <YAxis
        tickFormatter={(tick) => {
          return `${tick / 1000000}M`;
        }}
      />
      <Tooltip
        formatter={(value) => {
          console.log(value);
          return value + " " + unit;
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey={"value"}
        stroke={COLOR}
        dot={false}
        strokeWidth={3}
      />
    </LineChart>
  );
}
