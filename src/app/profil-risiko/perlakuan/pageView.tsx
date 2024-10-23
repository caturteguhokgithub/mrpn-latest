"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect, useMemo } from "react";
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
import { green, grey, orange, red } from "@mui/material/colors";
import { advancedTable } from "@/components/table";
import ActionColumn from "@/components/actions/action";
import theme from "@/theme";
import { dataSub } from "@/app/profil-risiko/analisis-evaluasi/setting";
import useRiskAnalysisVM from "@/app/profil-risiko/analisis-evaluasi/pageVM";
import { RiskTreatmentDto } from "@/app/profil-risiko/perlakuan/pageModel";
import dayjs from "dayjs";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";

export default function PagePerlakuanView({}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  pathname =
    pathname == "/profil-risiko/perlakuan"
      ? "/profilRisiko/perlakuanRisiko"
      : pathname;

  const { year } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    if (year > 0) getMasterListObject();
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
      <Button onClick={() => actionModal(false, "create")}>Batal</Button>
      <Button
        variant="contained"
        type="submit"
        onClick={() => updateOrCreateOrDelete()}
      >
        Simpan
      </Button>
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
          // {
          //   accessorKey: "keterangan",
          //   header: "Keterangan Perlakuan Risiko",
          //   enableColumnActions: false,
          //   size: 300,
          //   Cell: ({ cell }: { cell: any }) => (
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
          //             // key={index}
          //             sx={{
          //               height: "auto",
          //               py: 1,
          //               "& .MuiChip-label": {
          //                 overflow: "unset",
          //                 whiteSpace: "wrap",
          //               },
          //             }}
          //             label={"{no implement}"}
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
          },
          {
            accessorKey: "penanggung_jawab",
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
            },
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
        bgcolor: grey[100],
        border: `1px solid ${grey[300]}`,
        justifyContent: "center",
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 150,
        Cell: (item: any) => (
          <ActionColumn
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
                <TableCell sx={{ width: 30 }}>No</TableCell>
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
              {row.row.original.rincian_output.map(
                (r: RoDto, index: number) => (
                  <TableRow key={r.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{r.value}</TableCell>
                    <TableCell>{r.target}</TableCell>
                    <TableCell>{r.satuan}</TableCell>
                    <TableCell>{r.fisik}</TableCell>
                    <TableCell>{r.alokasi}</TableCell>
                    <TableCell>{r.alokasi}</TableCell>
                    <TableCell>{`{data not found}`}</TableCell>
                    <TableCell>{`{data not found}`}</TableCell>
                    <TableCell>
                      {`{data not found}`}
                      {/*<Chip*/}
                      {/*  variant="outlined"*/}
                      {/*  label={r.status === 1 ? "Tercapai" : "Tidak Tercapai"}*/}
                      {/*  sx={{*/}
                      {/*    fontWeight: 600,*/}
                      {/*    color: r.status === 1 ? green[800] : red[800],*/}
                      {/*    borderColor: r.status === 1 ? green[800] : red[800],*/}
                      {/*  }}*/}
                      {/*/>*/}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    ),
  });

  return (
    <>
      <ContentPage
        title="Perlakuan Risiko"
        infoToolTip="Proses untuk menurunkan keterpaparan risiko yang dikaitkan dengan toleransi dan selera risiko
yang telah ditetapkan"
        withCard={objectState === undefined}
        chooseObject={
          <FormControl size="small" sx={{ width: "20vw" }}>
            <AutocompleteSelectSingle
              rounded
              value={objectState}
              options={objects}
              getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
              handleChange={(val: MasterListObjectRes) => setObjectState(val)}
              placeHolder={"Pilih RKP"}
            />
          </FormControl>
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
              title="Pilih RKP"
              description="Silahkan pilih rkp terlebih dulu"
            />
          ) : (
            <MaterialReactTable table={table} />
          )}
        </Box>
      </ContentPage>

      <DialogComponent
        width={"80%"}
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
    </>
  );
}
