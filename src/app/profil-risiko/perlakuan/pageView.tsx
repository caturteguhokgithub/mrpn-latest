"use client";

import ContentPage from "@/app/components/contents";
import React, { Fragment, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  DialogActions,
  FormControl,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import useTreatmentRiskVM from "@/app/profil-risiko/perlakuan/pageVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import AddButton from "@/components/buttonAdd";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { advancedTable } from "@/components/table";
import ActionColumn from "@/components/actions/action";
import theme from "@/theme";
import { dataSub } from "@/app/profil-risiko/analisis-evaluasi/setting";
import useRiskAnalysisVM from "@/app/profil-risiko/analisis-evaluasi/pageVM";
import { RiskTreatmentDto } from "@/app/profil-risiko/perlakuan/pageModel";
import dayjs from "dayjs";
import { RoDetailDto, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { FormatIDR } from "@/lib/utils/currency";
import { getDetailRO } from "@/lib/utils/roDetail";
import { SortNumber } from "./partials/mrt-complete";
import { bgColorTh } from "@/app/utils/color";

export default function PagePerlakuanView({}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  pathname =
    pathname == "/profil-risiko/perlakuan"
      ? "/profilRisiko/perlakuanRisiko"
      : pathname;

  const { year, rpjmn } = useRKPContext((state) => state);

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const {
    dataTable,
    getTreatmentRiskData,
    dataTreatmentRisk,
    state,
    setState,
    updateOrCreateOrDelete,
    optionRiskDecision,
    getOptionRiskDecision,
    modal,
    actionModal,
    optionStakeholder,
    getOptionStakeholder,
  } = useTreatmentRiskVM();

  const { optionsRiskMatrix, getMasterRiskMatrix } = useRiskAnalysisVM();

  useEffect(() => {
    if (optionStakeholder.length == 0) getOptionStakeholder();
    if (optionRiskDecision.length == 0) getOptionRiskDecision();
    if (optionsRiskMatrix.length == 0) getMasterRiskMatrix();
    if (objectState !== undefined) getTreatmentRiskData();
  }, [objectState]);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={() => actionModal(false, "create")}>
        {modal.action == "read" ? "Keluar" : "Batal"}
      </Button>
      {modal.action !== "read" && (
        <Button
          variant="contained"
          type="submit"
          onClick={() => updateOrCreateOrDelete()}
        >
          Simpan
        </Button>
      )}
    </DialogActions>
  );

  const dialogActionDeleteFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={() => actionModal(false, "create")}>Batal</Button>
      <Button
        variant="contained"
        color="error"
        type="submit"
        onClick={() => updateOrCreateOrDelete()}
      >
        Hapus
      </Button>
    </DialogActions>
  );

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
                Header: ({ column }) => (
                  <SortNumber
                    column={column}
                    numberSort={column.getIndex() + 1}
                  />
                ),
                muiTableBodyCellProps: {
                  sx: {
                    alignItems: "flex-start",
                  },
                },
              },
              {
                accessorKey: "kategori",
                header: "Kategori Risiko",
                enableColumnActions: false,
                Header: ({ column }) => (
                  <SortNumber
                    column={column}
                    numberSort={column.getIndex() + 1}
                  />
                ),
                muiTableBodyCellProps: {
                  sx: {
                    alignItems: "flex-start",
                  },
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
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
          },
          {
            accessorKey: "keterangan_risiko",
            header: "Keterangan Perlakuan Risiko",
            enableColumnActions: false,
            size: 300,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
          },
          {
            accessorKey: "target",
            header: "Target",
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
              <Stack>
                <Stack direction={"row"} gap={1} alignItems="center">
                  <Typography width={44} fontSize={14}>
                    TW I:
                  </Typography>
                  <Typography fontWeight={600} fontSize={14}>
                    -
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1} alignItems="center">
                  <Typography width={44} fontSize={14}>
                    TW II:
                  </Typography>
                  <Typography fontWeight={600} fontSize={14}>
                    -
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1} alignItems="center">
                  <Typography width={44} fontSize={14}>
                    TW III:
                  </Typography>
                  <Typography fontWeight={600} fontSize={14}>
                    -
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1} alignItems="center">
                  <Typography width={44} fontSize={14}>
                    TW IV:
                  </Typography>
                  <Typography fontWeight={600} fontSize={14}>
                    -
                  </Typography>
                </Stack>
              </Stack>
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
          },
          {
            accessorKey: "waktu",
            header: "Waktu Rencana Perlakuan Risiko",
            enableColumnActions: false,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
          },
          {
            accessorKey: "penanggung_jawab",
            header: "Penanggung Jawab",
            enableColumnActions: false,
            size: 220,
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
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
              sx: {
                alignItems: "flex-start",
              },
            },
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
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
              sx: {
                alignItems: "flex-start",
              },
            },
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            id: "row_perlakuan_br",
            accessorKey: "perlakuan_br",
            header: "BR",
            enableColumnActions: false,
            size: 120,
            muiTableHeadCellProps: {
              align: "center",
            },
            muiTableBodyCellProps: {
              align: "center",
              sx: {
                alignItems: "flex-start",
              },
            },
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
          },
          {
            accessorKey: "perlakuan_level",
            header: "Level Risiko",
            enableColumnActions: false,
            Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
              <Chip
                color={
                  renderedCellValue === "Sangat Tinggi (5)"
                    ? "error"
                    : renderedCellValue === "Tinggi (4)"
                    ? "warning"
                    : renderedCellValue === "Rendah (2)"
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
                    ...(renderedCellValue === "Sedang (3)" && {
                      bgcolor: yellow[100],
                      borderColor: yellow[700],
                      color: yellow[900],
                    }),
                    ...(renderedCellValue === "Sangat Rendah (1)" && {
                      bgcolor: blue[100],
                      borderColor: blue[700],
                      color: blue[900],
                    }),
                  },
                }}
                label={renderedCellValue}
              />
            ),
            Header: ({ column }) => (
              <SortNumber column={column} numberSort={column.getIndex() + 1} />
            ),
            muiTableBodyCellProps: {
              sx: {
                alignItems: "flex-start",
              },
            },
          },
        ],
      },
    ],
    []
  );

  type ColumnsType = {};

  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () =>
      hasPrivilege(permission, pathname, "add") &&
      dataTreatmentRisk != undefined &&
      dataTreatmentRisk.optionProfilRisiko.length > 0 ? (
        <AddButton
          onclick={() => actionModal(true, "create")}
          title="Tambah Perlakuan"
        />
      ) : (
        <Box />
      ),
  };

  const actionRight = {
    initialState: {
      columnPinning: { right: ["mrt-row-actions"] },
      showGlobalFilter: true,
    },
  };

  const data = dataTable;
  const table = useMaterialReactTable({
    columns,
    data,
    ...renderTopToolbar,
    ...advancedTable,
    enableRowVirtualization: true,
    rowVirtualizerOptions: { overscan: 5 },
    muiTableContainerProps: {
      sx: {
        maxWidth: "calc(100vw - 348px)",
        maxHeight: "calc(100vh - 390px)",
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
        size: 150,
        Cell: (item: any) => (
          <ActionColumn
            center
            viewClick={
              hasPrivilege(permission, pathname, "list")
                ? () => actionModal(true, "read", item.cell.row.original.id)
                : undefined
            }
            editClick={
              hasPrivilege(permission, pathname, "update")
                ? () => actionModal(true, "update", item.cell.row.original.id)
                : undefined
            }
            deleteClick={
              hasPrivilege(permission, pathname, "delete")
                ? () => actionModal(true, "delete", item.cell.row.original.id)
                : undefined
            }
          />
        ),
      },
    },
    enableColumnPinning: true,
    layoutMode: "grid-no-grow",
    ...actionRight,
    filterFromLeafRows: true,
    enableExpanding: true,
    renderDetailPanel: (row) => (
      <Stack
        direction="column"
        gap={2}
        bgcolor={theme.palette.primary.light}
        width="100%"
        m={-2}
        p={1}
      >
        {/* Tabel Pendanaan */}
        <Box>
          <TableContainer
            sx={{
              maxHeight: 300,
              "&::-webkit-scrollbar": {
                width: "3px",
              },
              "tbody, thead": {
                "td, th": {
                  borderRight: `1px solid ${grey[300]} !important`,
                  "&:last-of-type": {
                    borderRight: `1px solid ${grey[300]} !important`,
                  },
                },
              },
            }}
          >
            <Table stickyHeader size="small">
              <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{ bgcolor: bgColorTh, width: 30 }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    rowSpan={2}
                    align="center"
                    sx={{ bgcolor: bgColorTh }}
                  >
                    Nomenklatur RO
                  </TableCell>
                  {multiyear.map((y, iY) => (
                    <TableCell
                      colSpan={4}
                      align={"center"}
                      sx={{ bgcolor: bgColorTh }}
                    >
                      {y}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {multiyear.map((y, iY) => (
                    <>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: bgColorTh }}
                      >
                        Target
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: bgColorTh }}
                      >
                        Satuan
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: bgColorTh }}
                      >
                        Pembiayaan (Juta)
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: bgColorTh }}
                      >
                        Sumber Pembiayaan
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {row.row.original.rincian_output.map(
                  (r: RoDto, index: number) => (
                    <TableRow key={r.id}>
                      <TableCell sx={{ bgcolor: "white" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ bgcolor: "white" }}>{r.value}</TableCell>
                      {multiyear.map((y, iY) => (
                        <>
                          <TableCell sx={{ bgcolor: "white" }}>
                            {getDetailRO("target", y, r.detail)}
                          </TableCell>
                          <TableCell sx={{ bgcolor: "white" }}>
                            {getDetailRO("satuan", y, r.detail)}
                          </TableCell>
                          <TableCell align={"right"} sx={{ bgcolor: "white" }}>
                            {getDetailRO("anggaran", y, r.detail)}
                          </TableCell>
                          <TableCell sx={{ bgcolor: "white" }}>
                            {getDetailRO("sumber_anggaran", y, r.detail)}
                          </TableCell>
                        </>
                      ))}
                    </TableRow>
                  )
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    ),
  });

  return (
    <Fragment>
      <ContentPage
        title={`Perlakuan Risiko ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        infoToolTip="Proses untuk menurunkan keterpaparan risiko yang dikaitkan dengan toleransi dan selera risiko
yang telah ditetapkan"
        withCard={objectState === undefined}
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small" sx={{ width: "20vw" }}>
              <AutocompleteSelectSingle
                rounded
                value={objectState}
                options={objects}
                getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
                handleChange={(val: MasterListObjectRes) => setObjectState(val)}
                placeHolder={"Pilih KP"}
              />
            </FormControl>
          )
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
          {objectState === undefined ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title={year == 0 ? "Tidak ada data yang ditampilkan" : "Pilih KP"}
              description={
                year == 0
                  ? "Silahkan pilih RKP terlebih dulu"
                  : "Silahkan pilih KP terlebih dulu"
              }
            />
          ) : (
            <MaterialReactTable table={table} />
          )}
        </Box>
      </ContentPage>

      <DialogComponent
        width={"60%"}
        dialogOpen={modal.isOpen && modal.action != "delete"}
        dialogClose={() => actionModal(false, "create")}
        title={`${
          modal.action == "read"
            ? "Detail"
            : modal.action == "update"
            ? "Ubah"
            : "Tambah"
        } Perlakuan Risiko`}
        dialogFooter={dialogActionFooter}
        sx={{
          ".MuiDialogContent-root": {
            "&::-webkit-scrollbar": {
              width: "12px",
            },
          },
        }}
      >
        <FormTable
          mode={modal.action}
          data={dataTreatmentRisk}
          state={state}
          setState={setState}
          optionsRiskProfile={dataTreatmentRisk?.optionProfilRisiko ?? []}
          optionsRiskDecision={optionRiskDecision}
          optionsStakeholder={optionStakeholder}
          optionsRiskMatrix={optionsRiskMatrix}
        />
      </DialogComponent>

      <DialogComponent
        width={240}
        dialogOpen={modal.isOpen && modal.action == "delete"}
        dialogClose={() => actionModal(false, "create")}
        title="Hapus Data"
        dialogFooter={dialogActionDeleteFooter}
      >
        Anda yakin akan menghapus data ini?
      </DialogComponent>
    </Fragment>
  );
}
