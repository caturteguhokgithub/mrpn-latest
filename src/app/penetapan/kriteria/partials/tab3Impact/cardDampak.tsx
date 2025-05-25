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
import useKriteriaDampakVM from "./hooks/vm";
import useAuthorizationVM from "@/app/authorizationVM";
import { initReqAddMatDamUpr, ValuesShowMatDamKomite } from "./hooks/model";

export default function CardDampak() {
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenEditArea, setModalOpenEditArea] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

  const { user } = useAuthorizationVM();

  const {
    // loading,
    dataMatDamKomite,
    modalOpenAdd,
    setModalOpenAdd,
    modalOpenDelete,
    setModalDelete,
    requestMatDamKomite,
    setRequestMatDamKomite,
    requestMatDamUpr,
    setRequestMatDamUpr,
    createMatDamKomite,
    createMatDamUpr,
    deleteMatDamUpr,
  } = useKriteriaDampakVM();

  const handleCreate = async () => {
    if (user?.type == "KL") {
      createMatDamUpr(requestMatDamUpr)
    } else {
      createMatDamKomite(requestMatDamKomite);
    }
  };

  const handleUpdate = async () => {
    createMatDamUpr(requestMatDamUpr)
  };

  const handleDelete = async () => {
    deleteMatDamUpr(requestMatDamUpr)
  };

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
      <Button variant="contained" onClick={handleCreate}>
        Simpan
      </Button>
    </DialogActions>
  );

  const dialogActionFooterEdit = (
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
      <Button variant="contained" onClick={handleUpdate}>
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <Fragment>
      <CardItem
        title="Kriteria Dampak"
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
              title="Tambah Kriteria Dampak"
              onclick={() => setModalOpenAdd(true)}
            />
          </Stack>
        }
      >
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            <CollapsibleImpactTable
              data={dataMatDamKomite}
              setRequestMatDamKomite={setRequestMatDamKomite}
              setRequestMatDamUpr={setRequestMatDamUpr}
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
        <FormDampak
          mode="add"
          stateKom={requestMatDamKomite}
          setStateKom={setRequestMatDamKomite}
          stateUpr={requestMatDamUpr}
          setStateUpr={setRequestMatDamUpr}
        />
      </DialogComponent>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenEdit}
        dialogClose={() => setModalOpenEdit(false)}
        title="Ubah Kriteria Dampak"
        dialogFooter={dialogActionFooterEdit}
      >
        <FormDampak
          mode="edit"
          stateKom={requestMatDamKomite}
          setStateKom={setRequestMatDamKomite}
          stateUpr={requestMatDamUpr}
          setStateUpr={setRequestMatDamUpr}
        />
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
        handleDelete={() => handleDelete()}
      />
      <DialogComponent
        tableMode
        width={1560}
        dialogOpen={modalOpenRef}
        dialogClose={() => setModalOpenRef(false)}
        title="Referensi Kriteria Dampak"
        closeButton
      >
        <TableDampak mode="view" />
      </DialogComponent>
    </Fragment>
  );
}
