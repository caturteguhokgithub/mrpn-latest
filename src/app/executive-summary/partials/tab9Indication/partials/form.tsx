import { SetStateAction } from "react";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { ExsumIndicationState } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { TextareaStyled } from "@/components/textarea";
import AddButton from "@/components/buttonAdd";
import { green, grey, red } from "@mui/material/colors";
import { ExsumTWOSDto } from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import theme from "@/theme";
import ActionColumn from "@/components/actions/action";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import Iconify from "@/components/icons/iconify";

function GenerateTableProject(
  state: ExsumIndicationState,
  handleModalOutputOpen: any,
  type: string
) {
  return (
    <>
      {state.values.filter((val) => val.type === type).length === 0 ? (
        <Paper elevation={0} variant="outlined">
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title={
              type === "RO"
                ? "Data rincian output belum tersedia"
                : "Data non-rincian output belum tersedia"
            }
          />
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table
            sx={{
              minWidth: 650,
              "tbody, thead": {
                "td, th": {
                  borderRight: `1px solid ${grey[300]} !important`,
                  "&:last-of-type": {
                    borderRight: `0 !important`,
                  },
                },
              },
            }}
            size="small"
          >
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell align={"center"} width={"12%"}>
                  Tahun
                </TableCell>
                <TableCell align={"center"} width={"10%"}>
                  Intervensi Kunci
                </TableCell>
                <TableCell align={"center"}>Output</TableCell>
                <TableCell align={"center"} width={"25%"}>
                  PJ Perlakuan
                </TableCell>
                <TableCell align={"center"} width={100}>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.values.map(
                (val, iVal) =>
                  val.type == type && (
                    <TableRow>
                      <TableCell
                        align={"left"}
                        sx={{ verticalAlign: "top", paddingY: "13px" }}
                      >
                        {val.tahun.join(", ")}
                      </TableCell>
                      <TableCell
                        align={"center"}
                        sx={{ verticalAlign: "top", paddingY: "13px" }}
                      >
                        {val.intervention ? (
                          <Iconify
                            name="mdi:check-circle"
                            size={24}
                            color={green[800]}
                          />
                        ) : (
                          <Iconify
                            name="mdi:close-circle"
                            size={24}
                            color={red[800]}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        align={"left"}
                        sx={{ verticalAlign: "top", paddingY: "13px" }}
                      >
                        {type == "RO"
                          ? val.rincian_output?.value ?? "-"
                          : val.non_rincian_output?.value}
                      </TableCell>
                      <TableCell
                        align={"left"}
                        sx={{ verticalAlign: "top", paddingY: "13px" }}
                      >
                        {type == "RO"
                          ? val.rincian_output?.kementrian?.value ?? "-"
                          : val.non_rincian_output?.kementrian?.value ?? "-"}
                      </TableCell>
                      <TableCell sx={{ verticalAlign: "top" }}>
                        <ActionColumn
                          center
                          size="sm"
                          editClick={() =>
                            handleModalOutputOpen(iVal, true, "RO")
                          }
                          deleteClick={() =>
                            handleModalOutputOpen(iVal, true, "delete")
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
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
      // pb={0.5}
      // px={1.5}
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
            {state.id > 0 && state.tows ? (
              <Typography variant="body1">
                {state.tows.type + " - " + state.tows.value}
              </Typography>
            ) : (
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
            )}
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
                filled
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
                filled
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
              filled
              title="Tambah regulasi"
              noMargin
              onclick={() => handleModalRegulationOpen(-1, true, "update")}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          {state.regulation.length == 0 ? (
            <Paper elevation={0} variant="outlined">
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data regulasi/kelembagaan belum tersedia"
              />
            </Paper>
          ) : (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table
                size="small"
                sx={{
                  "tbody, thead": {
                    "td, th": {
                      borderRight: `1px solid ${grey[300]} !important`,
                      "&:last-of-type": {
                        borderRight: `0 !important`,
                      },
                    },
                  },
                }}
              >
                <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                  <TableRow>
                    <TableCell align={"center"} width={"12%"}>
                      Tahun
                    </TableCell>
                    <TableCell align={"center"} width={"20%"}>
                      Entitas
                    </TableCell>
                    <TableCell align={"center"} width={"30%"}>
                      Peraturan Terkait
                    </TableCell>
                    <TableCell align={"center"}>
                      Amanat Peraturan yang Terkait
                    </TableCell>
                    <TableCell align={"center"} width={"5%"}>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.regulation.map((row, iRow) => (
                    <>
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {/* {row.tahun.map((t) => (
                            <Typography>{t.join(", ")}</Typography>
                          ))} */}
                          <Typography>{row.tahun.join(", ")}</Typography>
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
                        <TableCell
                          align={"center"}
                          sx={{ verticalAlign: "top" }}
                        >
                          <ActionColumn
                            center
                            size="sm"
                            deleteClick={() =>
                              handleModalRegulationOpen(iRow, true, "delete")
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
