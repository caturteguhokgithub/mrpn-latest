import React, { SetStateAction, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { IconFA } from "@/app/components/icons/icon-fa";
import { VisuallyHiddenInput } from "@/app/utils/constant";
import { TextareaStyled } from "@/app/components/textarea";
import { usePenetapanTopicContext } from "@/lib/core/hooks/useHooks";
import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";
import Image from "next/image";

export default function TableNotaDinas({
  edit,
  setEdit,
}: {
  edit: boolean;
  setEdit: (value: SetStateAction<boolean>) => void;
}) {
  const { nota, setNota } = usePenetapanTopicContext((store) => store);

  const { updateOrCreateNotaDinas } = usePenetapanObjectVM();

  const [creatorFile, setCreatorFile] = useState<{
    fileName: string;
    ext: string;
  }>({ fileName: "", ext: "" });
  const [approverFile, setApproverFile] = useState<{
    fileName: string;
    ext: string;
  }>({ fileName: "", ext: "" });

  const handleFileChange = async (e: any, field: string) => {
    if (nota == undefined) {
      return;
    }

    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const res = reader.result as string;
        const stringBase64 = res.split(",")[1];

        let prevData = { ...nota };

        const fileName = file.name;
        const fileData = {
          fileName: fileName,
          ext: "",
        };

        switch (field) {
          case "creator":
            prevData.ttd_pembuat_base64 = stringBase64;
            prevData.ttd_pembuat_filename = fileName;
            setCreatorFile(fileData);
            setNota(prevData);
            break;
          default:
            prevData.ttd_penyetuju_base64 = stringBase64;
            prevData.ttd_penyetuju_filename = fileName;
            setApproverFile(fileData);
            setNota(prevData);
            break;
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  return (
    <Stack gap={2}>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell width={300}>
                <Typography fontSize={14} color={grey[600]}>
                  Topik
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>{nota?.topik}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontSize={14} color={grey[600]}>
                  Periode
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>{nota?.periode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ verticalAlign: "top" }}>
                <Typography fontSize={14} color={grey[600]}>
                  Usulan Objek MRPN Lintas Sektor
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>
                :
              </TableCell>
              <TableCell>
                <ul>
                  {nota?.usulan_objek_ls.map((x) => (
                    <li>{x}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography gutterBottom fontSize={14} color={grey[600]}>
                  Justifikasi & Penjelasan
                </Typography>
                {edit ? (
                  <TextareaStyled
                    aria-label="Justifikasi & Penjelasan Usulan Objek MRPN Lintas Sektor"
                    placeholder="Justifikasi & Penjelasan Usulan Objek MRPN Lintas Sektor"
                    minRows={3}
                    value={nota?.penjelasan_objek_mrpn}
                    onChange={(e) => {
                      if (nota !== undefined) {
                        const prev = { ...nota };
                        prev.penjelasan_objek_mrpn = e.target.value;
                        setNota(prev);
                      }
                    }}
                  />
                ) : (
                  <Typography fontSize={14}>
                    {nota?.penjelasan_objek_mrpn}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/*<Typography fontWeight={600}>Usulan UPR Lintas Sektor</Typography>*/}
      {/*<TableContainer component={Paper} elevation={0} variant="outlined">*/}
      {/*  <Table sx={{ minWidth: 650 }} size="small">*/}
      {/*    <TableBody>*/}
      {/*      <TableRow>*/}
      {/*        <TableCell width={300} sx={{ verticalAlign: "top" }}>*/}
      {/*          <Typography fontSize={14} color={grey[600]}>*/}
      {/*            1. Kementerian Koordinasi*/}
      {/*          </Typography>*/}
      {/*        </TableCell>*/}
      {/*        <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
      {/*          :*/}
      {/*        </TableCell>*/}
      {/*        <TableCell>*/}
      {/*          <List sx={{ pl: "0 !important" }}>*/}
      {/*            {nota?.kementerian_koordinasi.map((x) => (*/}
      {/*              <ListItem>{x}</ListItem>*/}
      {/*            ))}*/}
      {/*          </List>*/}
      {/*        </TableCell>*/}
      {/*      </TableRow>*/}

      {/*      <TableRow>*/}
      {/*        <TableCell width={300} sx={{ verticalAlign: "top" }}>*/}
      {/*          <Typography fontSize={14} color={grey[600]}>*/}
      {/*            2. Entitas MRPN Sektor Utama*/}
      {/*          </Typography>*/}
      {/*        </TableCell>*/}
      {/*        <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
      {/*          :*/}
      {/*        </TableCell>*/}
      {/*        <TableCell>*/}
      {/*          <ul>*/}
      {/*            {nota?.entitas_sektor_utama.map((x) => (*/}
      {/*              <li>{x}</li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </TableCell>*/}
      {/*      </TableRow>*/}

      {/*      <TableRow>*/}
      {/*        <TableCell width={300} sx={{ verticalAlign: "top" }}>*/}
      {/*          <Typography fontSize={14} color={grey[600]}>*/}
      {/*            3. Entitas MRPN Pendukung*/}
      {/*          </Typography>*/}
      {/*        </TableCell>*/}
      {/*        <TableCell width={2} sx={{ px: 0, verticalAlign: "top" }}>*/}
      {/*          :*/}
      {/*        </TableCell>*/}
      {/*        <TableCell>*/}
      {/*          <ul>*/}
      {/*            {nota?.entitas_pendukung.map((x) => (*/}
      {/*              <li>{x}</li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </TableCell>*/}
      {/*      </TableRow>*/}

      {/*      <TableRow>*/}
      {/*        <TableCell colSpan={3}>*/}
      {/*          <Typography gutterBottom fontSize={14} color={grey[600]}>*/}
      {/*            Justifikasi & Penjelasan*/}
      {/*          </Typography>*/}
      {/*          {edit ? (*/}
      {/*            <TextareaStyled*/}
      {/*              disabled={!edit}*/}
      {/*              aria-label="Justifikasi & Penjelasan Usulan UPR Lintas Sektor"*/}
      {/*              placeholder="Justifikasi & Penjelasan Usulan UPR Lintas Sektor"*/}
      {/*              minRows={3}*/}
      {/*              value={nota?.penjelasan_usulan_upr}*/}
      {/*              onChange={(e) => {*/}
      {/*                if (nota !== undefined) {*/}
      {/*                  const prev = { ...nota };*/}
      {/*                  prev.penjelasan_usulan_upr = e.target.value;*/}
      {/*                  setNota(prev);*/}
      {/*                }*/}
      {/*              }}*/}
      {/*            />*/}
      {/*          ) : (*/}
      {/*            <Typography fontSize={14}>*/}
      {/*              {nota?.penjelasan_usulan_upr}*/}
      {/*            </Typography>*/}
      {/*          )}*/}
      {/*        </TableCell>*/}
      {/*      </TableRow>*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</TableContainer>*/}

      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>
            <TableRow>
              <TableCell width={300}>
                <Typography fontSize={14} color={grey[600]}>
                  Lokasi & Tanggal
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>
                <Stack direction="row" gap={2}>
                  {edit ? (
                    <>
                      <TextField
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Isi lokasi"
                        value={nota?.lokasi}
                        onChange={(e) => {
                          if (nota !== undefined) {
                            const prev = { ...nota };
                            prev.lokasi = e.target.value;
                            setNota(prev);
                          }
                        }}
                      />
                      <TextField
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Isi tanggal"
                        value={nota?.tanggal}
                        onChange={(e) => {
                          if (nota !== undefined) {
                            const prev = { ...nota };
                            prev.tanggal = e.target.value;
                            setNota(prev);
                          }
                        }}
                      />
                    </>
                  ) : (
                    <Typography fontSize={14}>
                      {`${nota?.lokasi}, ${nota?.tanggal}`}
                    </Typography>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={300}>
                <Typography fontSize={14} color={grey[600]}>
                  Direktorat
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>
                {edit ? (
                  <TextField
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Isi direktorat"
                    value={nota?.direktorat}
                    onChange={(e) => {
                      if (nota !== undefined) {
                        const prev = { ...nota };
                        prev.direktorat = e.target.value;
                        setNota(prev);
                      }
                    }}
                  />
                ) : (
                  <Typography fontSize={14}>{nota?.direktorat}</Typography>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={300}>
                <Typography fontSize={14} color={grey[600]}>
                  Dibuat oleh
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>
                <Stack
                  direction={edit ? "row" : "column"}
                  gap={2}
                  alignItems="center"
                >
                  {nota && nota.ttd_pembuat != "" && !edit && (
                    <Image
                      width={70}
                      height={70}
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL_FILES +
                        nota.ttd_pembuat
                      }
                      alt={"tanda tangan digital creator"}
                    />
                  )}
                  {edit ? (
                    <>
                      <TextField
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Dibuat oleh"
                        value={nota?.dibuat}
                        onChange={(e) => {
                          if (nota !== undefined) {
                            const prev = { ...nota };
                            prev.dibuat = e.target.value;
                            setNota(prev);
                          }
                        }}
                      />
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IconFA name="upload" size={14} />}
                        sx={{
                          textTransform: "capitalize",
                          px: 2,
                          height: 36,
                        }}
                      >
                        {creatorFile.fileName == ""
                          ? "Upload tanda tangan digital"
                          : "Pilih ulang"}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => handleFileChange(e, "creator")}
                        />
                      </Button>

                      <Typography>{creatorFile.fileName}</Typography>
                    </>
                  ) : (
                    <Typography fontSize={14}>{nota?.dibuat}</Typography>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography fontSize={14} color={grey[600]}>
                  Disetujui oleh
                </Typography>
              </TableCell>
              <TableCell width={2} sx={{ px: 0 }}>
                :
              </TableCell>
              <TableCell>
                <Stack
                  direction={edit ? "row" : "column"}
                  gap={2}
                  alignItems="center"
                >
                  {nota && nota.ttd_penyetuju != "" && !edit && (
                    <Image
                      width={70}
                      height={70}
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL_FILES +
                        nota.ttd_penyetuju
                      }
                      alt={"tanda tangan digital creator"}
                    />
                  )}

                  {edit ? (
                    <>
                      <TextField
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        placeholder="Disetujui oleh"
                        value={nota?.disetujui}
                        onChange={(e) => {
                          if (nota !== undefined) {
                            const prev = { ...nota };
                            prev.disetujui = e.target.value;
                            setNota(prev);
                          }
                        }}
                      />
                      <Button
                        size="small"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<IconFA name="upload" size={14} />}
                        sx={{
                          textTransform: "capitalize",
                          px: 2,
                          height: 36,
                        }}
                      >
                        {approverFile.fileName == ""
                          ? "Upload tanda tangan digital"
                          : "Pilih ulang"}
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => handleFileChange(e, "approver")}
                        />
                      </Button>
                      <Typography>{approverFile.fileName}</Typography>
                    </>
                  ) : (
                    <Typography fontSize={14}>{nota?.disetujui}</Typography>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {edit && (
        <Stack width="100%" direction="row" justifyContent="flex-end" gap={2}>
          <Box>
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: 24, px: 4 }}
              onClick={() => setEdit(false)}
            >
              Batal
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ borderRadius: 24, px: 4 }}
              onClick={() => {
                updateOrCreateNotaDinas().then((r) => r && setEdit(false));
              }}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
