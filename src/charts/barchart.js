import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import React from "react";

const BarCharts = ({
  data,
  bg1,
  bg2,
  g_width,
  g_height,
  c_id,
  orientation = 90,
}) => {
  return (
    <>
      <BarChart
        width={g_width}
        height={g_height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          fontSize={15}
          angle={-orientation}
          dataKey="label"
          // scale="band"
          position="center"
          dy={-5}
          textAnchor="middle"
          scaleToFit={true}
          type="category"
        />
        <YAxis fontSize={10} />
        <defs>
          <linearGradient
            id={c_id}
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            spreadMethod="reflect"
          >
            <stop offset="0" stopColor={bg2} />
            <stop offset="1" stopColor={bg1} />
          </linearGradient>
        </defs>
        <Tooltip />
        <Bar dataKey="value" fill={`url(#${c_id})`} label="label"></Bar>
      </BarChart>
    </>
  );
};

export default BarCharts;
