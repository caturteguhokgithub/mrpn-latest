import React, { Fragment, useMemo } from "react";
import { advancedTable } from "@/app/components/table";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Column,
} from "material-react-table";
import ActionColumn from "@/app/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";

export interface CustomColumn {
  columnDef: {
    header: string;
  };
  getIndex: () => number;
}

export interface SortNumberProps {
  column: CustomColumn;
  numberSort: number;
}

function ChipLevelRisiko(props: { level: any }) {
  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      {props.level ? (
        <Chip
          size="small"
          color={
            props.level === "Sangat Tinggi (5)"
              ? "error"
              : props.level === "Tinggi (4)"
              ? "warning"
              : props.level === "Rendah (2)"
              ? "success"
              : undefined
          }
          sx={{
            minWidth: 80,
            borderWidth: "2px",
            borderStyle: "solid",
            "& .MuiChip-label": {
              fontWeight: 600,
            },
            "&.MuiChip-colorWarning": {
              bgcolor: orange[100],
              borderColor: orange[600],
              color: orange[900],
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
            "&.MuiChip-root": {
              ...(props.level === "Sedang (3)" && {
                bgcolor: yellow[100],
                borderColor: yellow[700],
                color: yellow[900],
              }),
              ...(props.level === "Sangat Rendah (1)" && {
                bgcolor: blue[100],
                borderColor: blue[700],
                color: blue[900],
              }),
            },
          }}
          label={props.level}
        />
      ) : (
        "-"
      )}
    </Box>
  );
}

export const SortNumber = ({ column, numberSort }: SortNumberProps) => {
  return (
    <Stack justifyContent="space-between" height="100%">
      <Typography fontSize={14} fontWeight={600}>
        {column.columnDef.header}
      </Typography>
      <Typography fontSize={14} textAlign="center" color={grey[500]}>
        {numberSort}
      </Typography>
    </Stack>
  );
};

