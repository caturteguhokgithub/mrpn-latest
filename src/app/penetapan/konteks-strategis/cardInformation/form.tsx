import React, { Fragment } from "react";
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
import TextareaComponent from "@/components/textarea";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import Iconify from "@/components/icons/iconify";
import DialogComponent from "@/components/dialog";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import { VisuallyHiddenInput } from "@/utils/constant";

const ItemDampak = ({
  children,
  number,
}: {
  children: React.ReactNode;
  number: number;
}) => {
  return (
    <FormControl fullWidth sx={{ position: "relative" }}>
      {children}
      <Box
        position="absolute"
        top="8px"
        right="8px"
        bgcolor="black"
        color="white"
        borderRadius="50%"
        width="20px"
        height="20px"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        fontSize={12}
      >
        {number}
      </Box>
    </FormControl>
  );
};

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function FormInformation({
  mode,
  handleOpenCategory,
}: {
  mode?: string;
  handleOpenCategory?: any;
}) {
  const { request } = useCardSegmentVM();

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

  return (
    <Fragment>
      <Grid container spacing={2}>
        {mode !== "edit" && (
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
                              <ReactQuill
                                key={request.value}
                                theme="snow"
                                defaultValue={request.value}
                                forwardedRef={quillRef}
                              />
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
                              <ReactQuill
                                key={request.value}
                                theme="snow"
                                defaultValue={request.value}
                                forwardedRef={quillRef}
                              />
                            </Box>
                          )}
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
                              onChange={(event) =>
                                console.log(event.target.files)
                              }
                              multiple
                            />
                          </Button>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
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
