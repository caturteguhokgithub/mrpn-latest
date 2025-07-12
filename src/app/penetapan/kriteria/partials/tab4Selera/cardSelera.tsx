import React, { Fragment } from "react";
import { Button, Chip, DialogActions, Stack, Typography } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "../tab3Impact/form-dampak";
import RiskContent from "@/app/penetapan/selera-risiko/partials/risk";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import SeleraMatriks from "./matriks";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";
import useAuthorizationVM from "@/app/authorizationVM";
import usePenetapanSelera from "./hooks/vm";
import { red, green } from "@mui/material/colors";

export default function CardSelera() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);
  const [emptyRisk, setEmptyRisk] = React.useState(false);

  const { user } = useAuthorizationVM();

  const {
    loading,
    createSelera,
    requestSelera,
    setRequestSelera,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
  } = usePenetapanSelera();

  const handleModalClose = () => {
    setModalOpenAdd(false);
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
  };

  const handleSetRisk = () => {
    setEmptyRisk(!emptyRisk);
  };

  const isEmptyRisk = true;
  const isStatus = "reject";

  return (
    <Fragment>
      <CardItem
        title={
          <Stack direction="row" gap={1} alignItems="center">
            Selera Risiko
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
            {isStatus === "reject" ? (
              <Typography fontSize={14} color={red[700]}>
                Ditolak tanggal:{" "}
                <Typography component="strong" fontWeight={600} fontSize={14}>
                  28 Juni 2025
                </Typography>
              </Typography>
            ) : isStatus === "approve" ? (
              <Typography fontSize={14} color={green[700]}>
                Disetujui tanggal:{" "}
                <Typography component="strong" fontWeight={600} fontSize={14}>
                  28 Juni 2025
                </Typography>
              </Typography>
            ) : (
              ""
            )}
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
                // onClick={() => setOpenModal(true)}
              >
                Catatan
              </Button>
            )}
          </Stack>
        }
        addButton={
          <Fragment>
            {user?.role.name == "Komite MRPN LS" ||
            user?.role.name == "Super Admin" ? (
              <AddButton
                noMargin
                startIcon={<Iconify name="mdi:chart-bar-stacked" />}
                title="Matriks Referensi"
                onclick={() => setModalOpenRef(true)}
              />
            ) : (
              ""
            )}
            <Fragment>
              {!isEmptyRisk && (
                <AddButton
                  noMargin
                  filled
                  startIcon={<Iconify name="mdi:pencil" />}
                  title="Edit Selera Risiko"
                  onclick={handleSetRisk}
                />
              )}
            </Fragment>
          </Fragment>
        }
      >
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <RiskContent
          handleSaveButton={handleModalOpenSave}
          state={requestSelera}
          setState={setRequestSelera}
          isEmptyRisk={isEmptyRisk}
          handleConfirm={() => setOpenModalConfirmApproval(true)}
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
        title={`Matriks Referensi Selera Risiko Moderat`}
      >
        <SeleraMatriks levelId={1} levelDampak="rendah" />
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
