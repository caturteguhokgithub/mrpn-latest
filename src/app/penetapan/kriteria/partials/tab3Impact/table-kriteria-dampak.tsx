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
import DialogComponent from "@/app/components/dialog";
import FormDampak from "./form-dampak";
import dataImpact from "./impact.json";
import DialogDelete from "@/app/components/dialogDelete";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";

export default function TableDampak({ mode }: { mode?: string }) {
  const [modalAdd, setModalAdd] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);

  const handleModalAdd = () => {
    setModalAdd(true);
  };

  const handleModalClose = () => {
    setModalAdd(false);
  };

  const handleModalDelete = () => {
    setModalDelete(true);
  };

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
        <Table
          size="small"
          sx={{
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
          <TableHead sx={{ bgcolor: bgColorTh }}>
            <TableRow>
              <TableCell rowSpan={3} colSpan={2} align="center">
                Area Dampak
              </TableCell>
              <TableCell colSpan={5} align="center">
                Level Dampak
              </TableCell>
              {/* <TableCell rowSpan={3}>Action</TableCell> */}
            </TableRow>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Tidak Signifikan</TableCell>
              <TableCell align="center">Minor</TableCell>
              <TableCell align="center">Moderat</TableCell>
              <TableCell align="center">Signifikan</TableCell>
              <TableCell align="center">Sangat Signifikan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataImpact.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell
                    rowSpan={row.levels.length}
                    sx={{ bgcolor: bgColorTh }}
                  >
                    {row.area}
                  </TableCell>
                  <TableCell width={360}>{row.levels[0].name}</TableCell>
                  {row.levels[0].details.map((detail, idx) => (
                    <TableCell key={idx}>{detail}</TableCell>
                  ))}
                  {/* <TableCell rowSpan={row.levels.length}>
                    <ActionColumn
                      editClick={handleModalAdd}
                      deleteClick={handleModalDelete}
                    />
                  </TableCell> */}
                </TableRow>
                {row.levels.slice(1).map((level, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{level.name}</TableCell>
                    {level.details.map((detail, i) => (
                      <TableCell key={i}>{detail}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <DialogComponent
        width={1000}
        dialogOpen={modalAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
      <DialogComponent
        width={1000}
        dialogOpen={modalEdit}
        dialogClose={handleModalClose}
        title="Ubah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="edit" />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => {}}
      />
    </>
  );
}
