"use client";

import ContentPage from "@/components/contents";
import React, { useMemo } from "react";
import DashboardLayout from "@/components/layouts/layout";
import { advancedTable } from "@/components/table";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  DialogActions,
  Divider,
  Grow,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";
import ActionColumn from "@/components/actions/action";
import { data, type PemantauanType } from "./setting";
import DialogComponent from "@/components/dialog";
import FormTable from "./partials/form-table";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import { IconFA } from "@/components/icons/icon-fa";
import Image from "next/image";
import theme from "@/theme";
import { dataSub } from "@/app/profil-risiko/analisis-evaluasi/setting";
import { SortNumber } from "@/app/profil-risiko/perlakuan/partials/mrt-complete";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

const CustomChip = ({ title, value }: { title: string; value: string }) => {
  return (
    <Chip
      variant="outlined"
      label={
        <>
          <Stack direction="row" alignItems="center">
            <Stack
              direction="row"
              bgcolor={grey[700]}
              px={2}
              alignItems="center"
              height="34px"
              sx={{
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
              }}
            >
              <Typography
                fontSize={13}
                color="white"
                fontWeight={600}
                lineHeight={1}
              >
                {title}
              </Typography>
            </Stack>
            <Box
              sx={{
                [theme.breakpoints.up("sm")]: {
                  display: "none",
                },
                [theme.breakpoints.down("sm")]: {
                  display: "block",
                },
              }}
            >
              {/* {nameOfKp.length >= 35 ? (
             <Tooltip title={nameOfKp} followCursor TransitionComponent={Grow}>
              <Typography
               aria-owns={open ? "mouse-over-popover" : undefined}
               aria-haspopup="true"
               onMouseEnter={handlePopoverOpen}
               onMouseLeave={handlePopoverClose}
               px={1.5}
               fontSize={13}
               fontWeight={600}
              >
               {nameOfKp.substring(0, 35) + "..."}
              </Typography>
             </Tooltip>
            ) : (
             <Typography px={1.5} fontSize={13} fontWeight={600}>
              {nameOfKp}
             </Typography>
            )} */}
            </Box>
            <Box
              sx={{
                [theme.breakpoints.up("sm")]: {
                  display: "block",
                },
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            >
              <Typography px={3} fontSize={13} fontWeight={800}>
                {value}
              </Typography>
            </Box>
          </Stack>
        </>
      }
      sx={{
        height: "34px",
        bgcolor: "white",
        fontWeight: 600,
        lineHeight: 1,
        cursor: "default",

        ".MuiChip-label": {
          px: 0,
        },
      }}
    />
  );
};

function convertDaysToMonthsAndDays(days: any) {
  const daysInMonth = 30.44;
  const months = Math.floor(days / daysInMonth);
  const remainingDays = Math.round(days % daysInMonth);
  return { months, remainingDays };
}

export default function PagePemantauan({}) {
  usePermissionChecker("pemantauanMrpn.pemantauan");

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
        header: "Peristiwa Risiko",
        size: 250,
        enableColumnActions: false,
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      //  {
      //   id: "penilaian_risiko",
      //   header: "Penilaian Risiko",
      //   columns: [
      //    {
      //     id: "identifikasi_risiko",
      //     header: "Identifikasi Risiko",
      //     columns: [
      //      {
      //       accessorKey: "peristiwa",
      //       header: "Peristiwa Risiko",
      //       size: 250,
      //       enableColumnActions: false,
      //      },
      //      //  {
      //      //   accessorKey: "kategori",
      //      //   header: "Kategori Risiko",
      //      //   enableColumnActions: false,
      //      //  },
      //     ],
      //    },
      //  {
      //   id: "analisis_evaluasi_risiko",
      //   header: "Analisis & Evaluasi Risiko",
      //   columns: [
      //    {
      //     accessorKey: "lk",
      //     header: "LK",
      //     enableColumnActions: false,
      //     muiTableHeadCellProps: {
      //      align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //      align: "center",
      //     },
      //    },
      //    {
      //     accessorKey: "ld",
      //     header: "LD",
      //     enableColumnActions: false,
      //     muiTableHeadCellProps: {
      //      align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //      align: "center",
      //     },
      //    },
      //    {
      //     accessorKey: "br",
      //     header: "BR",
      //     enableColumnActions: false,
      //     muiTableHeadCellProps: {
      //      align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //      align: "center",
      //     },
      //    },
      //    {
      //     accessorKey: "level",
      //     header: "Level Risiko",
      //     enableColumnActions: false,
      //     muiTableHeadCellProps: {
      //      align: "center",
      //     },
      //     muiTableBodyCellProps: {
      //      align: "center",
      //     },
      //     Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
      //      <Chip
      //       color={
      //        renderedCellValue === "Sangat Tinggi"
      //         ? "error"
      //         : renderedCellValue === "Tinggi"
      //         ? "warning"
      //         : "success"
      //       }
      //       sx={{
      //        minWidth: 80,
      //        borderWidth: "2px",
      //        borderStyle: "solid",
      //        "& .MuiChip-label": {
      //         fontWeight: 600,
      //        },
      //        "&.MuiChip-colorWarning": {
      //         bgcolor: orange[100],
      //         borderColor: orange[600],
      //         color: orange[900],
      //        },
      //        "&.MuiChip-colorError": {
      //         bgcolor: red[100],
      //         borderColor: red[400],
      //         color: red[900],
      //        },
      //        "&.MuiChip-colorSuccess": {
      //         bgcolor: green[100],
      //         borderColor: green[400],
      //         color: green[900],
      //        },
      //       }}
      //       label={renderedCellValue}
      //      />
      //     ),
      //    },
      //    {
      //     accessorKey: "prioritas",
      //     header: "Prioritas Risiko",
      //     size: 150,
      //     enableColumnActions: false,
      //     muiTableHeadCellProps: {
      //      align: "center",
      //      sx: {
      //       bgcolor: `${grey[100]} !important`,
      //       ".Mui-TableHeadCell-Content-Wrapper": {
      //        whiteSpace: "wrap",
      //        textAlign: "left",
      //       },
      //      },
      //     },
      //     muiTableBodyCellProps: {
      //      align: "center",
      //     },
      //    },
      //   ],
      //  },
      //   ],
      //  },
      {
        id: "perlakuan_risiko",
        header: "Perlakuan Risiko",
        columns: [
          {
            accessorKey: "keputusan",
            header: "Keputusan Perlakuan Risiko",
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "deskripsi",
            header: "Keterangan Perlakuan Risiko",
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
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "waktu",
            header: "Waktu Rencana Perlakuan Risiko",
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "penanggungjawab",
            header: "Penanggung Jawab",
            enableColumnActions: false,
            size: 220,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
        ],
      },
      {
        id: "risiko_residual_harapan",
        header: "Risiko Residual Harapan",
        columns: [
          {
            accessorKey: "lkRRH",
            header: "LK",
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
          {
            accessorKey: "ldRRH",
            header: "LD",
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
          {
            accessorKey: "brRRH",
            header: "BR",
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
      {
        accessorKey: "buktiDukung",
        header: "Bukti Dukung",
        enableColumnActions: false,
        size: 180,
        Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
          <>
            {renderedCellValue ? (
              <Tooltip
                title="Klik untuk lihat Bukti Dukung"
                TransitionComponent={Grow}
              >
                <IconFA
                  name={"check-circle"}
                  size={24}
                  color={green[700]}
                  onclick={handleModalOpenBukti}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
            ) : (
              <IconFA name="xmark-circle" size={24} color={red[700]} />
            )}
          </>
        ),
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
      {
        accessorKey: "updateStatus",
        header: "Update Penilaian",
        enableColumnActions: false,
        size: 250,
        Cell: ({ renderedCellValue }: { renderedCellValue: any }) => {
          const result = convertDaysToMonthsAndDays(renderedCellValue);
          return (
            <Box>
              {renderedCellValue >= 90 ? (
                <Stack gap={1}>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    sx={{ borderRadius: 50, mb: 0.5 }}
                  >
                    Update Sekarang
                  </Button>
                  <Divider />
                  <Typography fontSize={14} color={red[700]}>
                    {`Terakhir update ${result.months} bulan & ${result.remainingDays} hari yang lalu`}
                  </Typography>
                </Stack>
              ) : (
                `Terakhir update ${result.months} bulan & ${result.remainingDays} hari yang lalu`
              )}
            </Box>
          );
        },
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
      {
        accessorKey: "status",
        header: "Status Pelaksanaan",
        enableColumnActions: false,
        size: 180,
        Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
          <Chip
            icon={
              renderedCellValue === "Belum" ? (
                <IconFA name="xmark" size={12} />
              ) : renderedCellValue === "Proses" ? (
                <IconFA name="hourglass-start" size={12} />
              ) : (
                <IconFA name="check" size={12} />
              )
            }
            color={
              renderedCellValue === "Belum"
                ? "error"
                : renderedCellValue === "Proses"
                ? "warning"
                : "success"
            }
            sx={{
              minWidth: 80,
              borderWidth: "2px",
              borderStyle: "solid",
              "&.MuiChip-root": { gap: 1, px: 1.5 },
              "& .MuiChip-label": {
                fontWeight: 600,
                px: 0,
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
        muiTableHeadCellProps: {
          align: "center",
          sx: {
            borderLeft: `1px solid ${grey[300]}`,
            ".Mui-TableHeadCell-Content-Wrapper": {
              whiteSpace: "wrap",
              textAlign: "left",
            },
            "&:before": {
              bgcolor: `${blue[50]} !important`,
            },
          },
        },
        muiTableBodyCellProps: {
          align: "center",
        },
        Header: ({ column }) => (
          <SortNumber column={column} numberSort={column.getIndex() + 1} />
        ),
      },
    ],
    []
  );

  //  type ColumnsType = {};

  //  const renderTopToolbar: ColumnsType = {
  //   renderTopToolbarCustomActions: () => (
  //    <AddButton onclick={handleModalOpenAdd} title="Tambah Pemantauan" />
  //   ),
  //  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    // ...renderTopToolbar,
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
      columnPinning: { right: ["status", "mrt-row-actions"] },
      showGlobalFilter: true,
    },
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
                <TableCell>Realisasi Anggaran</TableCell>
                <TableCell>Realisasi Fisik</TableCell>
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
                  <TableCell>{row.anggaran}</TableCell>
                  <TableCell>{row.fisik}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ),
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
          title="Pemantauan"
          infoToolTip="Proses berkelanjutan dan sistematis untuk menilai dan mengawasi efektivitas praktik manajemen
risiko, termasuk kerangka kerja, proses, tindakan pengendalian risiko, dan pencapaian sasaran
pembangunan yang telah ditetapkan"
          chipKp
          identificationInfo={
            <Stack direction="row" gap={1}>
              <CustomChip title="Risiko" value="4" />
              <CustomChip title="Perlakuan" value="8" />
              <CustomChip title="Realisasi Perlakuan" value="37,5%" />
            </Stack>
          }
        >
          <Box
            className="table-sticky-horizontal"
            sx={{
              ".MuiTableRow-root": {
                ".MuiTableCell-root": {
                  ".MuiCollapse-root": {
                    width: "100%",
                  },
                },
              },
            }}
          >
            <MaterialReactTable table={table} />
          </Box>
        </ContentPage>
      </DashboardLayout>
      <DialogComponent
        dialogOpen={modalOpenView}
        dialogClose={handleModalClose}
        title="Detail Pemantauan"
      >
        <FormTable mode="view" />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Pemantauan"
        dialogFooter={dialogActionFooter}
      >
        <FormTable mode="add" />
      </DialogComponent>
      <DialogComponent
        dialogOpen={modalOpenEdit}
        dialogClose={handleModalClose}
        title="Ubah Pemantauan"
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
      <DialogComponent
        width={240}
        dialogOpen={modalOpenBukti}
        dialogClose={handleModalClose}
        title="Bukti Dukung"
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="https://res.cloudinary.com/caturteguh/image/upload/v1722221300/mrpn/buktidukung_wo09q4.png"
          alt="MRPN 2024"
          priority
        />
      </DialogComponent>
    </>
  );
}
