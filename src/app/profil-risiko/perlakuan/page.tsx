"use client";

import ContentPage from "@/app/components/contents";
import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import { Box, Button, DialogActions } from "@mui/material";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import MRTPerlakuan from "./partials/mrt";

export default function PagePerlakuan({}) {
 const [modalOpenView, setModalOpenView] = React.useState(false);
 const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
 const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
 const [modalOpenDelete, setModalOpenDelete] = React.useState(false);

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

 const handleModalClose = () => {
  setModalOpenView(false);
  setModalOpenDelete(false);
  setModalOpenAdd(false);
  setModalOpenEdit(false);
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

 return (
  <>
   <DashboardLayout>
    <ContentPage title="Perlakuan Risiko" chipKp>
     <Box
      className="table-sticky-horizontal"
      sx={{
       ".MuiTableRow-root": {
        ".MuiTableCell-root": {
         ".MuiCollapse-root": {
          width: "100%",
         },
        },
       },
      }}
     >
      <MRTPerlakuan
       handleModalOpenView={handleModalOpenView}
       handleModalOpenDelete={handleModalOpenDelete}
       handleModalOpenAdd={handleModalOpenAdd}
       handleModalOpenEdit={handleModalOpenEdit}
      />
     </Box>
    </ContentPage>
   </DashboardLayout>
   <DialogComponent
    width={800}
    dialogOpen={modalOpenView}
    dialogClose={handleModalClose}
    title="Detail Perlakuan Risiko"
   >
    <FormTable mode="view" />
   </DialogComponent>
   <DialogComponent
    width={800}
    dialogOpen={modalOpenAdd}
    dialogClose={handleModalClose}
    title="Tambah Perlakuan Risiko"
    dialogFooter={dialogActionFooter}
   >
    <FormTable mode="add" />
   </DialogComponent>
   <DialogComponent
    width={800}
    dialogOpen={modalOpenEdit}
    dialogClose={handleModalClose}
    title="Ubah Perlakuan Risiko"
    dialogFooter={dialogActionFooter}
   >
    <FormTable mode="edit" />
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
