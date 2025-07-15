import AddButton from "@/components/buttonAdd";
import CardItem from "@/components/cardTabItem";
import React, { Fragment } from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button, Stack } from "@mui/material";
import Iconify from "@/components/icons/iconify";
import EmptyDevelopingState from "@/components/empty/developing";
import { isDeveloping } from "@/components/layouts/layout";
import usePossibilityList from "./hooks/usePossibility";
import FormPossibility from "./form-possibility";
import DialogDelete from "@/components/dialogDelete";
import FormKemungkinanEmpty from "./form-kemungkinan-empty";

export default function CardKemungkinan() {
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenRef, setModalOpenRef] = React.useState(false);

  const {
    modalOpenAdd,
    setModalOpenAdd,
    requestPossibility,
    setRequestPossibility,
    updatePossibility,
    modalOpenDelete,
    setModalDelete,
    isDisabledAdd,
    handleDeleteTables,
    handleChangePayload,
    payloadValues,
    isDisabledAddButton,
    loading,
  } = usePossibilityList();

  const handleCreate = async () => {
    setModalOpenAdd(false);
    setModalOpenEdit(false);
    updatePossibility();
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

  return (
    <Fragment>
      <CardItem
        title="Kriteria Kemungkinan"
        // setting={!isDeveloping}
        // settingEditOnclick={() => setModalOpenEdit(true)}
        // settingAddOnclick={() => setModalOpenAdd(true)}
        addButton={
          <Stack gap={1} direction="row" alignItems="center">
            <AddButton
              noMargin
              startIcon={<Iconify name="mdi:table" />}
              title="Tabel Referensi"
              onclick={() => setModalOpenRef(true)}
            />
            {!isDisabledAdd ? (
              <AddButton
                noMargin
                filled
                startIcon={<Iconify name="mdi:plus-circle" />}
                title="Tambah Kriteria Kemungkinan"
                onclick={() => setModalOpenAdd(true)}
              />
            ) : (
              <AddButton
                noMargin
                filled
                startIcon={<Iconify name="mdi:pencil" />}
                title="Ubah Kriteria Kemungkinan"
                onclick={() => setModalOpenEdit(true)}
              />
            )}
          </Stack>
        }
      >
        <Fragment>
          <TableKemungkinan mode="view" payloadValues={payloadValues} />
        </Fragment>
      </CardItem>

      {modalOpenAdd && (
        <DialogComponent
          tableMode
          width={1000}
          dialogOpen={modalOpenAdd}
          dialogClose={() => setModalOpenAdd(false)}
          title="Tambah Kriteria Kemungkinan"
          dialogFooter={dialogActionFooter}
        >
          <FormKemungkinanEmpty
            state={requestPossibility}
            setState={setRequestPossibility}
            mode="add"
            handleChangePayload={handleChangePayload}
            payloadValues={payloadValues}
          />
        </DialogComponent>
      )}

      {modalOpenEdit && (
        <DialogComponent
          tableMode
          width={1000}
          dialogOpen={modalOpenEdit}
          dialogClose={() => setModalOpenEdit(false)}
          title="Ubah Kriteria Kemungkinan"
          dialogFooter={dialogActionFooter}
        >
          <FormKemungkinanEmpty
            state={requestPossibility}
            setState={setRequestPossibility}
            mode="edit"
            payloadValues={payloadValues}
            handleChangePayload={handleChangePayload}
          />
        </DialogComponent>
      )}

      {modalOpenRef && (
        <DialogComponent
          tableMode
          closeButton
          width={1200}
          dialogOpen={modalOpenRef}
          dialogClose={() => setModalOpenRef(false)}
          title="Referensi Kriteria Kemungkinan"
        >
          <TableKemungkinan mode="reference" />
        </DialogComponent>
      )}

      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {
          handleDeleteTables();
        }}
      />
    </Fragment>
  );
}
