"use client";

import ContentPage from "@/app/components/contents";
import React, {useMemo} from "react";
import DashboardLayout from "@/components/layouts/layout";
import {
  MaterialReactTable, type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {advancedTable} from "@/app/components/table";
import ActionColumn from "@/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import DialogComponent from "@/components/dialog";
import {DialogActions, Button, Chip, Card, Box, Typography} from "@mui/material";
import useManagementRoleVM from "@/app/manajemen-role/pageVM";
import useManagementUserVM from "@/app/manajemen-user/pageVM";
import FormUser from "@/app/manajemen-user/pageForm";
import {hasPrivilege, usePermissionChecker} from "@/lib/core/helpers/authHelpers";
import {useAuthContext} from "@/lib/core/hooks/useHooks";
import {usePathname} from "next/navigation";

export default function PageRoleManagement() {

  usePermissionChecker("manajemenUser")

  const {permission} = useAuthContext(store => store)
  const pathname = usePathname()

  const {
    users,
    handleOpenModal,
    modal,
    setModal,
    createData,
    request,
    setRequest,
    managementRoleData,
    optionKP
  } = useManagementUserVM()

  const columns = [
    {
      accessorKey: "name",
      header: "Nama User",
      enableColumnFilterModes: true,
      filterFns: 'contains'
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilterModes: true,
      filterFns: 'contains'
    },
    {
      accessorKey: "role",
      header: "Role",
      enableColumnFilterModes: true,
      filterFns: 'contains'
    },
    {
      accessorKey: "list_kp_id",
      header: "Allowed KP",
      enableColumnFilterModes: true,
      filterFns: 'contains',
      size: 30,
      Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
        <Typography textAlign={"center"}>
          {`${renderedCellValue.length}`}
        </Typography>
      ),
    },
    {
      accessorKey: "id",
      header: "",
      size: 50,
      Cell: ({renderedCellValue}: { renderedCellValue: any }) => (
        <ActionColumn
          viewClick={hasPrivilege(permission, pathname, "list") ? () => handleOpenModal(renderedCellValue, "view") : undefined}
          editClick={hasPrivilege(permission, pathname, "update") ? () => handleOpenModal(renderedCellValue, "update") : undefined}
          // deleteClick={() => console.log("delete")}
        />
      ),
    },
  ];

  const data = users
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {density: 'compact'},
    // ...advancedTable,
    enableRowNumbers: true,
    renderTopToolbarCustomActions: () => (
      hasPrivilege(permission, pathname, "add") ?
        <AddButton title="Tambah User" onclick={() => handleOpenModal(0, "create")}/> : undefined
    ),
    // displayColumnDefOptions: {
    //   "mrt-row-actions": {
    //     header: "",
    //     size: 45,
    //     Cell: (row) => (
    //       <ActionColumn
    //         viewClick={hasPrivilege(permission, pathname, "list") ? () => handleOpenModal(row.cell.row.original.id, "view") : undefined}
    //         editClick={hasPrivilege(permission, pathname, "update") ? () => handleOpenModal(row.cell.row.original.id, "update") : undefined}
    //         // deleteClick={() => console.log("delete")}
    //       />
    //     ),
    //   },
    // },
  });

  return (
    <>
      <DashboardLayout>
        <ContentPage title="Manajemen User">
          <MaterialReactTable table={table}/>
        </ContentPage>
      </DashboardLayout>

      <DialogComponent
        width={"50%"}
        dialogOpen={modal.action}
        dialogClose={() => setModal({action: false, type: ""})}
        title={modal.type == "view" ? "Detail User" : "Form User"}
        dialogFooter={modal.type == "view"
          ?
          <DialogActions sx={{p: 2, px: 3}}>
            <Button variant="contained" onClick={() => setModal({action: false, type: ""})}>
              Tutup
            </Button>
          </DialogActions>
          :
          <DialogActions sx={{p: 2, px: 3}}>
            <Button onClick={() => setModal({action: false, type: ""})}>Batal</Button>
            <Button variant="contained" onClick={() => createData()}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <FormUser
          mode={modal.type}
          roleData={managementRoleData}
          request={request}
          setRequest={setRequest}
          optionKP={optionKP}
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
