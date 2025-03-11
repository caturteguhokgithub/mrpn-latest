import AddButton from "@/app/components/buttonAdd";
import CardItem from "@/app/components/cardTabItem";
import React from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";

export default function CardKemungkinan() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

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
        addButton={
          <AddButton
            filled
            startIcon={<Iconify name="mdi:chart-bar-stacked" />}
            title="Referensi Tabel"
            onclick={() => setModalOpenRef(true)}
          />
        }
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
      <DialogComponent
        tableMode
        width={1200}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kriteria Kemungkinan"
      >
        <TableKemungkinan mode="view" />
      </DialogComponent>
    </>
  );
}
