import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogActions,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  alpha,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import useCardRegulasi from "@/app/penetapan/konteks-strategis/cardRegulasi/vm";
import EmptyDevelopingState from "@/components/empty/developing";
import { isDeveloping } from "@/components/layouts/layout";

import useCardRegulationVM from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationVM";
import TablePeraturan from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/table-peraturan";
import DialogDelete from "@/components/dialogDelete";
import DialogComponent from "@/components/dialog";
import FormRegulation from "./partials/form";
import { ExsumRegulationDto } from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import { DividerIntExt } from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgent";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";
import useUrgensiVM from "../../internal-eksternal/pageVM";
import useCardIndicationVM from "@/app/executive-summary/partials/tab9Indication/cardIndicationVM";
import { doRequestRegulasiDto } from "./model";

export default function CardRegulation({ penetapan }: { penetapan?: boolean }) {
  const {
    dataRegulasi,
    setDataRegulasi,
    modal,
    setModal,
    modalDelete,
    setModalDelete,
    modalEdit,
    setModalEdit,
    uriRequestRegulasi,
    uriDeleteRegulasi,
    requestRegulasi,
    setRequestRegulasi,
  } = useCardRegulasi();

  const { data, deleteData } = useCardRegulationVM();

  const {
    optionStakeholder,
    listPerpres,
    stateRegulation,
    setStateRegulation,
  } = useCardIndicationVM();

  const handleSubmitRegulation = async (act: string) => {
    const dataRequest: doRequestRegulasiDto = {
      id: requestRegulasi.id,
      no_regulasi: requestRegulasi.no_regulasi,
      tentang: requestRegulasi.tentang,
      keterangan: requestRegulasi.keterangan,
      uraian_penetapan_object_id: 0,
    };

    if (act == "delete") {
      uriDeleteRegulasi(dataRequest);
    } else {
      uriRequestRegulasi(dataRequest);
    }
  };

  return (
    <>
      <CardItem
        title="Daftar Regulasi, Kebijakan, Peraturan, Prosedur Terkait"
        // setting
        // settingDeleteOnclick={() => setModalDelete(true)}
        // settingEditOnclick={() => setModal(true)}
        addButton={
          <AddButton
            filled
            startIcon={<Iconify name="mdi:plus-circle" />}
            title="Tambah Daftar"
            onclick={() => setModal(true)}
          />
        }
      >
        {dataRegulasi.length == 0 ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <Fragment>
            <Box sx={{ opacity: 0.6 }}>
              <TablePeraturan dataExsum={data} deleteData={deleteData} />
            </Box>
            <Box my={3}>
              <DividerIntExt />
            </Box>
            <TablePeraturan
              penetapan
              data={dataRegulasi}
              deleteData={deleteData}
              setModal={() => setModalEdit(true)}
              setModalDelete={() => setModalDelete(true)}
              intExt={true}
              setState={setRequestRegulasi}
            />
          </Fragment>
        )}
      </CardItem>
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Tambah Daftar Regulasi, Kebijakan, Peraturan, Prosedur Terkait"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={() => handleSubmitRegulation("add")}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormRegulation state={requestRegulasi} setState={setRequestRegulasi} />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalEdit}
        dialogClose={() => setModalEdit(false)}
        title="Ubah Daftar Regulasi, Kebijakan, Peraturan, Prosedur Terkait"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModalEdit(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              onClick={() => handleSubmitRegulation("edit")}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormRegulation state={requestRegulasi} setState={setRequestRegulasi} />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => handleSubmitRegulation("delete")}
      />
    </>
  );
}
