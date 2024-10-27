import React from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import TableDampak from "./table-kriteria-dampak";
import FormDampak from "./form-dampak";
import AddButton from "@/app/components/buttonAdd";

export default function CardDampak() {
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
    <CardItem
      title="Kriteria Dampak"
      addButton={
        <AddButton
          title={"Tambah Kriteria"}
          filled
          small
          onclick={handleModalOpenAdd}
        />
      }
    >
      <TableDampak mode="view" />
      <DialogComponent
        width={800}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
    </CardItem>
  );
}
