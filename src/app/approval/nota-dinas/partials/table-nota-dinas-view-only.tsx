import React from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { PenetapanObjectNotaDto } from "@/lib/core/context/penetapanTopicContext";

export default function TableNotaDinasViewOnly({
  notaDinas,
  actionApprove,
}: {
  notaDinas: PenetapanObjectNotaDto;
  actionApprove?: React.ReactNode;
}) {
  return (
    <>
      <Stack gap={2}>
        <Paper elevation={0} variant="outlined">
          <TableContainer sx={{ py: 1 }}>
            <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">
              <TableBody>
                <TableRow>
                  <TableCell width={300}>
                    <Typography color={grey[600]}>Topik</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Typography>{notaDinas.topik}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={grey[600]}>Periode</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Typography>{notaDinas.periode}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color={grey[600]}>Status Pengesahan</Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <Chip
                        color="primary"
                        label="Rancangan"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        color="error"
                        label="Ditolak"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        color="success"
                        label="Disetujui"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography color={grey[600]}>
                      Usulan Objek MRPN Lintas Sektor
                    </Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ verticalAlign: "top", px: 0 }}>
                    :
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography>
                      {notaDinas.usulan_objek_ls.length > 1 ? (
                        <List sx={{ p: 0 }}>
                          {notaDinas.usulan_objek_ls.map((x, index) => (
                            <ListItem sx={{ padding: 0, margin: 0 }}>{`${
                              index + 1
                            }. ${x}`}</ListItem>
                          ))}
                        </List>
                      ) : (
                        notaDinas.usulan_objek_ls[0]
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography gutterBottom color={grey[600]}>
                      Justifikasi & Penjelasan
                    </Typography>
                  </TableCell>
                  <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>
                    :
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Typography>{notaDinas.penjelasan_objek_mrpn}</Typography>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/*<Typography fontWeight={600} mt={1}>*/}
        {/*  Usulan UPR Lintas Sektor*/}
        {/*</Typography>*/}
        {/*<Paper elevation={0} variant="outlined">*/}
        {/*  <TableContainer sx={{ py: 1 }}>*/}
        {/*    <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">*/}
        {/*      <TableBody>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell width={300} sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography color={grey[600]}>*/}
        {/*              1. Kementerian Koordinasi*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*          <TableCell width={2} sx={{ verticalAlign: "top", px: 0 }}>*/}
        {/*            :*/}
        {/*          </TableCell>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography component="div">*/}
        {/*              {notaDinas.kementerian_koordinasi.length > 1 ? (*/}
        {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
        {/*                  {notaDinas.kementerian_koordinasi.map((x, index) => (*/}
        {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
        {/*                      index + 1*/}
        {/*                    }. ${x}`}</ListItem>*/}
        {/*                  ))}*/}
        {/*                </List>*/}
        {/*              ) : (*/}
        {/*                notaDinas.kementerian_koordinasi[0]*/}
        {/*              )}*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography color={grey[600]}>*/}
        {/*              2. Entitas MRPN Sektor Utama*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
        {/*            :*/}
        {/*          </TableCell>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography component="div">*/}
        {/*              {notaDinas.entitas_sektor_utama.length > 1 ? (*/}
        {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
        {/*                  {notaDinas.entitas_sektor_utama.map((x, index) => (*/}
        {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
        {/*                      index + 1*/}
        {/*                    }. ${x}`}</ListItem>*/}
        {/*                  ))}*/}
        {/*                </List>*/}
        {/*              ) : (*/}
        {/*                notaDinas.entitas_sektor_utama[0]*/}
        {/*              )}*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography color={grey[600]}>*/}
        {/*              3. Entitas MRPN Pendukung*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
        {/*            :*/}
        {/*          </TableCell>*/}
        {/*          <TableCell>*/}
        {/*            <Typography component="div">*/}
        {/*              {notaDinas.entitas_pendukung.length > 1 ? (*/}
        {/*                <List sx={{ p: 0, pl: "0 !important" }}>*/}
        {/*                  {notaDinas.entitas_pendukung.map((x, index) => (*/}
        {/*                    <ListItem sx={{ padding: 0, margin: 0 }}>{`${*/}
        {/*                      index + 1*/}
        {/*                    }. ${x}`}</ListItem>*/}
        {/*                  ))}*/}
        {/*                </List>*/}
        {/*              ) : (*/}
        {/*                notaDinas.entitas_pendukung[0]*/}
        {/*              )}*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*        <TableRow>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography gutterBottom color={grey[600]}>*/}
        {/*              Justifikasi & Penjelasan*/}
        {/*            </Typography>*/}
        {/*          </TableCell>*/}
        {/*          <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
        {/*            :*/}
        {/*          </TableCell>*/}
        {/*          <TableCell sx={{ verticalAlign: "top" }}>*/}
        {/*            <Typography>{notaDinas.penjelasan_usulan_upr}</Typography>*/}
        {/*          </TableCell>*/}
        {/*        </TableRow>*/}
        {/*      </TableBody>*/}
        {/*    </Table>*/}
        {/*  </TableContainer>*/}
        {/*</Paper>*/}

        <Paper elevation={0} variant="outlined">
          <TableContainer sx={{ py: 1 }}>
            <Table sx={{ minWidth: 650, td: { border: 0 } }} size="small">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2} sx={{ pb: 4 }}>
                    <Typography textAlign="center">{`${notaDinas.lokasi}, ${notaDinas.tanggal}`}</Typography>
                    <Typography textAlign="center">
                      {notaDinas.direktorat}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography textAlign="center">Dibuat oleh,</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="center">Disetujui oleh,</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">
                    <Box
                      position="relative"
                      width="auto"
                      display="inline-block"
                    >
                      <Box position="relative" zIndex={1}>
                        {notaDinas.ttd_pembuat && (
                          <Image
                            alt="Dibuat oleh"
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL_FILES +
                              notaDinas.ttd_pembuat
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "100px" }}
                          />
                        )}
                      </Box>
                      <Box position="absolute" top={-70} left={-70} zIndex={0}>
                        {notaDinas.alasan_ttd_pembuat &&
                          !notaDinas.approve_ttd_pembuat && (
                            <Image
                              alt="Dibuat oleh"
                              src="https://res.cloudinary.com/caturteguh/image/upload/v1721703228/mrpn/ttd/stamp-rejected_gdzucv.png"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: "auto",
                                height: "200px",
                                opacity: 0.3,
                              }}
                            />
                          )}
                        {notaDinas.approve_ttd_pembuat && (
                          <Image
                            alt="Dibuat oleh"
                            src="https://res.cloudinary.com/caturteguh/image/upload/v1721703223/mrpn/ttd/stamp-approved_dduusw.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "auto",
                              height: "200px",
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      position="relative"
                      width="auto"
                      display="inline-block"
                    >
                      <Box position="relative" zIndex={1}>
                        {notaDinas.ttd_penyetuju && (
                          <Image
                            alt="Disetujui oleh"
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL_FILES +
                              notaDinas.ttd_pembuat
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "120px" }}
                          />
                        )}
                      </Box>
                      <Box position="absolute" top={-70} left={-70} zIndex={0}>
                        {notaDinas.alasan_ttd_penyetuju &&
                          !notaDinas.approve_ttd_penyetuju && (
                            <Image
                              alt="Disetujui oleh"
                              src="https://res.cloudinary.com/caturteguh/image/upload/v1721703228/mrpn/ttd/stamp-rejected_gdzucv.png"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                width: "auto",
                                height: "200px",
                                opacity: 0.3,
                              }}
                            />
                          )}
                        {notaDinas.approve_ttd_penyetuju && (
                          <Image
                            alt="Disetujui oleh"
                            src="https://res.cloudinary.com/caturteguh/image/upload/v1721703223/mrpn/ttd/stamp-approved_dduusw.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: "auto",
                              height: "200px",
                              opacity: 0.3,
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack gap="4px" maxWidth={300} m="0 auto">
                      <Typography textAlign="center" fontWeight={500}>
                        {notaDinas.dibuat}
                      </Typography>
                      {/*<Divider />*/}
                      {/*<Typography*/}
                      {/*  textAlign="center"*/}
                      {/*  fontSize={14}*/}
                      {/*  color={grey[700]}*/}
                      {/*>*/}
                      {/*  Kepala Biro Hukum*/}
                      {/*</Typography>*/}
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <Stack gap="4px" maxWidth={300} m="0 auto">
                      <Typography textAlign="center" fontWeight={500}>
                        {notaDinas.disetujui}
                      </Typography>
                      {/*<Divider />*/}
                      {/*<Typography*/}
                      {/*  textAlign="center"*/}
                      {/*  fontSize={14}*/}
                      {/*  color={grey[700]}*/}
                      {/*>*/}
                      {/*  Kepala Pusat Data dan Informasi Perencanaan Pembangunan*/}
                      {/*</Typography>*/}
                    </Stack>
                  </TableCell>
                </TableRow>

                {actionApprove}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>
    </>
  );
}
