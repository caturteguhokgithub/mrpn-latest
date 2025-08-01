"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import DashboardLayout from "@/components/layouts/layout";
import {
  Box,
  Button,
  DialogActions,
  ListItem,
  Paper,
  Stack,
  TextField,
  ToggleButtonGroup,
  Typography,
  alpha,
} from "@mui/material";
import { IconFA } from "@/components/icons/icon-fa";
import theme from "@/theme";
import CustomToggleButton from "@/components/toggleButton";
import FormatKL from "@/app/penetapan/selera-risiko/partials/formatKl";
import { CardWithStamp } from "@/components/card-w-stamp";
import { LabelRadio } from "@/components/labelRadio";
import DialogComponent from "@/components/dialog";
import FormReject from "../nota-dinas/partials/form-reject";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";
import usePenetapanSelera from "@/app/penetapan/kriteria/partials/tab4Selera/hooks/vm";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doReqSeleraApprovalDto } from "@/app/penetapan/kriteria/partials/tab4Selera/hooks/model";

export default function PageApprovalSelera() {
  usePermissionChecker("approval.seleraRisiko");

  const [approvalStamp, setApprovalStamp] = React.useState(false);
  const [rejectStamp, setRejectStamp] = React.useState(false);
  const [buttonStamp, setButtonStamp] = React.useState(true);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const nilaiOptions = ["Rendah", "Konservatif", "Moderat", "Tinggi"];
  const { objectState } = usePenetapanGlobalVM();

  const {
    getApprovalSelera,
    setStateApproval,
    stateApproval,
    updateApproval,
    getSelera,
    requestSelera,
    stateSelera,
    setRequestSelera
  } = usePenetapanSelera();

  useEffect(() => {
    getSelera();
  }, [objectState?.id]);

  useEffect(() => {
    getApprovalSelera();
  }, [stateSelera?.seleraRisiko]);

  useEffect(() => {
    if (stateApproval.status == "approved") {
      setApprovalStamp(true);
      setButtonStamp(false);
    } else if (stateApproval.status == "rejected") {
      setRejectStamp(true);
      setButtonStamp(false);
      setModalOpenAdd(false);
    }
  }, [stateApproval]);


  const handleApprovalStamp = async (status: string, msg = "") => {
    if (stateApproval) {
      const param: doReqSeleraApprovalDto = {
        ...stateApproval,
        id: stateSelera?.seleraRisiko[0].id ?? 0,
        status: status,
        message: msg
      };

      updateApproval(param);
    }
  };

  const handleModalOpen = () => {
    setModalOpenAdd(true);
  };

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button
        variant="contained"
        type="submit"
        color="error"
        onClick={() => handleApprovalStamp("rejected", stateApproval.message)}
      >
        Reject
      </Button>
    </DialogActions>
  );

  return (
    <>
      <DashboardLayout>
        <ContentPage
          title="Approval Selera Risiko"
          infoToolTip={
            <>
              <strong>Selera Risiko</strong>
              <p>
                Jumlah dan jenis risiko yang bersedia diterima oleh suatu
                entitas atau organisasi pemerintahan dalam mengejar tujuannya
              </p>
            </>
          }
          chipKp
          addButton={
            buttonStamp ? (
              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<IconFA name="thumbs-down" size={14} />}
                  sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
                  onClick={handleModalOpen}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<IconFA name="thumbs-up" size={14} />}
                  sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
                  onClick={() => {
                    handleApprovalStamp("approved")
                  }}
                >
                  Approve
                </Button>
              </Stack>
            ) : (
              false
            )
          }
        >
          <CardWithStamp
            rejectStamp={rejectStamp}
            approvalStamp={approvalStamp}
          >
            <Paper
              elevation={2}
              sx={{
                p: "1.5rem",
                borderRadius: "1.25rem",
                m: approvalStamp || rejectStamp ? 0 : 1,
              }}
            >
              <Box
                mb={2}
                p={2}
                bgcolor={theme.palette.primary.light}
                borderRadius={3}
              >
                <Typography component="p">
                  Selera risiko adalah jenis/jumlah (nilai absolut) dari risiko
                  yang siap diambil dalam proses pencapaian sasaran PKPPR,
                  dengan pilihan sebagai berikut.
                </Typography>
              </Box>
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  [theme.breakpoints.down("md")]: {
                    gridTemplateColumns: "1fr 1fr",
                  },
                  [theme.breakpoints.down("sm")]: {
                    gridTemplateColumns: "1fr",
                  },
                  gap: 2,
                  mt: 2,
                  button: {
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                    "&.Mui-selected": {
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      ".MuiBox-root": {
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                        borderRight: "1px solid white",
                      },
                      "&:hover": {
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                      },
                    },
                  },
                }}
              >
                {nilaiOptions.map((option) => (
                  <CustomToggleButton
                    key={option}
                    value={option}
                    label={option}
                    minheight={60}
                    approvalPage={stateSelera?.seleraRisiko[0]?.type_nilai === option}
                    disabled={stateSelera?.seleraRisiko[0]?.type_nilai !== option}
                  />
                ))}
              </ToggleButtonGroup>

              {/* Apa bener cuman Konservatif ajj yg dimunculin? */}
              {/* <Box mt={2}>
                <LabelRadio
                  heading="KONSERVATIF"
                  rangeValue={"7-12"}
                  description={
                    <Stack gap={1}>
                      <FormatKL
                        listItem={
                          <>
                            <ListItem sx={{ display: "list-item" }}>
                              Toleransi terbatas atas hasil yang tidak pasti
                              dalam pencapaian visi, misi, atau tujuan strategis
                              Pembangunan Nasional.
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                              Akan menerima risiko jika pencapaian hasil sangat
                              penting untuk visi, misi, atau tujuan strategis
                              Pembangunan Nasional.
                            </ListItem>
                          </>
                        }
                      />
                    </Stack>
                  }
                />
              </Box> */}


            </Paper>
          </CardWithStamp>
          {/* {buttonStamp && (
      <Stack mt={3} direction="row" justifyContent="flex-end">
       <Stack direction="row" gap={1}>
        <Button
         variant="outlined"
         color="error"
         startIcon={<IconFA name="thumbs-down" size={14} />}
         sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
         onClick={handleRejectStamp}
        >
         Reject
        </Button>
        <Button
         variant="contained"
         color="success"
         startIcon={<IconFA name="thumbs-up" size={14} />}
         sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
         onClick={handleApprovalStamp}
        >
         Approve
        </Button>
       </Stack>
      </Stack>
     )} */}
        </ContentPage>
      </DashboardLayout>
      <DialogComponent
        width={480}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tuliskan Alasan Reject"
        dialogFooter={dialogActionFooter}
      >
        <FormReject state={stateApproval} setState={setStateApproval} mode="add" />
      </DialogComponent>
    </>
  );
}
