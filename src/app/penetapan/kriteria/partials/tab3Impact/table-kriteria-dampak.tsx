import React from "react";
import {
  Button,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import DialogComponent from "@/app/components/dialog";
import FormDampak from "./form-dampak";
import ActionColumn from "@/app/components/actions/action";
import DialogDelete from "@/app/components/dialogDelete";

export default function TableDampak({ mode }: { mode?: string }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);

  const handleModalDelete = () => {
    setModalDelete(true);
  };

  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };

  const handleModalClose = () => {
    setModalOpenAdd(false);
  };

  function createData(
    id: number,
    area: string,
    level: string,
    ld1: string,
    ld2: string,
    ld3: string,
    ld4: string,
    ld5: string
  ) {
    return { id, area, level, ld1, ld2, ld3, ld4, ld5 };
  }

  const rows = [
    createData(
      1,
      "Capaian Sasaran dan Indikator",
      "RKP",
      "Kinerja > 90 %",
      "80% < Kinerja < 90%",
      "70% < Kinerja < 80%",
      "60% < Kinerja < 70%",
      "Kinerja < 60%"
    ),
    createData(
      2,
      "Capaian Sasaran dan Indikator",
      "IKU",
      "Kinerja > 95 %",
      "90% < Kinerja < 95%",
      "85% < Kinerja < 90%",
      "80% < Kinerja < 85%",
      "Kinerja < 80%"
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
      <Paper sx={{ overflowX: "auto" }} elevation={0} variant="outlined">
        <Table size="small">
          <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
            <TableRow>
              <TableCell rowSpan={2}>Area Dampak</TableCell>
              <TableCell rowSpan={2}>Level</TableCell>
              <TableCell colSpan={5} align="center">
                Level Dampak
              </TableCell>
              <TableCell rowSpan={2}>Aksi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sangat Rendah (1)</TableCell>
              <TableCell>Rendah (2)</TableCell>
              <TableCell>Sedang (3)</TableCell>
              <TableCell>Tinggi (4)</TableCell>
              <TableCell>Sangat Tinggi (5)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mode === "add" ? (
              <TableRow>
                <TableCell colSpan={8}>
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
                    <TableCell>{row.area}</TableCell>
                    <TableCell>{row.level}</TableCell>
                    <TableCell>{row.ld1}</TableCell>
                    <TableCell>{row.ld2}</TableCell>
                    <TableCell>{row.ld3}</TableCell>
                    <TableCell>{row.ld4}</TableCell>
                    <TableCell>{row.ld5}</TableCell>
                    <TableCell>
                      <ActionColumn
                        center
                        editClick={handleModalOpenAdd}
                        deleteClick={handleModalDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Paper>
      <DialogComponent
        width={800}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Ubah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="edit" />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleDelete={handleModalDelete}
        handleCloseModal={() => setModalDelete(false)}
      />
    </>
  );
}
