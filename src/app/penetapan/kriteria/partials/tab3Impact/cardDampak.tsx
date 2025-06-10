import React, { Fragment } from "react";
import { Button, DialogActions, Grid, Stack, TextField } from "@mui/material";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "./form-dampak";
import CollapsibleImpactTable from "./table-impact-collapsible";
import DialogDelete from "@/app/components/dialogDelete";
import TableDampak from "./table-kriteria-dampak";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";
import useKriteriaDampakVM from "./hooks/vm";
import useAuthorizationVM from "@/app/authorizationVM";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";

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
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <Fragment>
          <CollapsibleImpactTable
            data={dataMatDamKomite}
            setRequestMatDamKomite={setRequestMatDamKomite}
            setRequestMatDamUpr={setRequestMatDamUpr}
            handleEdit={() => setModalOpenEdit(true)}
            handleDelete={() => setModalDelete(true)}
          />
        </Fragment>
        {/* )} */}
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldLabelInfo title="Area Dampak" />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Area Dampak"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setRequestMatDamKomite &&
                  setRequestMatDamKomite((prevState) => ({
                    ...prevState,
                    dampak: e.target.value,
                  }));
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FieldLabelInfo title="Nomor Urut Prioritas" />
            <TextField
              type="number"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Nomor Urut Prioritas"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setRequestMatDamKomite &&
                  setRequestMatDamKomite((prevState) => ({
                    ...prevState,
                    prioritas: Number(e.target.value),
                  }));
              }}
            />
          </Grid>
        </Grid>
      </DialogComponent>
    </Fragment>
  );
}
