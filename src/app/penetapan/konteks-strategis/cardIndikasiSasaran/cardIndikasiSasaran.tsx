import React, { useEffect } from "react";
import {
  alpha,
  Box,
  Button,
  Chip,
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
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import useIndikatorSasaranVM from "@/app/penetapan/konteks-strategis/cardIndikasiSasaran/vm";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

type Row = {
  uraian: string;
  sasaran: string;
  indicator: string[];
  target: string[];
};

export default function CardIndikasiSasaran() {
  const { rpjmn, year } = useRKPContext((state) => state);

  const { objectState, indikatorSasaranData, getDataIndikatorSasaran } =
    useIndikatorSasaranVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getDataIndikatorSasaran();
    }
  }, [objectState]);

  const generateRows = () => {
    if (indikatorSasaranData == undefined) {
      return [];
    }
    let index = 0;

    if (rpjmn != undefined) {
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        if (i !== year && i <= year) {
          index++;
        }
      }
    }

    let rows: Row[] = [];
    let row: Row = {
      uraian: indikatorSasaranData.rkp.value,
      sasaran: "",
      indicator: [],
      target: [],
    };
    indikatorSasaranData.rkp.sasaran.map((sasaran) => {
      row.sasaran = sasaran.value;
      sasaran.indikator.map((indikator) => {
        row.indicator.push(indikator.value);
        let target = "";
        switch (index) {
          case 0:
            target = indikator.target_0 + " " + indikator.satuan;
            break;
          case 1:
            target = indikator.target_1 + " " + indikator.satuan;
            break;
          case 2:
            target = indikator.target_2 + " " + indikator.satuan;
            break;
          case 3:
            target = indikator.target_3 + " " + indikator.satuan;
            break;
          case 4:
            target = indikator.target_4 + " " + indikator.satuan;
            break;
          default:
            target = indikator.target_0 + " " + indikator.satuan;
            break;
        }
        row.target.push(target);
      });
      rows.push(row);
    });
    return rows;
  };

  return (
    <>
      <CardItem
        title="Identifikasi Sasaran dan Indikator Objek MRPN Lintas Sektor"
        infoTooltip={
          <Stack spacing={2}>
            <div>
              <strong>MRPN Lintas Sektor</strong>
              <p>
                Kegiatan terkoordinasi untuk mengarahkan dan mengendalikan
                Entitas MRPN sehubungan dengan adanya risiko Pembangunan
                Nasional atas program, kegiatan, proyek, prioritas pembangunan,
                dan risiko tertentu yang melibatkan dua atau lebih Entitas MRPN
                pengelola keuangan negara.
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
            <Table size="small">
              <TableHead
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <TableRow>
                  <TableCell>Uraian</TableCell>
                  <TableCell>Sasaran</TableCell>
                  <TableCell>Indikator</TableCell>
                  <TableCell width={150}>Target</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generateRows().map((row, rowIndex) =>
                  row.indicator.map((subItem, subIndex) => (
                    <TableRow key={`${rowIndex}-${subIndex}`}>
                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.indicator.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.uraian}
                        </TableCell>
                      )}
                      {subIndex === 0 && (
                        <TableCell
                          rowSpan={row.indicator.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {row.sasaran}
                        </TableCell>
                      )}
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {subItem}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {row.target[subIndex]}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardItem>
    </>
  );
}
