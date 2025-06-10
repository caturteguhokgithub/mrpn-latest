import React, { Fragment, SetStateAction } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import AddButton from "@/app/components/buttonAdd";
import { TextareaStyled } from "@/app/components/textarea";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import Iconify from "@/app/components/icons/iconify";
import {
  SubKategoriRisiko,
  doMasterKategori,
  doRequestCategoryDto,
  doSubCategory,
} from "./hooks/categoryModel";
import type ReactQuill from "react-quill";

export default function FormCategory({
  mode,
  handleOpenCategory,
  cat,
  state,
  stateCategory,
  setState,
  listMasterCategory,
  stateSubCat,
  setStateSubCat,
  setModalOpenAddMasterCategory,
}: {
  mode?: string;
  handleOpenCategory?: any;
  cat?: string;
  state?: doRequestCategoryDto;
  setState?: (value: SetStateAction<doRequestCategoryDto>) => void;
  listMasterCategory: doMasterKategori[];
  stateCategory?: doMasterKategori;
  stateSubCat?: SubKategoriRisiko;
  setStateSubCat?: (value: SetStateAction<SubKategoriRisiko>) => void;
  setModalOpenAddMasterCategory?: any;
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

  console.log({ state });

  return (
    <Fragment>
      <Grid container spacing={2}>
        {mode == "edit" && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Kategori" titleField />
              <Typography>{cat}</Typography>
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
                value={listMasterCategory.find(
                  (category) => category.id === state?.src_kategori_id
                )}
                options={listMasterCategory}
                getOptionLabel={(option) => option.value}
                handleChange={(newValue: doMasterKategori) =>
                  setState
                    ? setState((prevState) => ({
                        ...prevState,
                        src_kategori_id: newValue.id,
                      }))
                    : ""
                }
                placeHolder={"Pilih kategori"}
                actionButton={
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<Iconify name="mdi:plus-circle" />}
                    onMouseDown={() => setModalOpenAddMasterCategory(true)}
                  >
                    Tambah Kategori
                  </Button>
                }
              />
            )}
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
                              minRows={2}
                              aria-label=""
                              placeholder="Sub Kategori"
                              onChange={(e) =>
                                handleSubChange(key, "value", e.target.value)
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
}
