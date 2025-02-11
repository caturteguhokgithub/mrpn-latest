import React, { Fragment } from "react";
import {
  Button,
  DialogActions,
  FormControl,
  Grid,
  styled,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import TablePeraturan from "./table-peraturan";
import useCardRegulationVM from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationVM";
import AddButton from "@/components/buttonAdd";
import FormPeraturan from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/form-peraturan";
import DialogComponent from "@/components/dialog";
import { TextareaStyled } from "@/components/textarea";

export default function CardRegulation({ project }: { project: string }) {
  const {
    data,
    optionStakeholder,
    perpres,
    modalOpen,
    setModalOpen,
    request,
    setRequest,
    createData,
    deleteData,
    createListPerpres,
    perpresState,
    setPerpresState,
    modalPeraturan,
    setModalPeraturan,
    handleEdited,
    conditionEditing,
  } = useCardRegulationVM();

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <CardItem
      title="Kebutuhan Regulasi"
    // addButton={
    //   <AddButton
    //     filled
    //     small
    //     title="Tambah Peraturan"
    //     onclick={() => handleModalOpen()}
    //   />
    // }
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
        // description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TablePeraturan data={data} deleteData={deleteData} />
      )}

      <DialogComponent
        width={520}
        dialogOpen={modalOpen}
        dialogClose={handleModalClose}
        title="Tambah Peraturan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={handleModalClose}>Batal</Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => createData()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormPeraturan
          request={request}
          setRequest={setRequest}
          options={perpres}
          optionStakeholder={optionStakeholder}
          setModalPeraturan={setModalPeraturan}
        />
      </DialogComponent>

      {/*<DialogDelete*/}
      {/*  title="Hapus Data"*/}
      {/*  handleOpenModal={modalDelete}*/}
      {/*  handleCloseModal={() => setModalDelete(false)}*/}
      {/*  handleDelete={() => deleteData(row.id)}*/}
      {/*/>*/}

      <DialogComponent
        width={480}
        dialogOpen={modalPeraturan}
        dialogClose={() => setModalPeraturan(false)}
        title="Tambah Peraturan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalPeraturan(false)}>Batal</Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={() => createListPerpres()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaStyled
                placeholder="Peraturan"
                minRows={2}
                value={perpresState.title}
                onChange={(e: any) => {
                  setPerpresState((prevState) => {
                    return {
                      ...prevState,
                      title: e.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextareaStyled
                placeholder="Keterangan Peraturan"
                minRows={3}
                value={perpresState.value}
                onChange={(e: any) => {
                  setPerpresState((prevState) => {
                    return {
                      ...prevState,
                      value: e.target.value,
                    };
                  });
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogComponent>
    </CardItem>
  );
}
