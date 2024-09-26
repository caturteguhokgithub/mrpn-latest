"use client";

import ContentPage from "@/app/components/contents";
import React, {useEffect} from "react";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Grow,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import Tab1Background from "./partials/tab1Background";
import Tab2Profile from "./partials/tab2Profile";
import Tab3Fot from "./partials/tab3Fot";
import Tab3Diagram from "./partials/tab3Diagram";
import Tab4Profile from "./partials/tab4Profile";
import Tab4Diagram from "./partials/tab4Diagram";
import Tab5Roadmap from "./partials/tab5Roadmap";
import Tab6Critical from "./partials/tab6Critical";
import Tab7Regulation from "./partials/tab7Regulation";
import Tab8Fund from "./partials/tab8Fund";
import Tab9Indication from "./partials/tab9Indication";
import { CustomTab, styleDownload, styleTab, styleTabPanel } from "./style";
import DropdownRkp from "@/components/dropdown/dropdownRkp";
import { SxParams, TabPanelProps } from "./types";
import Tab7Stakeholder from "./partials/tab7Stakeholder";
import {useExsumContext, useRKPContext} from "@/lib/core/hooks/useHooks";
import useRkpVM from "@/components/dropdown/rkpVM";
import Tab9Risk from "@/app/executive-summary/partials/tab9Risk";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, project, tabLevel, ...other } = props;

  const sxParams: SxParams = { tabLevel: tabLevel };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ display: (project === "5") ? "none" : "block" }}
    >
      {value === index && <Box sx={styleTabPanel(sxParams)}>{children}</Box>}
    </div>
  );
}

