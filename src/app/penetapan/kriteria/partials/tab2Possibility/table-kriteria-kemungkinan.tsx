import React from "react";
import {
  IconButton,
  Paper,
  Stack,
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
import { blue, grey, red } from "@mui/material/colors";
import usePossibilityList from "./hooks/usePossibility";
import { ResultPossibility } from "./hooks/possibilityModel";
import { referencePossibility } from "./reference";
import Iconify from "@/app/components/icons/iconify";

export default function TableKemungkinan({
  mode,
  handleModalEdit,
  handleModalDelete,
}: {
  mode?: string;
  handleModalEdit?: () => void;
  handleModalDelete?: () => void;
}) {
  const { listDataPossibility, loading, isDisabledAdd } = usePossibilityList();

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
            },
          },
        }}
      >
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell
              rowSpan={2}
              sx={{ bgcolor: bgColorTh }}
              align="center"
              width={200}
            >
              Level Kemungkinan
            </TableCell>
            <TableCell colSpan={2} align="center" sx={{ bgcolor: bgColorTh }}>
              Kemungkinan Terjadi
            </TableCell>
            {/* <TableCell rowSpan={2} align="center" sx={{ bgcolor: bgColorTh }}>
              Aksi
            </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              {/* Non low frequency event dalam 1 periode analisis */}
              Persentase
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              {/* Low Frequency Event */}
              Frekuensi
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              Probabilitas
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              Jumlah Frekuensi
            </TableCell>
          </TableRow> */}
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
                  <TableCell>
                    {item.jumlah} atau {item.lfe}
                  </TableCell>
                  {/* <TableCell>{item.lfe}</TableCell> */}
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
                  <TableCell>
                    {/* {row.jumlah_frekuensi} atau {row.low_frekuensi} */}
                    {row.jumlah_frekuensi}
                  </TableCell>
                  {/* <TableCell>
                    <Stack direction="row">
                      <IconButton
                        onClick={handleModalEdit}
                        sx={{
                          py: 0,
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                      >
                        <Iconify name="mdi:pencil" color={blue[500]} />
                      </IconButton>
                      <IconButton
                        onClick={handleModalDelete}
                        sx={{
                          py: 0,
                          "&:hover": {
                            bgcolor: "transparent",
                          },
                        }}
                      >
                        <Iconify name="mdi:trash" color={red[500]} />
                      </IconButton>
                    </Stack>
                  </TableCell> */}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
