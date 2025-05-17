import React, { Fragment, useState } from "react";
import { Button, DialogActions, Stack } from "@mui/material";
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
import { ResultCategory } from "./hooks/categoryModel";
import useAuthorizationVM from "@/app/authorizationVM";

export default function CardKategori() {
  const [modalOpenRef, setModalOpenRef] = React.useState(false);
  const [dataValueCategory, setDataValueCategory] = useState<string>("");

  const {
    createCategory,
    requestCategory,
    setRequestCategory,
    modalOpenAdd,
    setModalOpenAdd,
    masterCategory,
    modalOpenCategory,
    setModalOpenCategory,
    updateSubCategory,
    requestSubCategory,
    setRequestSubCategory,
    modalOpenDelete,
    setModalDelete,
    deleteSubCategory,
    setDataCategory,
    listDataCategory,
  } = useCategoryList();

  const handleCreate = async () => {
    createCategory(requestCategory);
  };

  const handleUpdateSubCategory = async () => {
    updateSubCategory(requestSubCategory);
  };

  const handleDeleteSubCategory = async () => {
    deleteSubCategory(requestSubCategory);
  };

  const handleEdit = (item: any) => {
    setModalOpenCategory(true);
    console.log(item);

    const tempItem = {
      penetapan_kategori_risiko_id: item.id,
      id: item.sub_kategori_risiko.id,
      desc: item.sub_kategori_risiko.desc,
      value: item.sub_kategori_risiko.value,
    };
    setRequestSubCategory(tempItem);
    setDataValueCategory(item.value)
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

  const dialogActionFooterEdit = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenCategory(false);
        }}
      >
        Batal
      </Button>
      <Button variant="contained" onClick={handleUpdateSubCategory}>
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
        // setting={!isDeveloping}
        // settingAddOnclickOnly={() => setModalOpenAdd(true)}
        addButton={
          <Stack gap={1} direction="row" alignItems="center">
            <AddButton
              noMargin
              startIcon={<Iconify name="mdi:table" />}
              title="Tabel Referensi"
              onclick={() => setModalOpenRef(true)}
            />
            <AddButton
              noMargin
              filled
              startIcon={<Iconify name="mdi:plus-circle" />}
              title="Tambah Kategori Risiko"
              onclick={() => setModalOpenAdd(true)}
            />
          </Stack>
        }
      >
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <Fragment>
          <CollapsibleTable
            handleEdit={(row: any) => handleEdit(row)}
            handleDelete={() => setModalDelete(true)}
            setRequestEdit={setRequestSubCategory}
          />
        </Fragment>
        {/* )} */}
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
          listMasterCategory={masterCategory}
        />
      </DialogComponent>
      <DialogComponent
        width={500}
        dialogOpen={modalOpenCategory}
        dialogClose={() => setModalOpenCategory(false)}
        title="Ubah Sub Kategori"
        dialogFooter={dialogActionFooterEdit}
      >
        <FormCategory
          mode="edit"
          stateSubCat={requestSubCategory}
          setStateSubCat={setRequestSubCategory}
          listMasterCategory={masterCategory}
          cat={dataValueCategory}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {
          handleDeleteSubCategory();
        }}
      />
      <DialogComponent
        tableMode
        width={1400}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kategori Risiko"
        closeButton
      >
        <TableRerefence />
      </DialogComponent>
    </Fragment>
  );
}
