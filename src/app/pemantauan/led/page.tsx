"use client";

import ContentPage from "@/app/components/contents";
import React, { useMemo } from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import { advancedTable } from "@/app/components/table";
import { Box, Button, Chip, DialogActions, Grow, Tooltip } from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import ActionColumn from "@/app/components/actions/action";
import { data, type PemantauanType } from "./setting";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import { IconFA } from "@/app/components/icons/icon-fa";
import Image from "next/image";
import AddButton from "@/app/components/buttonAdd";
import { SortNumber } from "@/app/profil-risiko/perlakuan/partials/mrt-complete";

export default function PagePemantauan({}) {
  const [modalOpenView, setModalOpenView] = React.useState(false);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenDelete, setModalOpenDelete] = React.useState(false);
  const [modalOpenBukti, setModalOpenBukti] = React.useState(false);

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
  const handleModalOpenBukti = () => {
    setModalOpenBukti(true);
  };

  const handleModalClose = () => {
    setModalOpenView(false);
    setModalOpenDelete(false);
    setModalOpenAdd(false);
    setModalOpenEdit(false);
    setModalOpenBukti(false);
  };

  const columns = useMemo<MRT_ColumnDef<PemantauanType>[]>(
    () => [
      {
        accessorKey: "peristiwa",
        header: "Peristiwa Kerugian",
        size: 250,
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "sebab",
        header: "Sebab Kerugian",
        size: 250,
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "tanggal",
        header: "Tanggal",
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "lokasi",
        header: "Lokasi",
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "klbubl",
        header: "KLBUBL yang Terlibat",
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "dampak_keuangan",
        header: "Dampak Keuangan (Rp)",
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "dampak_non_keuangan",
        header: "Dampak Non-keuangan",
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "tindakan",
        header: "Tindakan Korektif",
        size: 250,
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "keterangan",
        header: "Keterangan",
        size: 250,
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
    ],
    []
  );

  type ColumnsType = {};

  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () => (
      <AddButton onclick={handleModalOpenAdd} title="Tambah LED" />
    ),
  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    ...renderTopToolbar,
    muiTableContainerProps: {
      sx: {
        maxWidth: "calc(100vw - 348px)",
        overflowX: "auto",
        transition: "max-width 500ms ease-in-out",
        "&::-webkit-scrollbar": {
          height: "10px",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        bgcolor: blue[50],
        justifyContent: "center",
        borderLeft: `1px solid ${grey[300]}`,
        borderBottom: "none",
      },
    },
    muiTableHeadRowProps: {
      sx: {
        "&:nth-of-type(1)": {
          ".Mui-TableHeadCell-Content": {
            height: "100%",

            ".Mui-TableHeadCell-Content-Labels": {
              width: "100%",
              alignItems: "flex-start",
              height: "100%",

              ".Mui-TableHeadCell-Content-Wrapper": {
                flex: 1,
                height: "100%",
              },
            },
          },
        },
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Aksi",
        muiTableHeadCellProps: {
          align: "center",
          sx: {
            borderLeft: `1px solid ${grey[300]}`,
            "&:before": {
              bgcolor: `${blue[50]} !important`,
            },
          },
        },
        size: 150,
        Cell: () => (
          <ActionColumn
            viewClick={handleModalOpenView}
            editClick={handleModalOpenEdit}
            deleteClick={handleModalOpenDelete}
          />
        ),
      },
    },
    enableColumnPinning: true,
    layoutMode: "grid-no-grow",
    initialState: {
      columnPinning: { right: ["buktiDukung", "status", "mrt-row-actions"] },
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
        <ContentPage title="Lost Event Database" chipKp>
          <Box className="table-sticky-horizontal">
            <MaterialReactTable table={table} />
          </Box>
        </ContentPage>
      </DashboardLayout>
      <DialogComponent
        dialogOpen={modalOpenView}
        dialogClose={handleModalClose}
        title="Detail Lost Event Database"
      >
        <FormTable mode="view" />
      </DialogComponent>
      <DialogComponent
        width={600}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Lost Event Database"
        dialogFooter={dialogActionFooter}
      >
        <FormTable mode="add" />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalOpenEdit}
        dialogClose={handleModalClose}
        title="Ubah Lost Event Database"
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
