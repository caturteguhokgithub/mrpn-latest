import React, { Fragment } from "react";
import {
  alpha,
  Chip,
  Icon,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { ExsumRelatedDto } from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import DialogDelete from "@/components/dialogDelete";
import ActionColumn from "@/components/actions/action";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { bgColorTh } from "@/utils/color";

export default function TableTagging({
  project,
  handleUpdateOrDelete,
  data,
}: {
  project: string;
  handleUpdateOrDelete: any;
  data: ExsumRelatedDto[];
}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const { year } = useRKPContext((state) => state);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "40vh",
        "&::-webkit-scrollbar": {
          width: "6px",
          cursor: "pointer",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            {(hasPrivilege(permission, pathname, "add") ||
              hasPrivilege(permission, pathname, "delete") ||
              hasPrivilege(permission, pathname, "update")) && (
              <TableCell sx={{ width: 80, bgcolor: bgColorTh }}>Aksi</TableCell>
            )}
            <TableCell sx={{ bgcolor: bgColorTh }}>Kebijakan</TableCell>
            {/* <TableCell sx={{ width: "50%", bgcolor: bgColorTh }}>
              Keterangan
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, index) => (
            <>
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {(hasPrivilege(permission, pathname, "add") ||
                  hasPrivilege(permission, pathname, "delete") ||
                  hasPrivilege(permission, pathname, "update")) && (
                  <TableCell sx={{ textAlign: "center", verticalAlign: "top" }}>
                    <Stack
                      marginTop={1}
                      display="flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                    >
                      {hasPrivilege(permission, pathname, "update") && (
                        <ActionColumn
                          center
                          disabled={year > 0}
                          editClick={() =>
                            handleUpdateOrDelete(index, "update")
                          }
                        />
                      )}
                      {hasPrivilege(permission, pathname, "delete") && (
                        <ActionColumn
                          center
                          disabled={year > 0}
                          deleteClick={() =>
                            handleUpdateOrDelete(index, "delete")
                          }
                        />
                      )}
                    </Stack>
                  </TableCell>
                )}
                <TableCell>
                  <Stack flexDirection="column" gap={1}>
                    {x.kebijakan.map((y, index2) => (
                      <Paper variant="outlined" sx={{ p: 1 }} key={`${index2}`}>
                        <Typography fontSize={14} fontWeight={500}>
                          {y.src_kebijakan?.name ?? ""}
                        </Typography>
                        <Stack
                          marginTop={1}
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {y.list.map((z, iz) => (
                            <Chip
                              key={`${index2}-${iz}`}
                              size="small"
                              label={z.src_kebijakan_list?.value ?? ""}
                              sx={{
                                height: "auto",
                                ".MuiChip-label": {
                                  whiteSpace: "wrap",
                                  lineHeight: 1.2,
                                  py: 0.6,
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </TableCell>
                {/* <TableCell>{x.value}</TableCell> */}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
