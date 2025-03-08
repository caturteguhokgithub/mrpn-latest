import AddButton from "@/app/components/buttonAdd";
import CardItem from "@/app/components/cardTabItem";
import React from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button } from "@mui/material";

export default function CardKemungkinan() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };

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

  return (
    <>
      <CardItem
        title="Kriteria Kemungkinan"
        // addButton={
        //  <AddButton
        //   filled
        //   small
        //   title="Tambah Kriteria Kemungkinan"
        //   onclick={handleModalOpenAdd}
        //  />
        // }
        setting
        // settingDeleteOnclick={() => deleteData()}
        settingEditOnclick={handleModalOpenAdd}
      >
        <TableKemungkinan mode="view" />
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan mode="add" />
      </DialogComponent>
    </>
  );
}
