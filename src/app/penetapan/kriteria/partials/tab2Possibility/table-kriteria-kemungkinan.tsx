import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";
import usePossibilityList from "./hooks/usePossibility";
import { ResultPossibility } from "./hooks/possibilityModel";
import { referencePossibility } from "./reference";

export default function TableKemungkinan({ mode }: { mode?: string }) {
  const { listDataPossibility, loading } = usePossibilityList();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table
        size="small"
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
      >
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell rowSpan={3} sx={{ bgcolor: bgColorTh }} align="center">
              Level Kemungkinan
            </TableCell>
            <TableCell colSpan={3} align="center" sx={{ bgcolor: bgColorTh }}>
              Kriteria Kemungkinan
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center" sx={{ bgcolor: bgColorTh }}>
              Non low frequency event dalam 1 periode analisis
            </TableCell>
            <TableCell rowSpan={2} sx={{ bgcolor: bgColorTh }} align="center">
              Low Frequency Event
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              Probabilitas
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              Jumlah Frekuensi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mode === "add" ? (
            <TableRow>
              <TableCell colSpan={4}>
                <EmptyState
                  icon={<IconEmptyData />}
                  title="Data Kosong"
                  description="Silahkan isi konten tabel ini"
                />
              </TableCell>
            </TableRow>
          ) : mode === "reference" ? (
            <>
              {referencePossibility.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{item.level}</TableCell>
                  <TableCell>{item.persentase}</TableCell>
                  <TableCell>{item.jumlah}</TableCell>
                  <TableCell>{item.lfe}</TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {listDataPossibility.map((row: ResultPossibility) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.level_kemungkinan}</TableCell>
                  <TableCell>{row.probabilitas}</TableCell>
                  <TableCell>{row.jumlah_frekuensi}</TableCell>
                  <TableCell>{row.low_frekuensi}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