export default function PageExecutiveSummaryContent({}) {

  const {rkp, rkpState} = useRKPContext(state => state);

  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState(""); // rkpState
  const [valueTabChild, setValueTabChild] = React.useState(0);
  const [btnShowTab, setBtnShowTab] = React.useState(false);

  const handleChangeProject = (value: any) => {
    setProject(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeTabChild = (event: any, newValue: any) => {
    setValueTabChild(newValue);
  };

  const usetheme = useTheme();
  const breakpointDownMd = useMediaQuery(usetheme.breakpoints.down("md"));

  const downloadAttachment = (
    <Chip
      color="primary"
      variant="outlined"
      label={
        <Stack direction="row" gap={1}>
          <IconFA size={14} name="download" color={theme.palette.primary.main} />
          {breakpointDownMd ? null : "Download Lampiran"}
        </Stack>
      }
      sx={styleDownload}
    />
  );

  const sxParamsOutlined: SxParams = { variant: "outlined" };
  const sxParamsFilled: SxParams = { variant: "filled" };
  const condTabHeightLv1 = btnShowTab ? "0" : "unset";
  const condTabHeightLv2 = btnShowTab ? "3" : "2";

  return (
    <ContentPage
      overflowHidden
      withCard={(rkpState === undefined)}
      noMarginBotttom
    >
      {(rkpState === undefined) ? (
        <EmptyState
          icon={<IconEmptyPage />}
          title="Halaman Executive Summary (RPJMN) Kosong"
          description="Silahkan pilih kegiatan pembangunan di bawah ini"
          button={
            <DropdownRkp
              handleChangeProject={handleChangeProject}
              variant="primary"
            />
          }
        />
      ) : null}
      <Collapse in={!(rkpState === undefined)}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={styleTab(sxParamsFilled)}
            >
              <Tab
                label="Latar Belakang"
                {...a11yProps(0)}
                iconPosition="start"
                icon={<IconFA size={16} name="pen-to-square" />}
              />
              <Tab
                label="Kerangka Pikir"
                {...a11yProps(1)}
                iconPosition="start"
                icon={<IconFA size={16} name="lightbulb" sx={{ width: "auto" }} />}
              />
              <Tab
                label={`Profil ${rkpState?.level}`}
                {...a11yProps(2)}
                iconPosition="start"
                icon={
                  <IconFA size={16} name="address-card" sx={{ width: "auto" }} />
                }
              />
              <Tab
                label="Cascading"
                {...a11yProps(3)}
                iconPosition="start"
                icon={
                  <IconFA size={16} name="layer-group" sx={{ width: "auto" }} />
                }
              />
              <Tab
                label="Project Roadmap"
                {...a11yProps(4)}
                iconPosition="start"
                icon={<IconFA size={16} name="route" sx={{ width: "auto" }} />}
                sx={{ display: (rkpState === undefined) ? "none" : "inline-flex" }}
              />
              <Tab
                label="Critical Path"
                {...a11yProps(5)}
                iconPosition="start"
                icon={
                  <IconFA
                    size={16}
                    name="exclamation-triangle"
                    sx={{ width: "auto" }}
                  />
                }
                sx={{ display: (rkpState === undefined) ? "none" : "inline-flex" }}
              />
              <Tab
                label="Kelembagaan & Regulasi"
                {...a11yProps(6)}
                iconPosition="start"
                icon={<IconFA size={16} name="gavel" sx={{ width: "auto" }} />}
              />
              <Tab
                label="Pendanaan & Investasi"
                {...a11yProps(7)}
                iconPosition="start"
                icon={
                  <IconFA size={16} name="dollar-sign" sx={{ width: "auto" }} />
                }
              />
              <Tab
                label="Indikasi Risiko RPJMN"
                {...a11yProps(8)}
                iconPosition="start"
                icon={<IconFA size={16} name="rotate" sx={{ width: "auto" }} />}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} tabLevel={condTabHeightLv1}>
            <Tab1Background project={project} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} tabLevel="1">
            <Tabs
              value={valueTabChild}
              onChange={handleChangeTabChild}
              sx={styleTab(sxParamsOutlined)}
              variant="fullWidth"
            >
              <Tab label="Matriks TOWS" {...a11yProps(0)} />
              <Tab label="Diagram" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel
              value={valueTabChild}
              index={0}
              tabLevel={condTabHeightLv2}
            >
              <Tab3Fot project={project} />
            </CustomTabPanel>
            <CustomTabPanel
              value={valueTabChild}
              index={1}
              tabLevel={condTabHeightLv2}
            >
              <Tab3Diagram project={project} />
            </CustomTabPanel>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2} tabLevel={condTabHeightLv1}>
            <Tab2Profile project={project} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3} tabLevel={"1"}>
            <Tabs
              value={valueTabChild}
              onChange={handleChangeTabChild}
              sx={styleTab(sxParamsOutlined)}
              variant="fullWidth"
            >
              <Tab label="Profil RO/Project" {...a11yProps(0)} />
              <Tab label="Diagram" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel
              value={valueTabChild}
              index={0}
              tabLevel={condTabHeightLv2}
            >
              <Tab4Profile project={project} />
            </CustomTabPanel>
            <CustomTabPanel
              value={valueTabChild}
              index={1}
              tabLevel={condTabHeightLv2}
            >
              <Tab4Diagram project={project} />
            </CustomTabPanel>
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={4}
            project={project}
            tabLevel={condTabHeightLv1}
          >
            <Tab5Roadmap project={project} />
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={5}
            project={project}
            tabLevel={condTabHeightLv1}
          >
            <Tab6Critical project={project} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6} tabLevel="1">
            <Tabs
              value={valueTabChild}
              onChange={handleChangeTabChild}
              sx={styleTab(sxParamsOutlined)}
              variant="fullWidth"
            >
              <Tab label="Kelembagaan" {...a11yProps(0)} />
              <Tab label="Regulasi" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel
              value={valueTabChild}
              index={0}
              tabLevel={condTabHeightLv2}
            >
              <Tab7Stakeholder project={project} />
            </CustomTabPanel>
            <CustomTabPanel
              value={valueTabChild}
              index={1}
              tabLevel={condTabHeightLv2}
            >
              <Tab7Regulation project={project} />
            </CustomTabPanel>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7} tabLevel={condTabHeightLv1}>
            <Tab8Fund project={project} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8} tabLevel={condTabHeightLv1}>
            <Tab9Indication project={project} />
          </CustomTabPanel>
        </Box>
      </Collapse>
    </ContentPage>
  );
}