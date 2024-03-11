import React from "react";
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tooltip as Mtip } from "@mui/material";

function hashCode(str) {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

const Label = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <text x={x + width / 2} y={y - radius} fill="#f54000" textAnchor="middle" dominantBaseline="middle">
      {value.toFixed(2)}
    </text>
  );
};

const TiltedAxisTick = (props) => {
  const { x, y, payload } = props;
  // const matches = useMediaQuery("(max-width:400px)");

  return (
    <g transform={`translate(${x},${y})`}>
      <Mtip title={payload?.value} arrow>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="middle"
          fontWeight={600}
          fontSize={14}
          // fill="red"
          fill={`#${intToRGB(hashCode(payload?.value))}`}
          // transform={matches ? "rotate(-90)" : "rotate(-45)"}
        >
          {payload.value.match(/\b([A-Z])/g).join("")}
        </text>
      </Mtip>
    </g>
  );
};

export default function BarGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 5,
          // right: 30,
          // left: 20,
          bottom: 0,
        }}
      >
        <XAxis dataKey="skill" tickLine={false} tickCount={5} tick={<TiltedAxisTick />} interval={0} />
        {/* <YAxis axisLine={false} tickLine={false} tick={false} /> */}
        <Tooltip />
        <Legend verticalAlign="top"/>
        <Bar dataKey="You" fill="#FF5400" label={<Label />} name="Your Score"/>
        <Bar dataKey="maxScore" label={<Label />} fill="#424242" name="Maximum Score"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
