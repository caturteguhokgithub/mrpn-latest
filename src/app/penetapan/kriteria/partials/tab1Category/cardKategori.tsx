import React from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import CollapsibleTable from "./table-kategori-collapsible";
import FormCategory from "./form-category";
import DialogDelete from "@/app/components/dialogDelete";

export default function CardKategori() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenAddCategory, setModalOpenAddCategory] = React.useState(false);
  const [modalOpenCategory, setModalOpenCategory] = React.useState(false);
  const [modalOpenDelete, setModalDelete] = React.useState(false);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false), setModalOpenCategory(false);
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
        title="Kategori Risiko"
        infoTooltip={
          <>
            Pengelompokan risiko misalnya berdasarkan sumber risiko (melalui
            metode <em>Risk Breakdown Structure</em>), area yang terkena dampak
            (melalui metode <em>Work Breakdown Structure</em>), atau kategori
            lainnya. Kategorisasi risiko pada umumnya dilakukan untuk membantu
            proses analisis dan evaluasi risiko serta membantu proses perumusan
            strategi penanganannya
          </>
        }
        setting
        settingAddOnclickOnly={() => setModalOpenAdd(true)}
      >
        {/* <TableKategori mode="view" /> */}
        <CollapsibleTable
          handleEdit={() => setModalOpenCategory(true)}
          handleDelete={() => setModalDelete(true)}
        />
      </CardItem>
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kategori Risiko"
        dialogFooter={dialogActionFooter}
      >
        <FormCategory mode="add" />
      </DialogComponent>
      <DialogComponent
        width={500}
        dialogOpen={modalOpenCategory}
        dialogClose={() => setModalOpenCategory(false)}
        title="Ubah Kategori"
        dialogFooter={dialogActionFooter}
      >
        <FormCategory mode="edit" />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {}}
      />
    </>
  );
}
