import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BlockCard } from "./card";
import { CustomTooltip } from "./chart-risiko";
import theme from "@/theme";

export default function ChartEntitas({ darkMode }: { darkMode?: boolean }) {
  const data = [
    { name: "Kementerian ATR/BPN", rate: 5000 },
    { name: "Kementerian Keuangan", rate: 4000 },
    { name: "Kementerian ESDM", rate: 3000 },
    { name: "Kementerian PUPR", rate: 2000 },
    { name: "Kementerian BUMN", rate: 1000 },
  ];

  const COLORS = ["#00ccff", "#66d6ff", "#99ebff", "	#ccf5ff", "#f3fdff"];

  return (
    <BlockCard title="5 Entitas Teratas">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            left: 80,
          }}
        >
          <XAxis type="number" tick={false} axisLine={false} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{
              fill: darkMode ? "white" : theme.palette.secondary.dark,
              fontSize: 14,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="rate" fill="gray">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </BlockCard>
  );
}
