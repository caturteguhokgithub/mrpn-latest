import React, { SetStateAction, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { green, orange, red } from "@mui/material/colors";
import theme from "@/theme";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import { ExsumCriticalState } from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MiscMasterListKategoriProyekRes } from "@/app/misc/master/masterServiceModel";
import { GetColor } from "@/utils/color";
import { IconFA } from "@/app/components/icons/icon-fa";
import AddButton from "@/app/components/buttonAdd";
import SelectCustomTheme from "@/app/components/select";

const monthList = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function FormCritical({
  optionsRO,
  optionsStrategy,
  optionProjectCategory,
  state,
  setState,
}: {
  optionsRO: RoDto[];
  optionsStrategy: string[];
  optionProjectCategory: MiscMasterListKategoriProyekRes[];
  state: ExsumCriticalState;
  setState: (value: SetStateAction<ExsumCriticalState>) => void;
}) {
  const [valueSelect, setValueSelect] = React.useState("");
  const [itemMenu, setItemMenu] = React.useState([{ id: 1 }]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setValueSelect(event.target.value);
  };

  const addMenu = () => {
    let arr = [...itemMenu];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItemMenu(newItem);
  };

  const minusMenu = (nowId: any) => {
    let arr = [...itemMenu];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItemMenu(newArr);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Rincian Output/Project" />
          <AutocompleteSelectSingle
            key={state.ro?.id ?? 0}
            value={state.ro}
            options={optionsRO}
            getOptionLabel={(option) => option.value}
            handleChange={(val: RoDto) =>
              setState((prev) => {
                return {
                  ...prev,
                  ro: val,
                };
              })
            }
            placeHolder={"Pilih rincian output/project"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tagging Strategi" />
          <AutocompleteSelectMultiple
            value={state.strategy}
            options={optionsStrategy}
            handleChange={(val: string[]) =>
              setState((prev) => {
                return {
                  ...prev,
                  strategy: val,
                };
              })
            }
            placeHolder={"Pilih tagging strategi"}
            getOptionLabel={(option: string) => option}
            labelSelectAll={"Pilih semua tagging"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Status" />
          <ToggleButtonGroup
            color="primary"
            value={state.keterangan_kegiatan}
            exclusive
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newAlignment: string
            ) => {
              setState((prevState) => {
                return {
                  ...prevState,
                  keterangan_kegiatan: newAlignment,
                };
              });
            }}
          >
            <ToggleButton
              value="Start to Start"
              sx={{
                width: "50%",
                lineHeight: 1,
                "&.Mui-selected": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              Start to Start
            </ToggleButton>
            <ToggleButton
              value="Finish to Start"
              sx={{
                width: "50%",
                lineHeight: 1,
                "&.Mui-selected": {
                  bgcolor: red[700],
                  color: "white",
                },
              }}
            >
              Finish to Start
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
      {state.keterangan_kegiatan === "Finish to Start" && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={500}>Sub Kegiatan</Typography>
                  <AddButton
                    small
                    title="Tambah Sub Kegiatan"
                    noMargin
                    onclick={() => addMenu()}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack>
              {itemMenu.map((tags: any, index) => (
                <Paper
                  key={`${tags.id}`}
                  variant="outlined"
                  sx={{ mt: 1, p: 2, minWidth: "0 !important" }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography>Sub Kegiatan #1</Typography>
                        <AddButton
                          small
                          errorColor
                          noMargin
                          onclick={() => minusMenu(tags.id)}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder="Kegiatan"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          size="small"
                          placeholder="Target/Progress"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <SelectCustomTheme
                          small
                          defaultStyle
                          value={valueSelect}
                          onChange={handleChangeSelect}
                        >
                          <MenuItem value="" disabled>
                            <Typography fontSize={14} fontStyle="italic">
                              Pilih Bulan
                            </Typography>
                          </MenuItem>
                          {monthList.map((monthItem, index) => (
                            <MenuItem key={index} value={monthItem}>
                              <Typography fontSize={14}>{monthItem}</Typography>
                            </MenuItem>
                          ))}
                        </SelectCustomTheme>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </>
      )}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <Typography fontWeight={600}>
            {state.ro ? state.ro.kementrian.value : "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sumber Anggaran" />
          <Typography fontWeight={600}>
            {state.ro
              ? state.ro.sumber_anggaran == null
                ? "-"
                : state.ro.sumber_anggaran
              : "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item lg={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Waktu Mulai Pengerjaan" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                ".MuiInputBase-root": {
                  height: 40,
                },
              }}
              format="D MMM YYYY"
              value={dayjs(state.start_date)}
              onChange={(e: any) =>
                setState((prev) => {
                  return { ...prev, start_date: dayjs(e).format("YYYY-MM-DD") };
                })
              }
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item lg={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Waktu Selesai Pengerjaan" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                ".MuiInputBase-root": {
                  height: 40,
                },
              }}
              format="D MMM YYYY"
              value={dayjs(state.end_date)}
              onChange={(e: any) =>
                setState((prev) => {
                  return { ...prev, end_date: dayjs(e).format("YYYY-MM-DD") };
                })
              }
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Kategori Proyek" />
          <ToggleButtonGroup
            value={state.kategori_proyek_id}
            exclusive
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newAlignment: number
            ) => {
              setState((prev) => {
                return {
                  ...prev,
                  kategori_proyek_id: newAlignment,
                };
              });
            }}
            aria-label="time"
          >
            {optionProjectCategory.map((row, index) => (
              <ToggleButton
                key={index}
                value={row.id}
                sx={{
                  lineHeight: 1,
                  "&.Mui-selected": {
                    bgcolor: GetColor(row.id),
                    color: "white",
                  },
                }}
              >
                {row.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
