import React, { Fragment } from "react";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import AddButton from "@/app/components/buttonAdd";
import TextareaComponent from "@/app/components/textarea";
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

export default function FormCategory({
  mode,
  handleOpenCategory,
}: {
  mode?: string;
  handleOpenCategory?: any;
}) {
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

  const listCategory = ["Ekonomi", "Geopolitik", "Teknologi"];

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
            <FieldLabelInfo title="Kategori" titleField />
            {mode == "edit" || mode == "add-category" ? (
              <TextField
                fullWidth
                value="Ekonomi"
                variant="outlined"
                size="small"
                placeholder="Kategori"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <AutocompleteSelectSingle
                value={value}
                options={listCategory.map((option) => option)}
                getOptionLabel={(option) => `${option}`}
                handleChange={(newValue: any) => handleChangeSelect(newValue)}
                placeHolder={"Pilih kategori"}
                actionButton={
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<Iconify name="mdi:plus-circle" />}
                    onMouseDown={() => setModalOpenAdd(true)}
                  >
                    Tambah Kategori
                  </Button>
                }
              />
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Uraian" titleField />
            <TextareaComponent
              row={2}
              label="Uraian"
              placeholder="Uraian"
              value={
                mode == "edit"
                  ? "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts."
                  : ""
              }
            />
          </FormControl>
        </Grid>
        {mode !== "edit" && (
          <Fragment>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600}>Sub Kategori</Typography>
                <Box>
                  <AddButton
                    title="Tambah Sub Kategori"
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
                              Sub Kategori #{key + 1}
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
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <TextareaComponent
                            width="100%"
                            row={2}
                            label=""
                            placeholder="Sub Kategori"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextareaComponent
                          width="100%"
                          row={2}
                          label=""
                          placeholder="Uraian"
                        />
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
