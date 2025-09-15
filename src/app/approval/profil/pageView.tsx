"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MRTPerlakuanComplete from "@/app/profil-risiko/perlakuan/partials/mrt-complete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import HeaderIdentifikasi from "@/app/profil-risiko/identifikasi/partials/header";
import useRiskOverviewVM from "@/app/profil-risiko/overview/pageVM";
import { IconFA } from "@/components/icons/icon-fa";
import DialogComponent from "@/components/dialog";
import FormReject from "@/app/approval/nota-dinas/partials/form-reject";
import { CardWithStamp } from "@/components/card-w-stamp";
import { dtoGetApproval } from "@/app/penetapan/objek/pageModel";
import Iconify from "@/components/icons/iconify";

export default function PageApprovalProfilView() {
  const { year } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();
  const [approvalStamp, setApprovalStamp] = React.useState(false);
  const [rejectStamp, setRejectStamp] = React.useState(false);
  const [buttonStamp, setButtonStamp] = React.useState(true);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const {
    dataRiskOverview,
    getRiskOverviewData,
    getApproval,
    updateApproval,
    stateApproval,
    setStateApproval,
  } = useRiskOverviewVM();

  useEffect(() => {
    if (year > 0) getMasterListObject();
  }, [year]);

  useEffect(() => {
    if (objectState !== undefined) {
      getRiskOverviewData();
      getApproval();
    }
  }, [objectState]);

  useEffect(() => {
    setApprovalStamp(false);
    setRejectStamp(false);
    setButtonStamp(false);

    if (stateApproval.status === "approved") {
      setApprovalStamp(true);
    } else if (stateApproval.status === "rejected") {
      setRejectStamp(true);
      setModalOpenAdd(false);
    }
  }, [stateApproval]);

  const handleApprovalStamp = async (status: string, msg = "") => {
    if (stateApproval) {
      const param: dtoGetApproval = {
        ...stateApproval,
        id: objectState?.id ?? 0,
        status: status,
        message: msg,
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

  return (
    <ContentPage
      title="Approval Profil Risiko"
      infoToolTip={
        <>
          <strong>Profil Risiko</strong>
          <p>
            Representasi komprehensif dari keseluruhan karakteristik risiko yang
            dihadapi oleh suatu organisasi, proyek, atau inisiatif pembangunan,
            yang mencakup identifikasi, analisis, dan evaluasi risiko tersebut.
            Profil ini memberikan pandangan menyeluruh tentang sifat, skala, dan
            kompleksitas risiko yang terkait, serta kemungkinan dampaknya
            terhadap pencapaian sasaran dan tujuan pembangunan
          </p>
        </>
      }
      withCard={objectState === undefined}
      chooseObject={
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
      }
      addButton={
        stateApproval.status == "review" && (
          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Iconify name="mdi:thumb-down" size={16} />}
              sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
              onClick={handleModalOpen}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<Iconify name="mdi:thumb-up" size={16} />}
              sx={{ px: 3, borderRadius: 12, whiteSpace: "nowrap" }}
              onClick={() => {
                handleApprovalStamp("approved");
              }}
            >
              Approve
            </Button>
          </Stack>
        )
      }
    >
      <Stack gap={1}>
        {objectState === undefined ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Pilih KP"
            description="Silahkan pilih KP terlebih dulu"
          />
        ) : (
          <>
            <CardWithStamp
              rejectStamp={rejectStamp}
              approvalStamp={approvalStamp}
            >
              <Paper elevation={2} sx={{ borderRadius: "1.25rem", p: 0, m: 1 }}>
                <HeaderIdentifikasi
                  asTable
                  viewOnly
                  data={dataRiskOverview?.object}
                />
              </Paper>
            </CardWithStamp>

            <CardWithStamp
              rejectStamp={rejectStamp}
              approvalStamp={approvalStamp}
            >
              <Box className="table-sticky-horizontal">
                <MRTPerlakuanComplete
                  dataTable={dataRiskOverview?.overviews}
                  viewOnly
                  renderCaption={
                    <Typography fontWeight={600} fontSize={17} px={1}>
                      Perlakuan Risiko
                    </Typography>
                  }
                />
              </Box>
            </CardWithStamp>
          </>
        )}
      </Stack>

      <DialogComponent
        width={480}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tuliskan Alasan Reject"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={handleModalClose}>Batal</Button>
            <Button
              variant="contained"
              type="submit"
              color="error"
              onClick={() =>
                handleApprovalStamp("rejected", stateApproval.message)
              }
            >
              Reject
            </Button>
          </DialogActions>
        }
      >
        {/* <FormReject mode="add" /> */}
        <FormReject
          state={stateApproval}
          setState={setStateApproval}
          mode="add"
        />
      </DialogComponent>
    </ContentPage>
  );
}
