import React, { Fragment } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Divider,
  IconButton,
  List,
  ListItem,
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
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { PenetapanObjectNotaDto } from "@/lib/core/context/penetapanTopicContext";
import { bgColorTh } from "@/app/utils/color";
import Iconify from "@/app/components/icons/iconify";
import DialogComponent from "@/app/components/dialog";
import FormNote from "./form-note";
import AddButton from "@/app/components/buttonAdd";
import { VisuallyHiddenInput } from "@/app/utils/constant";
import { IconFA } from "@/app/components/icons/icon-fa";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import DraggableScroll from "@/app/components/cardStakeholder/draggableScroll";
import { styleOrgChart } from "@/app/executive-summary/style";
import { SxParams } from "@/app/executive-summary/types";
import useNotaDinasVM from "../notaDinasVM";

export default function TableNotaDinasViewOnly({
  notaDinas,
  actionApprove,
}: {
  notaDinas: PenetapanObjectNotaDto;
  actionApprove?: React.ReactNode;
}) {
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalViewImage, setModalViewImage] = React.useState(false);
  const [thisGambar, setThisGambar] = React.useState("");

  const { gambar, uploadImage } = useNotaDinasVM();

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={() => setModalOpenAdd(false)}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  const dataUPR = [
    "Kementerian Koordinator Bidang Pangan",
    "Pemerintah Provinsi Kalteng",
    "Bappenas",
    "Kementerian Transmigrasi",
    "Kementerian PU",
  ];

  const statusObject: "plan" | "reject" | "approved" = "plan";

  const sxParamsFull: SxParams = { variant: "full" };

  const handleUnggahBuktiDukung = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files?.[0];

    if (files) {
      const fileName = files.name;
      const reader = new FileReader();

      reader.readAsDataURL(files);
      reader.onload = () => {
        const res = reader.result as string;

        uploadImage(res, fileName);
      };

      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  return (
    <Fragment>
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
                    <Stack direction="row" alignItems="center" gap={1}>
                      {statusObject === "plan" ? (
                        <Fragment>
                          <Chip
                            color="primary"
                            label="Rancangan"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                          <AddButton
                            title="Ajukan Pengesahan"
                            filled
                            noMargin
                            startIcon={
                              <Iconify name="mdi:check-circle" size={16} />
                            }
                            onclick={() => { }}
                          />
                        </Fragment>
                      ) : statusObject === "reject" ? (
                        <Fragment>
                          <Chip
                            color="error"
                            label="Ditolak"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                          <Typography color={grey[500]} fontSize={14}>
                            Ditolak tanggal <strong>12 Februari 2025</strong>
                          </Typography>
                        </Fragment>
                      ) : statusObject === "approved" ? (
                        <Fragment>
                          <Chip
                            color="success"
                            label="Disetujui"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                          <Typography color={grey[500]} fontSize={14}>
                            Disahkan tanggal <strong>5 September 2025</strong>
                          </Typography>
                        </Fragment>
                      ) : null}
                    </Stack>
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
        {/* OBJEK UPR */}
        <Stack gap={1}>
          <Typography fontWeight={600}>Objek & UPR LS</Typography>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table
              sx={{
                minWidth: 650,
                "tbody, thead": {
                  "td, th": {
                    borderRight: `1px solid ${grey[300]} !important`,
                    "&:last-of-type": {
                      borderRight: `0 !important`,
                    },
                  },
                },
              }}
              size="small"
            >
              <TableHead sx={{ bgcolor: bgColorTh }}>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    width={70}
                    sx={{ textAlign: "center" }}
                  >
                    No.
                  </TableCell>
                  <TableCell rowSpan={2} sx={{ textAlign: "center" }}>
                    Objek MRPN LS
                  </TableCell>
                  <TableCell colSpan={3} align="center">
                    Unit Pengelola Risiko
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Koordinator</TableCell>
                  <TableCell align="center">Utama</TableCell>
                  <TableCell align="center">Pendukung</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    ".MuiTableCell-stickyHeader": {
                      top: 37,
                    },
                  }}
                >
                  {[...new Array(5)].map((_, i) => (
                    <TableCell sx={{ bgcolor: grey[100] }}>
                      <Typography
                        color={`${grey[500]} !important`}
                        fontSize={14}
                        textAlign="center"
                      >
                        {i + 1}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">1</TableCell>
                  <TableCell>
                    Pengembangan Kawasan Sentra Produksi Pangan (KSPP)/Lumbung
                    Pangan Kalimantan Tengah
                  </TableCell>
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
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
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
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
                  <TableCell width={300}>
                    <Stack
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      {dataUPR.map((item) => (
                        <Box component="div">
                          <Chip
                            label={item}
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* Bukti Dukung */}
        <Stack gap={1}>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={600}>Bukti Dukung</Typography>
            <Button
              size="small"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<Iconify name="mdi:upload" size={16} />}
              sx={{
                borderRadius: 50,
                textTransform: "capitalize",
              }}
            >
              Unggah Bukti Dukung
              <VisuallyHiddenInput
                type="file"
                onChange={(event: any) => handleUnggahBuktiDukung(event)}
                multiple
              />
            </Button>
          </Stack>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table
              sx={{
                minWidth: 650,
                "tbody, thead": {
                  "td, th": {
                    borderRight: `1px solid ${grey[300]} !important`,
                    "&:last-of-type": {
                      borderRight: `0 !important`,
                    },
                  },
                },
              }}
              size="small"
            >
              <TableHead sx={{ bgcolor: bgColorTh }}>
                <TableRow>
                  <TableCell width={70} align="center">
                    No.
                  </TableCell>
                  <TableCell align="center">File Bukti Dukung</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    ".MuiTableCell-stickyHeader": {
                      top: 37,
                    },
                  }}
                >
                  {[...new Array(3)].map((_, i) => (
                    <TableCell sx={{ bgcolor: grey[100] }}>
                      <Typography
                        color={`${grey[500]} !important`}
                        fontSize={14}
                        textAlign="center"
                      >
                        {i + 1}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {gambar.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell align="center">
                      {item.file.toLowerCase().endsWith(".pdf") ? (
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_URL_FILES}bukti_dukung/${item.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconButton color="primary">
                            <Iconify
                              name="mdi:file-pdf"
                              color="red"
                              size={20}
                            />
                          </IconButton>
                        </a>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setModalViewImage(true);
                            setThisGambar(item.file);
                          }}
                        >
                          <Iconify name="mdi:file-image" size={20} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* Pengajuan Pengesahan */}
        <Stack gap={1}>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={600}>Pengajuan Pengesahan</Typography>
            {statusObject !== "plan" && (
              <AddButton
                title="Tambah Catatan"
                filled
                noMargin
                startIcon={<Iconify name="mdi:plus-circle" size={16} />}
                onclick={() => setModalOpenAdd(true)}
              />
            )}
          </Stack>
          <Typography>-</Typography>
          {/* <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setModalOpenAdd(true)}
            >
              Catatan
            </Button>
          </Box> */}
        </Stack>
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
                  {/* <TableCell>
                  <Typography textAlign="center">Dibuat oleh,</Typography>
                </TableCell> */}
                  <TableCell>
                    <Typography textAlign="center">Disetujui oleh,</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {/* <TableCell align="center">
                  <Box position="relative" width="auto" display="inline-block">
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
                </TableCell> */}
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
                  {/* <TableCell sx={{ verticalAlign: "top" }}>
                  <Stack gap="4px" maxWidth={300} m="0 auto">
                    <Typography textAlign="center" fontWeight={500}>
                      {notaDinas.dibuat}
                    </Typography>
                  </Stack>
                </TableCell> */}
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
      <DialogComponent
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Catatan Pengajuan Pengesahan"
        dialogFooter={dialogActionFooter}
      >
        <FormNote mode="add" />
      </DialogComponent>
      <DialogComponent
        width="100%"
        maxHeight="100vh"
        dialogOpen={modalViewImage}
        dialogClose={() => setModalViewImage(false)}
        sx={{
          ".transform-component-module_wrapper__SPB86": {
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          ".react-transform-component": {
            width: "100%",
          },
          ".MuiDialogContent-root": {
            p: 0,
          },
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 9999 }}
          onClick={() => setModalViewImage(false)}
        >
          <IconFA name="circle-xmark" color="red" size={32} />
        </IconButton>
        <TransformWrapper
          initialScale={0.5}
          minScale={0.1}
          maxScale={3}
          limitToBounds={true}
          doubleClick={{ disabled: false }}
          wheel={{ disabled: false }}
          panning={{ disabled: false }}
        >
          <TransformComponent>
            <Box sx={styleOrgChart(sxParamsFull)} mt={4}>
              <DraggableScroll
                sx={{
                  display: "flex",
                  gap: 1,
                  paddingBottom: 1,
                  "&::-webkit-scrollbar": {
                    height: "3px",
                  },
                }}
              >
                <Image
                  alt="Instansi Pelaksana"
                  // src="https://res.cloudinary.com/caturteguh/image/upload/v1741666619/mrpn/document-872506_1280_sanrsj.jpg"
                  src={process.env.NEXT_PUBLIC_BASE_URL_FILES + "bukti_dukung/" + thisGambar}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </DraggableScroll>
            </Box>
          </TransformComponent>
        </TransformWrapper>
      </DialogComponent>
    </Fragment>
  );
}
