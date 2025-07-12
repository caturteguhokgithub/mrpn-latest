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

  const { objectState, levelKebijakanData, getDataLevelKebijakan } =
    useLevelKebijakanVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getDataLevelKebijakan();
    }
  }, [objectState]);

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
            <TableContainer
              component={Paper}
              elevation={0}
              variant="outlined"
              sx={{
                maxHeight: "50vh",
                "&::-webkit-scrollbar": {
                  width: "6px",
                  cursor: "pointer",
                },
              }}
            >
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
                      return sasaran.indikator.map(
                        (indikator, indikatorIndex) => {
                          const isFirstIndikator = indikatorCounter === 0;
                          indikatorCounter++;

                          return (
                            <TableRow
                              key={`${rowIndex}-${sasaranIndex}-${indikatorIndex}`}
                            >
                              {isFirstIndikator && (
                                <>
                                  <TableCell
                                    rowSpan={totalIndikator}
                                    sx={{ verticalAlign: "top" }}
                                  >
                                    {row.level}
                                  </TableCell>
                                  <TableCell
                                    rowSpan={totalIndikator}
                                    sx={{ verticalAlign: "top" }}
                                  >
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
                              <TableCell
                                align="right"
                                sx={{ verticalAlign: "top" }}
                              >
                                {indikator.target}
                              </TableCell>
                              <TableCell sx={{ verticalAlign: "top" }}>
                                {indikator.satuan}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      );
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
