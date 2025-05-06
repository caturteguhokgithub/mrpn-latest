import React, { Fragment, SetStateAction } from "react";
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
import TextareaComponent, { TextareaStyled } from "@/app/components/textarea";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import Iconify from "@/app/components/icons/iconify";
import DialogComponent from "@/app/components/dialog";
import useCategoryList from "./hooks/useCategory";
import {
  ResultCategory,
  SubKategoriRisiko,
  doMasterKategori,
  doRequestCategoryDto,
  doSubCategory,
} from "./hooks/categoryModel";

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
  state,
  stateCategory,
  setState,
  listMasterCategory,
  stateSubCat,
  setStateSubCat,
}: {
  mode?: string;
  handleOpenCategory?: any;
  state?: doRequestCategoryDto;
  setState?: (value: SetStateAction<doRequestCategoryDto>) => void;
  listMasterCategory: doMasterKategori[];
  stateCategory?: doMasterKategori;
  stateSubCat?: SubKategoriRisiko;
  setStateSubCat?: (value: SetStateAction<SubKategoriRisiko>) => void;
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

  const handleSubChange = (
    index: number,
    field: keyof doSubCategory,
    value: string
  ) => {
    if (setState) {
      setState((prevState) => {
        const updatedSub = [...prevState.sub];
        updatedSub[index] = { ...updatedSub[index], [field]: value };
        return { ...prevState, sub: updatedSub };
      });
    }
  };

  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);

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
        {mode == "edit" && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Kategori" titleField />
              <Typography>
                {stateCategory?.value ?? "Kategori tidak ditemukan"}
              </Typography>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title={mode == "edit" ? "Subkategori" : "Kategori"}
              titleField
            />
            {mode == "edit" || mode == "add-category" ? (
              <TextField
                fullWidth
                value={stateSubCat?.value}
                variant="outlined"
                size="small"
                placeholder={mode == "edit" ? "Subkategori" : "Kategori"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setStateSubCat &&
                  setStateSubCat((prevState) => ({
                    ...prevState,
                    value: e.target.value,
                  }))
                }
              />
            ) : (
              <AutocompleteSelectSingle<doMasterKategori>
                // value={state.src_kategori_id}
                value={listMasterCategory.find(
                  (category) => category.id === state?.src_kategori_id
                )}
                options={listMasterCategory}
                getOptionLabel={(option) => option.value}
                // handleChange={(newValue: any) => {
                //   console.log(newValue);
                // }}
                handleChange={(newValue: doMasterKategori) =>
                  setState
                    ? setState((prevState) => ({
                        ...prevState,
                        src_kategori_id: newValue.id,
                      }))
                    : ""
                }
                placeHolder={"Pilih kategori"}
                // actionButton={
                //   <Button
                //     fullWidth
                //     variant="outlined"
                //     color="primary"
                //     startIcon={<Iconify name="mdi:plus-circle" />}
                //     onMouseDown={() => setModalOpenAdd(true)}
                //   >
                //     Tambah Kategori
                //   </Button>
                // }
              />
            )}
          </FormControl>
        </Grid>
        {/* <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Uraian" titleField />
            <TextareaStyled
              minRows={2}
              aria-label="Uraian"
              placeholder="Uraian"
              value={state.desc}
              onChange={(e) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    desc: e.target.value,
                  };
                })
              }
              // value={
              //   mode == "edit"
              //     ? "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts."
              //     : ""
              // }
            />
          </FormControl>
        </Grid> */}

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
              <Grid container spacing={2}>
                {/* ITEM DAMPAK */}
                {items.map((tags: any, key: any) => (
                  <Grid item xs={key === 0 ? 12 : 6} key={`${tags.id}`}>
                    <Paper
                      variant="outlined"
                      elevation={0}
                      sx={{ p: 2, minWidth: "0 !important" }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <Stack
                              justifyContent="space-between"
                              direction="row"
                            >
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
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <TextareaStyled
                              // width="100%"
                              minRows={2}
                              aria-label=""
                              placeholder="Sub Kategori"
                              onChange={(e) =>
                                handleSubChange(key, "value", e.target.value)
                              }
                            />
                          </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                        <TextareaStyled
                          // width="100%"
                          minRows={2}
                          aria-label=""
                          placeholder="Uraian"
                          onChange={(e) =>
                            handleSubChange(key, "desc", e.target.value)
                          }
                        />
                      </Grid> */}
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Fragment>
          // ) : (
          //   <Grid item xs={12}>
          //     <FormControl fullWidth>
          //       <FieldLabelInfo title="Uraian" titleField />
          //       <TextareaStyled
          //         minRows={2}
          //         aria-label=""
          //         placeholder="Sub Kategori"
          //         value={stateSubCat?.desc}
          //         onChange={(e) =>
          //           setStateSubCat &&
          //           setStateSubCat((prevState) => ({
          //             ...prevState,
          //             desc: e.target.value,
          //           }))
          //         }
          //         // onChange={(e) => handleSubChange(key, "value", e.target.value)}
          //       />
          //     </FormControl>
          //   </Grid>
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
