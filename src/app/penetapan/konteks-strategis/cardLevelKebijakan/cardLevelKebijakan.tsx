import React, { Fragment, useEffect } from "react";
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
import useLevelKebijakanVM from "./vm";
import { sasaranDto } from "./model";

export default function CardLevelKebijakan() {
  const isEmpty = false;

  const {
    objectState,
    levelKebijakanData,
    getDataLevelKebijakan,
  } = useLevelKebijakanVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getDataLevelKebijakan();
    }
  }, [objectState]);

  // const rows = [
  //   {
  //     level: "PN",
  //     nama: "Memantapkan Sistem Pertahanan Keamanan Negara dan Mendorong Kemandirian Bangsa melalui Swasembada Pangan, Energi, Air, Ekonomi Syariah, Ekonomi Digital, Ekonomi Hijau, dan Ekonomi Biru",
  //     sasaran:
  //       "Meningkatkan kemandirian bangsa dalam memenuhi kebutuhan pangan, energi, dan air secara berkelanjutan",
  //     indikator: [
  //       "Prevalensi Ketidakcukupan Konsumsi Pangan. 2024: 8,53; 2025: 7,21",
  //     ],
  //     target: ["7,21"],
  //     satuan: ["-"],
  //   },
  //   {
  //     level: "PP",
  //     nama: "Swasembada Pangan",
  //     sasaran:
  //       "Mencetak dan meningkatkan produktivitas lahan pertanian dengan lumbung pangan desa, daerah, dan nasional",
  //     indikator: [
  //       "Peningkatan produksi beras. 2024: 0; 2025: 1,27- 2,10 juta ton",
  //       "Peningkatan luas panen tanaman pangan. 2024: 0; 2025: 0,75 juta ha",
  //     ],
  //     target: ["1,27- 2,10", "0,75"],
  //     satuan: ["juta ton", "juta ha"],
  //   },
  //   {
  //     level: "KP",
  //     nama: "Pengembangan Kawasan Sentra Produksi Pangan (KSPP) Kalimantan Tengah",
  //     sasaran:
  //       "Meningkatnya produksi dan produktivitas padi di KSPP Kalimantan Tengah",
  //     indikator: [
  //       "Peningkatan Produksi Padi KSPP Kalimantan Tengah (%). 2024: 3; 2025: 3",
  //       "Peningkatan Produktivitas Padi KSPP Kalimantan Tengah (%). 2024: 3; 2025: 3",
  //     ],
  //     target: ["3", "3"],
  //     satuan: ["-", "-"],
  //   },
  // ];

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
                  {levelKebijakanData.map((row, rowIndex) => {
                    const totalIndikator = row.sasaran.reduce(
                      (sum, s) => sum + s.indikator.length,
                      0
                    );

                    let indikatorCounter = 0;

                    return row.sasaran.map((sasaran, sasaranIndex) => {
                      return sasaran.indikator.map((indikator, indikatorIndex) => {
                        const isFirstIndikator = indikatorCounter === 0;
                        indikatorCounter++;

                        return (
                          <TableRow key={`${rowIndex}-${sasaranIndex}-${indikatorIndex}`}>
                            {isFirstIndikator && (
                              <>
                                <TableCell rowSpan={totalIndikator} sx={{ verticalAlign: "top" }}>
                                  {row.level}
                                </TableCell>
                                <TableCell rowSpan={totalIndikator} sx={{ verticalAlign: "top" }}>
                                  {row.nama}
                                </TableCell>
                              </>
                            )}
                            {indikatorIndex === 0 && (
                              <TableCell
                                rowSpan={sasaran.indikator.length}
                                sx={{ verticalAlign: "top" }}
                              >
                                {sasaran.value}
                              </TableCell>
                            )}
                            <TableCell sx={{ verticalAlign: "top" }}>
                              {indikator.value}
                            </TableCell>
                            <TableCell align="right" sx={{ verticalAlign: "top" }}>
                              {indikator.target}
                            </TableCell>
                            <TableCell sx={{ verticalAlign: "top" }}>
                              {indikator.satuan}
                            </TableCell>
                          </TableRow>
                        );
                      });
                    });
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Fragment>
      )}
    </CardItem>
  );
}
