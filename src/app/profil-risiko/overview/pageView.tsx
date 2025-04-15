"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
  useMediaQuery,
} from "@mui/material";
import MRTPerlakuanComplete from "../perlakuan/partials/mrt-complete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import useRiskOverviewVM from "@/app/profil-risiko/overview/pageVM";
import HeaderTable from "./partials/headerTable";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import { styleTab } from "@/app/executive-summary/style";
import { TabPanelProps } from "@/app/executive-summary/types";
import theme from "@/theme";
import SeleraMatriks from "./partials/matriks";
import CardItem from "@/app/components/cardTabItem";
import { IconFA } from "@/app/components/icons/icon-fa";

interface SxParams {
  variant?: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, project, ...other } = props;

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
        <Box
          sx={{
            p: 0,
            mt: 0,
            //   height: "calc(100vh - 344px)",
            // height: "calc(100vh - 332px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "calc(100vh - 366px)",
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PageOverviewView() {
  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const {
    dataRiskOverview,
    getRiskOverviewData,
    valueOverview,
    handleChangeOverview,
    a11yProps,
  } = useRiskOverviewVM();

  useEffect(() => {
    if (objectState !== undefined) getRiskOverviewData();
  }, [objectState]);

  const sxParams: SxParams = { variant: "default" };
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEmpty = false;

  return (
    <ContentPage
      title={`Overview Risiko ${
        year == 0 ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end : "Tahun " + year
      }`}
      withCard={objectState === undefined}
      chooseObject={
        year == 0 ? (
          ""
        ) : (
          <FormControl size="small" sx={{ width: "20vw" }}>
            <AutocompleteSelectSingle
              rounded
              value={objectState}
              options={objects}
              getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
              handleChange={(val: MasterListObjectRes) => setObjectState(val)}
              placeHolder={"Pilih KP"}
            />
          </FormControl>
        )
      }
    >
      <Stack gap={3}>
        {objectState === undefined ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title={year == 0 ? "Tidak ada data yang ditampilkan" : "Pilih KP"}
            description={
              year == 0
                ? "Silahkan pilih RKP terlebih dulu"
                : "Silahkan pilih KP terlebih dulu"
            }
          />
        ) : (
          <>
            <Paper elevation={2} sx={{ borderRadius: "1.25rem", p: 0, m: 1 }}>
              <HeaderTable asTable viewOnly data={dataRiskOverview?.object} />
            </Paper>
            <Box>
              <Tabs
                value={valueOverview}
                onChange={handleChangeOverview}
                sx={styleTab(sxParams)}
              >
                <Tab
                  label="Indikasi Profil Risiko"
                  {...a11yProps(0)}
                  iconPosition="start"
                  icon={<Iconify name="mdi:gauge" />}
                />
                <Tab
                  label="Profil Risiko"
                  {...a11yProps(1)}
                  iconPosition="start"
                  icon={<Iconify name="mdi:account-box" />}
                />
                <Tab
                  label="Selera Risiko"
                  {...a11yProps(2)}
                  iconPosition="start"
                  icon={<Iconify name="mdi:flask" />}
                />
              </Tabs>
              <CustomTabPanel value={valueOverview} index={0}>
                {isEmpty ? (
                  <EmptyState
                    dense
                    icon={<IconEmptyData width={100} />}
                    title="Data Kosong"
                    description="Silahkan isi konten halaman ini"
                  />
                ) : (
                  <Box className="table-sticky-horizontal">
                    <MRTPerlakuanComplete
                      dataTable={dataRiskOverview?.overviews}
                      viewOnly
                      renderCaption={
                        <Stack direction="row" alignItems="center">
                          <Typography fontWeight={600} fontSize={17} px={1}>
                            Perlakuan Risiko (Indikasi Profil Risiko)
                          </Typography>
                          <AddButton
                            fullWidth={onlySmallScreen}
                            noMargin
                            filled
                            title="Download Excel"
                            color="success"
                            startIcon={<Iconify name="mdi:file-excel" />}
                            // onclick={() => {
                            //   const uri =
                            //     process.env.NEXT_PUBLIC_BASE_URL_API +
                            //     "export/exsum/indikasi/excel";
                            //   const token = sessionStorage.getItem(
                            //     API_CONSTANT.token
                            //   );
                            //   const exsum_id = exsum.id;
                            //   const params =
                            //     "token=" + token + "&exsum_id=" + exsum_id;

                            //   window
                            //     .open(uri + "?" + params, "_blank")
                            //     ?.focus();
                            // }}
                          />
                        </Stack>
                      }
                    />
                  </Box>
                )}
              </CustomTabPanel>
              <CustomTabPanel value={valueOverview} index={1}>
                {isEmpty ? (
                  <EmptyState
                    dense
                    icon={<IconEmptyData width={100} />}
                    title="Data Kosong"
                    description="Silahkan isi konten halaman ini"
                  />
                ) : (
                  <Box className="table-sticky-horizontal">
                    <MRTPerlakuanComplete
                      dataTable={dataRiskOverview?.overviews}
                      viewOnly
                      renderCaption={
                        <Stack direction="row" alignItems="center">
                          <Typography fontWeight={600} fontSize={17} px={1}>
                            Perlakuan Risiko (Profil Risiko)
                          </Typography>
                        </Stack>
                      }
                    />
                  </Box>
                )}
              </CustomTabPanel>
              <CustomTabPanel value={valueOverview} index={2}>
                {isEmpty ? (
                  <EmptyState
                    dense
                    icon={<IconEmptyData width={100} />}
                    title="Data Kosong"
                    description="Silahkan isi konten halaman ini"
                  />
                ) : (
                  <CardItem title="Selera Risiko">
                    <SeleraMatriks levelId={1} levelDampak="rendah" />
                  </CardItem>
                )}
              </CustomTabPanel>
            </Box>
          </>
        )}
      </Stack>
    </ContentPage>
  );
}
