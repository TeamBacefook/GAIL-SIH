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
  "rgb(30, 119, 180)",
  "rgb(152, 223, 138)",
  "rgb(140, 86, 75)",
  "rgb(199, 199, 199)",
  "rgb(174, 199, 232)",
  "rgb(214, 39, 40)",
  "rgb(196, 156, 148)",
  "rgb(188, 189, 34)",
  "rgb(255, 127, 120)",
  "rgb(148, 103, 189)",
  "rgb(247, 182, 210)",
  "rgb(23, 190, 207)",
  "rgb(197, 176, 213)",
  "rgb(127, 127, 127)",
  "rgb(158, 218, 219)",
];

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
