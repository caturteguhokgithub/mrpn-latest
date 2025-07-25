import React, { Fragment, SetStateAction } from "react";
import {
  alpha,
  Box,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { blue, green, grey, orange } from "@mui/material/colors";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import {
  ExsumCriticalData,
  ExsumCriticalState,
  KegiatanDto,
  KegiatanDtoNew,
  MonthsDto,
  TargetDto,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import dayjs from "dayjs";
import { MiscMasterListKategoriProyekRes } from "@/app/misc/master/masterServiceModel";
import AddButton from "@/components/buttonAdd";
import SelectCustomTheme from "@/components/select";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import {
  GetColor,
  GetColorCriticalPath,
  GetColorCriticalPathIndex,
  ColorCriticalPath,
  ColorCriticalPathTwoColor,
} from "@/utils/color";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Iconify from "@/components/icons/iconify";
import { FormatCurrency } from "@/lib/utils/currency";
import { NumericFormat } from "react-number-format";

export default function FormCritical({
  dataExisting,
  optionsRO,
  optionsStrategy,
  optionProjectCategory,
  state,
  setState,
  selectMonth,
  handleChangeMonth,
}: {
  dataExisting: ExsumCriticalData[];
  optionsRO: RoDto[];
  optionsStrategy: string[];
  optionProjectCategory: MiscMasterListKategoriProyekRes[];
  state: ExsumCriticalState;
  setState: (value: SetStateAction<ExsumCriticalState>) => void;
  selectMonth?: any;
  handleChangeMonth?: any;
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const monthData = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "May",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const addMenu = () => {
    setState((prevState) => {
      const newKegiatan: KegiatanDtoNew = {
        id: 0,
        exsum_critical_path_id: 0,
        color: "",
        kegiatan: "",
        satuan: "",
        total_kegiatan: 0,
        months: monthData.map((item) => ({
          id: 0,
          exsum_critical_path_kegiatan_id: 0,
          name: item.slice(0, 3).toLowerCase(),
          aktivitas: "",
          target: "",
          satuan: "",
        })),
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

  // const minusMenuTarget = (iKegiatan: number, iTarget: number) => {
  //   setState((prevState) => {
  //     const kegiatan = prevState.kegiatan;
  //     kegiatan[iKegiatan].target.splice(iTarget, 1);

  //     return {
  //       ...prevState,
  //       kegiatan: kegiatan,
  //     };
  //   });
  // };

  return (
    <Grid container spacing={2}>
      {year > 0 && dataExisting.length > 0 && (
        <>
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
        </>
      )}

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Rincian Output/Project" />
          <AutocompleteSelectSingle
            key={state.ro?.id ?? 0}
            value={state.ro}
            options={optionsRO}
            getOptionLabel={(option) => option.value}
            renderOption={(props, option) => (
              <li {...props}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Tooltip
                    title={option.intervention ? "Intervensi Kunci" : null}
                    followCursor
                    sx={{ cursor: "default" }}
                  >
                    <Typography
                      component="span"
                      color={option.intervention ? orange[700] : "inherit"}
                    >
                      {option.type === "NON_RO" ? (
                        <Chip label="NON-RO" size="small" />
                      ) : (
                        ""
                      )}{" "}
                      {option.intervention && (
                        <Iconify
                          name="mdi:key-variant"
                          size={14}
                          sx={{ position: "relative", top: 2 }}
                        />
                      )}{" "}
                      {option.value}
                    </Typography>
                  </Tooltip>
                </Stack>
              </li>
            )}
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
          <FieldLabelInfo title="Tagging Roadmap" />
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
            placeHolder={"Pilih tagging roadmap proses bisnis"}
            getOptionLabel={(option: string) => option}
            labelSelectAll={"Pilih semua tagging"}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <Typography fontWeight={600}>
            {state.ro ? state.ro.kementrian?.value : "-"}
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
      {year == 0 && (
        <Fragment>
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
                  views={year == 0 ? ["year"] : undefined}
                  format={year == 0 ? "YYYY" : "D MMM YYYY"}
                  minDate={
                    year > 0
                      ? dayjs(`${year}-01-01`)
                      : rpjmn
                      ? dayjs(`${rpjmn.start}-01-01`)
                      : undefined
                  }
                  maxDate={
                    year > 0
                      ? dayjs(`${year}-12-31`)
                      : rpjmn
                      ? dayjs(`${rpjmn.end}-12-31`)
                      : undefined
                  }
                  value={dayjs(state.start_date)}
                  onChange={(e: any) =>
                    setState((prev) => {
                      const selectedYear = dayjs(e).year();
                      let startDate = dayjs(e).format("YYYY-MM-DD");
                      if (year == 0) {
                        startDate = `${selectedYear}-01-01`;
                      }
                      return {
                        ...prev,
                        start_date: startDate,
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
                  disabled={state.start_date == ""}
                  views={year == 0 ? ["year"] : undefined}
                  format={year == 0 ? "YYYY" : "D MMM YYYY"}
                  minDate={dayjs(state.start_date)}
                  maxDate={
                    year > 0
                      ? dayjs(`${year}-12-31`)
                      : rpjmn
                      ? dayjs(`${rpjmn.end}-12-31`)
                      : undefined
                  }
                  value={dayjs(state.end_date)}
                  onChange={(e: any) =>
                    setState((prev) => {
                      const selectedYear = dayjs(e).year();
                      let endDate = dayjs(e).format("YYYY-MM-DD");
                      if (year == 0) {
                        endDate = `${selectedYear}-12-31`;
                      }
                      return {
                        ...prev,
                        end_date: endDate,
                      };
                    })
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Fragment>
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
      {year == 0 && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Kelompok Warna" />
            <ToggleButtonGroup
              exclusive
              value={
                state?.color
                  ? GetColorCriticalPathIndex(state?.color ?? "")
                  : null
              }
              onChange={(e, value) => {
                if (value != null) {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      color: GetColorCriticalPath(value),
                    };
                  });
                }
              }}
              aria-label="Grup Color"
            >
              {ColorCriticalPath.map(
                (color, i) =>
                  i < 5 && (
                    <ToggleButton
                      key={i}
                      value={i}
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
                  )
              )}
            </ToggleButtonGroup>
          </FormControl>
        </Grid>
      )}

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
                  <Typography fontWeight={500}>Aktivitas Turunan RO</Typography>
                  <AddButton
                    small
                    title="Tambah Aktivitas"
                    noMargin
                    onclick={() => addMenu()}
                  />
                </Stack>
              </Grid>
            </Grid>
            <Stack>
              {state.kegiatan &&
                state.kegiatan.map((tags: KegiatanDtoNew, index) => (
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
                          <Typography fontWeight={600} fontSize={14}>
                            Aktivitas Turunan RO #{index + 1}
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
                            placeholder="Aktivitas"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={tags.kegiatan}
                            onChange={(e) =>
                              setState((prevState) => {
                                const kegiatan = prevState.kegiatan;
                                kegiatan[index].kegiatan = e.target.value;
                                return {
                                  ...prevState,
                                  kegiatan: kegiatan,
                                };
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo
                            title={`Kelompok Warna Kegiatan #${index + 1}`}
                          />
                          <ToggleButtonGroup
                            exclusive
                            value={tags.color}
                            onChange={(e, value) => {
                              if (value != null) {
                                setState((prevState) => {
                                  const kegiatan = [...prevState.kegiatan];
                                  kegiatan[index] = {
                                    ...kegiatan[index],
                                    color: value,
                                  };

                                  return {
                                    ...prevState,
                                    kegiatan,
                                  };
                                });

                                // setState((prevState) => {
                                //   return {
                                //     ...prevState,
                                //     color: GetColorCriticalPath(value),
                                //   };
                                // });
                              }
                            }}
                            aria-label="Grup Color"
                            sx={{
                              width: "100%",
                            }}
                          >
                            {ColorCriticalPathTwoColor.map(
                              (color, i) =>
                                i < 5 && (
                                  <ToggleButton
                                    key={i}
                                    value={color}
                                    aria-label="color"
                                    fullWidth
                                    sx={{
                                      bgcolor: alpha(color, 1),
                                      // width: "20%",
                                      p: 0,
                                      minHeight: 40,
                                      "& > div": {
                                        "& > div": {
                                          opacity: 0.4,
                                        },
                                      },
                                      svg: {
                                        opacity: 0,
                                        display: "none",
                                      },
                                      "&.Mui-selected": {
                                        bgcolor: color,
                                        "& > div": {
                                          "& > div": {
                                            opacity: 1,
                                          },
                                        },
                                        svg: {
                                          opacity: 1,
                                          display: "inline",
                                        },
                                      },
                                    }}
                                  >
                                    <Stack
                                      width="100%"
                                      height="100%"
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="center"
                                      position="relative"
                                      gap={0.5}
                                    >
                                      {/* <Box
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
                                      </Box> */}
                                      <Iconify
                                        name="mdi:check-circle"
                                        color={green[700]}
                                        size={16}
                                      />
                                      <Typography fontSize={10}>
                                        {i === 0 && "Tidak saling berkaitan"}
                                        {i === 1 && "Saling berkaitan"}
                                      </Typography>
                                    </Stack>
                                  </ToggleButton>
                                )
                            )}
                          </ToggleButtonGroup>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Satuan" />
                          <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Satuan"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={tags.satuan}
                            onChange={(e) =>
                              setState((prevState) => {
                                const kegiatan = prevState.kegiatan;
                                kegiatan[index].satuan = e.target.value;
                                return {
                                  ...prevState,
                                  satuan: kegiatan,
                                };
                              })
                            }
                            // onChange={(e) =>
                            //   setState((prev) => {
                            //     const kegiatan = [...prev.kegiatan]; // shallow copy array

                            //     const currentMonths = kegiatan[index].months;
                            //     if (!currentMonths) return prev; // jika null, jangan ubah state

                            //     // pastikan indexMonth aman
                            //     if (!currentMonths[indexMonth]) return prev;

                            //     currentMonths[indexMonth] = {
                            //       ...currentMonths[indexMonth]!,
                            //       satuan: e.target.value,
                            //     };

                            //     kegiatan[index].months = currentMonths;

                            //     return {
                            //       ...prev,
                            //       kegiatan,
                            //     };
                            //   })
                            // }
                          />
                        </FormControl>
                      </Grid>
                      <Grid marginTop={1} item xs={12}>
                        <Typography fontWeight={600} fontSize={14}>
                          Target
                        </Typography>
                      </Grid>
                    </Grid>

                    <Stack>
                      <Paper
                        key={`${tags.id}`}
                        variant="outlined"
                        sx={{ mt: 1, p: 2, minWidth: "0 !important" }}
                      >
                        {/* <Stack gap={2}> */}
                        <Grid container spacing={2}>
                          {monthData.map((item, indexMonth) => (
                            <Grid item md={3}>
                              <Stack key={indexMonth}>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <FieldLabelInfo title={item} />
                                    </Stack>
                                  </Grid>
                                </Grid>

                                <Grid
                                  container
                                  // spacing={1}
                                  key={`target-${indexMonth}`}
                                >
                                  {/* <Grid marginY={0.5} item xs={12} md={6}>
                                  <FormControl fullWidth>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      placeholder={`Aktivitas ${item}`}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={tags.months[indexMonth].aktivitas}
                                      onChange={(e) =>
                                        setState((prev) => {
                                          const kegiatan = [...prev.kegiatan]; // shallow copy array

                                          const currentMonths =
                                            kegiatan[index].months;
                                          if (!currentMonths) return prev; // jika null, jangan ubah state

                                          // pastikan indexMonth aman
                                          if (!currentMonths[indexMonth])
                                            return prev;

                                          currentMonths[indexMonth] = {
                                            ...currentMonths[indexMonth]!,
                                            aktivitas: e.target.value,
                                          };

                                          kegiatan[index].months =
                                            currentMonths;

                                          return {
                                            ...prev,
                                            kegiatan,
                                          };
                                        })
                                      }
                                    />
                                  </FormControl>
                                </Grid> */}
                                  <Grid
                                    // marginY={0.5}
                                    item
                                    xs={12}
                                    // md={indexMonth > 0 ? 3 : 3}
                                  >
                                    <FormControl fullWidth>
                                      <NumericFormat
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={2}
                                        allowNegative={false}
                                        placeholder="Target"
                                        value={tags.months[indexMonth].target}
                                        onValueChange={(values) => {
                                          setState((prev) => {
                                            const kegiatan = [...prev.kegiatan];

                                            const currentMonths =
                                              kegiatan[index].months;
                                            if (!currentMonths) return prev;

                                            if (!currentMonths[indexMonth])
                                              return prev;

                                            currentMonths[indexMonth] = {
                                              ...currentMonths[indexMonth]!,
                                              target: values.value,
                                            };

                                            kegiatan[index].months =
                                              currentMonths;

                                            return {
                                              ...prev,
                                              kegiatan,
                                            };
                                          })
                                        }}
                                        customInput={TextField}
                                        variant="outlined"
                                        size="small"
                                        InputLabelProps={{ shrink: true }}
                                      />

                                      {/* <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Target"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={tags.months[indexMonth].target}
                                        onChange={(e) => {
                                          const rawValue = e.target.value;

                                          setState((prev) => {
                                            const kegiatan = [...prev.kegiatan]; // shallow copy array

                                            const currentMonths =
                                              kegiatan[index].months;
                                            if (!currentMonths) return prev; // jika null, jangan ubah state

                                            // pastikan indexMonth aman
                                            if (!currentMonths[indexMonth])
                                              return prev;

                                            currentMonths[indexMonth] = {
                                              ...currentMonths[indexMonth]!,
                                              // target: e.target.value,
                                              target: `${rawValue}`,
                                            };

                                            kegiatan[index].months =
                                              currentMonths;

                                            return {
                                              ...prev,
                                              kegiatan,
                                            };
                                          });
                                        }}
                                      /> */}
                                    </FormControl>
                                  </Grid>
                                  {/* <Grid
                                  marginY={0.5}
                                  item
                                  xs={12}
                                  md={indexMonth > 0 ? 3 : 3}
                                >
                                  <FormControl fullWidth>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      placeholder="Satuan"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      value={tags.months[indexMonth].satuan}
                                      onChange={(e) =>
                                        setState((prev) => {
                                          const kegiatan = [...prev.kegiatan]; // shallow copy array

                                          const currentMonths =
                                            kegiatan[index].months;
                                          if (!currentMonths) return prev; // jika null, jangan ubah state

                                          // pastikan indexMonth aman
                                          if (!currentMonths[indexMonth])
                                            return prev;

                                          currentMonths[indexMonth] = {
                                            ...currentMonths[indexMonth]!,
                                            satuan: e.target.value,
                                          };

                                          kegiatan[index].months =
                                            currentMonths;

                                          return {
                                            ...prev,
                                            kegiatan,
                                          };
                                        })
                                      }
                                    />
                                  </FormControl>
                                </Grid> */}
                                  {/* {index > 0 && (
                                <Grid marginY={1} item xs={12} md="auto">
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
                                      onclick={() => { }
                                        // minusMenuTarget(index, iTarget)
                                      }
                                      title={""}
                                    />
                                  </Stack>
                                </Grid>
                              )} */}
                                </Grid>

                                {/* {tags?.months.map(
                              (target: MonthsDto, iTarget: number) => (
                                <Grid
                                  container
                                  spacing={1}
                                  key={`target-${iTarget}`}
                                >
                                  <Grid marginY={0.5} item xs={12} md={6}>
                                    <FormControl fullWidth>
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder={`Aktivitas ${item}`}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    marginY={0.5}
                                    item
                                    xs={12}
                                    md={iTarget > 0 ? 2 : 3}
                                  >
                                    <FormControl fullWidth>
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Target"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={target.target}
                                        onChange={(e) =>
                                          setState((prev) => {
                                            const kegiatan = [...prev.kegiatan]; // shallow copy array

                                            const currentMonths = kegiatan[index].months;
                                            if (!currentMonths) return prev; // jika null, jangan ubah state

                                            // pastikan index aman
                                            if (!currentMonths[iTarget]) return prev;

                                            currentMonths[iTarget] = {
                                              ...currentMonths[iTarget]!,
                                              target: e.target.value,
                                            };

                                            kegiatan[index].months = currentMonths;

                                            return {
                                              ...prev,
                                              kegiatan,
                                            };
                                          })
                                        }
                                      />
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    marginY={0.5}
                                    item
                                    xs={12}
                                    md={iTarget > 0 ? 2 : 3}
                                  >
                                    <FormControl fullWidth>
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Satuan"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        value={target.satuan}
                                        onChange={(e) =>
                                          setState((prev) => {
                                            const kegiatan = [...prev.kegiatan]; // shallow copy array

                                            const currentMonths = kegiatan[index].months;
                                            if (!currentMonths) return prev; // jika null, jangan ubah state

                                            // pastikan index aman
                                            if (!currentMonths[iTarget]) return prev;

                                            currentMonths[iTarget] = {
                                              ...currentMonths[iTarget]!,
                                              satuan: e.target.value,
                                            };

                                            kegiatan[index].months = currentMonths;

                                            return {
                                              ...prev,
                                              kegiatan,
                                            };
                                          })
                                        }
                                      />
                                    </FormControl>
                                  </Grid>
                                  {iTarget > 0 && (
                                    <Grid marginY={1} item xs={12} md="auto">
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
                                          onclick={() => { }
                                            // minusMenuTarget(index, iTarget)
                                          }
                                          title={""}
                                        />
                                      </Stack>
                                    </Grid>
                                  )}
                                </Grid>
                              )
                            )} */}
                              </Stack>
                            </Grid>
                          ))}
                        </Grid>
                        {/* </Stack> */}
                      </Paper>
                    </Stack>
                  </Paper>
                ))}
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
}
