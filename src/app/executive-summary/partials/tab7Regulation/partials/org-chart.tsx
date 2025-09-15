import React from "react";
import OrgChart from "@dabeng/react-orgchart";
import { Box, Divider, Stack } from "@mui/material";
import "@dabeng/react-orgchart/dist/ChartNode.css";
import "@dabeng/react-orgchart/dist/ChartContainer.css";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { IconFA } from "@/components/icons/icon-fa";
import { styleOrgChart2 } from "@/app/executive-summary/style";
import Iconify from "@/components/icons/iconify";

const NodeTemplate = ({ nodeData }: { nodeData: any }) => {
  const isAssistant = nodeData.isAssistant === true;
  const nodeClass = isAssistant ? "has-assistant" : "";

  return (
    <Stack
      mt={0.5}
      border={`1px solid ${theme.palette.primary.main}`}
      borderRadius={2}
      className={nodeClass}
    >
      <Box position="relative">
        <Box
          position="absolute"
          top="50%"
          left={8}
          sx={{ transform: "translateY(-50%)" }}
        >
          {nodeData.children && nodeData.children.length > 0 && (
            <Iconify name="mdi:plus-circle" size={16} color="White" />
          )}
        </Box>
        <Box
          px={4}
          py={0.5}
          bgcolor={theme.palette.primary.main}
          borderRadius={2}
          sx={{ borderEndStartRadius: 0, borderEndEndRadius: 0 }}
          color="white"
        >
          {nodeData.name}
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={1} fontWeight={500}>
        {nodeData.title}
      </Box>
    </Stack>
  );
};

export default function InstitutionOrgChart() {
  const ds = {
    name: "Program/Kegiatan",
    title: "Penurunan stunting",
    children: [
      { name: "Koordinator", title: "Kemenko Bappenas", isAssistant: true },
      {
        name: "Entitas MRPN Sektor Utama",
        title: "K/L Z",
      },
      { name: "Entitas MRPN Pendukung", title: "K/L Y" },
      { name: "Entitas MRPN Pendukung", title: "K/L X" },
      { name: "Entitas MRPN Pendukung", title: "Pemda" },
    ],
  };

  return (
    <Box sx={styleOrgChart2}>
      <OrgChart
        datasource={ds}
        NodeTemplate={NodeTemplate}
        containerClass="containerClass"
        chartClass="chartClass"
      />
    </Box>
  );
}
