import React from "react";
import { Button, DialogActions, TextField } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "./form-dampak";
import { AddCircle } from "@mui/icons-material";
import CollapsibleImpactTable from "./table-impact-collapsible";
import DialogDelete from "@/app/components/dialogDelete";

export default function CardDampak() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenEditArea, setModalOpenEditArea] = React.useState(false);
  const [modalOpenDelete, setModalDelete] = React.useState(false);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false),
            setModalOpenEdit(false),
            setModalOpenEditArea(false);
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
        title="Kriteria Dampak"
        addButton={
          <Button
            variant="contained"
            size="small"
            startIcon={<AddCircle />}
            sx={{ lineHeight: 1, py: 1, borderRadius: 24 }}
            onClick={() => setModalOpenAdd(true)}
          >
            Tambah Kriteria Dampak
          </Button>
        }
      >
        {/* <TableDampak mode="view" /> */}
        <CollapsibleImpactTable
          handleEdit={() => setModalOpenEdit(true)}
          handleEditArea={() => setModalOpenEditArea(true)}
          handleDelete={() => setModalDelete(true)}
        />
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenEdit}
        dialogClose={() => setModalOpenEdit(false)}
        title="Ubah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="edit" />
      </DialogComponent>
      <DialogComponent
        width={500}
        dialogOpen={modalOpenEditArea}
        dialogClose={() => setModalOpenEditArea(false)}
        title="Ubah Area Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="edit-area" />
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
