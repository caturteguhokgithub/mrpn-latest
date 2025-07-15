"use client";

import ContentPage from "@/components/contents";
import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import {
  Box,
  Button,
  DialogActions,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import MRTIdentifikasi from "@/app/profil-risiko/identifikasi/partials/mrt";
import { IconFA } from "@/components/icons/icon-fa";
import MRTPerlakuanComplete from "@/app/profil-risiko/perlakuan/partials/mrt-complete";
import { CardWithStamp } from "@/components/card-w-stamp";
import DialogComponent from "@/components/dialog";
import FormReject from "../nota-dinas/partials/form-reject";

export default function PageApprovalProfil() {
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
          title="Approval Profil Risiko"
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
          <Stack
            gap={1}
            sx={{
              transition: "margin all 500ms",
              ".MuiPaper-root ": {
                m: rejectStamp || approvalStamp ? 0 : 1,
              },
            }}
          >
            <CardWithStamp
              rejectStamp={rejectStamp}
              approvalStamp={approvalStamp}
            >
              <MRTIdentifikasi
                viewOnly
                headerOnly
                renderCaption={
                  <Typography fontWeight={600} fontSize={17} px={1}>
                    Identifikasi Risiko
                  </Typography>
                }
              />
            </CardWithStamp>
            <CardWithStamp
              rejectStamp={rejectStamp}
              approvalStamp={approvalStamp}
            >
              <MRTPerlakuanComplete
                viewOnly
                renderCaption={
                  <Typography fontWeight={600} fontSize={17} px={1}>
                    Perlakuan Risiko
                  </Typography>
                }
              />
            </CardWithStamp>
          </Stack>
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
