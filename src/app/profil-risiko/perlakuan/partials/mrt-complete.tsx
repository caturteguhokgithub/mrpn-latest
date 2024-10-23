import React, {useMemo} from "react";
import {advancedTable} from "@/app/components/table";
import {Box, Chip, Paper, Stack} from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import ActionColumn from "@/app/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import {green, grey, orange, red} from "@mui/material/colors";
import {RiskOverviewData} from "@/app/profil-risiko/overview/pageModel";

function ChipLevelRisiko(props: { level: any }) {
  return <Box display={"flex"} justifyContent={"center"} width={"100%"}>
    {props.level ?
      <Chip
        color={
          props.level === "Sangat Tinggi (5)"
            ? "error"
            : props.level === "Tinggi (4)"
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
        }}
        label={props.level}
      />
      :
      "-"
    }
  </Box>;
}

export default function MRTPerlakuanComplete(
  {
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
    dataTable?:RiskOverviewData[]
  }) {

  const columns = useMemo<MRT_ColumnDef<RiskOverviewData>[]>(
    () => [
      {
        id: "penilaian_risiko",
        header: "Penilaian Risiko",
        columns: [
          {
            id: "identifikasi_risiko",
            header: "Identifikasi Risiko",
            columns: [
              {
                accessorKey: "peristiwa",
                header: "Peristiwa Risiko",
                size: 250,
                enableColumnActions: false,
              },
              {
                accessorKey: "kategori",
                header: "Kategori Risiko",
                enableColumnActions: false,
              },
              {
                accessorKey: "penyebab",
                header: "Penyebab",
                size: 250,
                enableColumnActions: false,
                Cell: ({cell}: { cell: any }) => (
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
                        {cell.getValue().map((itemDesc: any, index: any) => (
                          itemDesc &&
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
                        ))}
                      </Stack>
                  </Paper>
                ),
              },
              {
                accessorKey: "dampak",
                header: "Dampak",
                size: 300,
                enableColumnActions: false,
                Cell: ({cell}: { cell: any }) => (
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
                      {cell.getValue().map((itemDesc: any, index: any) => (
                        itemDesc &&
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
                      ))}
                    </Stack>
                  </Paper>
                ),
              },
            ],
          },
          {
            id: "analisis_evaluasi_risiko",
            header: "Analisis & Evaluasi Risiko",
            columns: [
              {
                accessorKey: "analisis_lk",
                header: "LK",
                enableColumnActions: false,
                size: 120,
                muiTableHeadCellProps: {
                  align: "center",
                },
                muiTableBodyCellProps: {
                  align: "center",
                },
                Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
                  renderedCellValue == null ? "-" : renderedCellValue
                ),
              },
              {
                accessorKey: "analisis_ld",
                header: "LD",
                enableColumnActions: false,
                size: 120,
                muiTableHeadCellProps: {
                  align: "center",
                },
                muiTableBodyCellProps: {
                  align: "center",
                },
                Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
                  renderedCellValue == null ? "-" : renderedCellValue
                ),
              },
              {
                id:"row-analisis_br",
                accessorKey: "analisis_br",
                header: "BR",
                enableColumnActions: false,
                size: 120,
                muiTableHeadCellProps: {
                  align: "center",
                },
                muiTableBodyCellProps: {
                  align: "center",
                },
                Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
                  renderedCellValue == null ? "-" : renderedCellValue
                ),
              },
              {
                accessorKey: "analisis_level",
                header: "Level Risiko",
                enableColumnActions: false,
                Cell: ({renderedCellValue}: { renderedCellValue: any }) => <ChipLevelRisiko level={renderedCellValue} />,
              },
              {
                id:"row-prioritas",
                accessorKey: "prioritas",
                header: "Prioritas Risiko",
                enableColumnActions: false,
                muiTableHeadCellProps: {
                  align: "center",
                },
                muiTableBodyCellProps: {
                  align: "center",
                },
              },
            ],
          },
        ],
      },
      {
        id: "perlakuan_risiko",
        header: "Perlakuan Risiko",
        columns: [
          {
            accessorKey: "keputusan",
            header: "Keputusan Perlakuan Risiko",
            enableColumnActions: false,
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
               renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
          // {
          //   accessorKey: "keterangan",
          //   header: "Keterangan Perlakuan Risiko",
          //   enableColumnActions: false,
          //   size: 300,
          //   Cell: ({cell}: { cell: any }) => (
          //     <Paper
          //       elevation={0}
          //       sx={{
          //         overflow: "auto",
          //         maxHeight: 160,
          //         backgroundColor: "transparent",
          //         "&::-webkit-scrollbar": {
          //           width: "3px",
          //         },
          //       }}
          //     >
          //       <Stack gap={1}>
          //         {cell.getValue().map((itemDesc: any, index: any) => (
          //           <Chip
          //             key={index}
          //             sx={{
          //               height: "auto",
          //               py: 1,
          //               "& .MuiChip-label": {
          //                 overflow: "unset",
          //                 whiteSpace: "wrap",
          //               },
          //             }}
          //             label={itemDesc}
          //           />
          //         ))}
          //       </Stack>
          //     </Paper>
          //   ),
          // },
          {
            accessorKey: "waktu",
            header: "Waktu Rencana Perlakuan Risiko",
            enableColumnActions: false,
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
          {
            accessorKey: "penanggung_jawab",
            header: "Penanggung Jawab",
            enableColumnActions: false,
            size: 220,
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
        ],
      },
      {
        id: "risiko_residual_harapan",
        header: "Risiko Residual Harapan",
        columns: [
          {
            accessorKey: "perlakuan_lk",
            header: "LK",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
          {
            accessorKey: "perlakuan_ld",
            header: "LD",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
          {
            accessorKey: "perlakuan_br",
            header: "BR",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              renderedCellValue == null ? "-" : renderedCellValue
            ),
          },
          {
            accessorKey: "perlakuan_level",
            header: "Level Risiko",
            enableColumnActions: false,
            Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
              <ChipLevelRisiko level={renderedCellValue} />
            ),
          },
        ],
      },
    ],
    []
  );

  type ColumnsType = {};

  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () => (
      <AddButton onclick={handleModalOpenAdd} title="Tambah Perlakuan"/>
    ),
  };

  const data = dataTable ?? []
  const table = useMaterialReactTable({
    columns,
    data,
    ...(viewOnly ? null : renderTopToolbar),
    ...advancedTable,
    muiTableContainerProps: {
      sx: {
        maxWidth: viewOnly ? "calc(100vw - 148px)" : "calc(100vw - 348px)",
        overflowX: "auto",
        transition: "max-width 500ms ease-in-out",
        "&::-webkit-scrollbar": {
          height: "10px",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        bgcolor: grey[100],
        border: `1px solid ${grey[300]}`,
        justifyContent: "center",
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
          id: 'row-analisis_br',
          desc: true,
        }
      ]
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
        },
      }}
    >
      <MaterialReactTable table={table}/>
    </Box>
  );
}
