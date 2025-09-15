"use client";

import ContentPage from "@/components/contents";
import React from "react";
import { Box, Collapse, Tab, Tabs } from "@mui/material";
import Tab1Background from "./partials/tab1Background";
import Tab2Profile from "./partials/tab2Profile";
import Tab3Fot from "./partials/tab3Fot";
import Tab4Diagram from "./partials/tab4Diagram";
import Tab5Roadmap from "./partials/tab5Roadmap";
import Tab6Critical from "./partials/tab6Critical";
import Tab7Regulation from "./partials/tab7Regulation";
import Tab8Fund from "./partials/tab8Fund";
import Tab9Indication from "./partials/tab9Indication";
import { styleTab, styleTabPanel } from "./style";
import DropdownRkp from "@/components/dropdown/dropdownRkp";
import { SxParams, TabPanelProps } from "./types";
import Tab7Stakeholder from "./partials/tab7Stakeholder";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons/empty-page";
import Iconify from "@/components/icons/iconify";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, project, tabLevel, classname, ...other } =
    props;

  const sxParams: SxParams = { tabLevel: tabLevel };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ display: project === "5" ? "none" : "block" }}
    >
      {value === index && (
        <Box sx={styleTabPanel(sxParams)} className={classname}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PageExecutiveSummaryContent({
  toggleShowTab,
}: {
  toggleShowTab?: boolean;
}) {
  const { rkp, rkpState, rkpOption } = useRKPContext((state) => state);

  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState(""); // rkpState
  const [valueTabChild, setValueTabChild] = React.useState(0);

  const handleChangeProject = (value: any) => {
    setProject(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeTabChild = (event: any, newValue: any) => {
    setValueTabChild(newValue);
  };

  const sxParamsOutlined: SxParams = { variant: "outlined" };
  const sxParamsFilled: SxParams = { variant: "filled" };
  const condTabHeightLv1 = toggleShowTab ? "0" : "unset";
  const condTabHeightLv2 = toggleShowTab ? "3" : "2";
  const condTabCascading = toggleShowTab ? "lv-2" : "lv-2-tab-hide";

  return (
    <ContentPage
      overflowHidden
      withCard={rkpState === undefined}
      noMarginBotttom
      noMinusMargin
    >
      {rkpState === undefined && <DropdownRkp variant="primary" />}
      {rkpOption.length === 0 && (
        <EmptyState
          icon={<IconEmptyPage />}
          title={`Executive Summary Kosong`}
          description={
            rkpOption.length > 0
              ? `Silahkan pilih kegiatan pembangunan di bawah ini`
              : `Executive Summary akan muncul setelah RKP dibuat`
          }
        />
      )}
      <Collapse in={!(rkpState === undefined)}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={styleTab(sxParamsFilled)}
            >
              <Tab
                label={`Profil ${rkpState?.level}`}
                {...a11yProps(0)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:card-account-details" />}
              />
              <Tab
                label="Latar Belakang"
                {...a11yProps(1)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:square-edit-outline" />}
              />
              <Tab
                label="Penyusunan Strategi"
                {...a11yProps(2)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:lightbulb" />}
              />
              <Tab
                label="Indikasi Risiko"
                {...a11yProps(3)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:sync-circle" />}
              />
              <Tab
                label="Cascading"
                {...a11yProps(4)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:layers-triple" />}
              />
              <Tab
                label="Project Roadmap"
                {...a11yProps(5)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:map-marker-path" />}
                sx={{
                  display: rkpState === undefined ? "none" : "inline-flex",
                }}
              />
              <Tab
                label="Critical Path"
                {...a11yProps(6)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:alert" />}
                sx={{
                  display: rkpState === undefined ? "none" : "inline-flex",
                }}
              />
              <Tab
                label="Kelembagaan & Regulasi"
                {...a11yProps(7)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:gavel" />}
              />
              <Tab
                label="Pendanaan & Investasi"
                {...a11yProps(8)}
                iconPosition="start"
                icon={<Iconify size={20} name="mdi:cash-usd" />}
              />
            </Tabs>
          </Box>
          {/* Tab 1 */}
          <CustomTabPanel value={value} index={0} tabLevel={condTabHeightLv1}>
            <Tab2Profile project={project} />
          </CustomTabPanel>
          {/* Tab 2 */}
          <CustomTabPanel value={value} index={1} tabLevel={condTabHeightLv1}>
            <Tab1Background project={project} />
          </CustomTabPanel>
          {/* Tab 3 */}
          <CustomTabPanel value={value} index={2} tabLevel={condTabHeightLv1}>
            <Tab3Fot project={project} />
          </CustomTabPanel>
          {/* <CustomTabPanel value={value} index={2} tabLevel="1">
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
          </CustomTabPanel> */}
          {/* Tab 4 */}
          <CustomTabPanel value={value} index={3} tabLevel={condTabHeightLv1}>
            <Tab9Indication project={project} />
          </CustomTabPanel>
          {/* Tab 5 */}
          <CustomTabPanel
            value={value}
            index={4}
            project={project}
            tabLevel={condTabHeightLv1}
          >
            <Tab4Diagram project={project} />
          </CustomTabPanel>
          {/*<CustomTabPanel value={value} index={4} tabLevel={"1"}>*/}
          {/*  <Tabs*/}
          {/*    value={valueTabChild}*/}
          {/*    onChange={handleChangeTabChild}*/}
          {/*    sx={styleTab(sxParamsOutlined)}*/}
          {/*    variant="fullWidth"*/}
          {/*  >*/}
          {/*    <Tab label="Profil RO/Project" {...a11yProps(0)} />*/}
          {/*    <Tab label="Diagram" {...a11yProps(1)} />*/}
          {/*  </Tabs>*/}
          {/*  <CustomTabPanel*/}
          {/*    value={valueTabChild}*/}
          {/*    index={0}*/}
          {/*    tabLevel={condTabCascading}*/}
          {/*  >*/}
          {/*    <Tab4Profile project={project} toggleShowTab={toggleShowTab} />*/}
          {/*  </CustomTabPanel>*/}
          {/*  <CustomTabPanel*/}
          {/*    value={valueTabChild}*/}
          {/*    index={1}*/}
          {/*    tabLevel={condTabCascading}*/}
          {/*  >*/}
          {/*    <Tab4Diagram project={project} />*/}
          {/*  </CustomTabPanel>*/}
          {/*</CustomTabPanel>*/}
          {/* Tab 6 */}
          <CustomTabPanel
            value={value}
            index={5}
            project={project}
            tabLevel={condTabHeightLv1}
          >
            <Tab5Roadmap project={project} />
          </CustomTabPanel>
          {/* Tab 7 */}
          <CustomTabPanel
            value={value}
            index={6}
            project={project}
            tabLevel={condTabHeightLv1}
          >
            <Tab6Critical project={project} />
          </CustomTabPanel>
          {/* Tab 8 */}
          <CustomTabPanel value={value} index={7} tabLevel="1">
            <Tabs
              value={valueTabChild}
              onChange={handleChangeTabChild}
              sx={styleTab(sxParamsOutlined)}
              variant="fullWidth"
            >
              <Tab label="Instansi Pelaksana" {...a11yProps(0)} />
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
          {/* Tab 9 */}
          <CustomTabPanel value={value} index={8} tabLevel="1">
            <Tabs
              value={valueTabChild}
              onChange={handleChangeTabChild}
              sx={styleTab(sxParamsOutlined)}
              variant="fullWidth"
            >
              <Tab label="Intervensi Kunci" {...a11yProps(0)} />
              <Tab label="Semua" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel
              value={valueTabChild}
              index={0}
              tabLevel={condTabHeightLv2}
            >
              <Tab8Fund project={"not_all"} />
            </CustomTabPanel>
            <CustomTabPanel
              value={valueTabChild}
              index={1}
              tabLevel={condTabHeightLv2}
            >
              <Tab8Fund project={"all"} />
            </CustomTabPanel>
          </CustomTabPanel>
          {/*<CustomTabPanel value={value} index={8} tabLevel={condTabHeightLv1}>*/}
          {/*  <Tab8Fund project={project} />*/}
          {/*</CustomTabPanel>*/}
        </Box>
      </Collapse>
    </ContentPage>
  );
}
