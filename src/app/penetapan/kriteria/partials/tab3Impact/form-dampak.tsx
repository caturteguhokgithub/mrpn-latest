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
  ReqAddMatDamKomite,
  ReqAddMatDamUpr,
  ValuesShowMatDamKomite,
} from "./hooks/model";

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

export default function FormDampak({
  mode,
  optionAD,
  setModalOpenAddKomite,
  stateKom,
  setStateKom,
  stateUpr,
  setStateUpr,
}: {
  mode?: string;
  optionAD?: ValuesShowMatDamKomite[];
  setModalOpenAddKomite?: any;
  stateKom?: ReqAddMatDamKomite;
  setStateKom?: (value: SetStateAction<ReqAddMatDamKomite>) => void;
  stateUpr?: ReqAddMatDamUpr;
  setStateUpr?: (value: SetStateAction<ReqAddMatDamUpr>) => void;
}) {
  const [items, setItem] = React.useState([{ id: 0 }]);
  const add = () => {
    let arr = [...items];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItem(newItem);

    if (setStateUpr) {
      setStateUpr((prev) => ({
        ...prev,
        lists: [...(prev?.lists || []), { id: 0, value: "", area: [] }],
      }));
    }
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

  const handleChangeAD = async (id: number) => {
    // console.log(id);
    setStateUpr &&
      setStateUpr((prevState) => ({
        ...prevState,
        matrix_id: id,
      }));
  };

  const handleSubChange = (index: number, value: string) => {
    if (setStateUpr) {
      setStateUpr((prevState) => {
        const updatedLists = [...prevState.lists];
        updatedLists[index] = {
          ...updatedLists[index],
          value, // hanya ubah value dampak
        };
        return {
          ...prevState,
          lists: updatedLists,
        };
      });
    }
  };

  const handleAreaChange = (
    listIndex: number,
    level: number,
    value: string
  ) => {
    if (setStateUpr) {
      setStateUpr((prevState) => {
        const updatedLists = [...prevState.lists];
        const list = updatedLists[listIndex] || {};
        const updatedArea = [...(list.area || [])];

        const existingAreaIndex = updatedArea.findIndex(
          (a) => a.level == level
        );

        if (existingAreaIndex !== -1) {
          updatedArea[existingAreaIndex] = {
            ...updatedArea[existingAreaIndex],
            value,
          };
        } else {
          updatedArea.push({ id: 0, level, value });
        }

        updatedLists[listIndex] = {
          ...list,
          area: updatedArea,
        };

        return {
          ...prevState,
          lists: updatedLists,
        };
      });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Area Dampak" titleField />
            {mode == "edit" ? (
              <Typography>{stateKom?.dampak ?? "-"}</Typography>
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
                    value={optionAD?.find(
                      (option) => option.id === stateUpr?.matrix_id
                    )}
                    // value={value}
                    options={optionAD ?? []}
                    getOptionLabel={(option) => `${option.dampak}`}
                    handleChange={
                      (newValue: ValuesShowMatDamKomite) =>
                        handleChangeAD(newValue.id)
                      // setStateKom
                      //   ? setStateKom((prevState) => ({
                      //     ...prevState,
                      //     dampak: newValue,
                      //   }))
                      //   : ""
                    }
                    // handleChange={(newValue: any) =>
                    //   handleChangeSelect(newValue)
                    // }
                    placeHolder={"Pilih area dampak"}
                    actionButton={
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify name="mdi:plus-circle" />}
                        onMouseDown={() => setModalOpenAddKomite(true)}
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
                          <TextareaStyled
                            minRows={2}
                            aria-label="Dampak"
                            placeholder="Dampak"
                            value={stateUpr?.lists[key]?.value || ""}
                            onChange={(e) =>
                              handleSubChange(key, e.target.value)
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={1}>
                          <TextareaStyled
                            minRows={2}
                            aria-label="Tidak Signifikan"
                            placeholder="Level Dampak (Tidak Signifikan)"
                            value={
                              stateUpr?.lists[key]?.area?.find(
                                (a) => a.level == 1
                              )?.value || ""
                            }
                            onChange={(e) =>
                              handleAreaChange(key, 1, e.target.value)
                            }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={2}>
                          <TextareaStyled
                            minRows={2}
                            aria-label="Kurang Signifikan"
                            placeholder="Level Dampak (Kurang Signifikan)"
                            value={
                              stateUpr?.lists[key]?.area?.find(
                                (a) => a.level == 2
                              )?.value || ""
                            }
                            onChange={(e) =>
                              handleAreaChange(key, 2, e.target.value)
                            }
                            // value={
                            //   mode == "edit"
                            //     ? "Prosentase pemberitaan negatif 10% < x ≤ 20%"
                            //     : undefined
                            // }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={3}>
                          <TextareaStyled
                            minRows={2}
                            aria-label="Cukup Signifikan"
                            placeholder="Level Dampak (Cukup Signifikan)"
                            value={
                              stateUpr?.lists[key]?.area?.find(
                                (a) => a.level == 3
                              )?.value || ""
                            }
                            onChange={(e) =>
                              handleAreaChange(key, 3, e.target.value)
                            }
                            // value={
                            //   mode == "edit"
                            //     ? "Prosentase pemberitaan negatif 20% < x ≤ 30%"
                            //     : undefined
                            // }
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={4}>
                          <TextareaStyled
                            minRows={2}
                            aria-label="Signifikan"
                            placeholder="Level Dampak (Signifikan)"
                            value={
                              stateUpr?.lists[key]?.area?.find(
                                (a) => a.level == 4
                              )?.value || ""
                            }
                            onChange={(e) =>
                              handleAreaChange(key, 4, e.target.value)
                            }
                            // value={
                            //   mode == "edit"
                            //   ? "Prosentase pemberitaan negatif 30% < x ≤ 40%"
                            //   : undefined
                            // }
                            // width="100%"
                          />
                        </ItemDampak>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <ItemDampak number={5}>
                          <TextareaStyled
                            minRows={2}
                            aria-label="Sangat Signifikan"
                            placeholder="Level Dampak (Sangat Signifikan)"
                            value={
                              stateUpr?.lists[key]?.area?.find(
                                (a) => a.level == 5
                              )?.value || ""
                            }
                            onChange={(e) =>
                              handleAreaChange(key, 5, e.target.value)
                            }
                            // value={
                            //   mode == "edit"
                            //   ? "Prosentase pemberitaan negatif > 40%"
                            //   : undefined
                            // }
                            // width="100%"
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
    </Fragment>
  );
}
