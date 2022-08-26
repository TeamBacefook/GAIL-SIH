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

let COLORS = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

COLORS = COLORS.reverse();

export default function DataLineChart({
  width,
  height,
  data,
  display,
  refi,
  unit = "",
}) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          ref={refi}
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
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip
            formatter={(value) => {
              console.log(value);
              return unit + value;
            }}
          />
          <Legend />
          {Object.keys(data[0]).map((key, index) => {
            return (
              <React.Fragment key={index}>
                {key !== "index" && display.includes(`${key}`) && (
                  <>
                    <Line
                      type="monotone"
                      dataKey={key}
                      stroke={COLORS[index]}
                      dot={false}
                      strokeWidth={3}
                      display={false}
                    />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
