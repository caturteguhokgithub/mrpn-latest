import React, { useMemo } from "react";
import { advancedTable } from "@/app/components/table";
import { Box, Paper, Stack } from "@mui/material";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import ActionColumn from "@/app/components/actions/action";
import AddButton from "@/app/components/buttonAdd";
import { data } from "../setting";
import HeaderIdentifikasi from "./header";

export default function MRTIdentifikasi({
  handleModalOpenView,
  handleModalOpenDelete,
  handleModalOpenAdd,
  handleModalOpenEdit,
  viewOnly,
  headerOnly,
  renderCaption,
}: {
  handleModalOpenView?: () => void;
  handleModalOpenDelete?: () => void;
  handleModalOpenAdd?: () => void;
  handleModalOpenEdit?: () => void;
  viewOnly?: boolean;
  headerOnly?: boolean;
  renderCaption?: React.ReactNode;
}) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "peristiwa",
        header: "Peristiwa Risiko Strategis MRPN LS",
        size: 250,
        enableColumnActions: false,
      },
      {
        accessorKey: "pemilik",
        header: "Pemilik Risiko MRPN LS",
        size: 250,
        enableColumnActions: false,
      },
    ],
    []
  );

  type ColumnsType = {};

  const renderTopToolbar: ColumnsType = {
    renderTopToolbarCustomActions: () => (
      <AddButton onclick={handleModalOpenAdd} title="Tambah Identifikasi" />
    ),
  };

  const table = useMaterialReactTable({
    columns,
    data,
    ...(viewOnly ? null : renderTopToolbar),
    ...advancedTable,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "",
        size: 150,
        Cell: () => (
          <ActionColumn
            viewClick={handleModalOpenView}
            editClick={handleModalOpenEdit}
            deleteClick={handleModalOpenDelete}
          />
        ),
      },
    },
    initialState: {
      showGlobalFilter: viewOnly ? false : true,
    },
    renderCaption: () => renderCaption,
  });

  return (
    <Stack gap={viewOnly ? 1 : 2}>
      {headerOnly ? (
        <>
          {viewOnly ? (
            <Paper
              elevation={2}
              sx={{
                borderRadius: "1.25rem",
                p: 0,
                m: 1,
              }}
            >
              <HeaderIdentifikasi asTable viewOnly />
            </Paper>
          ) : (
            <HeaderIdentifikasi asTable />
          )}
        </>
      ) : (
        <>
          {viewOnly ? (
            <Paper
              elevation={2}
              sx={{
                borderRadius: "1.25rem",
                p: 0,
                m: 1,
              }}
            >
              <HeaderIdentifikasi asTable viewOnly />
            </Paper>
          ) : (
            <HeaderIdentifikasi asTable />
          )}
          <Box
            sx={{
              ".MuiPaper-root": {
                "& > .MuiBox-root": {
                  "&:first-of-type": {
                    display: viewOnly ? "none" : "inherit",
                  },
                },
              },
            }}
          >
            <MaterialReactTable table={table} />
          </Box>
        </>
      )}
    </Stack>
  );
}
