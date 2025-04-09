import React, { Fragment } from "react";
import { Button, DialogActions } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import CollapsibleTable from "./table-kategori-collapsible";
import FormCategory from "./form-category";
import DialogDelete from "@/app/components/dialogDelete";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import TableRerefence from "./table-reference";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";
import useCategoryList from "./hooks/useCategory";

export default function CardKategori() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenCategory, setModalOpenCategory] = React.useState(false);
  const [modalOpenDelete, setModalDelete] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

  const {
    createCategory,
    requestCategory,
    setRequestCategory
  } = useCategoryList();

  const handleCreate = async () => {
    createCategory(requestCategory)
  };

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false), setModalOpenCategory(false);
        }}
      >
        Batal
      </Button>
      <Button variant="contained" onClick={handleCreate}>
        Simpan
      </Button>
      {/* <Button variant="contained" type="submit">
        Simpan
      </Button> */}
    </DialogActions>
  );

  return (
    <Fragment>
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
        setting={!isDeveloping}
        settingAddOnclickOnly={() => setModalOpenAdd(true)}
        addButton={
          <AddButton
            filled
            startIcon={<Iconify name="mdi:chart-bar-stacked" />}
            title="Tabel Referensi"
            onclick={() => setModalOpenRef(true)}
          />
        }
      >
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            {/* <TableKategori mode="view" /> */}
            <CollapsibleTable
              handleEdit={() => setModalOpenCategory(true)}
              handleDelete={() => setModalDelete(true)}
            />
          </Fragment>
        )}
      </CardItem>
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kategori Risiko"
        dialogFooter={dialogActionFooter}
      >
        <FormCategory
          mode="add"
          state={requestCategory}
          setState={setRequestCategory}
        />
      </DialogComponent>
      <DialogComponent
        width={500}
        dialogOpen={modalOpenCategory}
        dialogClose={() => setModalOpenCategory(false)}
        title="Ubah Kategori"
        dialogFooter={dialogActionFooter}
      >
        <FormCategory
          mode="edit"
          state={requestCategory}
          setState={setRequestCategory}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => { }}
      />
      <DialogComponent
        tableMode
        width={1400}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kriteria Kemungkinan"
      >
        <TableRerefence />
      </DialogComponent>
    </Fragment>
  );
}
