import AddButton from "@/app/components/buttonAdd";
import CardItem from "@/app/components/cardTabItem";
import React, { Fragment } from "react";
import TableKemungkinan from "./table-kriteria-kemungkinan";
import DialogComponent from "@/app/components/dialog";
import FormKemungkinan from "./form-kemungkinan";
import { DialogActions, Button, Stack } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";
import usePossibilityList from "./hooks/usePossibility";
import FormPossibility from "./form-possibility";
import DialogDelete from "@/app/components/dialogDelete";
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
    defaultDropdownList,
    handleDeleteTables,
  } = usePossibilityList();

  const handleCreate = async () => {
    setModalOpenAdd(false);
    setModalOpenEdit(false);
    updatePossibility(requestPossibility);
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
      {/* <Button variant="contained" type="submit"> */}
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
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            <TableKemungkinan
              mode="view"
              handleModalEdit={() => setModalOpenEdit(true)}
              handleModalDelete={() => setModalDelete(true)}
            />
          </Fragment>
        )}
      </CardItem>
      <DialogComponent
        tableMode
        // width={400}
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
        />
        {/* <FormPossibility
          mode="add"
          dropDownOptions={defaultDropdownList}
          state={requestPossibility.values[0]} // Pass the first value for the form
          setState={(value) =>
            setRequestPossibility({ ...requestPossibility, values: [value] })
          }
        /> */}
      </DialogComponent>
      {modalOpenEdit && (
        <DialogComponent
          tableMode
          // width={400}
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
          />
          {/* <FormPossibility
            mode="edit"
            dropDownOptions={defaultDropdownList}
            state={requestPossibility.values[0]} // Pass the first value for the form
            setState={(value) =>
              setRequestPossibility({ ...requestPossibility, values: [value] })
            }
          /> */}
        </DialogComponent>
      )}
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
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalOpenDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {
          handleDeleteTables();
          // handleDeleteSubCategory();
        }}
      />
    </Fragment>
  );
}
