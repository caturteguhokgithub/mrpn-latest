import React, { Fragment } from "react";
import { Button, DialogActions, Grid, Stack, TextField } from "@mui/material";
import CardItem from "@/components/cardTabItem";
import DialogComponent from "@/components/dialog";
import FormDampak from "./form-dampak";
import CollapsibleImpactTable from "./table-impact-collapsible";
import DialogDelete from "@/components/dialogDelete";
import TableDampak from "./table-kriteria-dampak";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";
import EmptyDevelopingState from "@/components/empty/developing";
import { isDeveloping } from "@/components/layouts/layout";
import useKriteriaDampakVM from "./hooks/vm";
import useAuthorizationVM from "@/app/authorizationVM";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import FormAreaDampak from "./form-area-dampak";
import { initReqAddMatDamKomite } from "./hooks/model";

export default function CardDampak() {
  const { user } = useAuthorizationVM();

  const {
    // loading,
    dataMatDamKomite,
    modalOpenAdd,
    setModalOpenAdd,
    modalOpenAddKomite,
    setModalOpenAddKomite,
    modalOpenDelete,
    setModalDelete,
    requestMatDamKomite,
    setRequestMatDamKomite,
    requestMatDamUpr,
    setRequestMatDamUpr,
    createMatDamKomite,
    createMatDamUpr,
    deleteMatDamUpr,
    modalOpenEdit,
    setModalOpenEdit,
    modalOpenRef,
    setModalOpenRef,
    showMatDamKomite,
    objectState,
    modalOpenEditKomite,
    setModalOpenEditKomite,
    deleteMatDamKomite,
    modalOpenDeleteArea,
    setModalDeleteArea,
  } = useKriteriaDampakVM();

  const handleCreate = async () => {
    createMatDamUpr(requestMatDamUpr);
  };

  const handleUpdate = async () => {
    createMatDamUpr(requestMatDamUpr);
    setModalOpenEdit(false);
  };

  const handleDelete = async () => {
    deleteMatDamUpr(requestMatDamUpr);
  };

  const handleAddKomite = async () => {
    createMatDamKomite(requestMatDamKomite);
  };

  const handleDeleteKomite = async () => {
    deleteMatDamKomite(requestMatDamKomite);
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
      <Button variant="contained" onClick={handleCreate}>
        Simpan
      </Button>
    </DialogActions>
  );

  const dialogActionFooterEdit = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button
        onClick={() => {
          setModalOpenAdd(false), setModalOpenEdit(false);
        }}
      >
        Batal
      </Button>
      <Button variant="contained" onClick={handleUpdate}>
        Simpan
      </Button>
    </DialogActions>
  );

  React.useEffect(() => {
    showMatDamKomite();
  }, [objectState?.id]);

  React.useEffect(() => {
    if (!modalOpenAddKomite && !modalOpenEditKomite) {
      setRequestMatDamKomite({ ...initReqAddMatDamKomite });
    }
  }, [modalOpenAddKomite, modalOpenEditKomite]);

  return (
    <Fragment>
      <CardItem
        title="Kriteria Dampak"
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
              title="Tambah Kriteria Dampak"
              onclick={() => setModalOpenAdd(true)}
            />
          </Stack>
        }
      >
        <Fragment>
          <CollapsibleImpactTable
            data={dataMatDamKomite}
            setRequestMatDamKomite={setRequestMatDamKomite}
            setRequestMatDamUpr={setRequestMatDamUpr}
            handleEdit={() => setModalOpenEdit(true)}
            handleDelete={() => setModalDelete(true)}
            handleDeleteArea={() => setModalDeleteArea(true)}
            handleEditArea={() => setModalOpenEditKomite(true)}
          />
        </Fragment>
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
          optionAD={dataMatDamKomite}
          setModalOpenAddKomite={setModalOpenAddKomite}
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
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => handleDelete()}
      />
      <DialogDelete
        title="Hapus Data Area"
        handleOpenModal={modalOpenDeleteArea}
        handleCloseModal={() => setModalDeleteArea(false)}
        handleDelete={() => handleDeleteKomite()}
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

      <DialogComponent
        width={500}
        dialogOpen={modalOpenAddKomite}
        dialogClose={() => setModalOpenAddKomite(false)}
        title="Tambah Area Dampak"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalOpenAddKomite(false)}>Batal</Button>
            <Button variant="contained" type="submit" onClick={handleAddKomite}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormAreaDampak
          mode="add"
          requestMatDamKomite={requestMatDamKomite}
          setRequestMatDamKomite={setRequestMatDamKomite}
        />
      </DialogComponent>

      <DialogComponent
        width={500}
        dialogOpen={modalOpenEditKomite}
        dialogClose={() => setModalOpenEditKomite(false)}
        title="Ubah Area Dampak"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalOpenEditKomite(false)}>Batal</Button>
            <Button variant="contained" type="submit" onClick={handleAddKomite}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormAreaDampak
          mode="edit"
          requestMatDamKomite={requestMatDamKomite}
          setRequestMatDamKomite={setRequestMatDamKomite}
        />
      </DialogComponent>
    </Fragment>
  );
}
