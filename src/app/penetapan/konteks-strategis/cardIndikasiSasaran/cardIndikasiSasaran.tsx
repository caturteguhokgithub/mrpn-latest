import React, { useEffect } from "react";
import {
  Paper,
  Stack,
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
import useIndikatorSasaranVM from "@/app/penetapan/konteks-strategis/cardIndikasiSasaran/vm";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { bgColorTh } from "@/utils/color";
import { grey } from "@mui/material/colors";
import { IndikatorDto, SasaranDto } from "@/app/misc/rkp/rkpServiceModel";
import { GetTarget } from "@/lib/utils/common";

export default function CardIndikasiSasaran() {
  const { rpjmn, year } = useRKPContext((state) => state);

  const getTarget = (indikator: IndikatorDto) => {
    return GetTarget(rpjmn, year, indikator);
  };

  const { objectState, indikatorSasaranData, getDataIndikatorSasaran } =
    useIndikatorSasaranVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getDataIndikatorSasaran();
    }
  }, [objectState]);

  return (
    <CardItem
      title="Identifikasi Sasaran dan Indikator Objek MRPN LS"
      infoTooltip={
        <Stack spacing={2}>
          <div>
            <strong>MRPN Lintas Sektor</strong>
            <p>
              Kegiatan terkoordinasi untuk mengarahkan dan mengendalikan Entitas
              MRPN sehubungan dengan adanya risiko Pembangunan Nasional atas
              program, kegiatan, proyek, prioritas pembangunan, dan risiko
              tertentu yang melibatkan dua atau lebih Entitas MRPN pengelola
              keuangan negara.
            </p>
          </div>
          <div>
            <strong>Objek MRPN Lintas Sektor</strong>
            <p>
              PKPPR yang dikategorikan lintas sektor yang menjadi objek
              penerapan MRPN LS, melalui penetapan oleh Komite MRPN.
            </p>
          </div>
        </Stack>
      }
    >
      {indikatorSasaranData == undefined ? (
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
                <TableCell align="center">Uraian</TableCell>
                <TableCell align="center">Sasaran</TableCell>
                <TableCell align="center">Indikator</TableCell>
                <TableCell align="center" width={100}>
                  Target
                </TableCell>
                <TableCell align="center" width={180}>
                  Satuan
                </TableCell>
              </TableRow>
              {[...new Array(5)].map((_, i) => (
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
              {indikatorSasaranData?.rkp?.sasaran.map((sasaran: SasaranDto, indexSasaran) => (
                <React.Fragment key={indexSasaran}>
                  <TableRow>
                    {indexSasaran === 0 && (
                      <TableCell
                        rowSpan={indikatorSasaranData.rkp.sasaran.reduce(
                          (total, sasaran) => total + sasaran.indikator.length,
                          0
                        )}
                        sx={{ verticalAlign: "top" }}
                      >
                        {indikatorSasaranData.rkp.value}
                      </TableCell>
                    )}
                    <TableCell
                      rowSpan={sasaran.indikator.length}
                      sx={{ verticalAlign: "top" }}
                    >
                      {sasaran.value}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {sasaran.indikator[0].value}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {getTarget(sasaran.indikator[0])}
                    </TableCell>
                    <TableCell align="center" sx={{ verticalAlign: "top" }}>
                      {sasaran.indikator[0].satuan}
                    </TableCell>
                  </TableRow>

                  {sasaran.indikator.slice(1).map((indikator, indexIndikator) => (
                    <TableRow key={indexIndikator}>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {indikator.value}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {getTarget(indikator)}
                      </TableCell>
                      <TableCell align="center" sx={{ verticalAlign: "top" }}>
                        {indikator.satuan}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}
    </CardItem>
  );
}
