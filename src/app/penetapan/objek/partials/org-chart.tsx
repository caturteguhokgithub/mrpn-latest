import React, { SetStateAction, useEffect, useMemo, useState } from "react";
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
import { IconFA } from "@/components/icons/icon-fa";
import { styleList, styleOrgChart } from "@/app/executive-summary/style";
import { grey, orange } from "@mui/material/colors";
import DialogComponent from "@/components/dialog";
import { RKPCascadingDto } from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramModel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DraggableScroll from "@/app/executive-summary/partials/tab2Profile/partials/draggableScroll";
import { SxParams } from "@/app/executive-summary/types";
import { usePenetapanTopicContext } from "@/lib/core/hooks/useHooks";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
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
        sx={{ minWidth: 0, position: "relative", top: 5, width: 10 }}
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

export default function CascadingPenetapanObjectOrgChart() {
  const { stateCascading, getPenetapanObjectCascading } =
    usePenetapanObjectVM();

  const { objectState } = usePenetapanTopicContext((state) => state);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (objectState !== undefined) {
      getPenetapanObjectCascading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectState]);

  const [modalOpenImg, setModalOpenImg] = React.useState(false);

  const handleModalImg = () => {
    setModalOpenImg(true);
  };

  const handleModalClose = () => {
    setModalOpenImg(false);
  };

  // const GenerateData = () =>
  //   useMemo(() => {
  //     let object: OrgDto = {
  //       name: ``,
  //       title: ``,
  //       children: [],
  //     };

  //     if (objectState !== undefined) {
  //       object = {
  //         name: `Topic`,
  //         title: `${objectState.topik}`,
  //         children: [],
  //       };
  //     }

  //     let total = 0;

  //     if (!Array.isArray(stateCascading)) {
  //       console.error("stateCascading is undefined or not an array", stateCascading);
  //       return object;
  //     }

  //     stateCascading.forEach((pnData) => {
  //       total += pnData?.total_anggaran || 0;

  //       const pn = pnData?.pn;
  //       let result: OrgDto = {
  //         name: `PN - ${pn?.code || "Unknown"}`,
  //         title: pn?.value || "No Title",
  //         children: [],
  //       };

  //       // **Gabungkan semua PP jadi satu string**
  //       const allPPs = pn?.pp?.map((pp) => `(${pp.code}) ${pp.value}`).join(", ") || "No PP";

  //       let ppData: OrgDto = {
  //         name: `PP`,
  //         title: allPPs,
  //         children: [],
  //       };

  //       // **Gabungkan semua KP jadi satu string**
  //       const allKPs = pn?.pp
  //         ?.flatMap((pp) => pp.kp)
  //         .map((kp) => `(${kp.code}) ${kp.value}`)
  //         .join(", ") || "No KP";

  //       let kpData: OrgDto = {
  //         name: `KP`,
  //         title: allKPs,
  //         children: [],
  //       };

  //       // **Ambil sasaran (harus dari KP pertama)**
  //       const firstKP = pn?.pp?.[0]?.kp?.[0];
  //       if (firstKP?.sasaran) {
  //         let ssrKPData: OrgDto = {
  //           name: `SASARAN - ${firstKP.sasaran.code || "Unknown"}`,
  //           title: firstKP.sasaran.value || "No Title",
  //           children: [],
  //         };

  //         const ind = firstKP.sasaran.indikator;
  //         if (ind) {
  //           let indData: OrgDto = {
  //             name: (
  //               <Stack justifyContent="center" direction="row" alignItems="center">
  //                 {`INDIKATOR`}
  //               </Stack>
  //             ),
  //             title: (
  //               <List dense sx={styleList}>
  //                 {Array.isArray(ind?.value) ? (
  //                   ind.value.map((ros, idx) => <ItemProP key={idx} description={ros} />)
  //                 ) : (
  //                   <></>
  //                 )}
  //               </List>
  //             ),
  //             children: [],
  //           };

  //           if (Array.isArray(ind?.prop)) {
  //             ind.prop.forEach((props) => {
  //               if (Array.isArray(props)) {
  //                 props.forEach((prop) => {
  //                   let propData: OrgDto = {
  //                     name: prop?.value || "Unknown",
  //                     title: (
  //                       <List dense sx={styleList}>
  //                         {Array.isArray(prop?.ro)
  //                           ? prop.ro.map((ros, idx) => (
  //                             <ItemProP
  //                               key={idx}
  //                               isKey={ros?.intervention || false}
  //                               description={`${ros?.value || "No Value"} (${ros?.kementerian || "No Ministry"})`}
  //                             />
  //                           ))
  //                           : null}
  //                       </List>
  //                     ),
  //                     children: undefined,
  //                   };
  //                   indData.children?.push(propData);
  //                 });
  //               }
  //             });
  //           }

  //           ssrKPData.children?.push(indData);
  //         }

  //         kpData.children?.push(ssrKPData);
  //       }

  //       ppData.children?.push(kpData);
  //       result.children?.push(ppData);
  //       object.children?.push(result);
  //     });

  //     setTotal(total);
  //     return object;
  //   }, [stateCascading]);

  const GenerateData = () =>
    useMemo(() => {
      let object: OrgDto = {
        name: ``,
        title: ``,
        children: [],
      };

      if (objectState !== undefined) {
        object = {
          name: `Topic`,
          title: `${objectState.topik}`,
          children: [],
        };
      }

      return object;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objectState]);

  const sxParamsFull: SxParams = { variant: "full" };
  const sxParamsZoom: SxParams = { variant: "zoom" };

  React.useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector(".orgchart > ul > li > .oc-node");
      if (element) {
        element.classList.add("isChildrenCollapsed");
      }
      const innerUl = document.querySelector(
        ".orgchart > ul > li > .oc-node + ul"
      );
      // if (innerUl) {
      //   innerUl.removeAttribute("class");
      // }
      if (innerUl) {
        innerUl.classList.add("hidden");
      }
    }, 1000);
  }, []);

  return (
    <>
      <Stack gap={2} direction="row">
        <FundSource value={`${FormatIDR(total / 1000)} Juta`} />
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
