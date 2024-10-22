import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { Box, Chip, Stack } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { FormatIDR } from "@/lib/utils/currency";
import { advancedTable } from "@/app/components/table";
import ActionColumn from "@/components/actions/action";

export default function TableProfilIntervensi({
  data,
  deleteData,
  updateData,
  toggleShowTab,
  noActionColumn,
  page,
}: {
  data: RoDto[];
  deleteData?: any;
  updateData?: any;
  toggleShowTab?: boolean;
  noActionColumn?: boolean;
  page?: string;
}) {
  const columnTabelIntervensi = [
    {
      accessorKey: "tahun",
      header: "Tahun",
      size: 130,
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.tahun}
          </Stack>
        );
      },
    },
    {
      accessorKey: "code",
      header: "Format Kode",
      size: 180,
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.code}
          </Stack>
        );
      },
    },
    {
      accessorKey: "intervention",
      header: "Keterangan Intervensi",
      size: 180,
      filterFns: "contains",
      Cell: (item: any) => {
        const value =
          item.row.original.intervention == true
            ? "Intervensi Kunci"
            : "Reguler";
        const color =
          item.row.original.intervention == true ? "primary" : "default";
        return (
          <Stack height="100%" alignItems="flex-start">
            <Chip size="small" color={color} label={value} />
          </Stack>
        );
      },
    },
    {
      accessorKey: "kementrian_id",
      header: "Penanggungjawab",
      size: 210,
      enableColumnFilterModes: true,
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.kementrian.value}
          </Stack>
        );
      },
    },
    {
      accessorKey: "value",
      header: "Nomenklatur RO/Project",
      size: 350,
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.value}
          </Stack>
        );
      },
    },
    {
      accessorKey: "target",
      header: "Target",
      size: 150,
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.target}
          </Stack>
        );
      },
    },
    {
      accessorKey: "anggaran",
      header: "Anggaran",
      size: 150,
      Cell: (item: any) => {
        const value = FormatIDR(item.row.original.anggaran);
        return (
          <Stack
            width="100%"
            height="100%"
            alignItems="flex-end"
            justifyContent="flex-start"
          >
            {value}
          </Stack>
        );
      },
    },
    {
      accessorKey: "sumber_anggaran",
      header: "Sumber Anggaran",
      size: 200,
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.sumber_anggaran}
          </Stack>
        );
      },
    },
  ];

  const columns = [
    ...columnTabelIntervensi,
    {
      accessorKey: "action",
      header: "Aksi",
      size: 100,
      Cell: (item: any) => {
        const isNonRO = item.row.original.type == "NON_RO";
        return isNonRO ? (
          <ActionColumn
            editClick={() => updateData(item.row.original.id)}
            deleteClick={() => deleteData(item.row.original.id)}
          />
        ) : null;
      },
    },
  ];

  const table = useMaterialReactTable({
    columns: noActionColumn ? columnTabelIntervensi : columns,
    data,
    ...advancedTable,
    enableRowActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    // muiTableContainerProps: { sx: { maxHeight: "28vh" } },
    getRowId: (row) => row.id.toString(),
    initialState: {
      showGlobalFilter: true,
    },
  });

  return (
    <Box
      className="table-collapsed card-level-3 thead-blue"
      sx={{
        ".MuiPaper-root": {
          m: 0,
          boxShadow: "none",
        },
        ".MuiTableContainer-root": {
          maxWidth:
            page === "konteks-strategis"
              ? "calc(100vw - 176px) !important"
              : undefined,
          maxHeight: toggleShowTab
            ? // ? "calc(100vh - 690px)"
              // "calc(100vh - 390px)"
              "80vh"
            : // : "calc(100vh - 625px)",
              // "calc(100vh - 325px)",
              "80vh",
          "&::-webkit-scrollbar": {
            height: "6px",
            width: "6px",
            cursor: "pointer",
          },
        },
      }}
    >
      <MaterialReactTable key={data.length} table={table} />
    </Box>
  );
}
