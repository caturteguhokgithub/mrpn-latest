"use client";

import ContentPage from "@/components/contents";
import React, { useMemo } from "react";
import DashboardLayout from "@/components/layouts/layout";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { advancedTable } from "@/components/table";
import ActionColumn from "@/components/actions/action";
import AddButton from "@/components/buttonAdd";
import DialogComponent from "@/components/dialog";
import { DialogActions, Button, Chip, Stack } from "@mui/material";
import FormTable from "./partials/form-table";
import useManagementRoleVM from "@/app/manajemen-role/pageVM";
import {
  hasPrivilege,
  usePermissionChecker,
} from "@/lib/core/helpers/authHelpers";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { blue, grey } from "@mui/material/colors";
import LoaderClones from "../../components/loader/clones";

export default function PageRoleManagement() {
  usePermissionChecker("manajemenRole");

  const { permission } = useAuthContext((store) => store);
  const pathname = usePathname();

  const {
    managementRoleData,
    stateRoleName,
    setStateRoleName,
    stateRolePermission,
    setStateRolePermission,
    menuConfig,
    modal,
    setModal,
    handleOpenModal,
    createData,
    loading,
  } = useManagementRoleVM();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nama Role",
        enableColumnFilterModes: true,
        filterFns: "contains",
      },
    ],
    []
  );

  const data = managementRoleData;
  const table = useMaterialReactTable({
    columns,
    data,
    ...advancedTable,
    enableRowNumbers: true,
    renderTopToolbarCustomActions: () =>
      hasPrivilege(permission, pathname, "add") ? (
        <AddButton title="Tambah Role" onclick={() => handleOpenModal(0)} />
      ) : undefined,
    muiTableHeadCellProps: {
      sx: {
        bgcolor: blue[50],
        justifyContent: "center",
        borderLeft: `1px solid ${grey[300]}`,
        borderBottom: "none",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderLeft: `1px solid ${grey[200]}`,
        alignItems: "flex-start",
        borderBottom: `1px solid ${grey[200]}`,
      },
    },
    muiTableBodyProps: {
      children: loading ? (
        <tr style={{ display: "flex" }}>
          <td colSpan={columns.length} width="100%">
            <LoaderClones />
          </td>
        </tr>
      ) : undefined,
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Aksi",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
          sx: {
            bgcolor: blue[50],
            paddingBottom: "auto",
            borderLeft: `1px solid ${grey[300]}`,
            borderBottom: `1px solid ${grey[200]}`,
          },
        },
        muiTableBodyCellProps: {
          align: "center",
          sx: {
            justifyContent: "center",
            borderLeft: `1px solid ${grey[200]}`,
            borderBottom: `1px solid ${grey[200]}`,
          },
        },
        Cell: (row) => (
          <Stack justifyContent="center">
            <ActionColumn
              editClick={
                hasPrivilege(permission, pathname, "update")
                  ? () => handleOpenModal(row.cell.row.original.id)
                  : undefined
              }
              // deleteClick={() => handleOpenModal(row.cell.row.original.id)}
            />
          </Stack>
        ),
      },
      "mrt-row-numbers": {
        header: "No.",
        size: 60,
        Cell: ({ row }) => (
          <div style={{ width: "100%", textAlign: "center" }}>
            {row.index + 1}
          </div>
        ),
        muiTableHeadCellProps: {
          sx: {
            bgcolor: blue[50],
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "auto",
            textAlign: "center",
            borderBottom: `1px solid ${grey[200]}`,
          },
        },
        muiTableBodyCellProps: {
          sx: {
            justifyContent: "center",
            borderBottom: `1px solid ${grey[200]}`,
          },
        },
      },
    },
  });

  return (
    <>
      <DashboardLayout>
        <ContentPage title="Manajemen Role">
          <MaterialReactTable table={table} />
        </ContentPage>
      </DashboardLayout>

      <DialogComponent
        width={400}
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Detail Role"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setModal(false)}>Batal</Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => createData()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormTable
          menu={menuConfig}
          roleName={stateRoleName}
          setRoleName={setStateRoleName}
          stateRolePermission={stateRolePermission}
          setStateRolePermission={setStateRolePermission}
        />
      </DialogComponent>

      {/*<DialogComponent*/}
      {/*  width={240}*/}
      {/*  dialogOpen={modalOpenDelete}*/}
      {/*  dialogClose={handleModalClose}*/}
      {/*  title="Hapus Data"*/}
      {/*  dialogFooter={<DialogActions sx={{p: 2, px: 3}}>*/}
      {/*    <Button onClick={handleModalClose}>Batal</Button>*/}
      {/*    <Button variant="contained" color="error" type="submit">*/}
      {/*      Hapus*/}
      {/*    </Button>*/}
      {/*  </DialogActions>}*/}
      {/*>*/}
      {/*  Anda yakin akan menghapus data ini?*/}
      {/*</DialogComponent>*/}
    </>
  );
}
