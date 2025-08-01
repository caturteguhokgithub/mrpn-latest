import React, { Fragment, SetStateAction } from "react";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";
import DialogComponent from "@/components/dialog";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import { MAX_FILE_SIZE_2MB, VisuallyHiddenInput } from "@/utils/constant";
import { doReqInformasiLainnya } from "../hooks/informationModel";
import { useToast } from "@/lib/core/context/toastContext";
import { green } from "@mui/material/colors";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function FormInformation({
  mode,
  handleOpenCategory,
  state,
  setState,
}: {
  mode?: string;
  handleOpenCategory?: any;
  state: doReqInformasiLainnya;
  setState: (value: SetStateAction<doReqInformasiLainnya>) => void;
}) {
  const {
    request,
    errorUploadStakeholder,
    setErrorUploadStakeholder,
    fileNameStakeholder,
    setFileNameStakeholder,
  } = useCardSegmentVM();
  const { showToast } = useToast();

  const [items, setItem] = React.useState([{ id: 1 }]);

  const add = () => {
    let arr = [...items];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItem(newItem);

    setState((prevState) => ({
      ...prevState,
      lists: [
        ...prevState.lists,
        {
          value: "",
          filename: "",
          file: "",
        },
      ],
    }));
  };

  const minus = (nowId: any) => {
    let arr = [...items];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItem(newArr);

    setState((prevState) => ({
      ...prevState,
      lists: prevState.lists.filter(
        (listItem, index) => index !== items.findIndex((i) => i.id === nowId)
      ),
    }));
  };

  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import("react-quill");

      function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
        return <RQ ref={forwardedRef} {...props} />;
      }

      return QuillJS;
    },
    {
      ssr: false,
    }
  );
  const quillRef = React.useRef<ReactQuill>(null);

  const dialogActionFooter = (
    <DialogActions sx={{ p: 2, px: 3 }}>
      <Button onClick={() => setModalOpenAdd(false)}>Batal</Button>
      <Button variant="contained" type="submit">
        Simpan
      </Button>
    </DialogActions>
  );

  const handleChangeEditor = (value: string, key: number) => {
    setState((prevState) => ({
      ...prevState,
      lists: prevState.lists.map((item, index) =>
        index === key
          ? {
              ...item,
              value: value,
            }
          : item
      ),
    }));
  };

  const handleUnggahBuktiDukung = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: number
  ) => {
    const files = e.target.files?.[0];

    if (files) {
      if (files.size > MAX_FILE_SIZE_2MB) {
        showToast("Gagal unggah gambar, ukuran file maksimal 2 MB", "error");
        setFileNameStakeholder(null);
        return;
      }
      setErrorUploadStakeholder(null);
      setFileNameStakeholder(files.name);

      const reader = new FileReader();

      reader.readAsDataURL(files);
      reader.onload = () => {
        const res = reader.result as string;
        setState((prevState) => ({
          ...prevState,
          lists: prevState.lists.map((item, idx) =>
            idx === key ? { ...item, file: res, filename: files.name } : item
          ),
        }));
      };

      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {mode !== "edit" ? (
          <Fragment>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600}>Informasi</Typography>
                <Box>
                  <AddButton
                    title="Tambah Informasi"
                    small
                    noMargin
                    onclick={add}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack gap={2}>
                {/* ITEM DAMPAK */}
                {items.map((tags: any, key: any) => (
                  <Paper
                    key={`${tags.id}`}
                    variant="outlined"
                    elevation={0}
                    sx={{ p: 2, minWidth: "0 !important" }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <Stack justifyContent="space-between" direction="row">
                            <Typography fontWeight={600}>
                              Informasi #{key + 1}
                            </Typography>
                            {key > 0 && (
                              <AddButton
                                small
                                errorColor
                                title="Hapus"
                                noMargin
                                onclick={() => minus(tags.id)}
                              />
                            )}
                          </Stack>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Informasi" />
                          {mode == "add" ? (
                            <Box
                              sx={{
                                ".ql-container": {
                                  minHeight: "0 !important",
                                },
                                ".ql-editor": {
                                  height: "100px !important",
                                  minHeight: "100px",
                                },
                              }}
                            >
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={state.lists[key]?.value}
                                onChange={(e) =>
                                  handleChangeEditor(e.target.value, key)
                                }
                              />

                              {/* <ReactQuill
                                key={state.lists[key].value}
                                theme="snow"
                                defaultValue={state.lists[key].value}
                                // value={state.lists[key]?.value ?? ""}
                                onKeyUp={(val) => handleChangeEditor(val, key)}
                                forwardedRef={quillRef}
                              /> */}
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                ".ql-container": {
                                  minHeight: "0 !important",
                                },
                                ".ql-editor": {
                                  height: "100px !important",
                                  minHeight: "100px",
                                },
                              }}
                            >
                              <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={state.lists[key]?.value}
                                onChange={(e) =>
                                  handleChangeEditor(e.target.value, key)
                                }
                              />

                              {/* <ReactQuill
                                key={state.lists[key].value}
                                theme="snow"
                                defaultValue={state.lists[key].value}
                                // value={state.lists[key]?.value ?? ""}
                                onKeyUp={(val) => handleChangeEditor(val, key)}
                                forwardedRef={quillRef}
                              /> */}
                            </Box>
                          )}
                        </FormControl>
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Jenis Bukti Dukung" />
                          <RadioGroup row>
                            <FormControlLabel
                              value="pdf"
                              control={<Radio />}
                              label="PDF"
                            />
                            <FormControlLabel
                              value="image"
                              control={<Radio />}
                              label="Gambar"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid> */}
                      <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Unggah Bukti Dukung" />
                          <Button
                            fullWidth
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<Iconify name="mdi:upload" size={14} />}
                          >
                            Upload files
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(event) =>
                                handleUnggahBuktiDukung(event, key)
                              }
                              // multiple
                            />
                          </Button>
                          {fileNameStakeholder && (
                            <Typography color={green[700]} fontSize={14} mt={1}>
                              Berhasil unggah gambar: {fileNameStakeholder}
                            </Typography>
                          )}
                          {errorUploadStakeholder && (
                            <Typography color="error">
                              {errorUploadStakeholder}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Fragment>
        ) : (
          <Fragment>
            <Grid item xs={12}>
              <Stack gap={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Informasi" />
                      <Box
                        sx={{
                          ".ql-container": {
                            minHeight: "0 !important",
                          },
                          ".ql-editor": {
                            height: "100px !important",
                            minHeight: "100px",
                          },
                        }}
                      >
                        <ReactQuill
                          key={request.value}
                          theme="snow"
                          defaultValue={request.value}
                          forwardedRef={quillRef}
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Jenis Bukti Dukung" />
                      <RadioGroup row>
                        <FormControlLabel
                          value="pdf"
                          control={<Radio />}
                          label="PDF"
                        />
                        <FormControlLabel
                          value="image"
                          control={<Radio />}
                          label="Gambar"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Unggah Bukti Dukung" />
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<Iconify name="mdi:upload" size={14} />}
                      >
                        Upload files
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(event) => console.log(event.target.files)}
                          multiple
                        />
                      </Button>
                      {fileNameStakeholder && (
                        <Typography color={green[700]} fontSize={14} mt={1}>
                          Berhasil unggah gambar: {fileNameStakeholder}
                        </Typography>
                      )}
                      {errorUploadStakeholder && (
                        <Typography color="error">
                          {errorUploadStakeholder}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Fragment>
        )}
      </Grid>
      <DialogComponent
        width={500}
        dialogOpen={modalOpenAdd}
        dialogClose={() => setModalOpenAdd(false)}
        title="Tambah Kategori"
        dialogFooter={dialogActionFooter}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Kategori"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogComponent>
    </Fragment>
  );
}
