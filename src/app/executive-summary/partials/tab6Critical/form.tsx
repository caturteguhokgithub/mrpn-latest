import React, { Fragment, SetStateAction } from "react";
import {
  alpha,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { blue, grey } from "@mui/material/colors";
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
import dayjs from "dayjs";
import { MiscMasterListKategoriProyekRes } from "@/app/misc/master/masterServiceModel";
import AddButton from "@/app/components/buttonAdd";
import SelectCustomTheme from "@/app/components/select";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import {
  GetColor,
  GetColorCriticalPath,
  GetColorCriticalPathIndex,
  ColorCriticalPath,
} from "@/utils/color";

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

  const monthData = [
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
              <Stack direction="row" gap={1} alignItems="center">
                <SelectCustomTheme
                  small
                  anchorRight
                  value={selectMonth}
                  onChange={handleChangeMonth}
                  sx={{
                    flex: 1,
                    "&.MuiInputBase-root": {
                      bgcolor: "white",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <Typography
                      fontSize={14}
                      fontStyle="italic"
                      color={grey[600]}
                      fontWeight={600}
                    >
                      Pilih bulan mulai
                    </Typography>
                  </MenuItem>
                  {monthData.map((month, index) => (
                    <MenuItem key={index} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </SelectCustomTheme>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Tahun Mulai"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Waktu Selesai Pengerjaan" />
              <Stack direction="row" gap={1} alignItems="center">
                <SelectCustomTheme
                  small
                  anchorRight
                  value={selectMonth}
                  onChange={handleChangeMonth}
                  sx={{
                    flex: 1,
                    "&.MuiInputBase-root": {
                      bgcolor: "white",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <Typography
                      fontSize={14}
                      fontStyle="italic"
                      color={grey[600]}
                      fontWeight={600}
                    >
                      Pilih bulan selesai
                    </Typography>
                  </MenuItem>
                  {monthData.map((month, index) => (
                    <MenuItem key={index} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </SelectCustomTheme>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Tahun Selesai"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
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
                  <Typography fontWeight={500}>Kegiatan</Typography>
                  <AddButton
                    small
                    title="Tambah Kegiatan"
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
                        <Typography fontWeight={600} fontSize={14}>
                          Kegiatan #{index + 1}
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
                          placeholder="Kegiatan"
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
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <FieldLabelInfo
                          title={`"Kelompok Warna Kegiatan #${index + 1}`}
                        />
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
                    <Grid marginTop={1} item xs={12}>
                      <Typography fontWeight={600} fontSize={14}>
                        Aktivitas RKP 2025
                      </Typography>
                    </Grid>
                  </Grid>

                  <Stack>
                    <Paper
                      key={`${tags.id}`}
                      variant="outlined"
                      sx={{ mt: 1, p: 2, minWidth: "0 !important" }}
                    >
                      <Stack gap={2}>
                        {monthData.map((item, index) => (
                          <Stack gap={1} key={index}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography fontWeight={500}>
                                    {item}
                                  </Typography>
                                </Stack>
                              </Grid>
                            </Grid>
                            {tags.target.map(
                              (target: TargetDto, iTarget: number) => (
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
                                            const kegiatan = prev.kegiatan;
                                            kegiatan[index].target[
                                              iTarget
                                            ].target = e.target.value;
                                            return {
                                              ...prev,
                                              kegiatan: kegiatan,
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
                                          onclick={() =>
                                            minusMenuTarget(index, iTarget)
                                          }
                                          title={""}
                                        />
                                      </Stack>
                                    </Grid>
                                  )}
                                </Grid>
                              )
                            )}
                          </Stack>
                        ))}
                      </Stack>
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
