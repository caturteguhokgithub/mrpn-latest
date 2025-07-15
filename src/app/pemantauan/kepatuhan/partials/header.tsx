import React from "react";
import {
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import FieldLabelInfo from "@/components/fieldLabelInfo";

export default function HeaderIdentifikasi({
  noPadding,
  asTable,
  viewOnly,
}: {
  noPadding?: boolean;
  asTable?: boolean;
  viewOnly?: boolean;
}) {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "1.25rem",
          p: 0,
          m: 1,
        }}
      >
        {asTable ? (
          <Table
            size="small"
            sx={{
              td: {
                py: noPadding ? 0.5 : 1.5,
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell
                  width={300}
                  sx={{
                    bgcolor: viewOnly ? "unset" : theme.palette.primary.light,
                  }}
                >
                  Mengumpulkan Tepat Waktu
                </TableCell>
                <TableCell>
                  <Typography fontWeight={viewOnly ? 600 : 500} fontSize={14}>
                    : -
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: viewOnly ? "unset" : theme.palette.primary.light,
                  }}
                >
                  Mengumpulkan Tidak Tepat Waktu
                </TableCell>
                <TableCell>
                  <Typography fontWeight={viewOnly ? 600 : 500} fontSize={14}>
                    : -
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: viewOnly ? "unset" : theme.palette.primary.light,
                  }}
                >
                  Tidak Mengumpulkan
                </TableCell>
                <TableCell>
                  <Typography fontWeight={viewOnly ? 600 : 500} fontSize={14}>
                    : -
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: viewOnly ? "unset" : theme.palette.primary.light,
                  }}
                >
                  Total UPR
                </TableCell>
                <TableCell>
                  <Typography fontWeight={viewOnly ? 600 : 500} fontSize={14}>
                    : -
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FieldLabelInfo title="Mengumpulkan Tepat Waktu" />
                <Typography fontWeight={600} maxWidth={600}>
                  -
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FieldLabelInfo
                  title="Mengumpulkan Tidak Tepat Waktu"
                  information="Mengumpulkan Tidak Tepat Waktu"
                />
                <Typography fontWeight={600} maxWidth={600}>
                  -
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <FieldLabelInfo
                  title="Tidak Mengumpulkan"
                  information="Tidak Mengumpulkan"
                />
                <Typography fontWeight={600} maxWidth={600}>
                  Terciptanya reformasi sistem pengelolaan sampah dalam hal
                  perencanaan, kelembagaan, dan pendanaan
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FieldLabelInfo title="Total UPR" information="Total UPR" />
                <Typography fontWeight={600} maxWidth={600}>
                  -
                </Typography>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
}
