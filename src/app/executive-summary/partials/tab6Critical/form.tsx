import React, { SetStateAction, useState } from "react";
import {
  alpha,
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
import { blue, green, orange, red } from "@mui/material/colors";
import theme from "@/theme";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import {
  ExsumCriticalData,
  ExsumCriticalState,
  KegiatanDto,
  TargetDto,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { MiscMasterListKategoriProyekRes } from "@/app/misc/master/masterServiceModel";
import { GetColor } from "@/utils/color";
import { IconFA } from "@/app/components/icons/icon-fa";
import AddButton from "@/app/components/buttonAdd";
import SelectCustomTheme from "@/app/components/select";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

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

const groupColor = [
  "#FFD1DC", // Pastel Pink
  "#B39EB5", // Pastel Purple
  "#FFFFBA", // Pastel Yellow
  "#98FB98", // Pale Green
  "#BAE1FF", // Pastel Blue
  "#C9BAFF", // Pastel Purple
  "#F0E68C", // Pastel Khaki
  "#FFDAB9", // Peach Puff
  "#A3C1AD", // Pastel Mint
  "#CAF0F8", // Pastel Light Blue
];

// [
//   "#FFB3BA", // Pastel Red
//   "#FFDFBA", // Pastel Orange
//   "#FFFFBA", // Pastel Yellow
//   "#98FB98", // Pale Green
//   "#BAE1FF", // Pastel Blue
//   "#C9BAFF", // Pastel Purple
//   "#FFCCCB", // Light Coral
//   "#F0E68C", // Pastel Khaki
//   "#FFDAB9", // Peach Puff
//   "#FFB6C1", // Light Pink
// ];

// [
//   "#A3C1AD", // Pastel Mint
//   "#FFD1DC", // Pastel Pink
//   "#C3B1E1", // Lavender (Pastel)
//   "#FFB347", // Pastel Orange
//   "#FFDFD3", // Light Peach
//   "#77DD77", // Pastel Green
//   "#AEC6CF", // Pastel Blue
//   "#FFB3BA", // Baby Pink
//   "#FFFFB3", // Light Yellow
//   "#B39EB5", // Pastel Purple
// ];

// [
//   "#007BA7", // Cerulean Blue
//   "#EF3038", // Deep Carmine Pink
//   "#8F00FF", // Electric Violet
//   "#32CD32", // Lime Green
//   "#FD5E53", // Sunset Orange
//   "#40E0D0", // Turquoise
//   "#9F1D35", // Vivid Burgundy
//   "#F8DE7E", // Mellow Yellow
//   "#8E4585", // Plum
//   "#7FFFD4", // Aquamarine
// ];

// [

//   "#795548",
//   "#ff9800",
//   "#ffeb3b",
//   "#8bc34a",
//   "#009688",
//   "#03a9f4",
//   "#673ab7",
//   "#e91e63",
//   "#f44336",
//   "#cddc39",
// ];

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
  const [alignment, setAlignment] = React.useState<string | null>("");
  const [formats, setFormats] = React.useState(() => [""]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const { year } = useRKPContext((store) => store);

  const addMenu = () => {
    setState((prevState) => {
      const newKegiatan: KegiatanDto = {
        id: 0,
        value: "",
        start_date: year + "-01-01",
        end_date: year + "-01-31",
        target: [
          {
            target: "",
            bulan: 1,
          },
        ],
      };

      let kegiatan = prevState.kegiatan;
      kegiatan.push(newKegiatan);

      return {
        ...prevState,
        kegiatan: kegiatan,
      };
    });
  };

  const minusMenu = (index: number) => {
    setState((prevState) => {
      const kegiatan = prevState.kegiatan;
      kegiatan.splice(index, 1);

      return {
        ...prevState,
        kegiatan: kegiatan,
      };
    });
  };

  const addMenuTarget = (iKegiatan: number) => {
    setState((prevState) => {
      const kegiatan = prevState.kegiatan;
      const target = kegiatan[iKegiatan].target;

      let curBulan = 0;
      monthList.map((m, index) => {
        target.map((t) => {
          if (index + 1 == t.bulan) {
            curBulan = t.bulan;
          }
        });
      });

      let newData: TargetDto = {
        target: "",
        bulan: curBulan + 1,
      };
      kegiatan[iKegiatan].target.push(newData);

      return {
        ...prevState,
        kegiatan: kegiatan,
      };
    });
  };

  const minusMenuTarget = (iKegiatan: number, iTarget: number) => {
    setState((prevState) => {
      const kegiatan = prevState.kegiatan;
      kegiatan[iKegiatan].target.splice(iTarget, 1);

      return {
        ...prevState,
        kegiatan: kegiatan,
      };
    });
  };

  const checkOptions = (
    target: TargetDto[],
    iTarget: number,
    value: number
  ) => {
    if (target[iTarget].bulan == value) {
      return false;
    }

    let existBulan = false;
    target.map((x) => {
      if (value == x.bulan) {
        existBulan = true;
      }
    });

    return existBulan;
  };

  const multiYears = ["2025", "2026", "2027", "2028", "2029"];

  return (
    <Grid container spacing={2}>
      {dataExisting.length > 0 && (
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Pilih RO/project yang berkaitan (kosongkan jika tidak ada)" />
              <AutocompleteSelectSingle
                key={state.dependency?.ro?.value ?? "dependencies-ro"}
                value={state.dependency}
                options={dataExisting}
                getOptionLabel={(option) => option.ro?.value ?? ""}
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

          {state.dependency && (
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FieldLabelInfo title="Waktu Mulai" />
                  <Typography fontWeight={600}>
                    {dayjs(state.dependency.start_date).format("D MMM YYYY")}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FieldLabelInfo title="Waktu Selesai" />
                  <Typography fontWeight={600}>
                    {dayjs(state.dependency.end_date).format("D MMM YYYY")}
                  </Typography>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </>
      )}

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
                color: blue[600],
                borderColor: blue[600],
                "&.Mui-selected": {
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                },
              }}
              disabled={dataExisting.length == 0}
            >
              Start to Start
            </ToggleButton>
            <ToggleButton
              value="Finish to Start"
              sx={{
                width: "50%",
                lineHeight: 1,
                color: blue[600],
                borderColor: blue[600],
                "&.Mui-selected": {
                  bgcolor: red[700],
                  color: "white",
                },
              }}
              disabled={dataExisting.length == 0}
            >
              Finish to Start
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Grid>

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
      {year == 0 ? (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Waktu Pengerjaan" />
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="years"
            >
              {multiYears.map((item) => (
                <ToggleButton
                  value={item}
                  aria-label={item}
                  sx={{
                    width: "20%",
                    color: blue[600],
                    borderColor: blue[600],
                    "&.Mui-selected": {
                      bgcolor: blue[600],
                      color: "white",
                    },
                  }}
                >
                  {item}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </FormControl>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={6}>
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
                  minDate={
                    year > 0
                      ? dayjs(`${year}-01-01`)
                      : state.dependency
                      ? dayjs(state.dependency.end_date)
                      : undefined
                  }
                  maxDate={year > 0 ? dayjs(`${year}-12-31`) : undefined}
                  value={dayjs(state.start_date)}
                  onChange={(e: any) =>
                    setState((prev) => {
                      return {
                        ...prev,
                        start_date: dayjs(e).format("YYYY-MM-DD"),
                      };
                    })
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
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
                  minDate={dayjs(state.start_date)}
                  maxDate={year > 0 ? dayjs(`${year}-12-31`) : undefined}
                  value={dayjs(state.end_date)}
                  onChange={(e: any) =>
                    setState((prev) => {
                      return {
                        ...prev,
                        end_date: dayjs(e).format("YYYY-MM-DD"),
                      };
                    })
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </>
      )}

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
                  color: blue[600],
                  borderColor: blue[600],
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Kelompok Warna" />
          <ToggleButtonGroup
            exclusive
            value={alignment}
            onChange={handleAlignment}
            aria-label="Grup Color"
          >
            {groupColor.map((color, i) => (
              <ToggleButton
                key={i}
                value={`color-${i}`}
                aria-label="color"
                sx={{
                  bgcolor: alpha(color, 0.3),
                  width: "20%",
                  p: 0,
                  minHeight: 50,
                  "& > div": {
                    "& > div": {
                      opacity: 0.4,
                    },
                  },
                  "&.Mui-selected": {
                    bgcolor: color,
                    "& > div": {
                      "& > div": {
                        opacity: 1,
                      },
                    },
                  },
                }}
              >
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    // position="absolute"
                    // top={4}
                    // left={4}
                    bgcolor="black"
                    color="white"
                    borderRadius="50%"
                    width={16}
                    height={16}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize={10}
                    lineHeight={1}
                  >
                    {i + 1}
                  </Box>
                </Box>
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
                  <Typography fontWeight={500}>Sub RO/Project Kunci</Typography>
                  <AddButton
                    small
                    title="Tambah Sub RO/Project Kunci"
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
                  sx={{ mt: 1, p: 2, minWidth: "0 !important" }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography>
                          Sub RO/Project Kunci #{index + 1}
                        </Typography>
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
                          placeholder="RO/Project Kunci"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={tags.value}
                          onChange={(e) =>
                            setState((prevState) => {
                              const kegiatan = prevState.kegiatan;
                              kegiatan[index].value = e.target.value;
                              return {
                                ...prevState,
                                kegiatan: kegiatan,
                              };
                            })
                          }
                        />
                      </FormControl>
                    </Grid>

                    {/*<Grid item lg={6}>*/}
                    {/*  <FormControl fullWidth>*/}
                    {/*    <FieldLabelInfo title="Waktu Mulai Pengerjaan"/>*/}
                    {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                    {/*      <DatePicker*/}
                    {/*        sx={{*/}
                    {/*          ".MuiInputBase-root": {*/}
                    {/*            height: 40,*/}
                    {/*          },*/}
                    {/*        }}*/}
                    {/*        minDate={dayjs(state.start_date)}*/}
                    {/*        maxDate={dayjs(state.end_date)}*/}
                    {/*        format="D MMM YYYY"*/}
                    {/*        value={dayjs(tags.start_date)}*/}
                    {/*        onChange={(e: any) =>*/}
                    {/*          setState((prev) => {*/}
                    {/*            const kegiatan = prev.kegiatan*/}
                    {/*            kegiatan[index].start_date = dayjs(e).format("YYYY-MM-DD")*/}
                    {/*            return {...prev, kegiatan: kegiatan};*/}
                    {/*          })*/}
                    {/*        }*/}
                    {/*      />*/}
                    {/*    </LocalizationProvider>*/}
                    {/*  </FormControl>*/}
                    {/*</Grid>*/}

                    {/*<Grid item lg={6}>*/}
                    {/*  <FormControl fullWidth>*/}
                    {/*    <FieldLabelInfo title="Waktu Selesai Pengerjaan"/>*/}
                    {/*    <LocalizationProvider dateAdapter={AdapterDayjs}>*/}
                    {/*      <DatePicker*/}
                    {/*        sx={{*/}
                    {/*          ".MuiInputBase-root": {*/}
                    {/*            height: 40,*/}
                    {/*          },*/}
                    {/*        }}*/}
                    {/*        format="D MMM YYYY"*/}
                    {/*        minDate={dayjs(tags.start_date)}*/}
                    {/*        maxDate={dayjs(state.end_date)}*/}
                    {/*        value={dayjs(tags.end_date)}*/}
                    {/*        onChange={(e: any) =>*/}
                    {/*          setState((prev) => {*/}
                    {/*            const kegiatan = prev.kegiatan*/}
                    {/*            kegiatan[index].end_date = dayjs(e).format("YYYY-MM-DD")*/}
                    {/*            return {...prev, kegiatan: kegiatan};*/}
                    {/*          })*/}
                    {/*        }*/}
                    {/*      />*/}
                    {/*    </LocalizationProvider>*/}
                    {/*  </FormControl>*/}
                    {/*</Grid>*/}
                  </Grid>

                  <Stack>
                    <Paper
                      key={`${tags.id}`}
                      variant="outlined"
                      sx={{ mt: 1, p: 2, minWidth: "0 !important" }}
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

                      {tags.target.map((target: TargetDto, iTarget: number) => (
                        <Grid container spacing={1} key={`target-${iTarget}`}>
                          <Grid marginY={1} item xs={12} md={6}>
                            <FormControl fullWidth>
                              <SelectCustomTheme
                                small
                                defaultStyle
                                value={target.bulan}
                                onChange={(e: any) =>
                                  setState((prev) => {
                                    const kegiatan = prev.kegiatan;
                                    kegiatan[index].target[iTarget].bulan =
                                      e.target.value;
                                    kegiatan[index].target.sort(
                                      (a, b) => a.bulan - b.bulan
                                    );
                                    return { ...prev, kegiatan: kegiatan };
                                  })
                                }
                              >
                                <MenuItem value="" disabled>
                                  <Typography fontSize={14} fontStyle="italic">
                                    Pilih Bulan
                                  </Typography>
                                </MenuItem>
                                {monthList.map((monthItem, index) => (
                                  <MenuItem
                                    key={index}
                                    value={index + 1}
                                    disabled={checkOptions(
                                      tags.target,
                                      iTarget,
                                      index + 1
                                    )}
                                  >
                                    <Typography fontSize={14}>
                                      {monthItem}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </SelectCustomTheme>
                            </FormControl>
                          </Grid>

                          <Grid
                            marginY={1}
                            item
                            xs={12}
                            md={iTarget > 0 ? 4 : 6}
                          >
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
                                    <InputAdornment position="end">
                                      %
                                    </InputAdornment>
                                  ),
                                }}
                                value={target.target}
                                onChange={(e) =>
                                  setState((prev) => {
                                    const kegiatan = prev.kegiatan;
                                    kegiatan[index].target[iTarget].target =
                                      e.target.value;
                                    return { ...prev, kegiatan: kegiatan };
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
                                  onclick={() =>
                                    minusMenuTarget(index, iTarget)
                                  }
                                  title={""}
                                />
                              </Stack>
                            </Grid>
                          )}
                        </Grid>
                      ))}
                    </Paper>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </>
      )}
    </Grid>
  );
}
