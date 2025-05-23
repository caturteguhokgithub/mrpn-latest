"use client";

import ContentPage from "@/app/components/contents";
import React, { useMemo } from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import ActionColumn from "@/app/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import { advancedTable } from "@/app/components/table";
import { DialogActions, Button, Alert, AlertTitle, Chip } from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import { data, type PeringatanType } from "./setting";
import { green, red, yellow } from "@mui/material/colors";
import { IconFA } from "@/app/components/icons/icon-fa";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PagePeringatanDiniSaran({}) {
  usePermissionChecker("pemantauanMrpn.peringatanDini");

  const [modalOpenView, setModalOpenView] = React.useState(false);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenDelete, setModalOpenDelete] = React.useState(false);

  const handleModalOpenView = () => {
    setModalOpenView(true);
  };
  const handleModalOpenDelete = () => {
    setModalOpenDelete(true);
  };
  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };
  const handleModalOpenEdit = () => {
    setModalOpenEdit(true);
  };

  const handleModalClose = () => {
    setModalOpenView(false);
    setModalOpenDelete(false);
    setModalOpenAdd(false);
    setModalOpenEdit(false);
  };

  const columns = useMemo<MRT_ColumnDef<PeringatanType>[]>(
    () => [
      {
        accessorKey: "peristiwa",
        header: "Peristiwa Risiko",
        size: 200,
        enableColumnActions: false,
        enableSorting: false,
      },
      {
        accessorKey: "konteks",
        header: "Konteks Strategis",
        size: 200,
        enableColumnActions: false,
        enableSorting: false,
      },
      {
        accessorKey: "nilai",
        header: "Nilai Risiko",
        size: 100,
        enableColumnActions: false,
        enableSorting: false,
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
      {
        accessorKey: "pengendalian",
        header: "Pengendalian",
        size: 150,
        enableColumnActions: false,
        enableSorting: true,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
          <>
            {renderedCellValue === 1 ? (
              <IconFA name="close" size={14} color={red[800]} />
            ) : (
              <IconFA name="check" size={14} color={green[800]} />
            )}
          </>
        ),
      },
      {
        accessorKey: "tindaklanjut",
        header: "Tindak Lanjut",
        size: 150,
        enableColumnActions: false,
        enableSorting: true,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
          <Chip
            color={
              renderedCellValue === 1
                ? "error"
                : renderedCellValue === 2
                ? "warning"
                : "success"
            }
            sx={{
              minWidth: 80,
              borderWidth: "2px",
              borderStyle: "solid",
              "& .MuiChip-label": {
                fontWeight: 600,
              },
              "&.MuiChip-colorWarning": {
                bgcolor: yellow[300],
                borderColor: yellow[600],
                color: yellow[900],
              },
              "&.MuiChip-colorError": {
                bgcolor: red[100],
                borderColor: red[400],
                color: red[900],
              },
              "&.MuiChip-colorSuccess": {
                bgcolor: green[100],
                borderColor: green[400],
                color: green[900],
              },
            }}
            label={
              renderedCellValue === 1
                ? "Belum"
                : renderedCellValue === 2
                ? "Proses"
                : "Sudah"
            }
          />
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    //   enableRowActions: false,
    //   muiTableContainerProps: {
    //    sx: {
    //     maxWidth: "calc(100vw - 364px)",
    //     "&::-webkit-scrollbar": {
    //      height: "10px",
    //     },
    //    },
    //   },
    //   renderEmptyRowsFallback: ({ table }) => (
    //    <EmptyState
    //     icon={<IconEmptyData />}
    //     title="Data Kosong"
    //     description="Silahkan isi konten halaman ini"
    //    />
    //   ),
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 140,
        Cell: () => (
          <ActionColumn
            viewClick={handleModalOpenView}
            editClick={handleModalOpenEdit}
          />
        ),
      },
    },
    initialState: {
      showGlobalFilter: true,
    },
  });

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  const dialogActionDeleteFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" color="error" type="submit">
        Hapus
      </Button>
    </DialogActions>
  );

  return (
    <>
      <DashboardLayout>
        <ContentPage
          title="Peringatan Dini"
          infoToolTip="Rangkaian terpadu dari proses identifikasi dan pemantauan bahaya, rangkaian komunikasi
informasi dan peringatan terhadap bahaya tersebut kepada pemilik risiko atau pemangku
kepentingan terkait dan tindakan yang diambil untuk meminimalkan dampaknya sebelum terjadi"
          chipKp
          withCard={false}
          hasAlert={
            <Alert severity="warning" sx={{ mb: 2 }}>
              <AlertTitle>Perhatian!</AlertTitle>
              Butuh perhatian & tindak lanjut pengawasan
            </Alert>
          }
        >
          <MaterialReactTable table={table} />
        </ContentPage>
      </DashboardLayout>
      <DialogComponent
        dialogOpen={modalOpenView}
        dialogClose={handleModalClose}
        title="Detail Peringatan Dini"
      >
        <FormTable mode="view" />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Peringatan Dini"
        dialogFooter={dialogActionFooter}
      >
        <FormTable mode="add" />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalOpenEdit}
        dialogClose={handleModalClose}
        title="Ubah Peringatan Dini"
        dialogFooter={dialogActionFooter}
      >
        <FormTable mode="edit" />
      </DialogComponent>
      <DialogComponent
        width={240}
        dialogOpen={modalOpenDelete}
        dialogClose={handleModalClose}
        title="Hapus Data"
        dialogFooter={dialogActionDeleteFooter}
      >
        Anda yakin akan menghapus data ini?
      </DialogComponent>
    </>
  );
}
