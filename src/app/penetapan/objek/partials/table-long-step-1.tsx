import React from "react";
import {
 Checkbox,
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

export default function TableLonglistStepOne({ mode }: { mode?: string }) {
 return (
  <>
   <TableContainer component={Paper} elevation={0} variant="outlined">
    <Table sx={{ minWidth: 650 }} size="small">
     <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
      <TableRow>
       <TableCell rowSpan={2} width={70}>
        No.
       </TableCell>
       <TableCell rowSpan={2}>Uraian Objek MRPN Linsek</TableCell>
       <TableCell colSpan={4} align="center">
        Dasar Pemilihan Prioritas Objek MRPN Linsek
       </TableCell>
      </TableRow>
      <TableRow>
       <TableCell width="16%">Merupakan Fokus & Perhatian Presiden</TableCell>
       <TableCell width="16%">
        Mempunyai Nilai Strategis dalam Pencapaian Sasaran Prioritas Nasional
        /Agenda Pembangunan
       </TableCell>
       <TableCell width="16%">
        Memiliki Faktor Risiko yang Tinggi (Diantaranya Anggaran, Ruang Lingkup,
        Kinerja, & Rekam Jejak Akuntabilitas)
       </TableCell>
       <TableCell width="16%">Pertimbangan Lain yang Relevan</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {mode === "add" ? (
       <TableRow>
        <TableCell colSpan={7}>
         <EmptyState
          icon={<IconEmptyData />}
          title="Data Kosong"
          description="Silahkan isi konten tabel ini"
         />
        </TableCell>
       </TableRow>
      ) : (
       <>
        {[...new Array(3)].map((_, i) => (
         <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>Uraian {i + 1}</TableCell>
          <TableCell align="center">
           <Checkbox />
          </TableCell>
          <TableCell align="center">
           <Checkbox />
          </TableCell>
          <TableCell align="center">
           <Checkbox />
          </TableCell>
          <TableCell align="center">
           <Checkbox />
          </TableCell>
         </TableRow>
        ))}
       </>
      )}
     </TableBody>
    </Table>
   </TableContainer>
  </>
 );
}
