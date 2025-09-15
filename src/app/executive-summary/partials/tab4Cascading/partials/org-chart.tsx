import React, { SetStateAction, useMemo } from "react";
import OrgChart from "@dabeng/react-orgchart";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import "@dabeng/react-orgchart/dist/ChartNode.css";
import "@dabeng/react-orgchart/dist/ChartContainer.css";
import theme from "@/theme";
import { styleList, styleOrgChart } from "@/app/executive-summary/style";
import { grey, orange } from "@mui/material/colors";
import DialogComponent from "@/components/dialog";
import {
  ExsumCascadingStateDto,
  RKPCascadingDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramModel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DraggableScroll from "../../tab2Profile/partials/draggableScroll";
import { SxParams } from "@/app/executive-summary/types";

import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { FormatIDR } from "@/lib/utils/currency";
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
          display="none"
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

const FundSource = ({ value, isYear }: { value: string; isYear?: boolean }) => {
  return (
    <Stack
      display="inline-flex"
      direction="row"
      alignItems="center"
      boxSizing="border-box"
      border={`2px solid ${grey[300]}`}
      borderRadius="8px"
    >
      <Box
        color={theme.palette.primary.dark}
        bgcolor={grey[300]}
        border={`2px solid ${grey[300]}`}
        p="8px 16px"
        fontWeight={500}
        letterSpacing={0.2}
        fontSize={14}
        minWidth={isYear ? 0 : 120}
      >
        Total Kebutuhan Pendanaan
      </Box>
      <Box
        p="8px 16px"
        fontWeight={700}
        fontSize={14}
        flexGrow={1}
        textAlign="right"
      >
        {value}
      </Box>
    </Stack>
  );
};

const ItemProP = ({
  isKey,
  description,
}: {
  isKey?: boolean;
  description: string;
}) => {
  return (
    <ListItem sx={{ p: 0, alignItems: "flex-start" }}>
      <ListItemIcon
        sx={{
          minWidth: 0,
          position: "relative",
          top: isKey ? 4 : 7,
          width: 10,
        }}
      >
        {isKey ? (
          <Iconify name="mdi:key-variant" size={12} color={orange[800]} />
        ) : (
          <Iconify name="mdi:circle" size={6} />
        )}
      </ListItemIcon>
      <Tooltip title={isKey ? "Intervensi Kunci" : null} followCursor>
        <ListItemText
          primary={description}
          sx={{
            m: 0,
            color: isKey ? orange[800] : "inherit",
          }}
        />
      </Tooltip>
    </ListItem>
  );
};

type OrgDto = {
  name: string | React.ReactElement;
  title: string | React.ReactElement;
  children: OrgDto[] | undefined;
};

export default function CascadingOrgChart({
  setModal,
  data,
  setState,
  deleteData,
}: {
  setModal: any;
  data: RKPCascadingDto;
  setState: (value: SetStateAction<ExsumCascadingStateDto>) => void;
  deleteData: any;
}) {
  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  const [modalOpenImg, setModalOpenImg] = React.useState(false);

  const handleModalImg = () => {
    setModalOpenImg(true);
  };

  const handleModalClose = () => {
    setModalOpenImg(false);
  };

  const GenerateData = () =>
    useMemo(() => {
      const pn = data.pn;
      let result: OrgDto = {
        name: `PN - ${pn.code}`,
        title: pn.value,
        children: [],
      };
      pn.pp.map((pp) => {
        const ppData: OrgDto = {
          name: `PP - ${pp.code}`,
          title: pp.value,
          children: [],
        };
        pp.kp.map((kp) => {
          const kpData: OrgDto = {
            name: `KP - ${kp.code}`,
            title: kp.value,
            children: [],
          };

          const ssrKPData: OrgDto = {
            name: (
              <Stack
                justifyContent="center"
                direction="row"
                alignItems="center"
              >
                SASARAN
              </Stack>
            ),
            title: (
              <List dense sx={styleList}>
                {kp.sasaran.map((ssrKP) => (
                  <ItemProP description={`${ssrKP.code} - ${ssrKP.value}`} />
                ))}
              </List>
            ),
            children: [],
          };

          const indData: OrgDto = {
            name: (
              <Stack
                justifyContent="center"
                direction="row"
                alignItems="center"
              >
                INDIKATOR
              </Stack>
            ),
            title: (
              <List dense sx={styleList}>
                {kp.sasaran.map((ssrKP) =>
                  ssrKP.indikator.map((ind) => (
                    <ItemProP description={`${ind.code} - ${ind.value}`} />
                  ))
                )}
              </List>
            ),
            children: [],
          };

          kp.prop.map((prop) => {
            const propData: OrgDto = {
              name: prop.value,
              title: (
                <List dense sx={styleList}>
                  {prop.ro.map((ros) => (
                    <ItemProP
                      isKey={ros.intervention}
                      description={`${ros.value} (${ros.kementrian?.value}) (${ros.kementrian?.type})`}
                    />
                  ))}
                </List>
              ),
              children: undefined,
            };
            indData.children?.push(propData);
          });

          ssrKPData.children?.push(indData);

          kpData.children?.push(ssrKPData);

          ppData.children?.push(kpData);
        });
        result.children?.push(ppData);
      });
      return result;
    }, [data]);

  const sxParamsFull: SxParams = { variant: "full" };
  const sxParamsZoom: SxParams = { variant: "zoom" };

  // React.useEffect(() => {
  //   const element = document.querySelector(".orgchart > ul > li > .oc-node");
  //   if (element) {
  //     element.classList.add("isChildrenCollapsed");
  //   }
  //   const elementHidden = document.querySelector(
  //     ".orgchart > ul > li > .oc-node + ul"
  //   );
  //   if (elementHidden) {
  //     elementHidden.classList.add("hidden");
  //   }
  // }, []);

  return (
    <>
      <Stack gap={2} direction="row">
        <FundSource value={`${FormatIDR(data.total_anggaran / 1000)} Juta`} />
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify name="mdi:magnify-plus" size={18} />}
            sx={{ height: 45, px: 3, borderRadius: 2 }}
            onClick={handleModalImg}
          >
            Perbesar Chart
          </Button>
        </Box>
      </Stack>
      <Box sx={styleOrgChart(sxParamsZoom)} mt={4}>
        <TransformWrapper
          centerOnInit
          initialScale={1}
          initialPositionX={200}
          initialPositionY={100}
        >
          <TransformComponent>
            <OrgChart
              datasource={GenerateData()}
              NodeTemplate={NodeTemplate}
              containerClass="containerClass"
              chartClass="chartClass"
            />
          </TransformComponent>
        </TransformWrapper>
      </Box>
      <DialogComponent
        width="100%"
        maxHeight="100vh"
        dialogOpen={modalOpenImg}
        dialogClose={handleModalClose}
        sx={{
          ".transform-component-module_wrapper__SPB86": {
            width: "100%",
            height: "100vh",
          },
          ".MuiDialogContent-root": {
            p: 0,
          },
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 9999 }}
          onClick={handleModalClose}
        >
          <Iconify name="mdi:close-circle" color="red" size={32} />
        </IconButton>
        <TransformWrapper
          //   centerOnInit
          initialScale={0.5}
          //   initialPositionX={0}
          //   initialPositionY={0}
          minScale={0.1}
          maxScale={3}
          limitToBounds={true}
          doubleClick={{ disabled: false }}
          wheel={{ disabled: false }}
          panning={{ disabled: false }}
        >
          <TransformComponent>
            <Box sx={styleOrgChart(sxParamsFull)} mt={4}>
              <DraggableScroll
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingBottom: 1,
                  "&::-webkit-scrollbar": {
                    height: "3px",
                  },
                }}
              >
                <OrgChart
                  datasource={GenerateData()}
                  NodeTemplate={NodeTemplate}
                  containerClass="containerClass"
                  chartClass="chartClass"
                />
              </DraggableScroll>
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </DialogComponent>
    </>
  );
}
