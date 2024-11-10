import React from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
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
  alpha,
} from "@mui/material";
import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogComponent from "@/components/dialog";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import FormPeraturan from "./form-peraturan";
import {
  ExsumRegulationDto,
  ExsumRegulationResDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import DialogDelete from "@/app/components/dialogDelete";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { bgColorTh } from "@/utils/color";

export default function TablePeraturan({
  data,
  deleteData,
}: {
  data: ExsumRegulationResDto[];
  deleteData: any;
}) {
  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  return (
    <>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <FieldLabelInfo
          titleSection
          title="Daftar Peraturan Perundang-Undangan yang Terkait"
        />
      </Stack>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table size="small">
          <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <TableRow>
              <TableCell width="70px"></TableCell>
              <TableCell>Entitas</TableCell>
              <TableCell width={240}>Peraturan Terkait</TableCell>
              <TableCell>Amanat Peraturan yang Terkait</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <>
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* {(hasPrivilege(permission, pathname, "update") ||
                    hasPrivilege(permission, pathname, "delete")) && ( */}
                  <TableCell sx={{ textAlign: "center", verticalAlign: "top" }}>
                    <Tooltip title="Delete" placement="top">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => deleteData(row.id)}
                        disabled={
                          hasPrivilege(permission, pathname, "update") ||
                          hasPrivilege(permission, pathname, "delete")
                        }
                      >
                        <Icon
                          baseClassName="fas"
                          className={`fa-trash-alt`}
                          sx={{
                            fontSize: "14px",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {/* )} */}
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {row.entitas.map((e) => (
                        <Box component="span">
                          <Chip
                            key={e.id}
                            label={e.value}
                            size="small"
                            sx={{
                              height: "auto",
                              ".MuiChip-label": {
                                whiteSpace: "wrap",
                                lineHeight: 1.2,
                                py: 0.6,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {row.perpres.map((y, index2) => (
                      <Chip key={index2} size="small" label={y.title} />
                    ))}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {row.amanat}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
