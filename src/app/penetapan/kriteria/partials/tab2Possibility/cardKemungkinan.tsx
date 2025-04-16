import AddButton from "@/app/components/buttonAdd";
import CardItem from "@/app/components/cardTabItem";
import React, { Fragment } from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";
import usePossibilityList from "./hooks/usePossibility";

export default function CardKemungkinan() {
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

  const {
    modalOpenAdd,
    setModalOpenAdd,
    requestPossibility,
    setRequestPossibility,
    updatePossibility,
  } = usePossibilityList();

  const handleCreate = async () => {
    updatePossibility(requestPossibility);
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false), setModalOpenEdit(false);
        }}
      >
        Batal
      </Button>
      {/* <Button variant="contained" type="submit"> */}
      <Button variant="contained" onClick={handleCreate}>
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <Fragment>
      <CardItem
        title="Kriteria Kemungkinan"
        setting={!isDeveloping}
        settingEditOnclick={() => setModalOpenEdit(true)}
        settingAddOnclick={() => setModalOpenAdd(true)}
        addButton={
          <AddButton
            filled
            startIcon={<Iconify name="mdi:table" />}
            title="Tabel Referensi"
            onclick={() => setModalOpenRef(true)}
          />
        }
      >
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            <TableKemungkinan mode="view" />
          </Fragment>
        )}
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan
          state={requestPossibility}
          setState={setRequestPossibility}
          mode="add"
        />
      </DialogComponent>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenEdit}
        dialogClose={() => setModalOpenEdit(false)}
        title="Ubah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan
          state={requestPossibility}
          setState={setRequestPossibility}
          mode="edit"
        />
      </DialogComponent>
      <DialogComponent
        tableMode
        closeButton
        width={1200}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kriteria Kemungkinan"
      >
        <TableKemungkinan mode="reference" />
      </DialogComponent>
    </Fragment>
  );
}
