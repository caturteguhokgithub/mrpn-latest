import React, { Fragment } from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "../tab3Impact/form-dampak";
import RiskContent from "@/app/penetapan/selera-risiko/partials/risk";

export default function CardSelera() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

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

  const handleModalOpenSave = () => {};

  return (
    <Fragment>
      <CardItem title="Selera Risiko">
        <RiskContent handleSaveButton={handleModalOpenSave} />
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
    </Fragment>
  );
}
