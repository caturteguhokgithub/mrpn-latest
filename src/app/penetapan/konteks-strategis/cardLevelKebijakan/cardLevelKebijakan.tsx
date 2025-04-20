import React, { Fragment } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";
import { isDeveloping } from "@/app/components/layouts/layout";
import EmptyDevelopingState from "@/app/components/empty/developing";

export default function CardLevelKebijakan() {
  const isEmpty = false;

  const rows = [
    {
      level: "PN",
      nama: "Memantapkan Sistem Pertahanan Keamanan Negara dan Mendorong Kemandirian Bangsa melalui Swasembada Pangan, Energi, Air, Ekonomi Syariah, Ekonomi Digital, Ekonomi Hijau, dan Ekonomi Biru",
      sasaran:
        "Meningkatkan kemandirian bangsa dalam memenuhi kebutuhan pangan, energi, dan air secara berkelanjutan",
      indikator: [
        "Prevalensi Ketidakcukupan Konsumsi Pangan. 2024: 8,53; 2025: 7,21",
      ],
      target: ["7,21"],
      satuan: ["-"],
    },
    {
      level: "PP",
      nama: "Swasembada Pangan",
      sasaran:
        "Mencetak dan meningkatkan produktivitas lahan pertanian dengan lumbung pangan desa, daerah, dan nasional",
      indikator: [
        "Peningkatan produksi beras. 2024: 0; 2025: 1,27- 2,10 juta ton",
        "Peningkatan luas panen tanaman pangan. 2024: 0; 2025: 0,75 juta ha",
      ],
      target: ["1,27- 2,10", "0,75"],
      satuan: ["juta ton", "juta ha"],
    },
    {
      level: "KP",
      nama: "Pengembangan Kawasan Sentra Produksi Pangan (KSPP) Kalimantan Tengah",
      sasaran:
        "Meningkatnya produksi dan produktivitas padi di KSPP Kalimantan Tengah",
      indikator: [
        "Peningkatan Produksi Padi KSPP Kalimantan Tengah (%). 2024: 3; 2025: 3",
        "Peningkatan Produktivitas Padi KSPP Kalimantan Tengah (%). 2024: 3; 2025: 3",
      ],
      target: ["3", "3"],
      satuan: ["-", "-"],
    },
  ];

  return (
    <CardItem title="Level Kebijakan Objek MRPN LS pada Struktur Prioritas Pembangunan">
      {isDeveloping ? (
        <EmptyDevelopingState />
      ) : (
        <Fragment>
          {isEmpty ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
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
                    <TableCell align="center">Level</TableCell>
                    <TableCell align="center">Nama</TableCell>
                    <TableCell align="center">Sasaran</TableCell>
                    <TableCell align="center">Indikator</TableCell>
                    <TableCell align="center">Target</TableCell>
                    <TableCell align="center" width={160}>
                      Satuan
                    </TableCell>
                  </TableRow>
                  {[...new Array(6)].map((_, i) => (
                    <TableCell sx={{ bgcolor: grey[100] }}>
                      <Typography
                        color={`${grey[500]} !important`}
                        fontSize={12}
                        textAlign="center"
                      >
                        {i + 1}
                      </Typography>
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <Fragment>
                      <TableRow key={rowIndex}>
                        <TableCell
                          sx={{ verticalAlign: "top" }}
                          rowSpan={row.indikator.length}
                        >
                          {row.level}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top" }}
                          rowSpan={row.indikator.length}
                        >
                          {row.nama}
                        </TableCell>
                        <TableCell
                          sx={{ verticalAlign: "top" }}
                          rowSpan={row.indikator.length}
                        >
                          {row.sasaran}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.indikator[0]}
                        </TableCell>
                        <TableCell align="right" sx={{ verticalAlign: "top" }}>
                          {row.target[0]}
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {row.satuan[0]}
                        </TableCell>
                      </TableRow>
                      {row.indikator
                        .slice(1)
                        .map((indikator: any, indikatorIndex: any) => (
                          <TableRow key={`${rowIndex}-${indikatorIndex}`}>
                            <TableCell sx={{ verticalAlign: "top" }}>
                              {indikator}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ verticalAlign: "top" }}
                            >
                              {row.target[indikatorIndex + 1]}
                            </TableCell>
                            <TableCell sx={{ verticalAlign: "top" }}>
                              {row.satuan[indikatorIndex + 1]}
                            </TableCell>
                          </TableRow>
                        ))}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Fragment>
      )}
    </CardItem>
  );
}
