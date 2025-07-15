import { alpha, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { MRT_GlobalFilterTextField } from "material-react-table";

type ColumnsType = {};

export const advancedTable: ColumnsType = {
  enableRowActions: true,
  layoutMode: "grid",
  positionActionsColumn: "last",
  paginationDisplayMode: "pages",
  muiTopToolbarProps: {
    sx: {
      minHeight: "68.5px",
      "&>.MuiBox-root": {
        alignItems: "center",
        "&>.MuiBox-root": {
          p: 1,
          "&>.MuiCollapse-root": {
            display: "none",
          },
        },
      },
    },
  },
  muiBottomToolbarProps: {
    sx: {
      ".MuiBox-root": {
        position: "relative",
        p: 0,
      },
      ".MuiTablePagination-root": {
        p: 2,
        width: "100%",
        label: {
          display: "none",
        },
        "&>.MuiBox-root": {
          "&:first-of-type": {
            "&:before": {
              content: "'Show item per page'",
              fontSize: 14,
              color: grey[600],
            },
          },
        },
        ".MuiSelect-select": {
          py: 0,
        },
        "&>span, .MuiSelect-select, label": {
          fontSize: 14,
          color: grey[600],
        },
      },
      "&>.MuiBox-root": {
        "&>.MuiBox-root": {
          width: "100%",
        },
      },
    },
  },
  muiTablePaperProps: {
    elevation: 2,
    sx: {
      borderRadius: 5,
      m: 1,
    },
  },
  muiTableContainerProps: {
    sx: {
      "&::-webkit-scrollbar": {
        height: "10px",
      },
    },
  },
  muiTableHeadCellProps: {
    sx: (theme: any) => ({
      bgcolor: theme.palette.primary.light,
    }),
  },
  muiPaginationProps: {
    color: "primary",
    shape: "rounded",
    showRowsPerPage: true,
    variant: "outlined",
    //   labelRowsPerPage
    labelrowsperpage: "new label for rows per page",
    //   enableRowNumbers
    enablerownumbers: true,
    //   rowNumberDisplayMode
    rownumberdisplaymode: "static",
  },
  renderToolbarInternalActions: ({ table }: any) => (
    <Box>
      <MRT_GlobalFilterTextField
        sx={{
          width: "20vw",
          ".MuiInputBase-root": {
            height: "36.5px",
            borderRadius: "50px",
            svg: {
              width: 20,
            },
          },
          ".MuiButtonBase-root": {
            svg: {
              width: 20,
            },
          },
          svg: {
            fill: grey[400],
          },
          input: {
            py: 0,
          },
        }}
        table={table}
      />
    </Box>
  ),
  //  displayColumnDefOptions: {
  //   "mrt-row-actions": {
  //    header: "",
  //    size: 150,
  //    Cell: ({ row, table }: any) => (
  //     <Stack direction="row" justifyContent="flex-end" width="100%" gap={1}>
  //      <Link href="/manajemen-user/role">
  //       <IconButton
  //        aria-label="edit"
  //        color="primary"
  //        sx={{
  //         bgcolor: theme.palette.primary.main,
  //         color: "white",
  //         transition: "all 300ms",
  //         "&:hover": {
  //          bgcolor: blue[800],
  //         },
  //        }}
  //       >
  //        <Icon
  //         baseClassName="fas"
  //         className={`fa-pencil`}
  //         sx={{
  //          fontSize: "14px",
  //         }}
  //        />
  //       </IconButton>
  //      </Link>
  //      <IconButton
  //       aria-label="edit"
  //       color="error"
  //       sx={{
  //        bgcolor: red[600],
  //        color: "white",
  //        transition: "all 300ms",
  //        "&:hover": {
  //         bgcolor: red[800],
  //        },
  //       }}
  //      >
  //       <Icon
  //        onClick={() => table.setEditingRow(row)}
  //        baseClassName="fas"
  //        className={`fa-trash`}
  //        sx={{
  //         fontSize: "14px",
  //        }}
  //       />
  //      </IconButton>
  //     </Stack>
  //    ),
  //   },
  //  },
};
