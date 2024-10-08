"use client";

import ContentPage from "@/app/components/contents";
import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import { Button, DialogActions, Stack } from "@mui/material";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import MRTIdentifikasi from "./partials/mrt";
import AddButton from "@/app/components/buttonAdd";

export default function PageIdentifikasi({}) {
 const [modalOpenView, setModalOpenView] = React.useState(false);
 const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
 const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
 const [modalOpenDelete, setModalOpenDelete] = React.useState(false);
 const [modalOpenAddPeristiwa, setModalOpenAddPeristiwa] =
  React.useState(false);

 const handleModalOpenView = () => {
  setModalOpenView(true);
 };
 const handleModalOpenDelete = () => {
  setModalOpenDelete(true);
 };
 const handleModalOpenAdd = () => {
  setModalOpenAdd(true);
 };
 const handleModalOpenEdit = () => {
  setModalOpenEdit(true);
 };
 const handleModalOpenAddPeristiwa = () => {
  setModalOpenAddPeristiwa(true);
 };

 const handleModalClose = () => {
  setModalOpenView(false);
  setModalOpenDelete(false);
  setModalOpenAdd(false);
  setModalOpenEdit(false);
 };

 const handleModalClosePeristiwa = () => {
  setModalOpenAddPeristiwa(false);
 };

 const dialogActionFooter = (
  <DialogActions sx={{ p: 2, px: 3 }}>
   <Button onClick={handleModalClose}>Batal</Button>
   <Button variant="contained" type="submit">
    Simpan
   </Button>
  </DialogActions>
 );

 const dialogActionDeleteFooter = (
  <DialogActions sx={{ p: 2, px: 3 }}>
   <Button onClick={handleModalClose}>Batal</Button>
   <Button variant="contained" color="error" type="submit">
    Hapus
   </Button>
  </DialogActions>
 );

 const dialogActionFooterPeristiwa = (
  <DialogActions sx={{ p: 2, px: 3 }}>
   <Button onClick={handleModalClosePeristiwa}>Batal</Button>
   <Button variant="contained" type="submit">
    Simpan
   </Button>
  </DialogActions>
 );

 return (
  <>
   <DashboardLayout>
    <ContentPage
     title="Identifikasi Risiko"
     chipKp
     addButton={
      <AddButton
       title={`Tambah Identifikasi Risiko`}
       filled
       noMargin
       onclick={handleModalOpenAdd}
      />
     }
    >
     <MRTIdentifikasi
      viewOnly
      handleModalOpenView={handleModalOpenView}
      handleModalOpenDelete={handleModalOpenDelete}
      handleModalOpenAdd={handleModalOpenAdd}
      handleModalOpenEdit={handleModalOpenEdit}
     />
    </ContentPage>
   </DashboardLayout>
   <DialogComponent
    dialogOpen={modalOpenView}
    dialogClose={handleModalClose}
    title="Detail Identifikasi Risiko"
   >
    <FormTable mode="view" />
   </DialogComponent>
   <DialogComponent
    dialogOpen={modalOpenAdd}
    dialogClose={handleModalClose}
    title="Tambah Identifikasi Risiko"
    dialogFooter={dialogActionFooter}
   >
    <FormTable mode="add" />
   </DialogComponent>
   <DialogComponent
    dialogOpen={modalOpenEdit}
    dialogClose={handleModalClose}
    title="Ubah Identifikasi Risiko"
    dialogFooter={dialogActionFooter}
   >
    <FormTable
     mode="edit"
     handleModalOpenAddPeristiwa={handleModalOpenAddPeristiwa}
    />
   </DialogComponent>
   <DialogComponent
    width={600}
    dialogOpen={modalOpenAddPeristiwa}
    dialogClose={handleModalClosePeristiwa}
    title="Tambah Peristiwa Risiko Baru"
    dialogFooter={dialogActionFooterPeristiwa}
   >
    <FormTable mode="addPeristiwa" />
   </DialogComponent>
   <DialogComponent
    width={240}
    dialogOpen={modalOpenDelete}
    dialogClose={handleModalClose}
    title="Hapus Data"
    dialogFooter={dialogActionDeleteFooter}
   >
    Anda yakin akan menghapus data ini?
   </DialogComponent>
  </>
 );
}
