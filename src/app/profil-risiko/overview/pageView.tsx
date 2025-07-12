"use client";

import ContentPage from "@/app/components/contents";
import React, { Fragment, useEffect } from "react";
import {
  Box,
  FormControl,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
  useMediaQuery,
  Chip,
  Button,
  DialogActions,
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
import { styleDownload, styleTab } from "@/app/executive-summary/style";
import { TabPanelProps } from "@/app/executive-summary/types";
import theme from "@/theme";
import SeleraMatriks from "./partials/matriks";
import CardItem from "@/app/components/cardTabItem";
import { IconFA } from "@/app/components/icons/icon-fa";
import { isDeveloping } from "@/app/components/layouts/layout";
import EmptyDevelopingState from "@/app/components/empty/developing";
import TableOverview from "./partials/table";
import { green, red } from "@mui/material/colors";
import FormNote from "./partials/form-note";
import DialogComponent from "@/app/components/dialog";

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
    openModal,
    setOpenModal,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
  } = useRiskOverviewVM();

  useEffect(() => {
    if (objectState !== undefined) getRiskOverviewData();
  }, [objectState]);

  const sxParams: SxParams = { variant: "default" };
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEmpty = false;
  const isStatus = "reject";

  return (
    <Fragment>
      <ContentPage
        title={`Overview Risiko ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        withCard={objectState === undefined}
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small">
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
        addButton={
          <Button
            color="success"
            variant="contained"
            endIcon={<Iconify name="mdi:send" />}
            sx={{ whiteSpace: "nowrap", borderRadius: 50 }}
            onClick={() => setOpenModalConfirmApproval(true)}
          >
            Ajukan Approval
          </Button>
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
                    <>
                      <CardItem
                        title={
                          <Stack direction="row" alignItems="center" gap={2}>
                            <Typography fontWeight={500}>
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
                      >
                        <Box className="table-sticky-horizontal table-overview">
                          <TableOverview
                            data={dataRiskOverview?.overviews_sekre ?? []}
                          />
                        </Box>
                      </CardItem>
                      {/* <Box className="table-sticky-horizontal">
                      <MRTPerlakuanComplete
                        dataTable={dataRiskOverview?.overviews}
                        viewOnly
                        renderCaption={
                          <Stack direction="row" alignItems="center" gap={1}>
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
                    </Box> */}
                    </>
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
                    <>
                      <CardItem
                        title="Overview Profil Risiko"
                        addButton={
                          <Stack direction="row" gap={1} alignItems="center">
                            {isStatus === "reject" ? (
                              <Typography fontSize={14} color={red[700]}>
                                Ditolak tanggal:{" "}
                                <Typography
                                  component="strong"
                                  fontWeight={600}
                                  fontSize={14}
                                >
                                  28 Juni 2025
                                </Typography>
                              </Typography>
                            ) : isStatus === "approve" ? (
                              <Typography fontSize={14} color={green[700]}>
                                Disetujui tanggal:{" "}
                                <Typography
                                  component="strong"
                                  fontWeight={600}
                                  fontSize={14}
                                >
                                  28 Juni 2025
                                </Typography>
                              </Typography>
                            ) : (
                              ""
                            )}
                            <Chip
                              color={
                                isStatus === "reject"
                                  ? "error"
                                  : isStatus === "draf"
                                  ? "default"
                                  : "warning"
                              }
                              variant="outlined"
                              label={
                                <Typography
                                  fontWeight={600}
                                  fontSize={13}
                                  textTransform="uppercase"
                                >
                                  {isStatus === "reject"
                                    ? "Reject"
                                    : isStatus === "draf"
                                    ? "Draf"
                                    : "Review"}
                                </Typography>
                              }
                              icon={
                                <Iconify
                                  name={
                                    isStatus === "reject"
                                      ? "mdi:close"
                                      : isStatus === "draf"
                                      ? "mdi:invoice-text-edit"
                                      : "mdi:magnify-expand"
                                  }
                                />
                              }
                              sx={{ px: 2 }}
                            />
                            {isStatus === "reject" && (
                              <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                startIcon={<Iconify name="mdi:pencil" />}
                                sx={{
                                  whiteSpace: "nowrap",
                                  borderRadius: 50,
                                  px: 2,
                                }}
                                onClick={() => setOpenModal(true)}
                              >
                                Catatan
                              </Button>
                            )}
                          </Stack>
                        }
                      >
                        <Box className="table-sticky-horizontal">
                          <TableOverview
                            data={dataRiskOverview?.overviews ?? []}
                          />
                        </Box>
                      </CardItem>
                      {/* <Box className="table-sticky-horizontal">
                      <MRTPerlakuanComplete
                        dataTable={dataRiskOverview?.overviews}
                        viewOnly
                        renderCaption={
                          <Stack direction="row" alignItems="center">
                            <Typography fontWeight={600} fontSize={17} px={1}>
                              Overview Profil Risiko
                            </Typography>
                          </Stack>
                        }
                      />
                    </Box> */}
                    </>
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
                      {isDeveloping ? (
                        <EmptyDevelopingState />
                      ) : (
                        <SeleraMatriks levelId={1} levelDampak="rendah" />
                      )}
                    </CardItem>
                  )}
                </CustomTabPanel>
              </Box>
            </>
          )}
        </Stack>
      </ContentPage>
      <DialogComponent
        width={500}
        dialogOpen={openModal}
        dialogClose={() => setOpenModal(false)}
        title="Catatan Penolakan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setOpenModal(false)}>Batal</Button>
            <Button variant="contained" type="submit">
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormNote mode="add" />
      </DialogComponent>
      <DialogComponent
        width={360}
        dialogOpen={openModalConfirmApproval}
        dialogClose={() => setOpenModalConfirmApproval(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              color="error"
              onClick={() => setOpenModalConfirmApproval(false)}
            >
              Tidak
            </Button>
            <Button variant="contained" type="submit">
              Ya
            </Button>
          </DialogActions>
        }
      >
        Apakah Anda yakin ingin mengajukan approval?
      </DialogComponent>
    </Fragment>
  );
}
