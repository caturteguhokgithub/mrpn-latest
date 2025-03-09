import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import TextareaComponent from "@/app/components/textarea";

export default function FormKemungkinan({ mode }: { mode?: string }) {
  const dataKemungkinan = [
    "Hampir tidak terjadi (1)",
    "Jarang terjadi (2)",
    "Kadang terjadi (3)",
    "Sering terjadi (4)",
    "Hampir pasti terjadi (5)",
  ];

  return (
    <Paper sx={{ overflowX: "auto", minWidth: "100% !important" }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell width="30%">Level Kemungkinan</TableCell>
            <TableCell>Probabilitas</TableCell>
            <TableCell>Jumlah Frekuensi</TableCell>
            <TableCell>Low frequency event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataKemungkinan.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item}</TableCell>
              <TableCell>
                <TextareaComponent
                  placeholder="Probabilitias"
                  row={2}
                  width="100%"
                  value={mode == "edit" ? "25% < p ≤ 50%" : ""}
                />
              </TableCell>
              <TableCell>
                <TextareaComponent
                  placeholder="Jumlah Frekuensi"
                  row={2}
                  width="100%"
                  value={
                    mode == "edit"
                      ? "6 kali s.d 9 kali dalam 12 bulan terkahir"
                      : ""
                  }
                />
              </TableCell>
              <TableCell>
                <TextareaComponent
                  placeholder="Low Frequency Event"
                  row={2}
                  width="100%"
                  value={
                    mode == "edit"
                      ? "Minimal 1 kejadian dalam 3 tahun terakhir"
                      : ""
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
