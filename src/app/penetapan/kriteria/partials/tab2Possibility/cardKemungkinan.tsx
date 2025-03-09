import AddButton from "@/app/components/buttonAdd";
import CardItem from "@/app/components/cardTabItem";
import React from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button } from "@mui/material";

export default function CardKemungkinan() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false), setModalOpenEdit(false);
        }}
      >
        Batal
      </Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <>
      <CardItem
        title="Kriteria Kemungkinan"
        setting
        settingEditOnclick={() => setModalOpenEdit(true)}
        settingAddOnclick={() => setModalOpenAdd(true)}
      >
        <TableKemungkinan mode="view" />
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan mode="add" />
      </DialogComponent>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenEdit}
        dialogClose={() => setModalOpenEdit(false)}
        title="Ubah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan mode="edit" />
      </DialogComponent>
    </>
  );
}
