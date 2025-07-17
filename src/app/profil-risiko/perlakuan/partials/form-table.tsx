import React, { Fragment, SetStateAction, useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SelectCustomTheme from "@/components/select";
import {
  listKeputusan,
  listPenanggungjawab,
  listPeristiwaRisiko,
} from "../setting";
import { grey, red } from "@mui/material/colors";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { SxAutocompleteTextField } from "@/components/dropdown/dropdownDefault";
import DateRangePicker, {
  convertDateToString,
  convertStringToDate,
  DateRangeState,
} from "@/components/dateRange";
import theme from "@/theme";
import { paramVariantDefault } from "@/utils/constant";
import Matriks from "../../analisis-evaluasi/partials/matriks";
import {
  initPerlakuanStateReq,
  Perlakuan,
  RiskTreatmentReqDto,
  RiskTreatmentResDto,
  RiskTreatmentState,
} from "@/app/profil-risiko/perlakuan/pageModel";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { RiskAnalysisDto } from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import {
  MasterRiskMatrixRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import {
  RODataTable,
  RoDetailDto,
  RoDto,
} from "@/app/misc/rkp/rkpServiceModel";
import dayjs from "dayjs";
import DialogComponent from "@/components/dialog";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { FormatIDR } from "@/lib/utils/currency";
import { getDetailRO } from "@/lib/utils/roDetail";
import AddButton from "@/components/buttonAdd";
import { dataMatriks } from "@/app/penetapan/kriteria/dataMatriks";

const highlightText = (text: any, highlight: any) => {
  if (!highlight.trim() || text == "" || text == undefined) {
    return text;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return parts.map((part: any, index: any) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const TablePerlakuanMultiCheck = ({
  mode,
  data,
  state,
  setState,
}: {
  mode?: string;
  data: RoDto[];
  state: Perlakuan;
  setState: (value: SetStateAction<Perlakuan[]>) => void;
}) => {
  const { year, rpjmn } = useRKPContext((store) => store);

  // console.log(state);

  let multiyear: number[] = [year];
  if (year === 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

  const [rows, setRows] = React.useState<RoDto[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChecked = (isChecked: boolean, ro: RoDto) => {
    setState((prevArray) => {
      return prevArray.map((item) => {
        if (item.id !== state.id) return item;

        const alreadyIncluded = item.ro.includes(ro.id);
        const updatedRo = isChecked
          ? !alreadyIncluded
            ? [...item.ro, ro.id]
            : item.ro
          : item.ro.filter((id) => id !== ro.id);

        return {
          ...item,
          ro: updatedRo,
        };
      });
    });
  };

  const getChecked = (roId: number): boolean => {
    return state.ro.includes(roId);
  };

  useEffect(() => {
    const filteredData = data.filter((row: RoDto) =>
      row.value.toLowerCase().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, data]);

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ minWidth: "100% !important" }}
    >
      <Box p={1}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Cari nomenklatur RO"
          value={search}
          onChange={handleSearchChange}
          size="small"
        />
      </Box>
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} sx={{ width: 30 }} />
              <TableCell rowSpan={2}>Nomenklatur RO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    disabled={mode === "read"}
                    size="small"
                    checked={getChecked(row.id)}
                    onChange={(e) => handleChecked(e.target.checked, row)}
                  />
                </TableCell>
                <TableCell>
                  [{row.code}] - [{row.pkkr}] -{" "}
                  {highlightText(row.value, search)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const DividerSection = ({ title }: { title: string }) => {
  return (
    <Divider
      sx={{
        "&:before, &:after": {
          borderTopColor: grey[500],
        },
      }}
    >
      <Chip
        label={title}
        size="small"
        sx={{
          fontWeight: 600,
          fontSize: 12,
          py: 2,
          px: 1,
          textTransform: "uppercase",
          bgcolor: grey[800],
          color: "white",
        }}
      />
    </Divider>
  );
};

export default function FormTable({
  mode,
  data,
  state,
  setState,
  optionsRiskProfile,
  optionsRiskDecision,
  optionsStakeholder,
  optionsRiskMatrix,
}: {
  mode?: string;
  data?: RiskTreatmentResDto;
  state: RiskTreatmentReqDto;
  setState: (value: SetStateAction<RiskTreatmentReqDto>) => void;
  optionsRiskProfile: RiskAnalysisDto[];
  optionsRiskDecision: string[];
  optionsStakeholder: MiscMasterListStakeholderRes[];
  optionsRiskMatrix: MasterRiskMatrixRes[];
}) {
  const [clickedCell, setClickedCell] = useState<{
    rowIndex: number;
    colIndex: number;
    value: number;
  } | null>(null);

  useEffect(() => {
    if (state.src_matriks_risiko) {
      const nilai = state.src_matriks_risiko.nilai;
      const matrix = dataMatriks.find((m) => m.id === 5);
      if (!matrix) return;

      for (let rowIndex = 0; rowIndex < matrix.rows.length; rowIndex++) {
        const colIndex = matrix.rows[rowIndex].values.findIndex(
          (v) => v === nilai
        );
        if (colIndex !== -1) {
          setClickedCell({ rowIndex, colIndex, value: nilai });
          break;
        }
      }
    }
  }, [state.src_matriks_risiko]);

  const handleClick = (rowIndex: any, colIndex: any, value: any) => {
    const getIndex = optionsRiskMatrix.findIndex((x) => x.nilai == value);
    if (getIndex > -1) {
      setState((prevState) => {
        return {
          ...prevState,
          src_matriks_risiko: optionsRiskMatrix[getIndex],
          src_matriks_risiko_id: optionsRiskMatrix[getIndex].id,
        };
      });
      setClickedCell({ rowIndex, colIndex, value });
    }
  };

  type SubChangeValue =
    | string
    | number
    | number[]
    | RiskAnalysisDto
    | MiscMasterListStakeholderRes;

  const handleSubChange = (
    id: number,
    field: keyof Perlakuan,
    value: SubChangeValue
  ) => {
    if (field === "ro") return;

    setItems((prevItems) => {
      const updated = prevItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          [field]: value,
          ro: [...item.ro], // fix ro
        };
      });

      const updatedItem = updated.find((item) => item.id === id)!;

      setState((prev) => ({
        ...prev,
        perlakuan: prev.perlakuan.map((item) =>
          item.id === id
            ? {
              ...item,
              [field]: value,
              ro: [...updatedItem.ro],
            }
            : item
        ),
      }));

      // console.log(updated);
      return updated;
    });
  };

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    if (
      state.perlakuan &&
      state.perlakuan.length > 0 &&
      optionsStakeholder.length > 0
    ) {
      const loadedItems = state.perlakuan.map((val, index) => {
        const matchedStakeholder = optionsStakeholder.find(
          (s) => s.id === val.src_stakeholder_id
        ) || {
          id: val.src_stakeholder_id,
          short: "",
          code: "",
          value: "",
          icon: "",
          type: "",
        };

        return {
          id: val.id ?? index + 1,
          keterangan_risiko: val.keterangan_risiko,
          target_triwulan_1: val.target_triwulan_1,
          satuan_triwulan_1: val.satuan_triwulan_1,
          target_triwulan_2: val.target_triwulan_2,
          satuan_triwulan_2: val.satuan_triwulan_2,
          target_triwulan_3: val.target_triwulan_3,
          satuan_triwulan_3: val.satuan_triwulan_3,
          target_triwulan_4: val.target_triwulan_4,
          satuan_triwulan_4: val.satuan_triwulan_4,
          ro: val.ro ?? [],
          rincian_output: val.rincian_output,
          start_date: val.start_date,
          end_date: val.end_date,
          src_stakeholder_id: val.src_stakeholder_id,
          src_stakeholder: matchedStakeholder,
        };
      });

      setItems(loadedItems);
    }
  }, [state.perlakuan, optionsStakeholder]);

  const [items, setItems] = useState<Perlakuan[]>([
    { ...initPerlakuanStateReq },
  ]);

  useEffect(() => {
    const isSame = JSON.stringify(items) === JSON.stringify(state.perlakuan);
    if (!isSame) {
      setState((prev) => ({
        ...prev,
        perlakuan: items,
      }));
    }
  }, [items]);

  const perlakuanAdd = () => {
    if (items.length >= 10) return;

    const newItem = {
      id: Math.floor(Math.random() * 1000),
      keterangan_risiko: "",
      target_triwulan_1: "",
      satuan_triwulan_1: "",
      target_triwulan_2: "",
      satuan_triwulan_2: "",
      target_triwulan_3: "",
      satuan_triwulan_3: "",
      target_triwulan_4: "",
      satuan_triwulan_4: "",
      ro: [],
      rincian_output: undefined,
      start_date: "",
      end_date: "",
      src_stakeholder_id: 0,
      src_stakeholder: undefined,
    };

    const newItems = [...items, newItem];
    setItems(newItems);

    // Sinkron ke state utama
    setState((prev) => ({
      ...prev,
      perlakuan: newItems,
    }));
  };

  const perlakuanMinus = (nowId: number) => {
    const newItems = items.filter((item) => item.id !== nowId);

    setItems(newItems);

    setState((prev) => ({
      ...prev,
      perlakuan: [...newItems],
    }));
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DividerSection title="Identifikasi Risiko" />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Peristiwa Risiko Strategis MRPN LS"
              titleField
              information={
                <Fragment>
                  <strong>Risiko Strategis</strong>
                  <p>
                    Risiko yang terkait dengan kebijakan publik atau keputusan
                    bisnis jangka panjang akibat dari penetapan dan penerapan
                    strategi yang kurang tepat, ketidaktepatan dalam perencanaan
                    strategis dan pengambilan suatu keputusan strategis dan
                    kegagalan dalam menghadapi perubahan-perubahan di lingkungan
                    eksternal, termasuk dan/atau pengembangan baru yang dapat
                    dilihat pada saat pengambilan keputusan yang buruk, dan
                    alokasi sumber daya yang tidak memadai
                  </p>
                </Fragment>
              }
            />
            {mode !== "read" && mode !== "update" ? (
              <AutocompleteSelectSingle
                key={state.profil_risiko?.id ?? 0}
                value={state.profil_risiko}
                options={optionsRiskProfile}
                getOptionLabel={(opt) => opt.peristiwa_risiko}
                handleChange={(e: RiskAnalysisDto) => {
                  if (e && e.analisis == null) {
                    setModal(true);
                    setState((prevState) => {
                      return {
                        ...prevState,
                        profil_risiko: undefined,
                        profil_risiko_id: 0,
                      };
                    });
                  } else {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        profil_risiko: e,
                        profil_risiko_id: e.id,
                      };
                    });
                  }
                }}
                placeHolder={"Pilih peristiwa risiko"}
              />
            ) : (
              <Typography fontWeight={600}>
                {state.profil_risiko?.peristiwa_risiko ?? "-"}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Kategori Risiko MRPN LS"
              titleField
              information={
                <>
                  <strong>Kategori Risiko</strong>
                  <p>
                    Pengelompokan risiko misalnya berdasarkan sumber risiko
                    (melalui metode <em>Risk Breakdown Structure</em>), area
                    yang terkena dampak (melalui metode{" "}
                    <em>Work Breakdown Structure</em>), atau kategori lainnya.
                    Kategorisasi risiko pada umumnya dilakukan untuk membantu
                    proses analisis dan evaluasi risiko serta membantu proses
                    perumusan strategi penanganannya{" "}
                  </p>
                </>
              }
            />
            <Typography fontWeight={600}>
              {state.profil_risiko?.peristiwa_risiko ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DividerSection title="Analisis & Evaluasi Risiko" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Dampak (LD)" />
            <Typography fontWeight={600}>
              {state.profil_risiko?.analisis.matriks.dampak ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Kemungkinan (LK)" />
            <Typography fontWeight={600}>
              {state.profil_risiko?.analisis.matriks.kemungkinan ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Besaran Risiko (BR)" />
            <Typography fontWeight={600}>
              {state.profil_risiko?.analisis.matriks.nilai ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Risiko" />
            {/*<Box>*/}
            {/*  <Chip*/}
            {/*    color="error"*/}
            {/*    sx={{*/}
            {/*      minWidth: 80,*/}
            {/*      borderWidth: "2px",*/}
            {/*      borderStyle: "solid",*/}
            {/*      "& .MuiChip-label": {*/}
            {/*        fontWeight: 600,*/}
            {/*      },*/}
            {/*      "&.MuiChip-colorError": {*/}
            {/*        bgcolor: red[100],*/}
            {/*        borderColor: red[400],*/}
            {/*        color: red[900],*/}
            {/*      },*/}
            {/*    }}*/}
            {/*    label="Sangat Tinggi"*/}
            {/*  />*/}
            {/*</Box>*/}
            <Typography fontWeight={600}>
              {state.profil_risiko?.analisis.matriks.level ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Prioritas Risiko" />
            <Typography fontWeight={600}>
              {state.profil_risiko
                ? state.profil_risiko.analisis.matriks.level.replace(/\D/g, "")
                : "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DividerSection title="Perlakuan Risiko" />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Keputusan" />
            {mode !== "read" ? (
              <AutocompleteSelectSingle
                bgWhite
                key={state.keputusan ? state.keputusan : "keputusan"}
                value={state.keputusan}
                options={optionsRiskDecision}
                getOptionLabel={(opt) => opt}
                handleChange={(e: string) =>
                  setState((prevState) => {
                    return {
                      ...prevState,
                      keputusan: e,
                    };
                  })
                }
                placeHolder={"Pilih keputusan"}
              />
            ) : (
              <Typography fontWeight={600}>{state.keputusan}</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
            mb={2}
          >
            <Typography
              fontWeight={600}
              fontSize={14}
              textTransform={"uppercase"}
            >
              Perlakuan Risiko
            </Typography>

            <AddButton
              noMargin
              title="Tambah Perlakuan Risiko"
              onclick={perlakuanAdd}
            />
          </Stack>
          <Stack direction="column" gap={2}>
            {items.map((tags, key) => (
              <Paper
                key={tags.id}
                elevation={0}
                variant="outlined"
                sx={{ p: 2, bgcolor: grey[50] }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack direction={"row"} justifyContent="space-between">
                      <Typography fontWeight={600}>
                        Perlakuan Risiko {key + 1}
                      </Typography>
                      {key > 0 && (
                        <Box>
                          <AddButton
                            small
                            errorColor
                            title="Hapus"
                            noMargin
                            onclick={() => perlakuanMinus(tags.id)}
                          />
                        </Box>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FieldLabelInfo
                        title="Deskripsi Perlakuan Risiko"
                        titleField
                        information={
                          <>
                            <strong>Perlakuan Risiko</strong>
                            <p>
                              Proses untuk menurunkan keterpaparan risiko yang
                              dikaitkan dengan toleransi dan selera risiko yang
                              telah ditetapkan
                            </p>
                          </>
                        }
                      />
                      {mode != "read" ? (
                        <TextareaStyled
                          value={tags.keterangan_risiko}
                          onChange={(e) =>
                            handleSubChange(
                              tags.id,
                              "keterangan_risiko",
                              e.target.value
                            )
                          }
                          // onChange={(e) =>
                          //   setState((prevState) => {
                          //     return {
                          //       ...prevState,
                          //       keterangan_risiko: e.target.value,
                          //     };
                          //   })
                          // }
                          placeholder="Deskripsi Perlakuan Risiko"
                          minRows={2}
                        />
                      ) : (
                        <Typography fontWeight={600} sx={{ marginBottom: 2 }}>
                          {tags.keterangan_risiko}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Triwulan I" titleField />
                          <Stack direction="row" gap={1}>
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.target_triwulan_1}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "target_triwulan_1",
                                  e.target.value
                                )
                              }
                              placeholder="Target TW I"
                              sx={{ bgcolor: "white" }}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.satuan_triwulan_1}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "satuan_triwulan_1",
                                  e.target.value
                                )
                              }
                              placeholder="Satuan TW I"
                              sx={{ bgcolor: "white" }}
                            />
                          </Stack>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Triwulan II" titleField />
                          <Stack direction="row" gap={1}>
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.target_triwulan_2}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "target_triwulan_2",
                                  e.target.value
                                )
                              }
                              placeholder="Target TW II"
                              sx={{ bgcolor: "white" }}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.satuan_triwulan_2}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "satuan_triwulan_2",
                                  e.target.value
                                )
                              }
                              placeholder="Satuan TW II"
                              sx={{ bgcolor: "white" }}
                            />
                          </Stack>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Triwulan III" titleField />
                          <Stack direction="row" gap={1}>
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.target_triwulan_3}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "target_triwulan_3",
                                  e.target.value
                                )
                              }
                              placeholder="Target TW III"
                              sx={{ bgcolor: "white" }}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.satuan_triwulan_3}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "satuan_triwulan_3",
                                  e.target.value
                                )
                              }
                              placeholder="Satuan TW III"
                              sx={{ bgcolor: "white" }}
                            />
                          </Stack>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Triwulan IV" titleField />
                          <Stack direction="row" gap={1}>
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.target_triwulan_4}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "target_triwulan_4",
                                  e.target.value
                                )
                              }
                              placeholder="Target TW IV"
                              sx={{ bgcolor: "white" }}
                            />
                            <TextField
                              size="small"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={tags.satuan_triwulan_4}
                              onChange={(e) =>
                                handleSubChange(
                                  tags.id,
                                  "satuan_triwulan_4",
                                  e.target.value
                                )
                              }
                              placeholder="Satuan TW IV"
                              sx={{ bgcolor: "white" }}
                            />
                          </Stack>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <TablePerlakuanMultiCheck
                      data={data?.optionRo ?? []}
                      // state={tags}
                      state={items.find((item) => item.id === tags.id)!}
                      setState={setItems}
                      // setState={(updater) => {

                      //   const updatedItems = items.map((item) =>
                      //     item.id === tags.id
                      //       ? {
                      //         ...item,
                      //         ...(typeof updater === "function"
                      //           ? updater(item)
                      //           : {
                      //             // ...updater,
                      //             ro: item.ro,
                      //           }),
                      //       }
                      //       : item
                      //   );
                      //   setItems(updatedItems);
                      // }}
                      mode={mode}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Waktu Mulai Rencana" />
                      {mode != "read" ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              ".MuiInputBase-root": {
                                height: 40,
                                bgcolor: "white",
                              },
                            }}
                            format={"MMM YYYY"}
                            views={["month", "year"]}
                            value={dayjs(tags.start_date)}
                            onChange={
                              (e: any) => {
                                const thisDate = dayjs(e).format("YYYY-MM-DD");
                                handleSubChange(
                                  tags.id,
                                  "start_date",
                                  thisDate
                                );
                              }
                              // setState((prevState) => {
                              //   const thisDate = dayjs(e).format("YYYY-MM-DD");
                              //   return {
                              //     ...prevState,
                              //     start_date: thisDate,
                              //   };
                              // })
                            }
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography fontWeight={600}>
                          {`${dayjs(tags.start_date).format("MMM YYYY")}`}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Waktu Selesai Rencana" />
                      {mode != "read" ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              ".MuiInputBase-root": {
                                height: 40,
                                bgcolor: "white",
                              },
                            }}
                            format={"MMM YYYY"}
                            views={["month", "year"]}
                            value={dayjs(tags.end_date)}
                            onChange={
                              (e: any) => {
                                const thisDate = dayjs(e).format("YYYY-MM-DD");
                                handleSubChange(tags.id, "end_date", thisDate);
                              }
                              // setState((prevState) => {
                              //   const thisDate = dayjs(e).format("YYYY-MM-DD");
                              //   return {
                              //     ...prevState,
                              //     end_date: thisDate,
                              //   };
                              // })
                            }
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography fontWeight={600}>
                          {`${dayjs(tags.end_date).format("MMM YYYY")}`}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FieldLabelInfo title="Penanggungjawab" />
                      {mode !== "read" ? (
                        <AutocompleteSelectSingle
                          bgWhite
                          key={
                            tags.src_stakeholder
                              ? tags.src_stakeholder.id
                              : "stakeholder"
                          }
                          value={tags.src_stakeholder}
                          options={optionsStakeholder}
                          getOptionLabel={(opt) => opt.value}
                          handleChange={
                            (e: MiscMasterListStakeholderRes) =>
                              handleSubChange(
                                tags.id,
                                "src_stakeholder_id",
                                e.id
                              )
                            // setState((prevState) => {
                            //   return {
                            //     ...prevState,
                            //     src_stakeholder_id: e,
                            //   };
                            // })
                          }
                          placeHolder={"Pilih penanggungjawab"}
                        />
                      ) : (
                        <Typography fontWeight={600}>
                          {tags.src_stakeholder?.value ?? ""}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Grid>
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <FormControl fullWidth>*/}
        {/*    <FieldLabelInfo title="Waktu Rencana" />*/}
        {/*    {mode !== "read" ? (*/}
        {/*      <DateRangePicker*/}
        {/*        key={state.start_date}*/}
        {/*        placeholder="Pilih periode"*/}
        {/*        sxInput={{*/}
        {/*          backgroundColor: "red",*/}
        {/*        }}*/}
        {/*        initState={convertStringToDate(*/}
        {/*          state.start_date,*/}
        {/*          state.end_date*/}
        {/*        )}*/}
        {/*        handleChangeState={(event: DateRangeState[]) =>*/}
        {/*          setState((prevState) => {*/}
        {/*            const convertData = convertDateToString(event);*/}
        {/*            return {*/}
        {/*              ...prevState,*/}
        {/*              start_date: convertData.startDate,*/}
        {/*              end_date: convertData.endDate,*/}
        {/*            };*/}
        {/*          })*/}
        {/*        }*/}
        {/*      />*/}
        {/*    ) : (*/}
        {/*      <Typography fontWeight={600}>*/}
        {/*        {`${dayjs(state.start_date).format("D MMM YYYY")} s/d ${dayjs(*/}
        {/*          state.end_date*/}
        {/*        ).format("D MMM YYYY")}`}*/}
        {/*      </Typography>*/}
        {/*    )}*/}
        {/*  </FormControl>*/}
        {/*</Grid>*/}

        {/*<Grid item xs={12} sm={6}>*/}
        {/* <FormControl fullWidth>*/}
        {/*  <FieldLabelInfo title="Target Capaian Progress Project/RO" />*/}
        {/*  {mode !== "read" ? (*/}
        {/*   <OutlinedInput*/}
        {/*    size="small"*/}
        {/*    fullWidth*/}
        {/*    placeholder="Target Capaian Progress Project/RO"*/}
        {/*    endAdornment={<InputAdornment position="end">%</InputAdornment>}*/}
        {/*    value={state.target}*/}
        {/*    onChange={(e) =>*/}
        {/*     setState((prevState) => {*/}
        {/*      return {*/}
        {/*       ...prevState,*/}
        {/*       target: e.target.value,*/}
        {/*      };*/}
        {/*     })*/}
        {/*    }*/}
        {/*   />*/}
        {/*  ) : (*/}
        {/*   <Typography fontWeight={600}>{state.target}</Typography>*/}
        {/*  )}*/}
        {/* </FormControl>*/}
        {/*</Grid>*/}

        <Grid item xs={12}>
          <DividerSection title="Risiko Residual Harapan" />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <Typography fontStyle="italic" variant="overline" color={grey[600]}>
              Klik kotak berwarna untuk menampilkan nilai LK & LD
            </Typography>
          </FormControl>
          <Matriks
            // levelId={5}
            levelId={5}
            handleClick={handleClick}
            clickedCell={clickedCell}
            noClick={mode === "read" ? true : false}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Kemungkinan (LK)" />
            <Typography fontWeight={600}>
              {state.src_matriks_risiko?.kemungkinan ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Dampak (LD)" />
            <Typography fontWeight={600}>
              {state.src_matriks_risiko?.dampak ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Besaran Risiko (BR)" />
            <Stack sx={{ height: 40 }} direction="row" alignItems="center">
              <Typography fontWeight={600}>
                {state.src_matriks_risiko?.nilai ?? "-"}
              </Typography>
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Level Risiko" />
            {/*<Box>*/}
            {/*  <Chip*/}
            {/*    color="error"*/}
            {/*    sx={{*/}
            {/*      minWidth: 80,*/}
            {/*      borderWidth: "2px",*/}
            {/*      borderStyle: "solid",*/}
            {/*      "& .MuiChip-label": {*/}
            {/*        fontWeight: 600,*/}
            {/*      },*/}
            {/*      "&.MuiChip-colorError": {*/}
            {/*        bgcolor: red[100],*/}
            {/*        borderColor: red[400],*/}
            {/*        color: red[900],*/}
            {/*      },*/}
            {/*    }}*/}
            {/*    label="Sangat Tinggi"*/}
            {/*  />*/}
            {/*</Box>*/}
            <Typography fontWeight={600}>
              {state.src_matriks_risiko?.level ?? "-"}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <DialogComponent
        width={240}
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
      >
        Harap mengisi analisis risiko terlebih dahulu
      </DialogComponent>
    </Fragment>
  );
}
