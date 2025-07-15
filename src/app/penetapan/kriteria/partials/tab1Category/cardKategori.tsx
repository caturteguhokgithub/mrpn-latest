"use client";

import React, { Fragment, useState } from "react";
import {
  Button,
  DialogActions,
  FormControl,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import CollapsibleTable from "./table-kategori-collapsible";
import FormCategory from "./form-category";
import DialogDelete from "@/components/dialogDelete";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";
import TableRerefence from "./table-reference";
import useCategoryList from "./hooks/useCategory";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { TextareaStyled } from "@/components/textarea";

export default function CardKategori() {
  const [modalOpenRef, setModalOpenRef] = React.useState(false);
  const [dataValueCategory, setDataValueCategory] = useState<string>("");

  const {
    createCategory,
    requestMasterCategory,
    setRequestMasterCategory,
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
    createMasterCategory,
    modalOpenAddMasterCategory,
    setModalOpenAddMasterCategory,
    handleAdd,
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

  const handleUpdateOrCreateMasterCategory = async () => {
    // console.log(requestMasterCategory);

    createMasterCategory(requestMasterCategory);
  };

  const handleEdit = (item: any) => {
    setModalOpenCategory(true);

    const tempItem = {
      penetapan_kategori_risiko_id: item.id,
      id: item.sub_kategori_risiko.id,
      desc: item.sub_kategori_risiko.desc,
      value: item.sub_kategori_risiko.value,
    };
    setRequestSubCategory(tempItem);
    setDataValueCategory(item.value);
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
            {/* <AddButton
              noMargin
              startIcon={<Iconify name="mdi:table" />}
              title="Tabel Referensi"
              onclick={() => setModalOpenRef(true)}
            /> */}
            <AddButton
              noMargin
              filled
              startIcon={<Iconify name="mdi:plus-circle" />}
              title="Tambah Kategori Risiko"
              onclick={handleAdd}
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
            listDataCategory={listDataCategory}
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
          setModalOpenAddMasterCategory={setModalOpenAddMasterCategory}
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
      <DialogComponent
        width={500}
        dialogOpen={modalOpenAddMasterCategory}
        dialogClose={() => setModalOpenAddMasterCategory(false)}
        title="Tambah Kategori"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalOpenAddMasterCategory(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleUpdateOrCreateMasterCategory}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldLabelInfo title="Kategori Risiko" />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Kategori Risiko"
              value={requestMasterCategory?.value ?? ""}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setRequestMasterCategory((prev) => ({
                  ...prev,
                  value: e.target.value,
                }));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FieldLabelInfo title="Uraian Kategori Risiko" />
            <FormControl fullWidth>
              <TextareaStyled
                // width="100%"
                minRows={2}
                aria-label=""
                placeholder="Sub Kategori"
                onChange={(e) => {
                  setRequestMasterCategory((prev) => ({
                    ...prev,
                    uraian: e.target.value,
                  }));
                }}
              />
            </FormControl>
            {/* <ReactQuill
              value={requestMasterCategory.uraian}
              key={requestMasterCategory.uraian}
              theme="snow"
              defaultValue={requestMasterCategory.uraian}
              forwardedRef={quillRef}
            /> */}
          </Grid>
        </Grid>
      </DialogComponent>
    </Fragment>
  );
}
