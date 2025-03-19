import React, { Fragment } from "react";
import { Button, DialogActions, Stack, TextField } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "./form-dampak";
import { AddCircle } from "@mui/icons-material";
import CollapsibleImpactTable from "./table-impact-collapsible";
import DialogDelete from "@/app/components/dialogDelete";
import TableDampak from "./table-kriteria-dampak";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";

export default function CardDampak() {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenEditArea, setModalOpenEditArea] = React.useState(false);
  const [modalOpenDelete, setModalDelete] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

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
    <Fragment>
      <CardItem
        title="Kriteria Dampak"
        addButton={
          <Stack direction="row" alignItems="center">
            <AddButton
              filled
              startIcon={<Iconify name="mdi:chart-bar-stacked" />}
              title="Tabel Referensi"
              onclick={() => setModalOpenRef(true)}
            />
            {!isDeveloping && (
              <AddButton
                filled
                startIcon={<Iconify name="mdi:plus-circle" />}
                title="Tambah Kriteria Dampak"
                onclick={() => setModalOpenAdd(true)}
              />
            )}
          </Stack>
        }
      >
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            <CollapsibleImpactTable
              handleEdit={() => setModalOpenEdit(true)}
              handleEditArea={() => setModalOpenEditArea(true)}
              handleDelete={() => setModalDelete(true)}
            />
          </Fragment>
        )}
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
      <DialogComponent
        tableMode
        width={1400}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kriteria Dampak"
      >
        <TableDampak mode="view" />
      </DialogComponent>
    </Fragment>
  );
}
