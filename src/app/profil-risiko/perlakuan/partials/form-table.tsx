import React, { SetStateAction, useEffect, useState } from "react";
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
import SelectCustomTheme from "@/app/components/select";
import {
  listKeputusan,
  listPenanggungjawab,
  listPeristiwaRisiko,
} from "../setting";
import { grey, red } from "@mui/material/colors";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { SxAutocompleteTextField } from "@/app/components/dropdown/dropdownDefault";
import DateRangePicker, {
  convertDateToString,
  convertStringToDate,
  DateRangeState,
} from "@/app/components/dateRange";
import theme from "@/theme";
import { paramVariantDefault } from "@/app/utils/constant";
import Matriks from "../../analisis-evaluasi/partials/matriks";
import {
  RiskTreatmentResDto,
  RiskTreatmentState,
} from "@/app/profil-risiko/perlakuan/pageModel";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { RiskAnalysisDto } from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import {
  MasterRiskMatrixRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import dayjs from "dayjs";
import DialogComponent from "@/components/dialog";

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
  state: RiskTreatmentState;
  setState: (value: SetStateAction<RiskTreatmentState>) => void;
}) => {
  const [rows, setRows] = React.useState<RoDto[]>([]);
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleChecked = (isChecked: boolean, ro: RoDto) => {
    if (isChecked) {
      setState((prevState) => {
        let roPrev = [...prevState.ro];
        roPrev.push(ro);
        return {
          ...prevState,
          ro: roPrev,
        };
      });
    } else {
      setState((prevState) => {
        let roPrev = [...prevState.ro];
        const getIndex = roPrev.findIndex((x) => x.id == ro.id);
        if (getIndex > -1) roPrev.splice(getIndex, 1);
        return {
          ...prevState,
          ro: roPrev,
        };
      });
    }
  };

  useEffect(() => {
    const filteredData = data.filter((row: RoDto) =>
      row.value.toLowerCase().includes(search.toLowerCase())
    );
    setRows(filteredData);
  }, [search, data]);

  function getChecked(arg0: number): boolean {
    const getIndex = state.ro.findIndex((x) => x.id == arg0);
    return getIndex > -1;
  }

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ minWidth: "100% !important" }}
    >
      <TextField
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        fullWidth
        placeholder="Cari nomenklatur RO"
        value={search}
        onChange={handleSearchChange}
        sx={SxAutocompleteTextField(paramVariantDefault)}
        size="small"
      />
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table stickyHeader size="small">
          <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
            <TableRow>
              <TableCell sx={{ width: 30 }}></TableCell>
              <TableCell>Nomenklatur RO</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Satuan</TableCell>
              <TableCell>Anggaran</TableCell>
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
                <TableCell>{highlightText(row.value, search)}</TableCell>
                <TableCell>{highlightText(row.target, search)}</TableCell>
                <TableCell>{highlightText(row.satuan, search)}</TableCell>
                <TableCell>{highlightText(row.alokasi, search)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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
  state: RiskTreatmentState;
  setState: (value: SetStateAction<RiskTreatmentState>) => void;
  optionsRiskProfile: RiskAnalysisDto[];
  optionsRiskDecision: string[];
  optionsStakeholder: MiscMasterListStakeholderRes[];
  optionsRiskMatrix: MasterRiskMatrixRes[];
}) {
  const [clickedCell, setClickedCell] = useState({
    rowIndex: null,
    colIndex: null,
    value: null,
  });

  const handleClick = (rowIndex: any, colIndex: any, value: any) => {
    const getIndex = optionsRiskMatrix.findIndex((x) => x.nilai == value);
    if (getIndex > -1) {
      setState((prevState) => {
        return {
          ...prevState,
          src_matriks_risiko: optionsRiskMatrix[getIndex],
        };
      });
      setClickedCell({ rowIndex, colIndex, value });
    }
  };

  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Identifikasi Risiko" size="small" />
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Peristiwa Risiko Strategis MRPN Linsek"
              titleField
              information={
                <>
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
                </>
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
                      };
                    });
                  } else {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        profil_risiko: e,
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
              title="Kategori Risiko MRPN Linsek"
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
          <Divider>
            <Chip label="Analisis & Evaluasi Risiko" size="small" />
          </Divider>
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
          <Divider>
            <Chip label="Perlakuan Risiko" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Keputusan" />
            {mode !== "read" ? (
              <AutocompleteSelectSingle
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
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Keterangan Perlakuan Risiko"
              titleField
              information={
                <>
                  <strong>Perlakuan Risiko</strong>
                  <p>
                    Proses untuk menurunkan keterpaparan risiko yang dikaitkan
                    dengan toleransi dan selera risiko yang telah ditetapkan
                  </p>
                </>
              }
            />
            <TablePerlakuanMultiCheck
              data={data?.optionRo ?? []}
              state={state}
              setState={setState}
              mode={mode}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Waktu Rencana" />
            {mode !== "read" ? (
              <DateRangePicker
                key={state.start_date}
                placeholder="Pilih periode"
                sxInput={{
                  backgroundColor: "red",
                }}
                initState={convertStringToDate(
                  state.start_date,
                  state.end_date
                )}
                handleChangeState={(event: DateRangeState[]) =>
                  setState((prevState) => {
                    const convertData = convertDateToString(event);
                    return {
                      ...prevState,
                      start_date: convertData.startDate,
                      end_date: convertData.endDate,
                    };
                  })
                }
              />
            ) : (
              <Typography fontWeight={600}>
                {`${dayjs(state.start_date).format("D MMM YYYY")} s/d ${dayjs(
                  state.end_date
                ).format("D MMM YYYY")}`}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Penanggungjawab" />
            {mode !== "read" ? (
              <AutocompleteSelectSingle
                key={
                  state.src_stakeholder
                    ? state.src_stakeholder.id
                    : "stakeholder"
                }
                value={state.src_stakeholder}
                options={optionsStakeholder}
                getOptionLabel={(opt) => opt.value}
                handleChange={(e: MiscMasterListStakeholderRes) =>
                  setState((prevState) => {
                    return {
                      ...prevState,
                      src_stakeholder: e,
                    };
                  })
                }
                placeHolder={"Pilih penanggungjawab"}
              />
            ) : (
              <Typography fontWeight={600}>
                {state.src_stakeholder?.value ?? ""}
              </Typography>
            )}
          </FormControl>
        </Grid>

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
          <Divider>
            <Chip label="Risiko Residual Harapan" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <Typography fontStyle="italic" variant="overline" color={grey[600]}>
              Klik kotak berwarna untuk menampilkan nilai LK & LD
            </Typography>
          </FormControl>
          <Matriks
            levelId={5}
            handleClick={handleClick}
            clickedCell={clickedCell}
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
    </>
  );
}
