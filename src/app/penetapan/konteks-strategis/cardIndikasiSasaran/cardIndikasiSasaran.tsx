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

type Row = {
  uraian: string;
  sasaran: string;
  indicator: string[];
  target: string[];
  satuan: string[];
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
      satuan: [],
    };
    indikatorSasaranData.rkp.sasaran.map((sasaran) => {
      row.sasaran = sasaran.value;
      sasaran.indikator.map((indikator) => {
        row.indicator.push(indikator.value);
        let target = "";
        // switch (index) {
        //   case 0:
        //     target = indikator.target_0 + " " + indikator.satuan;
        //     break;
        //   case 1:
        //     target = indikator.target_1 + " " + indikator.satuan;
        //     break;
        //   case 2:
        //     target = indikator.target_2 + " " + indikator.satuan;
        //     break;
        //   case 3:
        //     target = indikator.target_3 + " " + indikator.satuan;
        //     break;
        //   case 4:
        //     target = indikator.target_4 + " " + indikator.satuan;
        //     break;
        //   default:
        //     target = indikator.target_0 + " " + indikator.satuan;
        //     break;
        // }

        switch (index) {
          case 0:
            target = indikator.target_0;
            break;
          case 1:
            target = indikator.target_1;
            break;
          case 2:
            target = indikator.target_2;
            break;
          case 3:
            target = indikator.target_3;
            break;
          case 4:
            target = indikator.target_4;
            break;
          default:
            target = indikator.target_0;
            break;
        }
        row.target.push(target);
        row.satuan.push(indikator.satuan); // Push the satuan value
      });
      rows.push(row);
    });
    return rows;
  };

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
                    <TableCell align="right" sx={{ verticalAlign: "top" }}>
                      {row.target[subIndex]}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {row.satuan[subIndex]}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CardItem>
  );
}
