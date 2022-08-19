import React, { useMemo } from "react";
import { Treemap, Tooltip } from "recharts";
import * as d3 from "d3";

const COLORS = {
  natural_gas: [
    "#e6ffe6",
    "#ccffcc",
    "#b3ffb3",
    "#99ff99",
    "#80ff80",
    "#66ff66",
    "#4dff4d",
    "#33ff33",
    "#1aff1a",
    "#00ff00",
    "#00e600",
    "#00cc00",
    "#00b300",
    "#009900",
    "#008000",
    "#006600",
    "#004d00",
    "#003300",
  ],
  biofuels: [
    "#e6f5ff",
    "#ccebff",
    "#b3e0ff",
    "#99d6ff",
    "#80ccff",
    "#66c2ff",
    "#4db8ff",
    "#33adff",
    "#1aa3ff",
    "#0099ff",
    "#008ae6",
    "#007acc",
    "#006bb3",
    "#005c99",
    "#004d80",
    "#003d66",
    "#002e4d",
    "#001f33",
  ],
  oil: [
    "#fff5e6",
    "#ffebcc",
    "#ffe0b3",
    "#ffd699",
    "#ffcc80",
    "#ffc266",
    "#ffb84d",
    "#ffad33",
    "#ffa31a",
    "#ff9900",
    "#e68a00",
    "#cc7a00",
    "#b36b00",
    "#995c00",
    "#804d00",
    "#663d00",
    "#4d2e00",
    "#331f00",
  ],
  electric: [
    "#e6ffff",
    "#ccffff",
    "#b3ffff",
    "#99ffff",
    "#80ffff",
    "#66ffff",
    "#4dffff",
    "#33ffff",
    "#1affff",
    "#00ffff",
    "#00e6e6",
    "#00cccc",
    "#00b3b3",
    "#009999",
    "#008080",
    "#006666",
    "#004d4d",
    "#003333",
  ],
  coal: [
    "#f2f2f2",
    "#e6e6e6",
    "#d9d9d9",
    "#cccccc",
    "#bfbfbf",
    "#b3b3b3",
    "#a6a6a6",
    "#999999",
    "#8c8c8c",
    "#808080",
    "#737373",
    "#666666",
    "#595959",
    "#4d4d4d",
    "#404040",
    "#333333",
    "#262626",
    "#1a1a1a",
  ],
};

const CustomizedContent = (props) => {
  const {
    root,
    depth,
    x,
    y,
    width,
    height,
    index,
    colors,
    name,
    sub_region,
    size,
    // myScale,
  } = props;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth === 1
              ? colors[Math.floor((index / root.children.length) * 6)]
              : "none",
          stroke: "#ffffff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#000000"
          fontSize={props.fontSize(size)}
        >
          {sub_region}
        </text>
      ) : null}
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <p>
        {payload[0].payload.sub_region} : {payload[0].value}
      </p>
    );
  }
  return null;
};

export default function App({ data, g_width, g_height, comm }) {
  let myScale = d3.scaleLinear();
  const getVal = (feat) => feat.size;
  const maxVal = useMemo(() => Math.max(...data?.map(getVal)), [data]);
  myScale.domain([0, maxVal]).range([0, 20]);

  return (
    <Treemap
      width={g_width}
      height={g_height}
      data={data}
      dataKey="size"
      stroke="#000000"
      strokeWidth={0}
      fill="#ffffff"
      content={
        <CustomizedContent colors={COLORS.natural_gas} fontSize={myScale} />
      }
    >
      <Tooltip content={<CustomTooltip />} />
    </Treemap>
  );
}