export default function MRTPerlakuanComplete({
  handleModalOpenView,
  handleModalOpenDelete,
  handleModalOpenAdd,
  handleModalOpenEdit,
  viewOnly,
  renderCaption,
  dataTable,
}: {
  handleModalOpenView?: () => void;
  handleModalOpenDelete?: () => void;
  handleModalOpenAdd?: () => void;
  handleModalOpenEdit?: () => void;
  viewOnly?: boolean;
  renderCaption?: React.ReactNode;
  dataTable?: RiskOverviewData[];
}) {
  const columns = useMemo<MRT_ColumnDef<RiskOverviewData>[]>(
    () => [
      // {
      //   id: "rincian_output",
      //   header: "",
      //   columns: [
      //     {
      //       id: "rincian_output",
      //       header: "",
      //       columns: [
      //         {
      //           accessorKey: "rincian_output",
      //           header: "Rincian Output",
      //           size: 250,
      //           enableColumnActions: false,
      //           Header: ({ column }) => (
      //             <SortNumber
      //               column={column}
      //               numberSort={column.getIndex() + 1}
      //             />
      //           ),
      //           Cell: ({ cell }: { cell: any }) => (
      //             <Fragment>Rincian Output</Fragment>
      //           ),
      //         },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   id: "penilaian_risiko",
      //   header: "Penilaian Risiko",
      //   columns: [
      {
        id: "identifikasi_risiko",
        header: "Identifikasi Risiko",
        columns: [
          {
            accessorKey: "peristiwa",
            header: "Peristiwa Risiko",
            size: 250,
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "kategori",
            header: "Kategori Risiko",
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "penyebab",
            header: "Penyebab",
            size: 250,
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            Cell: ({ cell }: { cell: any }) => (
              <Paper
                elevation={0}
                sx={{
                  overflow: "auto",
                  maxHeight: 160,
                  backgroundColor: "transparent",
                  "&::-webkit-scrollbar": {
                    width: "3px",
                  },
                }}
              >
                <Stack gap={1}>
                  {cell.getValue().map(
                    (itemDesc: any, index: any) =>
                      itemDesc && (
                        <Chip
                          key={index}
                          sx={{
                            height: "auto",
                            py: 1,
                            "& .MuiChip-label": {
                              overflow: "unset",
                              whiteSpace: "wrap",
                            },
                          }}
                          label={itemDesc}
                        />
                      )
                  )}
                </Stack>
              </Paper>
            ),
          },
          {
            accessorKey: "dampak",
            header: "Dampak",
            size: 300,
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            Cell: ({ cell }: { cell: any }) => (
              <Paper
                elevation={0}
                sx={{
                  overflow: "auto",
                  maxHeight: 160,
                  backgroundColor: "transparent",
                  "&::-webkit-scrollbar": {
                    width: "3px",
                  },
                }}
              >
                <Stack gap={1}>
                  {cell.getValue().map(
                    (itemDesc: any, index: any) =>
                      itemDesc && (
                        <Chip
                          key={index}
                          sx={{
                            height: "auto",
                            py: 1,
                            "& .MuiChip-label": {
                              overflow: "unset",
                              whiteSpace: "wrap",
                            },
                          }}
                          label={itemDesc}
                        />
                      )
                  )}
                </Stack>
              </Paper>
            ),
          },
          // {
          //   accessorKey: "area_dampak",
          //   header: "Area Dampak",
          //   size: 300,
          //   enableColumnActions: false,
          //   Header: ({ column }) => (
          //     <SortNumber
          //       column={column}
          //       numberSort={column.getIndex() + 1}
          //     />
          //   ),
          // },
        ],
      },
      {
        id: "analisis_evaluasi_risiko",
        header: "Analisis & Evaluasi Risiko",
        columns: [
          {
            header: "Nilai",
            size: 240,
            accessorFn: (row) => (
              <Stack direction="column" gap={1}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">LK:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
                    {row.analisis_lk}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">LD:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
                    {row.analisis_ld}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">BR:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
                    {row.analisis_br}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="body2">LEVEL</Typography>
                  <ChipLevelRisiko level={row.analisis_level} />
                </Stack>
              </Stack>
            ),
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          // {
          //   accessorKey: "analisis_lk",
          //   header: "LK",
          //   enableColumnActions: false,
          //   size: 120,
          //   muiTableHeadCellProps: {
          //     align: "center",
          //   },
          //   muiTableBodyCellProps: {
          //     align: "center",
          //   },
          //   Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
          //     renderedCellValue == null ? "-" : renderedCellValue,
          //   Header: ({ column }) => (
          //     <SortNumber
          //       column={column}
          //       numberSort={column.getIndex() + 1}
          //     />
          //   ),
          // },
          // {
          //   accessorKey: "analisis_ld",
          //   header: "LD",
          //   enableColumnActions: false,
          //   size: 120,
          //   muiTableHeadCellProps: {
          //     align: "center",
          //   },
          //   muiTableBodyCellProps: {
          //     align: "center",
          //   },
          //   Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
          //     renderedCellValue == null ? "-" : renderedCellValue,
          //   Header: ({ column }) => (
          //     <SortNumber
          //       column={column}
          //       numberSort={column.getIndex() + 1}
          //     />
          //   ),
          // },
          // {
          //   id: "row-analisis_br",
          //   accessorKey: "analisis_br",
          //   header: "BR",
          //   enableColumnActions: false,
          //   size: 120,
          //   muiTableHeadCellProps: {
          //     align: "center",
          //   },
          //   muiTableBodyCellProps: {
          //     align: "center",
          //   },
          //   Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
          //     renderedCellValue == null ? "-" : renderedCellValue,
          //   Header: ({ column }) => (
          //     <SortNumber
          //       column={column}
          //       numberSort={column.getIndex() + 1}
          //     />
          //   ),
          // },
          // {
          //   accessorKey: "analisis_level",
          //   header: "Level Risiko",
          //   enableColumnActions: false,
          //   Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
          //     <ChipLevelRisiko level={renderedCellValue} />
          //   ),
          //   Header: ({ column }) => (
          //     <SortNumber
          //       column={column}
          //       numberSort={column.getIndex() + 1}
          //     />
          //   ),
          // },
          {
            id: "row-prioritas",
            accessorKey: "prioritas",
            header: "Prioritas Risiko",
            enableColumnActions: false,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
        ],
      },
      //   ],
      // },

      {
        id: "perlakuan_risiko",
        header: "Perlakuan Risiko",
        columns: [
          {
            accessorKey: "keputusan",
            header: "Keputusan Perlakuan Risiko",
            enableColumnActions: false,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
              renderedCellValue == null ? "-" : renderedCellValue,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "keterangan_risiko",
            header: "Deskripsi Perlakuan Risiko",
            enableColumnActions: false,
            size: 300,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "waktu",
            header: "Waktu Rencana Perlakuan Risiko",
            enableColumnActions: false,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
              renderedCellValue == null ? "-" : renderedCellValue,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "penanggung_jawab",
            header: "Penanggung Jawab",
            enableColumnActions: false,
            size: 220,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
              renderedCellValue == null ? "-" : renderedCellValue,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
        ],
      },
      // {
      //   id: "risiko_residual_harapan",
      //   header: "Risiko Residual Harapan",
      //   columns: [
      {
        accessorKey: "risiko_residual_harapan",
        header: "Risiko Residual Harapan",
        enableSorting: false,
        size: 240,
        accessorFn: (row) => (
          <Stack direction="column" gap={1}>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">LK:</Typography>
              <Typography variant="body2" fontWeight={700} component="strong">
                {row.perlakuan_lk}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">LD:</Typography>
              <Typography variant="body2" fontWeight={700} component="strong">
                {row.perlakuan_ld}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">BR:</Typography>
              <Typography variant="body2" fontWeight={700} component="strong">
                {row.perlakuan_br}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2">LEVEL</Typography>
              <ChipLevelRisiko level={row.perlakuan_level} />
            </Stack>
          </Stack>
        ),
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      // ],

      // columns: [
      //   {
      //     accessorKey: "perlakuan_lk",
      //     header: "LK",
      //     enableColumnActions: false,
      //     size: 120,
      //     muiTableHeadCellProps: {
      //       align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //       align: "center",
      //     },
      //     Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
      //       renderedCellValue == null ? "-" : renderedCellValue,
      //     Header: ({ column }) => (
      //       <SortNumber column={column} numberSort={column.getIndex() + 1} />
      //     ),
      //   },
      //   {
      //     accessorKey: "perlakuan_ld",
      //     header: "LD",
      //     enableColumnActions: false,
      //     size: 120,
      //     muiTableHeadCellProps: {
      //       align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //       align: "center",
      //     },
      //     Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
      //       renderedCellValue == null ? "-" : renderedCellValue,
      //     Header: ({ column }) => (
      //       <SortNumber column={column} numberSort={column.getIndex() + 1} />
      //     ),
      //   },
      //   {
      //     accessorKey: "perlakuan_br",
      //     header: "BR",
      //     enableColumnActions: false,
      //     size: 120,
      //     muiTableHeadCellProps: {
      //       align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //       align: "center",
      //     },
      //     Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
      //       renderedCellValue == null ? "-" : renderedCellValue,
      //     Header: ({ column }) => (
      //       <SortNumber column={column} numberSort={column.getIndex() + 1} />
      //     ),
      //   },
      //   {
      //     accessorKey: "perlakuan_level",
      //     header: "Level Risiko",
      //     enableColumnActions: false,
      //     Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
      //       <ChipLevelRisiko level={renderedCellValue} />
      //     ),
      //     Header: ({ column }) => (
      //       <SortNumber column={column} numberSort={column.getIndex() + 1} />
      //     ),
      //   },
      // ],
      // },
    ],
    []
  );

  type ColumnsType = {};

  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () => (
      <AddButton onclick={handleModalOpenAdd} title="Tambah Perlakuan" />
    ),
  };

  const data = dataTable ?? [];
  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    ...(viewOnly ? null : renderTopToolbar),
    ...advancedTable,
    muiTableContainerProps: {
      sx: {
        maxWidth: viewOnly ? "calc(100vw - 148px)" : "calc(100vw - 348px)",
        maxHeight: "64vh",
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
        border: `1px solid ${grey[300]}`,
        justifyContent: "center",
      },
    },
    muiTableHeadRowProps: {
      sx: {
        "&:nth-of-type(3)": {
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
        header: "",
        size: viewOnly ? 0 : 150,
        Cell: () => (
          <ActionColumn
            viewClick={handleModalOpenView}
            editClick={handleModalOpenEdit}
            deleteClick={handleModalOpenDelete}
          />
        ),
      },
    },
    enableColumnPinning: false,
    layoutMode: "grid-no-grow",
    initialState: {
      showGlobalFilter: true,
      sorting: [
        {
          id: "row-analisis_br",
          desc: true,
        },
      ],
    },
    renderCaption: () => renderCaption,
  });

  return (
    <Box
      className="table-sticky-horizontal"
      sx={{
        ".MuiPaper-root": {
          "& > .MuiBox-root": {
            "&:first-of-type": {
              display: viewOnly ? "none" : "inherit",
            },
          },

          ".MuiTableHead-root": {
            top: -1,
          },
        },
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
}
