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
import { Box, Typography } from "@mui/material";
import theme from "@/theme";

export const CustomTooltip = ({ label }: { label?: any }) => {
  return (
    <Box
      borderRadius={5}
      bgcolor="white"
      px={3}
      py={1}
      boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
    >
      <Typography fontSize={18} color={theme.palette.primary.dark}>
        {label}
      </Typography>
    </Box>
  );
};

export default function ChartRisiko({ darkMode }: { darkMode?: boolean }) {
  const data = [
    { name: "Keuangan", rate: 5000 },
    { name: "Teknologi", rate: 4000 },
    { name: "Lingkungan", rate: 3000 },
    { name: "Governance", rate: 2000 },
    { name: "Reputasi", rate: 1000 },
  ];

  //  const COLORS = ["#7BD3EA", "#A5DD9B", "#FADFA1", "#F9B572", "#FF8080"];

  const COLORS = ["#e25316", "#ea6228", "#ec733f", "#ef8456", "#f1956e"];

  return (
    <BlockCard title="5 Risiko Teratas" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            left: 80,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
          {/* <Legend /> */}
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
