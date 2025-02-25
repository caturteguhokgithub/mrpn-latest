import React, { useEffect } from "react";
import {
  Box,
  Chip,
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
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import useRkpVM from "@/components/dropdown/rkpVM";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { InfoTooltip } from "@/app/components/InfoTooltip";

type Row = {
  object: string;
  sasaran: string;
  indicator: string[];
  target: string[];
  coordinator: string[];
  main: string[];
  support: string[];
};

export default function TableShortlist({ mode }: { mode?: string }) {
  const { rpjmn, year } = useRKPContext((state) => state);

  const { objectState } = usePenetapanObjectVM();
  const { stateShorList, getPenetapanObjectShortList } = usePenetapanObjectVM();

  useEffect(() => {
    if (objectState !== undefined) {
      getPenetapanObjectShortList();
    }
  }, [objectState]);

  const generateRows = () => {
    let index = 0;

    if (rpjmn != undefined) {
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        if (i !== year && i <= year) {
          index++;
        }
      }
    }

    let rows: Row[] = [];
    stateShorList.map((data) => {
      let row: Row = {
        object: data.rkp.value,
        sasaran: "",
        indicator: [],
        target: [],
        coordinator: [],
        main: [],
        support: [],
      };
      data.rkp.sasaran.map((sasaran) => {
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
      });
      if (data.exsum !== null) {
        let coordinator: string[] = [];
        let main: string[] = [];
        let support: string[] = [];
        data.exsum.kelembagaan.map((kl) => {
          if (kl.type == "COORDINATION") {
            kl.stakeholder.map((st) => {
              coordinator.push(st.value);
            });
          }
          if (kl.type == "MAIN_ENTITY") {
            kl.stakeholder.map((st) => {
              main.push(st.value);
            });
          }
          if (kl.type == "SUPPORT") {
            kl.stakeholder.map((st) => {
              support.push(st.value);
            });
          }
        });

        row.coordinator = coordinator;
        row.main = main;
        row.support = support;
      }
      rows.push(row);
    });

    return rows;
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
            <TableRow>
              <TableCell>Objek</TableCell>
              <TableCell>Sasaran</TableCell>
              <TableCell>Indikator</TableCell>
              <TableCell>Target</TableCell>
              {/* <TableCell width={200}>Kementerian Koordinator</TableCell>
              <TableCell width={200}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  Entitas MRPN Sektor Utama
                  <InfoTooltip
                    title="Kementerian negara atau lembaga yang mempunyai tanggung jawab utama dalam mengelola risiko
pada program, kegiatan, proyek, prioritas pembangunan, dan/atau jenis risiko tertentu yang
bersifat lintas sektor"
                  />
                </Stack>
              </TableCell>
              <TableCell width={200}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  Entitas MRPN Pendukung
                  <InfoTooltip
                    title="Entitas MRPN Pendukung adalah K/L/P/BU/BL yang turut mendukung pelaksanaan Objek MRPN
Lintas Sektor termasuk yang menjadi penanggung jawab atas suatu perlakuan risiko"
                  />
                </Stack>
              </TableCell> */}
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
                      {row.object}
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
                  <TableCell sx={{ verticalAlign: "top" }}>{subItem}</TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {row.target[subIndex]}
                  </TableCell>
                  {/* {subIndex === 0 && (
                    <TableCell
                      rowSpan={row.indicator.length}
                      sx={{ verticalAlign: "top" }}
                    >
                      {row.coordinator.length < 1 ? (
                        "(akan dindentifikasi lebih lanjut)"
                      ) : (
                        <Stack
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {row.coordinator.map((itemEntitas, index) => (
                            <Box key={index} component="span">
                              <Chip
                                label={itemEntitas}
                                size="small"
                                sx={{
                                  height: "auto",
                                  ".MuiChip-label": {
                                    whiteSpace: "wrap",
                                    lineHeight: 1.2,
                                    py: 0.6,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </TableCell>
                  )}
                  {subIndex === 0 && (
                    <TableCell
                      rowSpan={row.indicator.length}
                      sx={{ verticalAlign: "top" }}
                    >
                      {row.main.length < 1 ? (
                        "(akan dindentifikasi lebih lanjut)"
                      ) : (
                        <Stack
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {row.main.map((itemEntitas, index) => (
                            <Box key={index} component="span">
                              <Chip
                                label={itemEntitas}
                                size="small"
                                sx={{
                                  height: "auto",
                                  ".MuiChip-label": {
                                    whiteSpace: "wrap",
                                    lineHeight: 1.2,
                                    py: 0.6,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </TableCell>
                  )}
                  {subIndex === 0 && (
                    <TableCell
                      rowSpan={row.indicator.length}
                      sx={{ verticalAlign: "top" }}
                    >
                      {row.support.length < 1 ? (
                        "(akan dindentifikasi lebih lanjut)"
                      ) : (
                        <Stack
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {row.support.map((itemEntitas, index) => (
                            <Box key={index} component="span">
                              <Chip
                                label={itemEntitas}
                                size="small"
                                sx={{
                                  height: "auto",
                                  ".MuiChip-label": {
                                    whiteSpace: "wrap",
                                    lineHeight: 1.2,
                                    py: 0.6,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      )}
                    </TableCell>
                  )} */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
