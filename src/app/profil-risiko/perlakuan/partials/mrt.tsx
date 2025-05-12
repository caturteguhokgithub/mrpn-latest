import React, { useMemo } from "react";
import { advancedTable } from "@/app/components/table";
import {
  Box,
  Checkbox,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import ActionColumn from "@/app/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import { data, type PerlakuanType } from "../setting";
import { green, grey, orange, red } from "@mui/material/colors";
import theme from "@/theme";
import { dataSub } from "../../analisis-evaluasi/setting";

export default function MRTPerlakuan({
  handleModalOpenView,
  handleModalOpenDelete,
  handleModalOpenAdd,
  handleModalOpenEdit,
  viewOnly,
  renderCaption,
}: {
  handleModalOpenView?: () => void;
  handleModalOpenDelete?: () => void;
  handleModalOpenAdd?: () => void;
  handleModalOpenEdit?: () => void;
  viewOnly?: boolean;
  renderCaption?: React.ReactNode;
}) {
  const columns = useMemo<MRT_ColumnDef<PerlakuanType>[]>(
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
          },
          {
            accessorKey: "deskripsi",
            header: "Deskripsi Perlakuan Risiko",
            enableColumnActions: false,
            size: 300,
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
                  {cell.getValue().map((itemDesc: any, index: any) => (
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
            accessorKey: "waktu",
            header: "Waktu Rencana Perlakuan Risiko",
            enableColumnActions: false,
          },
          {
            accessorKey: "penanggungjawab",
            header: "Penanggung Jawab",
            enableColumnActions: false,
            size: 220,
          },
        ],
      },
      {
        id: "risiko_residual_harapan",
        header: "Risiko Residual Harapan",
        columns: [
          {
            accessorKey: "lk",
            header: "LK",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "ld",
            header: "LD",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "br",
            header: "BR",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            accessorKey: "levelRRH",
            header: "Level Risiko",
            enableColumnActions: false,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
              <Chip
                color={
                  renderedCellValue === "Sangat Tinggi"
                    ? "error"
                    : renderedCellValue === "Tinggi"
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
                label={renderedCellValue}
              />
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
      <AddButton onclick={handleModalOpenAdd} title="Tambah Perlakuan" />
    ),
  };

  const actionRight = {
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
      showGlobalFilter: true,
    },
  };

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
    enableColumnPinning: viewOnly ? false : true,
    layoutMode: "grid-no-grow",
    ...(viewOnly ? null : actionRight),
    renderCaption: () => renderCaption,
    filterFromLeafRows: true,
    enableExpanding: true,
    renderDetailPanel: () => (
      <Box bgcolor={theme.palette.primary.light}>
        <TableContainer
          sx={{
            maxHeight: 200,
            "&::-webkit-scrollbar": {
              width: "3px",
            },
          }}
        >
          <Table stickyHeader size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ width: 30 }}></TableCell>
                <TableCell>Nomenklatur RO</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Satuan</TableCell>
                <TableCell>Realisasi Fisik</TableCell>
                <TableCell>Alokasi Anggaran</TableCell>
                <TableCell>Realisasi Anggaran</TableCell>
                <TableCell>Target Capaian</TableCell>
                <TableCell>Realisasi Progress</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSub.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>{row.ro}</TableCell>
                  <TableCell>{row.target}</TableCell>
                  <TableCell>{row.satuan}</TableCell>
                  <TableCell>{row.fisik}</TableCell>
                  <TableCell>{row.alokasi}</TableCell>
                  <TableCell>{row.anggaran}</TableCell>
                  <TableCell>{row.capaian}</TableCell>
                  <TableCell>{row.progress}</TableCell>
                  <TableCell>
                    <Chip
                      variant="outlined"
                      label={row.status === 1 ? "Tercapai" : "Tidak Tercapai"}
                      sx={{
                        fontWeight: 600,
                        color: row.status === 1 ? green[800] : red[800],
                        borderColor: row.status === 1 ? green[800] : red[800],
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ),
  });

  return (
    <Box
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
      <MaterialReactTable table={table} />
    </Box>
  );
}
