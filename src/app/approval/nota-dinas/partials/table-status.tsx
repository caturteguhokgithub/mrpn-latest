import React from "react";
import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { bgColorTh } from "@/utils/color";
import Iconify from "@/components/icons/iconify";

export default function TableStatus() {
  const data = [
    { object: "Lalu Lintas", status: "rancangan" },
    { object: "MBG", status: "ditolak" },
    { object: "Pariwisata", status: "disetujui" },
  ];

  const checkIcon = (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Iconify name="mdi:check-circle" color={green[500]} size={24} />
    </Stack>
  );

  const closeIcon = (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Iconify name="mdi:close-circle-outline" color={red[500]} size={24} />
    </Stack>
  );

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table
        sx={{
          minWidth: 650,
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
              "&:last-of-type": {
                borderRight: `0 !important`,
              },
            },
          },
        }}
        size="small"
      >
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell align="center">Topik</TableCell>
            <TableCell align="center" width={200}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow>
              <TableCell>{item.object}</TableCell>
              <TableCell align="center">
                <Chip
                  color={
                    item.status == "rancangan"
                      ? "primary"
                      : item.status == "ditolak"
                      ? "error"
                      : "success"
                  }
                  label={
                    item.status == "rancangan"
                      ? "Rancangan"
                      : item.status == "ditolak"
                      ? "Ditolak"
                      : "Disetujui"
                  }
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
