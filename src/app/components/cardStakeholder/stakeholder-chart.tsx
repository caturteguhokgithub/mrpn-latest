import React from "react";
import OrgChart from "@dabeng/react-orgchart";
import { Box, Divider, Grow, Stack, Tooltip } from "@mui/material";
import "@dabeng/react-orgchart/dist/ChartNode.css";
import "@dabeng/react-orgchart/dist/ChartContainer.css";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { styleOrgChart, styleOrgChart2 } from "@/app/executive-summary/style";
import ImageGalleryStakeholder from "../../executive-summary/partials/tab2Profile/partials/imageSearch";
import DraggableScroll from "../../executive-summary/partials/tab2Profile/partials/draggableScroll";
import Image from "next/image";
import {
  ExsumStakeholderResDto,
  ExsumStakeholderValueDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderModel";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { IconEmptyImage } from "@/components/icons";

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
            <IconFA name="circle-plus" size={14} color="White" />
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

const InstanceLogo = ({ data }: { data: MiscMasterListStakeholderRes[] }) => {
  return (
    <Stack gap={2} direction={"row"} justifyContent={"center"} flexWrap="wrap">
      {data.map((item, index) => (
        <Tooltip
          title={item.value}
          followCursor
          TransitionComponent={Grow}
          key={index}
        >
          {item.icon == null || item.icon == "" ? (
            <IconEmptyImage width={60} />
          ) : (
            <Image
              alt={item.value}
              src={process.env.NEXT_PUBLIC_BASE_URL_FILES + item.icon}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "60px",
                userSelect: "none",
                touchAction: "none",
              }}
            />
          )}
        </Tooltip>
      ))}
    </Stack>
  );
};

export default function StakeholderChart({
  data,
}: {
  data: ExsumStakeholderResDto[];
}) {
  const coordinator = data.find((x) => x.type == "COORDINATION");
  const mainEntity = data.find((x) => x.type == "MAIN_ENTITY");
  const support = data.find((x) => x.type == "SUPPORT");

  const ds = {
    name: `Kementerian Koordinator`,
    title: <InstanceLogo data={coordinator?.stakeholder ?? []} />,
    children: [
      {
        name: "Entitas Sektor Utama",
        title: <InstanceLogo data={mainEntity?.stakeholder ?? []} />,
        children: [
          {
            name: "Entitas Pendukung",
            title: <InstanceLogo data={support?.stakeholder ?? []} />,
          },
        ],
      },
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
