import React from "react";
import {
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
import { bgColorTh } from "@/app/utils/color";
import Iconify from "@/app/components/icons/iconify";

export default function TableLog() {
  const data = [
    { object: "Lalu Lintas", create: true, shortlist: false, approve: true },
    { object: "MBG", create: true, shortlist: true, approve: true },
    { object: "Pariwisata", create: true, shortlist: false, approve: false },
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
            <TableCell align="center">Objek</TableCell>
            <TableCell align="center">Create</TableCell>
            <TableCell align="center">Shortlist</TableCell>
            <TableCell align="center">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow>
              <TableCell>{item.object}</TableCell>
              <TableCell>{item.create ? checkIcon : closeIcon}</TableCell>
              <TableCell align="center">
                {item.shortlist ? checkIcon : closeIcon}
              </TableCell>
              <TableCell align="center">
                {item.approve ? checkIcon : closeIcon}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
