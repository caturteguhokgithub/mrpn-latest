import React, { Fragment, useEffect } from "react";
import { Button, Chip, DialogActions, Stack, Typography } from "@mui/material";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import FormDampak from "../tab3Impact/form-dampak";
import RiskContent from "@/app/penetapan/selera-risiko/partials/risk";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";
import SeleraMatriks from "./matriks";
import useAuthorizationVM from "@/app/authorizationVM";
import usePenetapanSelera from "./hooks/vm";
import { red, green } from "@mui/material/colors";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doReqSeleraApprovalDto } from "./hooks/model";
import FormNote from "./partials/form-note";

export default function CardSelera() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);
  const [emptyRisk, setEmptyRisk] = React.useState(false);
  const { objectState } = usePenetapanGlobalVM();

  const { user } = useAuthorizationVM();

  const {
    loading,
    createSelera,
    requestSelera,
    setRequestSelera,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
    getApprovalSelera,
    stateApproval,
    stateSelera,
    getSelera,
    updateApproval,
    isEditSeleraRisiko,
    handleEditSeleraRisiko,
    modalReject,
    setModalReject,
  } = usePenetapanSelera();

  useEffect(() => {
    getSelera();
  }, [objectState?.id]);

  useEffect(() => {
    getApprovalSelera();
  }, [stateSelera?.seleraRisiko]);

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

  const handleUpdateStatus = async (status: string, msg = "") => {
    if (stateApproval) {
      const param: doReqSeleraApprovalDto = {
        ...stateApproval,
        id: stateSelera?.seleraRisiko[0].id ?? 0,
        status: status,
        message: msg,
      };

      updateApproval(param);
    }
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  const handleModalOpenSave = () => {
    createSelera(requestSelera);
    handleEditSeleraRisiko();
  };

  const handleSetRisk = () => {
    setEmptyRisk(!emptyRisk);
  };

  const isEmptyRisk = true;
  const isStatus = stateApproval.status;

  console.log(stateSelera);

  const pernyataan =
    user?.type === "BAPPENAS"
      ? stateSelera?.referensi?.[0]?.pernyataan ?? ""
      : stateSelera?.seleraRisiko?.[0]?.pernyataan ?? "";

  return (
    <Fragment>
      <CardItem
        title={
          <Stack direction="row" gap={1} alignItems="center">
            Selera Risiko
            {user?.type == "NON BAPPENAS" ? (
              <Chip
                color={
                  isStatus === "rejected"
                    ? "error"
                    : isStatus === "draft"
                    ? "default"
                    : "warning"
                }
                label={
                  <Typography
                    fontWeight={600}
                    fontSize={13}
                    textTransform="uppercase"
                  >
                    {isStatus === "rejected"
                      ? "Rejected"
                      : isStatus === "draft"
                      ? "Draft"
                      : "Review"}
                  </Typography>
                }
                sx={{ px: 1 }}
              />
            ) : (
              ""
            )}
            {isStatus === "rejected" ? (
              <Typography fontSize={14} color={red[700]}>
                Ditolak tanggal:{" "}
                <Typography component="strong" fontWeight={600} fontSize={14}>
                  {stateApproval?.created_at
                    ? new Date(stateApproval.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </Typography>
              </Typography>
            ) : isStatus === "approve" ? (
              <Typography fontSize={14} color={green[700]}>
                Disetujui tanggal:{" "}
                <Typography component="strong" fontWeight={600} fontSize={14}>
                  {stateApproval?.created_at
                    ? new Date(stateApproval.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </Typography>
              </Typography>
            ) : (
              ""
            )}
            {isStatus === "rejected" && (
              <Button
                size="small"
                color="error"
                variant="contained"
                startIcon={<Iconify name="mdi:pencil" />}
                sx={{
                  whiteSpace: "nowrap",
                  borderRadius: 50,
                  px: 2,
                }}
                onClick={() => setModalReject(true)}
              >
                Catatan
              </Button>
            )}
          </Stack>
        }
        addButton={
          <Fragment>
            {user?.type == "NON BAPPENAS" && (
              <AddButton
                noMargin
                startIcon={<Iconify name="mdi:chart-bar-stacked" />}
                title="Matriks Referensi"
                onclick={() => setModalOpenRef(true)}
              />
            )}
            {pernyataan !== "" && !isEditSeleraRisiko && (
              <AddButton
                noMargin
                filled
                startIcon={<Iconify name="mdi:pencil" />}
                title="Edit Selera Risiko"
                onclick={handleEditSeleraRisiko}
              />
            )}
          </Fragment>
        }
        sxCardContent={{
          maxHeight: "calc(100vh - 404px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 3,
          },
        }}
      >
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <RiskContent
          handleSaveButton={handleModalOpenSave}
          stateSelera={stateSelera}
          state={requestSelera}
          setState={setRequestSelera}
          isEmptyRisk={isEmptyRisk}
          handleConfirm={() => setOpenModalConfirmApproval(true)}
          isEditSeleraRisiko={isEditSeleraRisiko}
        />
        {/* )} */}
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
      <DialogComponent
        width={1200}
        closeButton
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title={
          <Stack direction="row" gap={1} alignItems="center">
            Matriks Referensi Selera Risiko
            <Chip
              color="primary"
              label={stateSelera?.seleraRisiko[0]?.type_nilai ?? ""}
              sx={{
                fontSize: 14,
                px: 1,
              }}
            />
          </Stack>
        }
      >
        <SeleraMatriks
          penetapan
          levelId={1}
          dataSelera={stateSelera}
          levelDampak={
            Array.isArray(stateSelera?.referensi) &&
            stateSelera.referensi.length > 0
              ? stateSelera?.referensi[0].type_nilai.toLowerCase()
              : ""
          }
        />
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
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                handleUpdateStatus("review");
                setOpenModalConfirmApproval(false);
              }}
            >
              Ya
            </Button>
          </DialogActions>
        }
      >
        Apakah Anda yakin ingin mengajukan approval?
      </DialogComponent>
      <DialogComponent
        width={480}
        title="Catatan Penolakan"
        dialogOpen={modalReject ?? false}
        dialogClose={() => setModalReject?.(false)}
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button color="error" onClick={() => setModalReject?.(false)}>
              Tidak
            </Button>
            <Button
              color="error"
              variant="contained"
              type="submit"
              onClick={async () => {
                setModalReject?.(false);
                await handleUpdateStatus("rejected", stateApproval?.message);
              }}
            >
              Tolak
            </Button>
          </DialogActions>
        }
      >
        <Stack gap={1}>
          <Typography>
            Apakah Anda yakin ingin <strong>MENOLAK PENGESAHAN</strong>?<br />
            Tuliskan catatan penolakan
          </Typography>

          <FormNote
            state={stateApproval}
            // setState={setStateApproval}
            mode="add"
          />
        </Stack>
      </DialogComponent>
    </Fragment>
  );
}
