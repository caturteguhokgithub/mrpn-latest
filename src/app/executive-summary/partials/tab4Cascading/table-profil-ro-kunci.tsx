import React, { SetStateAction, useEffect, useMemo } from "react";
import { Box, Chip, Stack } from "@mui/material";
import { RODataTable } from "@/app/misc/rkp/rkpServiceModel";
import { FormatIDR } from "@/lib/utils/currency";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  useMaterialReactTable,
} from "material-react-table";
import { ExsumInterventionState } from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import { advancedTable } from "@/components/table";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";

export default function TableProfilRoKunci({
  data,
  setState,
}: {
  data: RODataTable[];
  setState: (value: SetStateAction<ExsumInterventionState>) => void;
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const columns = [
    {
      accessorKey: "intervention",
      header: "Intervensi Kunci",
      size: 150,
      Cell: (item: any) => {
        const value =
          item.row.original.intervention == true
            ? "Intervensi Kunci"
            : "Reguler";
        const color =
          item.row.original.intervention == true ? "primary" : "default";
        return (
          <Stack height="inherit" alignItems="center">
            <Chip size="small" color={color} label={value} />
          </Stack>
        );
      },
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
      size: 120,
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: (item: any) => {
        return (
          <Stack height="inherit" alignItems="center">
            {item.row.original.tahun}
          </Stack>
        );
      },
    },
    {
      accessorKey: "code",
      header: "Format Kode",
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: (item: any) => {
        return (
          <Stack height="inherit" alignItems="center">
            {item.row.original.code}
          </Stack>
        );
      },
    },
    {
      accessorKey: "kementrian_id",
      header: "Penanggungjawab",
      enableColumnFilterModes: false,
      Cell: (item: any) => {
        return item.row.original?.kementrian?.value ?? "-";
      },
    },
    {
      accessorKey: "value",
      header: "Nomenklatur RO/Project",
      Cell: (item: any) => {
        return (
          <Stack height="100%" alignItems="flex-start">
            {item.row.original.value}
          </Stack>
        );
      },
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
        },
        {
          accessorKey: "satuan_" + i,
          header: "Satuan",
          enableColumnActions: false,
          textAlign: "center",
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
            renderedCellValue == "" ? "-" : renderedCellValue,
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
        },
        {
          accessorKey: "sumber_anggaran_" + i,
          header: "Sumber Pembiayaan",
          enableColumnActions: false,
          Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
            renderedCellValue == "" ? "-" : renderedCellValue,
        },
      ],
    };
    detailRpjmn.push(tahunDetail);
  });
  columns.push(...detailRpjmn);

  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>(
    {}
  );

  useEffect(() => {
    if (Object.keys(rowSelection).length === 0) {
      const initSelected: MRT_RowSelectionState = {};
      data.map((y) => {
        if (y.intervention) {
          initSelected[y.id.toString()] = y.intervention;
        }
      });
      if (Object.keys(initSelected).length > 0) setRowSelection(initSelected);
    }
  }, [data.length]);

  useEffect(() => {
    setState((prev) => {
      const newListRO = [...prev.ro];
      for (let i = 0; i < newListRO.length; i++) {
        newListRO[i].intervention = false;
      }
      for (const prop in rowSelection) {
        const index = newListRO.findIndex((x) => x.id === parseInt(prop));
        if (index > -1) {
          newListRO[index].intervention = true;
        }
      }
      return {
        ...prev,
        ro: newListRO,
      };
    });
  }, [rowSelection]);

  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    enableRowActions: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    getRowId: (originalRow) => originalRow.id.toString(),
    layoutMode: "grid",
    positionActionsColumn: "last",
    paginationDisplayMode: "pages",
    initialState: {
      showGlobalFilter: true,
    },
  });

  return (
    <Box
      className="table-collapsed perlakuan-risiko"
      sx={{
        ".MuiPaper-root": {
          m: 0,
          boxShadow: "none",
        },
      }}
    >
      <MaterialReactTable key={data.length} table={table} />
    </Box>
  );
}
