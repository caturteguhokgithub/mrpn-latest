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
import { red } from "@mui/material/colors";
import { InfoTooltip } from "@/app/components/InfoTooltip";

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
  } = useIdentificationRiskVM();

  useEffect(() => {
    getOptionRiskType();
    if (objectState !== undefined) getIdentificationRiskData();
  }, [objectState]);

  const columns = [
    {
      accessorKey: "peristiwa_risiko",
      header: "Peristiwa Risiko Strategis MRPN Linsek",
      size: 250,
      enableColumnActions: false,
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
      size: 200,
      enableColumnActions: false,
    },
    {
      accessorKey: "penyebab_dampak",
      header: "Penyebab",
      enableColumnActions: false,
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
      accessorKey: "penyebab_dampak",
      header: "Dampak",
      enableColumnActions: false,
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
      header: "Action",
      size: 100,
      enableColumnActions: false,
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
      {console.log("request.insidentil", request.insidentil)}
      <ContentPage
        title={`Identifikasi Risiko ${
          year == 0
            ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
            : "Tahun " + year
        }`}
        infoToolTip="Proses menemukenali dan mendeskripsikan risiko"
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
            title="Pilih RKP"
            description="Silahkan pilih rkp terlebih dulu"
          />
        ) : (
          <Stack gap={2}>
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
      >
        <FormTable
          mode={modal.action == "read" ? "read" : undefined}
          data={dataIdentificationRisk}
          request={request}
          setRequest={setRequest}
          optionRiskType={optionRiskType}
        />
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
