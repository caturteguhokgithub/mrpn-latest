"use client";

import ContentPage from "@/components/contents";
import React from "react";
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

export default function PageApprovalSelera() {
  usePermissionChecker("approval.seleraRisiko");

  const [approvalStamp, setApprovalStamp] = React.useState(false);
  const [rejectStamp, setRejectStamp] = React.useState(false);
  const [buttonStamp, setButtonStamp] = React.useState(true);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleApprovalStamp = () => {
    setApprovalStamp(true);
    setButtonStamp(false);
  };

  const handleRejectStamp = () => {
    setRejectStamp(true);
    setButtonStamp(false);
    setModalOpenAdd(false);
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
        onClick={handleRejectStamp}
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
                  onClick={handleApprovalStamp}
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
                <CustomToggleButton
                  value="1"
                  label="Rendah"
                  minheight={60}
                  disabled
                />
                <CustomToggleButton
                  value="2"
                  label="Konservatif"
                  minheight={60}
                  approvalPage
                />
                <CustomToggleButton
                  value="3"
                  label="Moderat"
                  minheight={60}
                  disabled
                />
                <CustomToggleButton
                  value="4"
                  label="Tinggi"
                  minheight={60}
                  disabled
                />
              </ToggleButtonGroup>
              <Box mt={2}>
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
              </Box>
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
        <FormReject mode="add" />
      </DialogComponent>
    </>
  );
}
