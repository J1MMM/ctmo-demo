import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const aData = [10, 10, 12, 5, 9];
const bData = [5, 20, 3, 25, 20];
const cData = [0, 9, 1, 4, 2];
const xLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function LineGraph() {
  return (
    <LineChart
      height={350}
      series={[
        { data: aData, label: "Added", color: "#2499EF" },
        { data: bData, label: "Renewed", color: "#532F9D" },
        { data: cData, label: "Revoked", color: "#E15759" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: -5,

          labelStyle: {
            fontSize: 12,
          },
        },
      }}
    />
  );
}
