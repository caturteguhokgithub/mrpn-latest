"use client";

import ContentPage from "@/components/contents";
import React, { Fragment, useMemo } from "react";
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
import {
  DialogActions,
  Button,
  Chip,
  Card,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import useManagementRoleVM from "@/app/manajemen-role/pageVM";
import useManagementUserVM from "@/app/manajemen-user/pageVM";
import FormUser from "@/app/manajemen-user/pageForm";
import {
  hasPrivilege,
  usePermissionChecker,
} from "@/lib/core/helpers/authHelpers";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { blue, grey } from "@mui/material/colors";
import LoaderClones from "../../components/loader/clones";

export default function PageUserManagement() {
  usePermissionChecker("manajemenUser");

  const { permission } = useAuthContext((store) => store);
  const pathname = usePathname();

  const {
    users,
    handleOpenModal,
    modal,
    setModal,
    createData,
    request,
    setRequest,
    managementRoleData,
    optionKP,
    loading,
  } = useManagementUserVM();

  const columns = [
    {
      accessorKey: "name",
      header: "Nama User",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "role",
      header: "Role",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "list_kp_id",
      header: "Allowed KP",
      enableColumnFilterModes: true,
      filterFns: "contains",
      size: 80,
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
        <Typography textAlign={"center"}>
          {`${renderedCellValue.length}`}
        </Typography>
      ),
    },
    {
      accessorKey: "id",
      header: "Aksi",
      size: 50,
      enableSorting: false,
      enableColumnActions: false,
      muiTableHeadCellProps: {
        sx: {
          bgcolor: blue[50],
          borderLeft: `1px solid ${grey[300]}`,
          borderBottom: `1px solid ${grey[200]}`,
          textAlign: "center",
          "& .Mui-TableHeadCell-Content": {
            justifyContent: "center",
          },
        },
      },
      muiTableBodyCellProps: {
        sx: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderLeft: `1px solid ${grey[200]}`,
          borderBottom: `1px solid ${grey[200]}`,
        },
      },
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
        <Stack justifyContent="center">
          <ActionColumn
            viewClick={
              hasPrivilege(permission, pathname, "list")
                ? () => handleOpenModal(renderedCellValue, "view")
                : undefined
            }
            editClick={
              hasPrivilege(permission, pathname, "update")
                ? () => handleOpenModal(renderedCellValue, "update")
                : undefined
            }
          />
        </Stack>
      ),
    },
  ];

  const data = users;
  const table = useMaterialReactTable({
    columns,
    data,
    // initialState: { density: "compact" },
    ...advancedTable,
    enableRowNumbers: true,
    rowNumberDisplayMode: "static",
    renderTopToolbarCustomActions: () =>
      hasPrivilege(permission, pathname, "add") ? (
        <AddButton
          title="Tambah User"
          onclick={() => handleOpenModal(0, "create")}
        />
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
    // state: {
    //   isLoading: true, // Set this based on your loading state
    // },
    muiTableBodyProps: {
      children: loading ? (
        <tr style={{ display: "flex" }}>
          <td colSpan={columns.length + 1} width="100%">
            <LoaderClones />
          </td>
        </tr>
      ) : undefined,
    },
    initialState: {
      showGlobalFilter: true,
      sorting: [{ id: "mrt-row-numbers", desc: false }],
    },
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 0,
        enableColumnActions: false,
        enableSorting: false,
        muiTableHeadCellProps: {
          sx: {
            display: "none",
          },
        },
        muiTableBodyCellProps: {
          sx: {
            display: "none",
          },
        },
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
    <Fragment>
      <DashboardLayout>
        <ContentPage title="Manajemen User" noMinusMargin>
          {/* {loading ? (
            <div className="gyro"></div>
          ) : ( */}
          <MaterialReactTable table={table} />
          {/* )} */}
        </ContentPage>
      </DashboardLayout>

      <DialogComponent
        width={"50%"}
        dialogOpen={modal.action}
        dialogClose={() => setModal({ action: false, type: "" })}
        title={modal.type == "view" ? "Detail User" : "Form User"}
        dialogFooter={
          modal.type == "view" ? (
            <DialogActions sx={{ p: 2, px: 3 }}>
              <Button
                variant="contained"
                onClick={() => setModal({ action: false, type: "" })}
              >
                Tutup
              </Button>
            </DialogActions>
          ) : (
            <DialogActions sx={{ p: 2, px: 3 }}>
              <Button onClick={() => setModal({ action: false, type: "" })}>
                Batal
              </Button>
              <Button variant="contained" onClick={() => createData()}>
                Simpan
              </Button>
            </DialogActions>
          )
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
    </Fragment>
  );
}
