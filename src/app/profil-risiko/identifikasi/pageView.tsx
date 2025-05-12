"use client";

import ContentPage from "@/app/components/contents";
import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  FormControl,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DialogComponent from "@/app/components/dialog";
import FormTable from "./partials/form-table";
import AddButton from "@/app/components/buttonAdd";
import useIdentificationRiskVM from "@/app/profil-risiko/identifikasi/pageVM";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ActionColumn from "@/components/actions/action";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import HeaderTable from "../overview/partials/headerTable";
import useRiskOverviewVM from "../overview/pageVM";
import { advancedTable } from "@/app/components/table";
import { blue, grey, red } from "@mui/material/colors";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { SortNumber } from "../perlakuan/partials/mrt-complete";
import FormPeristiwa from "./partials/form-peristiwa";

export default function PageIdentifikasiView({}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();
  pathname =
    pathname == "/profil-risiko/identifikasi"
      ? "/profilRisiko/identifikasiRisiko"
      : pathname;

  const { year, rpjmn } = useRKPContext((state) => state);
  const { dataRiskOverview } = useRiskOverviewVM();

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const {
    modal,
    setModal,
    getIdentificationRiskData,
    dataIdentificationRisk,
    request,
    setRequest,
    updateOrCreateOrDelete,
    optionRiskType,
    getOptionRiskType,
    actionModal,
    optionImpactArea,
    getOptionImpactArea,
    modalPeristiwa,
    setModalPeristiwa,
  } = useIdentificationRiskVM();

  useEffect(() => {
    getOptionRiskType();
    getOptionImpactArea();
    if (objectState !== undefined) getIdentificationRiskData();
  }, [objectState]);

  const columns = [
    {
      accessorKey: "peristiwa_risiko",
      header: "Peristiwa Risiko Strategis MRPN LS",
      size: 250,
      enableColumnActions: false,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
      Cell: (item: any) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Typography
            color={item.row.original.insidentil ? red[600] : "inherit"}
          >
            {item.row.original.peristiwa_risiko}
          </Typography>
          {item.row.original.insidentil && (
            <InfoTooltip title="Insidentil" color={red[600]} />
          )}
        </Stack>
      ),
    },
    {
      accessorKey: "kategori_risiko",
      header: "Kategori Risiko",
      size: 260,
      enableColumnActions: false,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
    },
    {
      accessorKey: "penyebab_dampak",
      header: "Penyebab",
      enableColumnActions: false,
      Header: ({ column }: any) => (
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
            {cell.getValue().penyebab.map(
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
      accessorKey: "area_dampak",
      header: "Area Dampak",
      size: 150,
      enableColumnActions: false,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 1} />
      ),
      // Cell: ({ cell }: { cell: any }) => cell.getValue()?.area_dampak ?? "-",
    },
    {
      accessorKey: "penyebab_dampak",
      header: "Dampak",
      enableColumnActions: false,
      Header: ({ column }: any) => (
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
            {cell.getValue().dampak.map(
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
      accessorKey: "kategori_risiko",
      header: "Aksi",
      size: 100,
      enableColumnActions: false,
      Header: ({ column }: any) => (
        <SortNumber column={column} numberSort={column.getIndex() + 5} />
      ),
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
  ];

  const data = dataIdentificationRisk?.profile_risiko ?? [];
  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    enableRowActions: false,
    // displayColumnDefOptions: {
    //   "mrt-row-actions": {
    //     header: "",
    //     size: 150,
    //     Cell: (item: any) => (
    //       <ActionColumn
    //         viewClick={
    //           hasPrivilege(permission, pathname, "list")
    //             ? () => actionModal(true, "read", item.cell.row.original.id)
    //             : undefined
    //         }
    //         editClick={
    //           hasPrivilege(permission, pathname, "update")
    //             ? () => actionModal(true, "update", item.cell.row.original.id)
    //             : undefined
    //         }
    //         deleteClick={
    //           hasPrivilege(permission, pathname, "delete")
    //             ? () => actionModal(true, "delete", item.cell.row.original.id)
    //             : undefined
    //         }
    //       />
    //     ),
    //   },
    // },
    muiTableHeadCellProps: {
      sx: {
        bgcolor: blue[50],
        borderRight: `1px solid ${grey[300]}`,
        justifyContent: "center",
        textAlign: "center",
        ".Mui-TableHeadCell-Content": {
          justifyContent: "center",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: `1px solid ${grey[300]}`,
      },
    },
    initialState: {
      showGlobalFilter: true,
    },
  });

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

  return (
    <>
      <ContentPage
        title={`Identifikasi Risiko ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        infoToolTip="Proses menemukenali dan mendeskripsikan risiko"
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
        addButton={
          objectState !== undefined &&
          hasPrivilege(permission, pathname, "add") && (
            <AddButton
              title={`Tambah Identifikasi Risiko`}
              filled
              noMargin
              onclick={() => actionModal(true, "create")}
            />
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
          <Stack gap={1}>
            <Paper elevation={2} sx={{ borderRadius: "1.25rem", p: 0, m: 1 }}>
              <HeaderTable viewOnly data={dataIdentificationRisk} />
              {/* <HeaderIdentifikasi
                asTable
                viewOnly
                data={dataIdentificationRisk}
              /> */}
            </Paper>

            <Box
              sx={{
                ".MuiPaper-root": {
                  "& > .MuiBox-root": {
                    "&:first-of-type": {
                      display: modal.action == "read" ? "none" : "inherit",
                    },
                  },
                },
              }}
            >
              <MaterialReactTable table={table} />
            </Box>
          </Stack>
        )}
      </ContentPage>

      <DialogComponent
        width={"50%"}
        dialogOpen={modal.isOpen && modal.action != "delete"}
        dialogClose={() => actionModal(true, "create")}
        title={`${
          modal.action == "read"
            ? "Detail"
            : modal.action == "update"
            ? "Ubah"
            : "Tambah"
        } Identifikasi Risiko`}
        dialogFooter={dialogActionFooter}
        sx={{
          ".MuiDialogContent-root": {
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: grey[300],
            },
          },
        }}
      >
        <FormTable
          mode={modal.action == "read" ? "read" : undefined}
          data={dataIdentificationRisk}
          request={request}
          setRequest={setRequest}
          optionRiskType={optionRiskType}
          optionImpactArea={optionImpactArea}
          setModalPeristiwa={setModalPeristiwa}
        />
      </DialogComponent>

      <DialogComponent
        width={600}
        dialogOpen={modalPeristiwa}
        dialogClose={() => setModalPeristiwa(false)}
        title="Tambah Peristiwa Risiko Baru"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModalPeristiwa(false)}>Batal</Button>
            <Button
              variant="contained"
              // type="submit"
              // onClick={() => updateOrCreateOrDelete()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormPeristiwa />
      </DialogComponent>

      <DialogComponent
        width={240}
        dialogOpen={modal.isOpen && modal.action == "delete"}
        dialogClose={() => actionModal(true, "delete")}
        title="Hapus Data"
        dialogFooter={dialogActionDeleteFooter}
      >
        Anda yakin akan menghapus data ini?
      </DialogComponent>
    </>
  );
}
