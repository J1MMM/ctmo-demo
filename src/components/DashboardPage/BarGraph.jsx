import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import useData from "../../hooks/useData";

const otherSetting = {
  grid: { horizontal: true },
};
const defaultDataset = [
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Mon",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Tue",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Wed",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Thu",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Fri",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Sat",
  },
  {
    added: 0,
    renewed: 0,
    revoked: 0,
    key: "Today",
  },
];
const valueFormatter = (value) => `${value} clients`;

export default function BarGraph({ dataset }) {
  let data = defaultDataset;
  if (
    dataset != undefined &&
    dataset.length > 0 &&
    typeof dataset == "object"
  ) {
    data = dataset;
  }
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "key" }]}
      series={[
        {
          dataKey: "added",
          label: "Added",
          valueFormatter,
          color: "#7E57C2",
        },
        {
          dataKey: "renewed",
          label: "Renewed",
          valueFormatter,
          color: "#409AE9",
        },
        {
          dataKey: "revoked",
          label: "Revoked",
          valueFormatter,
          color: "#9DCFF8",
        },
      ]}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: -5,
          itemMarkHeight: 15,
          itemMarkWidth: 15,
          labelStyle: {
            fontSize: 12,
          },
        },
      }}
      {...otherSetting}
    />
  );
}
