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
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import DialogComponent from "@/app/components/dialog";
import FormPeraturan from "./form-peraturan";
import FormKemungkinan from "./form-kemungkinan";
import FormDampak from "./form-dampak";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import CardItem from "@/app/components/cardTabItem";

export default function TableDampak({ mode }: { mode?: string }) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

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
      <CardItem title="Kriteria Dampak">
        {/* <Stack
     mb={2}
     direction="row"
     justifyContent="space-between"
     alignItems="center"
    >
     <FieldLabelInfo
      titleSection
      title="Kriteria Dampak"
      information="Kriteria Dampak"
     />
     {mode === "add" || mode === "edit" ? (
      <Button
       variant="outlined"
       size="small"
       startIcon={<AddCircle />}
       sx={{ lineHeight: 1, py: 1, borderRadius: 24 }}
       onClick={handleModalOpenAdd}
      >
       Tambah Kriteria Dampak
      </Button>
     ) : null}
    </Stack> */}
        <Paper sx={{ overflowX: "auto" }} elevation={0} variant="outlined">
          <Table size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell rowSpan={2}>Area Dampak</TableCell>
                <TableCell rowSpan={2}>Level</TableCell>
                <TableCell colSpan={5} align="center">
                  Level Dampak
                </TableCell>
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
                      <TableCell>{row.area}</TableCell>
                      <TableCell>{row.level}</TableCell>
                      <TableCell>{row.ld1}</TableCell>
                      <TableCell>{row.ld2}</TableCell>
                      <TableCell>{row.ld3}</TableCell>
                      <TableCell>{row.ld4}</TableCell>
                      <TableCell>{row.ld5}</TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </Paper>
      </CardItem>
      <DialogComponent
        width={1200}
        dialogOpen={modalOpenAdd}
        dialogClose={handleModalClose}
        title="Tambah Kriteria Dampak"
        dialogFooter={dialogActionFooter}
      >
        <FormDampak mode="add" />
      </DialogComponent>
    </>
  );
}
