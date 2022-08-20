import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DataLineChart({ width, height, data, COLOR }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={"value"}
          stroke={COLOR}
          dot={false}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
