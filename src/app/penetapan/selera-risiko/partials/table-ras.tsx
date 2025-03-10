import React, { Fragment } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import { bgColorTh } from "@/app/utils/color";

export default function TableRas({ mode }: { mode?: string }) {
  const rows = [
    {
      level: "Rendah",
      range: "1-5",
      target: "Sama atau meningkat ≤ 5%",
      kapasitas: "Rendah/tetap/sebanding dengan peningkatan target",
      inherent: "Sangat Rendah",
      keterangan: "Sering tidak ingin risiko terjadi",
    },
    {
      level: "Konservatif",
      range: "1-10",
      target: "Meningkat 5% < x ≤ 10%",
      kapasitas: "Rendah/tetap/sebanding dengan peningkatan target",
      inherent: "Rendah",
      keterangan: "Terdapat gap ketercapaian target yang dapat diterima",
    },
    {
      level: "Moderat",
      range: "1-15",
      target: "Meningkat 10% < x < 50%",
      kapasitas:
        "Rendah/tetap/meningkat tetapi tidak sebanding dengan peningkatan target",
      inherent: "Sedang",
      keterangan: "Mempertimbangkan Cost & Benefit",
    },
    {
      level: "Tinggi",
      range: "1-20",
      target: "Meningkat sangat signifikan > 50%",
      kapasitas:
        "Rendah/tetap/meningkat tetapi tidak sebanding dengan peningkatan target",
      inherent: "Tinggi",
      keterangan:
        "Diperlukan banyak program inovasi untuk mengambil peluang & mencapai target kinerja dengan difasilitasi RO/Komponen (agar tersedia anggaran)",
    },
  ];

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{
          maxHeight: "calc(100vh - 430px)",
          "&::-webkit-scrollbar": {
            width: "6px",
            cursor: "pointer",
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: bgColorTh }}>Level</TableCell>
              <TableCell sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}>
                Range Matriks
              </TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>Target</TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>Kapasitas</TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>Inherent Risk</TableCell>
              <TableCell sx={{ bgcolor: bgColorTh }}>Keterangan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mode === "add" ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <EmptyState
                    icon={<IconEmptyData />}
                    title="Data Kosong"
                    description="Silahkan isi konten tabel ini"
                  />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {rows.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.level}</TableCell>
                    <TableCell>{item.range}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {item.target}
                    </TableCell>
                    <TableCell>{item.kapasitas}</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {item.inherent}
                    </TableCell>
                    <TableCell>{item.keterangan}</TableCell>
                  </TableRow>
                ))}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
