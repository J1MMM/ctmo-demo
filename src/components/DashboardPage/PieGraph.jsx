import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts";
import { styled } from "@mui/material/styles";
import useData from "../../hooks/useData";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const defaultData = [
  { id: 0, value: 1, label: "Registered", color: "#1A237E" },
  { id: 1, value: 2, label: "Unregistered", color: "#ECEDFC" },
];

export default function PieGraph({ pieData }) {
  return (
    <PieChart
      series={[
        {
          data: pieData || defaultData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 20, additionalRadius: -30, color: "gray" },
          innerRadius: 30,
          cornerRadius: 5,
          startAngle: -180,
          endAngle: 360,
          paddingAngle: 3,
          valueFormatter: (params) =>
            `${params.value} ${params.value > 1 ? "violators" : "violator"}`,
        },
      ]}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "top", horizontal: "left" },
        },
      }}
    ></PieChart>
  );
}
