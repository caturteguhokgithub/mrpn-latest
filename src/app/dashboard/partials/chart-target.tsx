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

export default function ChartTarget({}) {
 const data = [
  {
   name: "Jan",
   uv: 4000,
   pv: 2400,
   amt: 2400,
  },
  {
   name: "Apr",
   uv: 3000,
   pv: 1398,
   amt: 2210,
  },
  {
   name: "Jul",
   uv: 2000,
   pv: 9800,
   amt: 2290,
  },
  {
   name: "Okt",
   uv: 2780,
   pv: 3908,
   amt: 2000,
  },
  {
   name: "Des",
   uv: 1890,
   pv: 4800,
   amt: 2181,
  },
 ];
 const COLORS = ["#00ccff", "#66d6ff", "#99ebff", "	#ccf5ff", "#f3fdff"];

 return (
  <BlockCard title="Target & Realisasi Penurunan Risiko">
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
     <Tooltip />
     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
   </ResponsiveContainer>
  </BlockCard>
 );
}
