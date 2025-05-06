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
import CollapsibleTable from "./partials/table-collapsible";

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

export default function PagePerlakuanViewNew({}) {
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
                enableColumnActions: false,
                Header: ({ column }) => (
                  <SortNumber
                    column={column}
                    numberSort={column.getIndex() + 1}
                  />
                ),
                muiTableBodyCellProps: {
                  sx: {
                    borderRight: `1px solid ${grey[300]}`,
                    alignItems: "flex-start",
                  },
                },
              },
              {
                accessorKey: "kategori",
                header: "Kategori Risiko",
                enableColumnActions: false,
                size: 100,
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
        id: "risiko_residual_harapan",
        header: "Risiko Residual Harapan",
        columns: [
          {
            accessorKey: "risiko_residual_harapan",
            header: "",
            enableSorting: false,
            size: 100,
            accessorFn: (row) => (
              <Stack direction="column" gap={1}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">LK:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
                    {row.perlakuan_lk}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">LD:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
                    {row.perlakuan_ld}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography variant="body2">BR:</Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    component="strong"
                  >
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
        <Box display="none" />
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
    // enableTopToolbar:
    //   hasPrivilege(permission, pathname, "add") &&
    //   dataTreatmentRisk != undefined &&
    //   dataTreatmentRisk.optionProfilRisiko.length > 0
    //     ? true
    //     : false,
    ...renderTopToolbar,
    ...advancedTable,
    enableRowVirtualization: true,
    rowVirtualizerOptions: { overscan: 5 },
    muiTableContainerProps: {
      sx: {
        maxWidth: "calc(100vw - 348px)",
        maxHeight: "calc(100vh - 390px)",
        // hasPrivilege(permission, pathname, "add") &&
        // dataTreatmentRisk != undefined &&
        // dataTreatmentRisk.optionProfilRisiko.length > 0
        //   ? "calc(100vh - 390px)"
        //   : "calc(100vh - 390px)",
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
    muiTableBodyCellProps: {
      sx: {
        border: `1px solid ${grey[300]}`,
      },
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Aksi",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
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
    // enableColumnPinning: true,
    // layoutMode: "grid-no-grow",
    // ...actionRight,
    filterFromLeafRows: true,
    enableExpanding: true,
    renderDetailPanel: () => <CollapsibleTable />,
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
