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

const COLORS = [
  "#e41a1c",
  "#377eb8",
  "#4daf4a",
  "#984ea3",
  "#ff7f00",
  "#a65628",
  "#ffff33",

  "#f781bf",
  "#999999",
];

export default function DataLineChart({ width, height, data, unit = "" }) {
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
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip
          formatter={(value) => {
            console.log(value);
            return value + " " + unit;
          }}
        />
        <Legend />
        {Object.keys(data[0]).map((key, index) => {
          return (
            <React.Fragment key={index}>
              {key !== "year" && key !== "metric" && key !== "commodity" && (
                <Line
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index]}
                  dot={false}
                  strokeWidth={3}
                />
              )}
            </React.Fragment>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
