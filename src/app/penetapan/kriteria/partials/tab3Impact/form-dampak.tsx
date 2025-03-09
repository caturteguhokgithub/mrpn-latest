import React, { Fragment } from "react";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import AddButton from "@/app/components/buttonAdd";
import TextareaComponent from "@/app/components/textarea";
import { IconFA } from "@/app/components/icons/icon-fa";
import { red } from "@mui/material/colors";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import Iconify from "@/app/components/icons/iconify";
import DialogComponent from "@/app/components/dialog";

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

export default function FormDampak({ mode }: { mode?: string }) {
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

  const listAreaDampak = [
    "Keuangan Negara",
    "Reputasi",
    "Layanan Publik",
    "Capaian Kinerja",
  ];

  const [value, setValue] = React.useState(null);

  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

  const handleChangeSelect = (newValue: any) => {
    setValue(newValue);
  };

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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Area Dampak" titleField />
            {mode == "edit" ? (
              <Typography>Keuangan Negara</Typography>
            ) : (
              <Fragment>
                {mode == "edit-area" ? (
                  <TextField
                    fullWidth
                    value="Keuangan Negara"
                    variant="outlined"
                    size="small"
                    placeholder="Area Dampak"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                ) : (
                  <AutocompleteSelectSingle
                    value={value}
                    options={listAreaDampak.map((option) => option)}
                    getOptionLabel={(option) => `${option}`}
                    handleChange={(newValue: any) =>
                      handleChangeSelect(newValue)
                    }
                    placeHolder={"Pilih area dampak"}
                    actionButton={
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify name="mdi:plus-circle" />}
                        onMouseDown={() => setModalOpenAdd(true)}
                      >
                        Tambah Area Dampak
                      </Button>
                    }
                  />
                )}
              </Fragment>
            )}
          </FormControl>
        </Grid>
        {mode !== "edit-area" && (
          <Fragment>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600}>Dampak</Typography>
                {mode !== "edit" && (
                  <Box>
                    <AddButton
                      title="Tambah Dampak"
                      small
                      noMargin
                      onclick={add}
                    />
                  </Box>
                )}
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
                              Dampak #{key + 1}
                            </Typography>
                            {key > 0 && (
                              <AddButton
                                errorColor
                                title="Hapus"
                                noMargin
                                onclick={() => minus(tags.id)}
                              />
                            )}
                          </Stack>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <TextareaComponent
                            row={2}
                            label="Dampak"
                            placeholder="Dampak"
                            value={
                              mode == "edit"
                                ? "Jumlah keluhan atau prosentase berita negatif dari total berita tentang Obyek MRPN LS"
                                : ""
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={1}>
                          <TextareaComponent
                            row={2}
                            label="Tidak Signifikan"
                            placeholder="Tidak Signifikan"
                            value={
                              mode == "edit" ? "Jumlah Keluhan x ≤ 10" : ""
                            }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={2}>
                          <TextareaComponent
                            row={2}
                            label="Minor"
                            placeholder="Minor"
                            value={
                              mode == "edit"
                                ? "Prosentase pemberitaan negatif 10% < x ≤ 20%"
                                : ""
                            }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={3}>
                          <TextareaComponent
                            row={2}
                            label="Moderat"
                            placeholder="Moderat"
                            value={
                              mode == "edit"
                                ? "Prosentase pemberitaan negatif 20% < x ≤ 30%"
                                : ""
                            }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={4}>
                          <TextareaComponent
                            width="100%"
                            row={2}
                            label="Signifikan"
                            placeholder="Signifikan"
                            value={
                              mode == "edit"
                                ? "Prosentase pemberitaan negatif 30% < x ≤ 40%"
                                : ""
                            }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={5}>
                          <TextareaComponent
                            width="100%"
                            row={2}
                            label="Sangat Signifikan"
                            placeholder="Sangat Signifikan"
                            value={
                              mode == "edit"
                                ? "Prosentase pemberitaan negatif > 40%"
                                : ""
                            }
                          />
                        </ItemDampak>
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
        title="Tambah Area Dampak"
        dialogFooter={dialogActionFooter}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Area Dampak"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogComponent>
    </Fragment>
  );
}
