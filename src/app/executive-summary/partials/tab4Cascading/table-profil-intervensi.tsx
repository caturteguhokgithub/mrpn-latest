import { RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { Box, Chip, Stack } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useEffect, useState } from "react";
import { FormatIDR } from "@/lib/utils/currency";
import { advancedTable } from "@/components/table";
import ActionColumn from "@/components/actions/action";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { SortNumber } from "@/app/profil-risiko/perlakuan/partials/mrt-complete";
import { blue, grey } from "@mui/material/colors";

export default function TableProfilIntervensi({
  data,
  deleteData,
  updateData,
  toggleShowTab,
  noActionColumn,
  page,
}: {
  data: RODataTable[];
  deleteData?: any;
  updateData?: any;
  toggleShowTab?: boolean;
  noActionColumn?: boolean;
  page?: string;
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const columnTabelIntervensi = [
    {
      accessorKey: "tahun",
      header: "Tahun",
      size: 130,
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
        renderedCellValue == null ? "-" : renderedCellValue,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
    {
      accessorKey: "code",
      header: "Format Kode",
      size: 180,
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
        renderedCellValue == null ? "-" : renderedCellValue,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
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
          <Stack
            height={"inherit"}
            width={"100%"}
            alignItems="center"
            flexDirection={"column"}
          >
            <Chip size="small" color={color} label={value} />
          </Stack>
        );
      },
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
    {
      accessorKey: "kementrian_id",
      header: "Penanggungjawab",
      size: 210,
      enableColumnFilterModes: true,
      Cell: (item: any) => {
        return (
          <Stack height="inherit" alignItems="center" justifyContent={"start"}>
            {item.row.original?.kementrian?.value ?? "-"}
          </Stack>
        );
      },
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
    {
      accessorKey: "value",
      header: "Nomenklatur RO/Project",
      size: 350,
      Cell: (item: any) => {
        return (
          <Stack height="inherit" alignItems="center" justifyContent={"start"}>
            {item.row.original.value}
          </Stack>
        );
      },
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
  ];

  let detailRpjmn: any[] = [];

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }
  multiyear.map((y, i) => {
    let tahunDetail: any = {
      id: "annual" + i,
      header: y,
      columns: [
        {
          accessorKey: "target_" + i,
          header: "Target",
          enableColumnActions: false,
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
            renderedCellValue == "" ? "-" : renderedCellValue,
          Header: ({ column }: any) => (
            <SortNumber column={column} numberSort={column.getIndex() + 1} />
          ),
        },
        {
          accessorKey: "satuan_" + i,
          header: "Satuan",
          enableColumnActions: false,
          textAlign: "center",
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
            renderedCellValue == "" ? "-" : renderedCellValue,
          Header: ({ column }: any) => (
            <SortNumber column={column} numberSort={column.getIndex() + 1} />
          ),
        },
        {
          accessorKey: "anggaran_" + i,
          header: "Pembiayaan",
          enableColumnActions: false,
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
            <Stack alignItems={"flex-end"} width={"100%"}>
              {FormatIDR(renderedCellValue)}
            </Stack>
          ),
          Header: ({ column }: any) => (
            <SortNumber column={column} numberSort={column.getIndex() + 1} />
          ),
        },
        {
          accessorKey: "sumber_anggaran_" + i,
          header: "Sumber Pembiayaan",
          enableColumnActions: false,
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
            renderedCellValue == "" ? "-" : renderedCellValue,
          Header: ({ column }: any) => (
            <SortNumber column={column} numberSort={column.getIndex() + 1} />
          ),
        },
      ],
    };
    detailRpjmn.push(tahunDetail);
  });
  columnTabelIntervensi.push(...detailRpjmn);

  const columns = [
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
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
    ...columnTabelIntervensi,
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
    muiTableHeadCellProps: {
      sx: {
        border: `1px solid ${grey[300]}`,
        justifyContent: "center",
      },
    },
    muiTableHeadRowProps: {
      sx: {
        ".MuiTableCell-head": {
          bgcolor: `${blue[50]} !important`,
        },
        "&:nth-of-type(2)": {
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
