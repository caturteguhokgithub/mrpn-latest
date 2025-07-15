import React, { Fragment, SetStateAction } from "react";
import {
  alpha,
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import {
  AutocompleteSelectFreeSolo,
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import {
  ExsumIndicationState,
  ExsumIndicationStateValue,
  ModalDto,
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { ExsumSWOTValuesDto } from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import AddButton from "@/components/buttonAdd";
import { green, grey, red } from "@mui/material/colors";
import { ExsumTWOSDto } from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import { Text } from "recharts";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import { IconFA } from "@/components/icons/icon-fa";
import ActionColumn from "@/components/actions/action";

function GenerateTableProject(
  state: ExsumIndicationState,
  handleModalOutputOpen: any,
  type: string
) {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell width={"10%"}>Aksi</TableCell>
            <TableCell width={"10%"}>Tahun</TableCell>
            <TableCell width={"15%"}>Intervensi Kunci</TableCell>
            <TableCell>Output</TableCell>
            <TableCell width={"25%"}>PJ Perlakuan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.values.length == 0 && (
            <TableRow>
              <TableCell colSpan={5} align={"center"}>
                Data belum tersedia
              </TableCell>
            </TableRow>
          )}

          {state.values.map(
            (val, iVal) =>
              val.type == type && (
                <TableRow>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    <ActionColumn
                      editClick={() => handleModalOutputOpen(iVal, true, "RO")}
                      deleteClick={() =>
                        handleModalOutputOpen(iVal, true, "delete")
                      }
                    />
                  </TableCell>
                  <TableCell
                    align={"left"}
                    sx={{ verticalAlign: "top", paddingY: "13px" }}
                  >
                    {val.tahun.join(", ")}
                  </TableCell>
                  <TableCell
                    align={"left"}
                    sx={{ verticalAlign: "top", paddingY: "13px" }}
                  >
                    {val.intervention ? (
                      <IconFA name="check" size={14} color={green[800]} />
                    ) : (
                      <IconFA name="times" size={14} color={red[800]} />
                    )}
                  </TableCell>
                  <TableCell
                    align={"left"}
                    sx={{ verticalAlign: "top", paddingY: "13px" }}
                  >
                    {type == "RO"
                      ? val.rincian_output?.value ?? "-"
                      : val.non_rincian_output.nomenklatur}
                  </TableCell>
                  <TableCell
                    align={"left"}
                    sx={{ verticalAlign: "top", paddingY: "13px" }}
                  >
                    {type == "RO"
                      ? val.rincian_output?.kementrian?.value ?? "-"
                      : val.non_rincian_output.kementrian?.value ?? "-"}
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function FormIndication({
  state,
  setState,
  handleModalOutputOpen,
  handleModalRegulationOpen,
  optionRiskType,
  optionTOWS,
}: {
  state: ExsumIndicationState;
  setState: (value: SetStateAction<ExsumIndicationState>) => void;
  handleModalOutputOpen: any;
  handleModalRegulationOpen: any;
  optionRiskType: string[];
  optionTOWS: ExsumTWOSDto[];
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  const optionsYear = () => {
    if (rpjmn !== undefined) {
      let opt: number[] = [];
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        opt.push(i);
      }
      return opt;
    }
    return [];
  };

  return (
    <Box
      // maxHeight="90vh"
      // overflow="auto"
      pb={0.5}
      px={1.5}
      sx={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Analisis TOWS" />
            <AutocompleteSelectSingle
              key={state.tows?.id ?? 0}
              value={state.tows}
              options={optionTOWS}
              getOptionLabel={(option) => option.type + " - " + option.value}
              handleChange={(val: ExsumTWOSDto) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    tows: val,
                  };
                })
              }
              placeHolder={"Pilih analisis TOWS"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Indikasi Peristiwa Risiko" />
            <TextareaStyled
              value={state.indikasi_risiko}
              minRows={2}
              aria-label="Tuliskan indikasi peristiwa risiko"
              placeholder="Tuliskan indikasi peristiwa risiko"
              onChange={(e) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    indikasi_risiko: e.target.value,
                  };
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Kategori Risiko" />
            <AutocompleteSelectSingle
              key={state.kategori_risiko}
              value={state.kategori_risiko}
              options={optionRiskType}
              getOptionLabel={(option) => option}
              handleChange={(val: string) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    kategori_risiko: val,
                  };
                })
              }
              placeHolder={"Pilih kategori risiko"}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Indikasi Perlakuan Risiko"
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
            <TextareaStyled
              aria-label={"Indikasi Perlakuan Risiko"}
              placeholder={"Indikasi Perlakuan Risiko"}
              value={state.perlakuan_risiko}
              onChange={(e) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    perlakuan_risiko: e.target.value,
                  };
                })
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FieldLabelInfo titleSection title="PERLAKUAN RISIKO" />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FieldLabelInfo titleSection title="Rincian Output (RO)" />
            <Stack
              direction="column"
              justifyContent="right"
              alignItems="end"
              gap={1}
            >
              <AddButton
                title="Tambah RO"
                noMargin
                onclick={() => handleModalOutputOpen(-1, true, "RO")}
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {GenerateTableProject(state, handleModalOutputOpen, "RO")}
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FieldLabelInfo titleSection title="Non-RO" />
            <Stack
              direction="column"
              justifyContent="right"
              alignItems="end"
              gap={1}
            >
              <AddButton
                title="Tambah Project"
                noMargin
                onclick={() => handleModalOutputOpen(-1, true, "NON_RO")}
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {GenerateTableProject(state, handleModalOutputOpen, "NON_RO")}
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <FieldLabelInfo titleSection title="Regulasi/Kelembagaan" />
            <AddButton
              title="Tambah regulasi"
              noMargin
              onclick={() => handleModalRegulationOpen(-1, true, "update")}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small">
              <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                <TableRow>
                  <TableCell width={"5%"}>Aksi</TableCell>
                  <TableCell width={"5%"}>Tahun</TableCell>
                  <TableCell width={"20%"}>Entitas</TableCell>
                  <TableCell width={"30%"}>Peraturan Terkait</TableCell>
                  <TableCell>Amanat Peraturan yang Terkait</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.regulation.length == 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align={"center"}>
                      Data belum tersedia
                    </TableCell>
                  </TableRow>
                )}

                {state.regulation.map((row, iRow) => (
                  <>
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align={"center"} sx={{ verticalAlign: "top" }}>
                        <ActionColumn
                          deleteClick={() =>
                            handleModalRegulationOpen(iRow, true, "delete")
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Stack
                          display={"flex"}
                          justifyContent={"left"}
                          direction={"column"}
                        >
                          {row.tahun.map((t) => (
                            <Typography>{t}</Typography>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <Stack
                          display="inline-flex"
                          alignItems="center"
                          direction="row"
                          gap={0.5}
                          flexWrap="wrap"
                        >
                          {row.stakeholder.map((e) => (
                            <Box component="span">
                              <Chip
                                key={e.id}
                                label={e.value}
                                size="small"
                                sx={{
                                  height: "auto",
                                  ".MuiChip-label": {
                                    whiteSpace: "wrap",
                                    lineHeight: 1.2,
                                    py: 0.6,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {row.perpres_state?.title ?? ""}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        {row.amanat}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
