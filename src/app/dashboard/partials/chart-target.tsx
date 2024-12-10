import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { BlockCard } from "./card";
import { CustomTooltip } from "./chart-risiko";
import { Box, Divider, Typography } from "@mui/material";

export default function ChartTarget({ darkMode }: { darkMode?: boolean }) {
  const data = [
    {
      name: "TW I",
      target: 24,
      realisasi: 19,
    },
    {
      name: "TW II",
      target: 24,
      realisasi: 23,
    },
    {
      name: "TW III",
      target: 19,
      realisasi: 18,
    },
    {
      name: "TW IV",
      target: 23,
      realisasi: 18,
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: any;
    payload?: any;
    label?: any;
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
          <Typography variant="body1" fontWeight={600}>
            {label === "TW I"
              ? "Triwulan I"
              : label === "TW II"
              ? "Triwulan II"
              : label === "TW III"
              ? "Triwulan III"
              : "Triwulan IV"}
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body1">
            Target:{" "}
            <Typography
              component="span"
              fontWeight={700}
              color="#EF4444"
            >{`${payload[0].value}`}</Typography>
          </Typography>
          <Typography variant="body1">
            Realisasi:{" "}
            <Typography
              component="span"
              fontWeight={700}
              color="#00CCFF"
            >{`${payload[1].value}`}</Typography>
          </Typography>
        </Box>
      );
    }

    return null;
  };

  return (
    <BlockCard title="Target & Realisasi Penurunan Risiko" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#EF4444"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="realisasi"
            stroke="#00CCFF"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BlockCard>
  );
}
