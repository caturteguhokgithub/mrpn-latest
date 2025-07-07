import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";
import { Fragment } from "react";

export default function TableOverview() {
  const tableData = [
    {
      id: 1,
      peristiwaRisiko: "Kegagalan implementasi sistem IT baru",
      kategoriRisiko: "Teknologi",
      penyebab: "Kurangnya testing sebelum implementasi",
      dampak: "Gangguan operasional selama 3 hari",
      nilai: "Medium",
      prioritasRisiko: "Tinggi",
      keputusanPerlakuan: "Mitigasi",
      perlakuanRisiko: [
        {
          deskripsi: "Melakukan testing menyeluruh sebelum implementasi",
          waktuRencana: "Q1 2024",
          output: "Laporan testing",
          penanggungJawab: "Tim IT",
        },
        {
          deskripsi: "Membuat rencana rollback jika implementasi gagal",
          waktuRencana: "Q1 2024",
          output: "Dokumen rencana rollback",
          penanggungJawab: "Manajer Proyek",
        },
      ],
      risikoResidual: "Rendah",
    },
    {
      id: 2,
      peristiwaRisiko: "Kehilangan data penting",
      kategoriRisiko: "Operasional",
      penyebab: "Tidak ada backup rutin",
      dampak: "Hilangnya data transaksi 1 bulan",
      nilai: "Tinggi",
      prioritasRisiko: "Sangat Tinggi",
      keputusanPerlakuan: "Mitigasi",
      perlakuanRisiko: [
        {
          deskripsi: "Implementasi sistem backup otomatis harian",
          waktuRencana: "Q2 2024",
          output: "Sistem backup aktif",
          penanggungJawab: "Tim IT",
        },
        {
          deskripsi: "Pelatihan staff untuk backup manual mingguan",
          waktuRencana: "Q2 2024",
          output: "Dokumen pelatihan",
          penanggungJawab: "HRD",
        },
      ],
      risikoResidual: "Medium",
    },
  ];

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        overflowX: "auto",
        maxHeight: "48vh",
        tbody: {
          td: {
            "&:last-of-type": {
              borderRight: "1px solid rgb(224, 224, 224) !important",
            },
          },
        },
        "&::-webkit-scrollbar": {
          height: "12px",
          cursor: "pointer",
        },
      }}
    >
      <Table
        stickyHeader
        size="small"
        sx={{
          tableLayout: "fixed",
          width: 4000,
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
            <TableCell align="center" colSpan={4} sx={{ bgcolor: bgColorTh }}>
              Identifikasi Risiko
            </TableCell>
            <TableCell align="center" colSpan={2} sx={{ bgcolor: bgColorTh }}>
              Analisis & Evaluasi Risiko
            </TableCell>
            <TableCell align="center" colSpan={6} sx={{ bgcolor: bgColorTh }}>
              Perlakuan Risiko
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Peristiwa Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Kategori Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Penyebab
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Dampak
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Nilai
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Prioritas Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Keputusan Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Deskripsi Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Waktu Rencana Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Output
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Penanggungjawab
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Risiko Residual Harapan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((risk) =>
            risk.perlakuanRisiko.map((perlakuan, index) => (
              <TableRow key={`${risk.id}-${index}`}>
                {index === 0 && (
                  <>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.peristiwaRisiko}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.kategoriRisiko}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.penyebab}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.dampak}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.nilai}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.prioritasRisiko}
                    </TableCell>
                    <TableCell rowSpan={risk.perlakuanRisiko.length}>
                      {risk.keputusanPerlakuan}
                    </TableCell>
                  </>
                )}

                <TableCell>{perlakuan.deskripsi}</TableCell>
                <TableCell>{perlakuan.waktuRencana}</TableCell>
                <TableCell>{perlakuan.output}</TableCell>
                <TableCell>{perlakuan.penanggungJawab}</TableCell>

                {index === 0 && (
                  <TableCell rowSpan={risk.perlakuanRisiko.length}>
                    {risk.risikoResidual}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
