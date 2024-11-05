import React, {SetStateAction, useState} from "react";
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
import {green, orange, red} from "@mui/material/colors";
import theme from "@/theme";
import {RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import {
  ExsumCriticalData,
  ExsumCriticalState, KegiatanDto,
  TargetDto
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {MiscMasterListKategoriProyekRes} from "@/app/misc/master/masterServiceModel";
import {GetColor} from "@/utils/color";
import {IconFA} from "@/app/components/icons/icon-fa";
import AddButton from "@/app/components/buttonAdd";
import SelectCustomTheme from "@/app/components/select";
import {useRKPContext} from "@/lib/core/hooks/useHooks";

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
                                       dataExisting,
                                       optionsRO,
                                       optionsStrategy,
                                       optionProjectCategory,
                                       state,
                                       setState,
                                     }: {
  dataExisting: ExsumCriticalData[];
  optionsRO: RoDto[];
  optionsStrategy: string[];
  optionProjectCategory: MiscMasterListKategoriProyekRes[];
  state: ExsumCriticalState;
  setState: (value: SetStateAction<ExsumCriticalState>) => void;
}) {

  const {year} = useRKPContext(store => store)

  const addMenu = () => {
    setState(prevState => {

      const newKegiatan: KegiatanDto = {
        id: 0,
        value: "",
        start_date: "",
        end_date: "",
        target: [
          {
            target: "",
            bulan: 1
          }
        ]
      }

      let kegiatan = prevState.kegiatan
      kegiatan.push(newKegiatan)

      return {
        ...prevState,
        kegiatan: kegiatan
      }

    })
  };

  const minusMenu = (index: number) => {
    setState(prevState => {

      const kegiatan = prevState.kegiatan
      kegiatan.splice(index, 1)

      return {
        ...prevState,
        kegiatan: kegiatan
      }

    })
  };

  const addMenuTarget = (iKegiatan: number) => {
    setState(prevState => {

      let newData: TargetDto = {
        target: "",
        bulan: 1
      }
      const kegiatan = prevState.kegiatan
      kegiatan[iKegiatan].target.push(newData)

      return {
        ...prevState,
        kegiatan: kegiatan
      }

    })
  }

  const minusMenuTarget = (iKegiatan: number, iTarget: number) => {
    setState(prevState => {

      const kegiatan = prevState.kegiatan
      kegiatan[iKegiatan].target.splice(iTarget, 1)

      return {
        ...prevState,
        kegiatan: kegiatan
      }

    })
  }

  return (
    <Grid container spacing={2}>

      {/*{state.keterangan_kegiatan === "Finish to Start" && (*/}
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Pilih RO/project yang berkaitan (kosongkan jika tidak ada)"/>
              <AutocompleteSelectSingle
                key={state.dependency?.ro?.value ?? "dependencies-ro"}
                value={state.dependency}
                options={dataExisting}
                getOptionLabel={(option) => option.ro?.value ?? ''}
                handleChange={(val: ExsumCriticalData) =>
                  setState((prev) => {
                    return {
                      ...prev,
                      dependency: val,
                    };
                  })
                }
                placeHolder={"Pilih rincian output/project"}
              />
            </FormControl>
          </Grid>
          {state.dependency &&
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FieldLabelInfo title="Waktu Mulai"/>
                  <Typography fontWeight={600}>
                    {dayjs(state.dependency.start_date).format("D MMM YYYY")}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FieldLabelInfo title="Waktu Selesai"/>
                  <Typography fontWeight={600}>
                    {dayjs(state.dependency.end_date).format("D MMM YYYY")}
                  </Typography>
                </FormControl>
              </Grid>
            </>
          }
          <Grid item xs={12}>
            <Divider/>
          </Grid>
        </>
      {/*)}*/}

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Status"/>
          <ToggleButtonGroup
            color="primary"
            value={state.keterangan_kegiatan}
            exclusive
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newAlignment: string
            ) => {
              setState(prevState => {
                return {
                  ...prevState,
                  keterangan_kegiatan: newAlignment
                }
              })
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

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Rincian Output/Project"/>
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
          <FieldLabelInfo title="Tagging Strategi"/>
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

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab"/>
          <Typography fontWeight={600}>
            {state.ro ? state.ro.kementrian.value : "-"}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sumber Anggaran"/>
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
          <FieldLabelInfo title="Waktu Mulai Pengerjaan"/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                ".MuiInputBase-root": {
                  height: 40,
                },
              }}
              format="D MMM YYYY"
              minDate={year > 0 ? dayjs(`${year}-01-01`) : (state.dependency ? dayjs(state.dependency.end_date) : undefined)}
              maxDate={year > 0 ? dayjs(`${year}-12-31`) : undefined}
              value={dayjs(state.start_date)}
              onChange={(e: any) =>
                setState((prev) => {
                  return {...prev, start_date: dayjs(e).format("YYYY-MM-DD")};
                })
              }
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item lg={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Waktu Selesai Pengerjaan"/>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                ".MuiInputBase-root": {
                  height: 40,
                },
              }}
              format="D MMM YYYY"
              minDate={dayjs(state.start_date)}
              maxDate={year > 0 ? dayjs(`${year}-12-31`) : undefined}
              value={dayjs(state.end_date)}
              onChange={(e: any) =>
                setState((prev) => {
                  return {...prev, end_date: dayjs(e).format("YYYY-MM-DD")};
                })
              }
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Kategori Proyek"/>
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

      {year > 0 && (
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
              {state.kegiatan.map((tags: any, index) => (
                <Paper
                  key={`kegiatan-${tags.id}`}
                  variant="outlined"
                  sx={{mt: 1, p: 2, minWidth: "0 !important"}}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography>Sub Kegiatan #{(index+1)}</Typography>
                        <AddButton
                          small
                          errorColor
                          noMargin
                          onclick={() => minusMenu(index)}
                          title={""}
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
                          value={tags.value}
                          onChange={(e) => setState(prevState => {
                            const kegiatan = prevState.kegiatan
                            kegiatan[index].value = e.target.value
                            return {
                              ...prevState,
                              kegiatan: kegiatan
                            }
                          })}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <FormControl fullWidth>
                        <FieldLabelInfo title="Waktu Mulai Pengerjaan"/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              ".MuiInputBase-root": {
                                height: 40,
                              },
                            }}
                            minDate={dayjs(state.start_date)}
                            maxDate={dayjs(state.end_date)}
                            format="D MMM YYYY"
                            value={dayjs(tags.start_date)}
                            onChange={(e: any) =>
                              setState((prev) => {
                                const kegiatan = prev.kegiatan
                                kegiatan[index].start_date = dayjs(e).format("YYYY-MM-DD")
                                return {...prev, kegiatan: kegiatan};
                              })
                            }
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <FormControl fullWidth>
                        <FieldLabelInfo title="Waktu Selesai Pengerjaan"/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              ".MuiInputBase-root": {
                                height: 40,
                              },
                            }}
                            format="D MMM YYYY"
                            minDate={dayjs(tags.start_date)}
                            maxDate={dayjs(state.end_date)}
                            value={dayjs(tags.end_date)}
                            onChange={(e: any) =>
                              setState((prev) => {
                                const kegiatan = prev.kegiatan
                                kegiatan[index].end_date = dayjs(e).format("YYYY-MM-DD")
                                return {...prev, kegiatan: kegiatan};
                              })
                            }
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>

                  </Grid>

                  <Stack>
                    <Paper
                      key={`${tags.id}`}
                      variant="outlined"
                      sx={{mt: 1, p: 2, minWidth: "0 !important"}}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography fontWeight={500}>Target</Typography>
                            <AddButton
                              small
                              title="Tambah Target"
                              noMargin
                              onclick={() => addMenuTarget(index)}
                            />
                          </Stack>
                        </Grid>
                      </Grid>

                      {tags.target.map((target: TargetDto, iTarget: number) =>

                        <Grid container spacing={1} key={`target-${iTarget}`}>

                          <Grid marginY={1} item xs={12} md={6}>
                            <FormControl fullWidth>
                              <SelectCustomTheme
                                small
                                defaultStyle
                                value={target.bulan}
                                onChange={(e: any) =>
                                  setState((prev) => {
                                    const kegiatan = prev.kegiatan
                                    kegiatan[index].target[iTarget].bulan = e.target.value
                                    kegiatan[index].target.sort((a,b)=>a.bulan-b.bulan)
                                    return {...prev, kegiatan: kegiatan};
                                  })
                                }
                              >
                                <MenuItem value="" disabled>
                                  <Typography fontSize={14} fontStyle="italic">
                                    Pilih Bulan
                                  </Typography>
                                </MenuItem>
                                {monthList.map((monthItem, index) => (
                                  <MenuItem key={index} value={(index + 1)}>
                                    <Typography fontSize={14}>{monthItem}</Typography>
                                  </MenuItem>
                                ))}
                              </SelectCustomTheme>
                            </FormControl>
                          </Grid>

                          <Grid marginY={1} item xs={12} md={(iTarget > 0 ? 4 : 6)}>
                            <FormControl fullWidth>
                              <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Target"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">%</InputAdornment>
                                  ),
                                }}
                                value={target.target}
                                onChange={(e) =>
                                  setState((prev) => {
                                    const kegiatan = prev.kegiatan
                                    kegiatan[index].target[iTarget].target = e.target.value
                                    return {...prev, kegiatan: kegiatan};
                                  })
                                }
                              />
                            </FormControl>
                          </Grid>

                          {iTarget > 0 && (
                            <Grid marginY={1} item xs={12} md={2}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                                minHeight={"100%"}
                              >
                                <AddButton
                                  small
                                  errorColor
                                  noMargin
                                  onclick={() => minusMenuTarget(index, iTarget)}
                                  title={""}
                                />
                              </Stack>
                            </Grid>
                          )}

                        </Grid>
                      )}
                    </Paper>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
        </>
      )}

    </Grid>
  );
}
