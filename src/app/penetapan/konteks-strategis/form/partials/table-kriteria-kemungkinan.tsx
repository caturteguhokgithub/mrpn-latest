import React from "react";
import {
  Button,
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
} from "@mui/material";
import theme from "@/theme";
import { AddCircle } from "@mui/icons-material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import DialogComponent from "@/components/dialog";
import FormPeraturan from "./form-peraturan";
import FormKemungkinan from "./form-kemungkinan";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import CardItem from "@/components/cardTabItem";
import AddButton from "@/components/buttonAdd";

export default function TableKemungkinan({ mode }: { mode?: string }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

  function createData(
    id: number,
    level: string,
    persentase: string,
    jumlah: string,
    lfe: string
  ) {
    return { id, level, persentase, jumlah, lfe };
  }

  const rows = [
    createData(
      1,
      "Hampir tidak terjadi (1)",
      "P ≤ 10%",
      "< 2 kali dalam 12 bulan terakhir",
      "≤ 1 kejadian dalam lebih dari 5 tahun terakhir"
    ),
    createData(
      2,
      "Jarang terjadi (2)",
      "10% <p ≤ 25%",
      "2 kali s.d 5 kali dalam 12 bulan terakhir",
      "Minimal 1 kejadian dalam 4 tahun terakhir"
    ),
    createData(
      3,
      "Kadang terjadi (3)",
      "25% < p ≤ 50%",
      "6 kali s.d 9 kali dalam 12 bulan terkahir",
      "Minimal 1 kejadian dalam 3 tahun terakhir"
    ),
    createData(
      4,
      "Sering terjadi (4)",
      "50% < p ≤ 75%",
      "10 kali s.d 12 kali dalam 12 bulan terakhir",
      "Minimal 1 kejadian dalam 2 tahun terakhir"
    ),
    createData(
      5,
      "Hampir pasti terjadi (5)",
      "P > 75%",
      "> 12 kali dalam 12 bulan terakhir",
      "Minimal 1 kejadian dalam 1 tahun terakhir"
    ),
  ];

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={handleModalClose}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  return (
    <>
      <CardItem
        title="Kriteria Kemungkinan"
        addButton={
          <AddButton
            filled
            small
            title="Tambah Kriteria Kemungkinan"
            onclick={handleModalOpenAdd}
          />
        }
      >
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                {/* <TableCell width="70px"></TableCell> */}
                <TableCell rowSpan={3}>Level Kemungkinan</TableCell>
                <TableCell colSpan={3} align="center">
                  Kriteria Kemungkinan
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  Non low frequency event dalam 1 periode analisis
                </TableCell>
                <TableCell rowSpan={2}>Low frequency event</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Probabilitias</TableCell>
                <TableCell>Jumlah Frekuensi</TableCell>
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
              ) : (
                <>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell sx={{ textAlign: "center" }}>
            <Tooltip title="Delete" placement="top">
             <IconButton
              aria-label="delete"
              color="error"
              disabled={mode === "view"}
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
           </TableCell> */}
                      <TableCell>{row.level}</TableCell>
                      <TableCell>{row.persentase}</TableCell>
                      <TableCell>{row.jumlah}</TableCell>
                      <TableCell>{row.lfe}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardItem>
      <DialogComponent
        width={800}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Kemungkinan"
        dialogFooter={dialogActionFooter}
      >
        <FormKemungkinan mode="add" />
      </DialogComponent>
    </>
  );
}
