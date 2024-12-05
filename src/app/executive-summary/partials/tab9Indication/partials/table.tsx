import React from "react";
import {
  alpha,
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
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { ExsumIndicationResDto } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import ActionColumn from "@/components/actions/action";
import { bgColorTh } from "@/app/utils/color";

export default function TableIndication({
  data,
  handleModalOpen,
}: {
  data?: ExsumIndicationResDto[];
  handleModalOpen?: any;
}) {
  const { permission } = useAuthContext((state) => state);
  const pathname = usePathname();

  const { year } = useRKPContext((store) => store);

  const handleEditData = (id: number) => {
    if (data) {
      handleModalOpen(id, true, "update");
    }
  };

  const handleDeleteData = (id: number) => {
    if (data) {
      handleModalOpen(id, true, "delete");
    }
  };

  return (
    <TableContainer
      className="table-overflow-x-indication"
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "calc(100vh - 520px)",
        "&::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
          cursor: "pointer",
          transition: "all 300ms ease-in",
        },
        "&:hover": {
          "&::-webkit-scrollbar": {
            height: "20px",
          },
        },
      }}
    >
      <Table
        // style={{ tableLayout: "fixed", width: 1600 }}
        size="small"
        // stickyHeader
      >
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh, width: 200 }}>
              <Typography variant="body1" fontWeight={600}>
                Analisis TOWS
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 200 }}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Typography variant="body1" fontWeight={600}>
                  Indikasi Risiko
                </Typography>
                {/* <InfoTooltip
                  title="Sumber-sumber risiko pada penyusunan kebijakan dapat
                      berasal dari strategi-strategi yang dihasilkan dari
                      matriks TOWS terutama WT (weakness thread). Indikasi
                      peristiwa risiko yang terdapat pada indikasi risiko objek
                      RPJMN merupakan risiko yang mungkin terjadi pada tahap
                      perencanaan kebijakan pembangunan."
                /> */}
              </Stack>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 200 }}>
              <Typography variant="body1" fontWeight={600}>
                Kategori Risiko
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 200 }}>
              <Typography variant="body1" fontWeight={600}>
                Indikasi Perlakuan Risiko
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 360 }}>
              <Typography variant="body1" fontWeight={600}>
                Output
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 300 }}>
              <Typography variant="body1" fontWeight={600}>
                PJ Perlakuan
              </Typography>
            </TableCell>
            {year == 0 && (
              <TableCell width={100} sx={{ bgcolor: bgColorTh }}>
                <Typography variant="body1" fontWeight={600}>
                  Tahun
                </Typography>
              </TableCell>
            )}
            {(hasPrivilege(permission, pathname, "update") ||
              hasPrivilege(permission, pathname, "delete")) && (
              <TableCell
                sx={{
                  // position: "sticky",
                  // right: 0,
                  // boxShadow: "2px -6px 10px grey",
                  // borderLeft: "1px solid #e0e0e0",
                  bgcolor: bgColorTh,
                  width: 100,
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Aksi
                </Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <React.Fragment key={row + "-" + index}>
                <TableRow>
                  <TableCell
                    rowSpan={
                      (row.perlakuan.length == 0 ? 1 : row.perlakuan.length) +
                      row.regulasi.length
                    }
                    sx={{ verticalAlign: "top" }}
                  >
                    <Typography variant="body1">
                      {row.tows?.value ?? ""}
                    </Typography>
                  </TableCell>
                  <TableCell
                    rowSpan={
                      (row.perlakuan.length == 0 ? 1 : row.perlakuan.length) +
                      row.regulasi.length
                    }
                    sx={{ verticalAlign: "top" }}
                  >
                    <Typography variant="body1">
                      {row.indikasi_risiko}
                    </Typography>
                  </TableCell>
                  <TableCell
                    rowSpan={
                      (row.perlakuan.length == 0 ? 1 : row.perlakuan.length) +
                      row.regulasi.length
                    }
                    sx={{ verticalAlign: "top" }}
                  >
                    <Typography variant="body1">
                      {row.kategori_risiko}
                    </Typography>
                  </TableCell>
                  <TableCell
                    rowSpan={
                      (row.perlakuan.length == 0 ? 1 : row.perlakuan.length) +
                      row.regulasi.length
                    }
                    sx={{ verticalAlign: "top" }}
                  >
                    <Typography variant="body1">
                      {row.indikasi_perlakuan_risiko}
                    </Typography>
                  </TableCell>
                  {row.perlakuan.length > 0 ?
                    <>
                        <TableCell sx={{ verticalAlign: "top" }}>
                            <Typography
                                variant="body1"
                                color={
                                  row.perlakuan[0].ro?.type == "RO" ? "" : "#f97316"
                                }
                            >
                              {row.perlakuan[0].ro?.type == "RO"
                                ? row.perlakuan[0].ro?.value
                                : row.perlakuan[0].ro?.value + " (NON RO)"}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ verticalAlign: "top" }}>
                            <Box>
                                <Stack
                                  // marginTop={"10px"}
                                    display="inline-flex"
                                    alignItems="center"
                                    direction="row"
                                    gap={0.5}
                                    flexWrap="wrap"
                                >
                                  {row.perlakuan.length > 0 && (
                                    <Box component="div">
                                      <Chip
                                        label={
                                          row.perlakuan[0].ro?.kementrian?.value ?? "-"
                                        }
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
                                  )}
                                </Stack>
                            </Box>
                        </TableCell>
                      {year == 0 && (
                        <TableCell sx={{ verticalAlign: "top" }}>
                          <Stack
                            display="inline-flex"
                            alignItems="center"
                            direction="row"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            {row.perlakuan[0].tahun.map((st, stIndex) => (
                              <Box key={stIndex} component="span">
                                <Chip
                                  label={st}
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
                        </TableCell>
                      )}
                    </>
                    :
                    row.regulasi.length > 0 &&
                      <>
                          <TableCell sx={{ verticalAlign: "top" }}>
                              <ul>
                                {row.regulasi[0].perpres.map((y, index2) => (
                                  <li>
                                    <Typography
                                      key={`perpres-${index2}`}
                                      color={y.flag != null ? "#EA6228" : undefined}
                                    >
                                      {`${y.title}`}
                                    </Typography>
                                  </li>
                                ))}
                              </ul>
                          </TableCell>

                          <TableCell sx={{ verticalAlign: "top" }}>
                              <Box>
                                  <Stack
                                    // marginTop={"10px"}
                                      display="inline-flex"
                                      alignItems="center"
                                      direction="row"
                                      gap={0.5}
                                      flexWrap="wrap"
                                  >
                                      <Box component="div">
                                        {row.regulasi[0].entitas.map((regEnt) => (
                                          <Chip
                                            label={regEnt.value}
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
                                        ))}
                                      </Box>
                                  </Stack>
                              </Box>
                          </TableCell>

                        {year == 0 && (
                          <TableCell sx={{ verticalAlign: "top" }}>
                            <Stack
                              display="inline-flex"
                              alignItems="center"
                              direction="row"
                              gap={0.5}
                              flexWrap="wrap"
                            >
                              {row.regulasi[0].tahun.map((st, stIndex) => (
                                <Box key={stIndex} component="span">
                                  <Chip
                                    label={st}
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
                          </TableCell>
                        )}
                      </>
                  }

                  {(hasPrivilege(permission, pathname, "update") ||
                    hasPrivilege(permission, pathname, "delete")) && (
                    <TableCell
                      rowSpan={
                        (row.perlakuan.length == 0 ? 1 : row.perlakuan.length) +
                        row.regulasi.length
                      }
                    >
                      <ActionColumn
                        editClick={
                          hasPrivilege(permission, pathname, "update")
                            ? () => handleEditData(row.id)
                            : undefined
                        }
                        deleteClick={
                          hasPrivilege(permission, pathname, "delete")
                            ? () => handleDeleteData(row.id)
                            : undefined
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>

                {row.perlakuan.slice(1).map((perlakuan, i) => (
                  <TableRow key={perlakuan + "-" + index + "-" + i}>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <Typography
                        variant="body1"
                        color={perlakuan.ro?.type == "RO" ? "" : "#f97316"}
                      >
                        {perlakuan.ro?.type == "RO"
                          ? perlakuan.ro?.value
                          : perlakuan.ro?.value + " (NON RO)"}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: "top" }}>
                      <Box>
                        <Stack
                          // marginTop={"10px"}
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          <Box component="div">
                            <Chip
                              label={perlakuan.ro?.kementrian?.value ?? "-"}
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
                        </Stack>
                      </Box>
                    </TableCell>

                    {year == 0 && (
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Stack
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {perlakuan.tahun.map((st, stIndex) => (
                            <Box key={stIndex} component="span">
                              <Chip
                                label={st}
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
                      </TableCell>
                    )}
                  </TableRow>
                ))}

                {row.perlakuan.length > 0 ?
                  row.regulasi.map((regulation, iRegulation) => (
                    <TableRow>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <ul>
                          {regulation.perpres.map((y, index2) => (
                            <li>
                              <Typography
                                key={`perpres-${index2}`}
                                color={y.flag != null ? "#EA6228" : undefined}
                              >
                                {`${y.title}`}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Box>
                          <Stack
                            // marginTop={"10px"}
                            display="inline-flex"
                            alignItems="center"
                            direction="row"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            <Box component="div">
                              {regulation.entitas.map((regEnt) => (
                                <Chip
                                  label={regEnt.value}
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
                              ))}
                            </Box>
                          </Stack>
                        </Box>
                      </TableCell>

                      {year == 0 && (
                        <TableCell sx={{ verticalAlign: "top" }}>
                          <Stack
                            display="inline-flex"
                            alignItems="center"
                            direction="row"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            {regulation.tahun.map((st, stIndex) => (
                              <Box key={stIndex} component="span">
                                <Chip
                                  label={st}
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
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                  :
                  row.regulasi.slice(1).map((regulation, iRegulation) => (
                    <TableRow>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <ul>
                          {regulation.perpres.map((y, index2) => (
                            <li>
                              <Typography
                                key={`perpres-${index2}`}
                                color={y.flag != null ? "#EA6228" : undefined}
                              >
                                {`${y.title}`}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </TableCell>

                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Box>
                          <Stack
                            // marginTop={"10px"}
                            display="inline-flex"
                            alignItems="center"
                            direction="row"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            <Box component="div">
                              {regulation.entitas.map((regEnt) => (
                                <Chip
                                  label={regEnt.value}
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
                              ))}
                            </Box>
                          </Stack>
                        </Box>
                      </TableCell>

                      {year == 0 && (
                        <TableCell sx={{ verticalAlign: "top" }}>
                          <Stack
                            display="inline-flex"
                            alignItems="center"
                            direction="row"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            {regulation.tahun.map((st, stIndex) => (
                              <Box key={stIndex} component="span">
                                <Chip
                                  label={st}
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
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                }
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
