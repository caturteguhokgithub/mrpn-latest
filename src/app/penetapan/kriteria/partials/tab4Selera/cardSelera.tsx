import React, { Fragment } from "react";
import { Button, DialogActions } from "@mui/material";
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

export default function CardSelera() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);
  const [emptyRisk, setEmptyRisk] = React.useState(false);

  const { user } = useAuthorizationVM();

  const { loading, createSelera, requestSelera, setRequestSelera } =
    usePenetapanSelera();

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

  return (
    <Fragment>
      <CardItem
        title="Selera Risiko"
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
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <RiskContent
            handleSaveButton={handleModalOpenSave}
            state={requestSelera}
            setState={setRequestSelera}
            isEmptyRisk={isEmptyRisk}
          />
        )}
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
    </Fragment>
  );
}
