"use client";

import ContentPage from "@/components/contents";
import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Tooltip } from "@mui/material";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";
import useLogActivityVM from "@/app/log-activity/pageVM";
import dayjs from "dayjs";
import { blue, grey } from "@mui/material/colors";
import { advancedTable } from "../../components/table";

export default function PageRoleManagement() {
  usePermissionChecker("log-activity");

  const { data } = useLogActivityVM();

  const columns = [
    {
      accessorKey: "created_at",
      header: "Timestamp",
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) =>
        dayjs(renderedCellValue).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      accessorKey: "module",
      header: "Module",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "activity",
      header: "Activity",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "activity_group",
      header: "Action",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "user_name",
      header: "User Name",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "user_email",
      header: "User Email",
      enableColumnFilterModes: true,
      filterFns: "contains",
    },
    {
      accessorKey: "request_body",
      header: "Payload",
      enableColumnFilterModes: true,
      filterFns: "contains",
      Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
        <Box
          sx={{
            display: "block",
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Tooltip title={renderedCellValue}>{renderedCellValue}</Tooltip>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    // initialState: { density: "compact" },
    // enableRowNumbers: true,
    ...advancedTable,
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
    initialState: {
      showGlobalFilter: true,
    },
  });

  return (
    <DashboardLayout>
      <ContentPage title="Log Activities" noMinusMargin>
        <MaterialReactTable table={table} />
      </ContentPage>
    </DashboardLayout>
  );
}
