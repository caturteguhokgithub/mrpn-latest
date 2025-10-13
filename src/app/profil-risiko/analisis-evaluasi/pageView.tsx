"use client";

import ContentPage from "@/components/contents";
import { useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  FormControl,
  Stack,
} from "@mui/material";
import DialogComponent from "@/components/dialog";
import FormTable from "./partials/form-table";
import AddButton from "@/components/buttonAdd";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ActionColumn from "@/components/actions/action";
import { orange, red, green, blue, grey, yellow } from "@mui/material/colors";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import useRiskAnalysisVM from "@/app/profil-risiko/analisis-evaluasi/pageVM";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";
import { advancedTable } from "@/components/table";
import { SortNumber } from "../perlakuan/partials/mrt-complete";

type ColumnsType = {};

export default function PageAnalisisEvaluasiView({}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  pathname =
    pathname == "/profil-risiko/analisis-evaluasi"
      ? "/profilRisiko/analisisEvaluasiRisiko"
      : pathname;

  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const {
    optionsRisk,
    riskAnalysisData,
    state,
    setState,
    modal,
    actionModal,
    optionsRiskMatrix,
    getMasterRiskMatrix,
    getRiskAnalysisData,
    updateOrCreateOrDelete,
    dataTable,
    handleCancelFooter,
    handleAddAnalysis,
  } = useRiskAnalysisVM();

  useEffect(() => {
    if (optionsRiskMatrix.length == 0) getMasterRiskMatrix();
    if (objectState !== undefined) {
      getRiskAnalysisData();
    }
  }, [objectState]);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleCancelFooter}>
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

  const columns: MRT_ColumnDef<RiskOverviewData>[] = [
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
              muiTableHeadCellProps: {
                align: "center",
              },
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
              ),
            },
            {
              accessorKey: "kategori",
              header: "Kategori Risiko",
              enableColumnActions: false,
              muiTableHeadCellProps: {
                align: "center",
              },
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
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
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
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
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
              ),
            },
            {
              id: "row-br",
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
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
              ),
            },
            {
              accessorKey: "analisis_level",
              header: "Level Risiko",
              enableColumnActions: false,
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 160,
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
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
              ),
            },
            {
              id: "row-prioritas",
              accessorKey: "prioritas",
              header: "Prioritas Risiko",
              enableColumnActions: false,
              size: 160,
              muiTableHeadCellProps: {
                align: "center",
              },
              muiTableBodyCellProps: {
                align: "center",
              },
              Header: ({ column }) => (
                <SortNumber
                  column={column}
                  numberSort={column.getIndex() + 1}
                />
              ),
            },
          ],
        },
      ],
    },
  ];

  const data = dataTable;
  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () =>
      hasPrivilege(permission, pathname, "add") && optionsRisk.length > 0 ? (
        <AddButton
          onclick={handleAddAnalysis}
          title="Tambah Analisis & Evaluasi"
        />
      ) : (
        <Box />
      ),
  };
  const table = useMaterialReactTable({
    columns,
    data,
    ...renderTopToolbar,
    ...advancedTable,
    initialState: {
      showGlobalFilter: true,
      sorting: [
        {
          id: "row-br",
          desc: true,
        },
      ],
    },
    muiTableHeadCellProps: {
      sx: {
        bgcolor: blue[50],
        borderRight: `1px solid ${grey[300]}`,
        justifyContent: "center",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: `1px solid ${grey[300]}`,
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
        size: 120,
        muiTableBodyCellProps: {
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
  });

  return (
    <>
      <ContentPage
        title={`Analisis & Evaluasi Risiko ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        infoToolTip={
          <Stack spacing={2}>
            <div>
              <strong>Analisis Risiko</strong>
              <p>
                Proses menjabarkan, menguraikan dan merinci risiko yang kompleks
                menjadi berbagai unsur dan elemen secara sistematis untuk
                memahami sifat dan menentukan tingkat risiko yang terkait dengan
                berbagai faktor yang terkandung dalam upaya pencapaian sasaran
                dan tujuan pembangunan.
              </p>
            </div>
            <div>
              <strong>Evaluasi Risiko</strong>
              <p>
                Proses membandingkan hasil analisis risiko dan sintesisnya
                dengan kriteria risiko yang telah ditetapkan sebelumnya untuk
                menentukan apakah risiko dan atau tingkat risiko dapat diterima
                atau ditoleransi dan penguatan pengendalian risiko yang
                diperlukan.
              </p>
            </div>
          </Stack>
        }
        withCard={objectState === undefined}
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small" sx={{ minWidth: "20vw" }}>
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
      </ContentPage>

      <DialogComponent
        dialogOpen={modal.isOpen && modal.action !== "delete"}
        dialogClose={() => actionModal(true, "create")}
        title={`${
          modal.action == "read"
            ? "Detail"
            : modal.action == "update"
            ? "Ubah"
            : "Tambah"
        } Analisis & Evaluasi Risiko`}
        dialogFooter={dialogActionFooter}
      >
        <FormTable
          mode={modal.action}
          state={state}
          setState={setState}
          optionsRiskMatrix={optionsRiskMatrix}
          optionsRiskProfile={optionsRisk}
        />
      </DialogComponent>

      <DialogComponent
        width={240}
        dialogOpen={modal.isOpen && modal.action == "delete"}
        dialogClose={() => actionModal(true, "create")}
        title="Hapus Data"
        dialogFooter={dialogActionDeleteFooter}
      >
        Anda yakin akan menghapus data ini?
      </DialogComponent>
    </>
  );
}
