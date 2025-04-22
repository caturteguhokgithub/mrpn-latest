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
import EmptyDevelopingState from "@/app/components/empty/developing";
import { isDeveloping } from "@/app/components/layouts/layout";

import useCardRegulationVM from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationVM";
import TablePeraturan from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/table-peraturan";
import DialogDelete from "@/app/components/dialogDelete";
import DialogComponent from "@/app/components/dialog";
import FormRegulation from "./partials/form";
import { ExsumRegulationDto } from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import { DividerIntExt } from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgent";
import AddButton from "@/app/components/buttonAdd";
import Iconify from "@/app/components/icons/iconify";

export default function CardRegulation({ penetapan }: { penetapan?: boolean }) {
  const {
    data,
    modal,
    setModal,
    modalDelete,
    setModalDelete,
    modalEdit,
    setModalEdit,
  } = useCardRegulasi();

  const { deleteData } = useCardRegulationVM();
  const [state, setState] = useState<ExsumRegulationDto>({
    id: 0,
    tahun: [],
    exsum_id: 0,
    amanat: "",
    perpres_state: undefined,
    perpres: [],
    stakeholder: [],
    stakeholder_id: [],
  });

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
            title="Tambah Kriteria Dampak"
            onclick={() => setModal(true)}
          />
        }
      >
        {penetapan ? (
          <Fragment>
            {data.length == 0 ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <Fragment>
                <Box sx={{ opacity: 0.6 }}>
                  <TablePeraturan data={data} deleteData={deleteData} />
                </Box>
                {isDeveloping ? (
                  <EmptyDevelopingState />
                ) : (
                  <Fragment>
                    <Box my={3}>
                      <DividerIntExt />
                    </Box>
                    <TablePeraturan
                      penetapan
                      data={data}
                      deleteData={deleteData}
                      setModal={() => setModalEdit(true)}
                      setModalDelete={() => setModalDelete(true)}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <EmptyDevelopingState />
          // <Fragment>
          //   {data.length == 0 ? (
          //     <EmptyState
          //       dense
          //       icon={<IconEmptyData width={100} />}
          //       title="Data Kosong"
          //       description="Silahkan isi konten halaman ini"
          //     />
          //   ) : (
          //     <TableContainer
          //       component={Paper}
          //       elevation={0}
          //       variant="outlined"
          //     >
          //       <Table size="small">
          //         <TableHead
          //           sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
          //         >
          //           <TableRow>
          //             <TableCell>
          //               Regulasi, Kebijakan, Peraturan, dan Prosedur Terkait
          //             </TableCell>
          //             <TableCell>Keterangan</TableCell>
          //           </TableRow>
          //         </TableHead>
          //         <TableBody>
          //           {data.map((row) => (
          //             <TableRow
          //               key={row.id}
          //               sx={{
          //                 "&:last-child td, &:last-child th": { border: 0 },
          //               }}
          //             >
          //               <TableCell>{row.title}</TableCell>
          //               <TableCell>{row.value}</TableCell>
          //             </TableRow>
          //           ))}
          //         </TableBody>
          //       </Table>
          //     </TableContainer>
          //   )}
          // </Fragment>
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
            <Button variant="contained" onClick={() => {}}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormRegulation
          options={[]}
          optionStakeholder={[]}
          state={state}
          setState={() => {}}
          setModalPeraturan={() => {}}
        />
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
            <Button variant="contained" onClick={() => {}}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormRegulation
          options={[]}
          optionStakeholder={[]}
          state={state}
          setState={() => {}}
          setModalPeraturan={() => {}}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        // handleDelete={() => deleteData()}
      />
    </>
  );
}
