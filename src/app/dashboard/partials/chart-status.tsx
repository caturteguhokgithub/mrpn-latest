import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BlockCard } from "./card";
import theme from "@/theme";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";

export const CustomTooltipPie = ({
  active,
  payload,
}: {
  active?: any;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <Box
        borderRadius={5}
        bgcolor="white"
        px={3}
        py={1}
        boxShadow="0px 10px 15px -3px rgba(0,0,0,0.1)"
      >
        <Typography fontSize={18} color={theme.palette.primary.dark}>
          {`${payload[0].name}`}:{" "}
          <Typography
            component="span"
            fontWeight={800}
          >{`${payload[0].value}%`}</Typography>
        </Typography>
      </Box>
    );
  }

  return null;
};

export default function ChartStatus({ darkMode }: { darkMode?: boolean }) {
  const data = [
    { name: "Selesai", value: 45 },
    { name: "Proses", value: 3 },
    { name: "Belum Mulai", value: 40 },
    { name: "Terlambat", value: 12 },
  ];
  const COLORS = [
    blue[400],
    green[400],
    darkMode ? yellow[400] : yellow[600],
    red[400],
  ];

  const usetheme = useTheme();
  const breakpointDownSm = useMediaQuery(usetheme.breakpoints.down("sm"));
  const breakpointDownXl = useMediaQuery(usetheme.breakpoints.down("xl"));

  return (
    <BlockCard title="Perlakuan Risiko Berdasarkan Status" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx={breakpointDownSm ? 200 : breakpointDownXl ? 300 : 380}
            cy={140}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltipPie />} />
        </PieChart>
      </ResponsiveContainer>
    </BlockCard>
  );
}
