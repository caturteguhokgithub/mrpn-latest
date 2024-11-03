import React, { Fragment, SetStateAction } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import AddEntity from "./add";
import {
  AutocompleteSelectFreeSolo,
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import { ExsumIndicationState } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { ExsumSWOTValuesDto } from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import TextareaComponent, {TextareaStyled} from "@/app/components/textarea";
import AddButton from "@/app/components/buttonAdd";
import { grey } from "@mui/material/colors";
import {ExsumTWOSDto} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import {Text} from "recharts";
import {useRKPContext} from "@/lib/core/hooks/useHooks";

export default function FormIndication({
  state,
  setState,
  optionRiskType,
  optionStrategy,
  optionStakeholder,
  optionRO,
  optionTOWS
}: {
  state: ExsumIndicationState;
  setState: (value: SetStateAction<ExsumIndicationState>) => void;
  optionRiskType: string[];
  optionStrategy: ExsumSWOTValuesDto[];
  optionStakeholder: MiscMasterListStakeholderRes[];
  optionRO: RoDto[];
  optionTOWS: ExsumTWOSDto[]
}) {

  const {year,rpjmn} = useRKPContext(store => store)

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

  const addMenu = () => {
    setState((prevState) => {
      const prevValues = prevState.values
      prevValues.push({
        id:prevValues.length,
        tahun:year == 0 ? (rpjmn?.start ?? 0) : year,
        perlakuan_risiko: "",
        rincian_output: undefined,
        stakeholderMultiple:[],
        stakeholder: {
          coordinator: undefined,
          main: [],
          others: [
            {
              type: "",
              entity: []
            }
          ]
        }
      })
      return {
        ...prevState,
        values: prevValues,
      };
    })
  };

  const minusMenu = (nowId: number) => {
    setState((prevState) => {
      const prevValues = prevState.values
      const getIndex = prevValues.findIndex(x => x.id == nowId)
      if (getIndex > -1){
        prevValues.splice(getIndex, 1)
      }
      return {
        ...prevState,
        values: prevValues,
      };
    })
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Analisis TOWS" />
          <AutocompleteSelectSingle
            key={state.tows?.id ?? 0}
            value={state.tows}
            options={optionTOWS}
            getOptionLabel={(option) => option.type +" - "+ option.value}
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
          <FieldLabelInfo title="Indikasi Risiko" />
          <TextareaStyled
            value={state.indikasi_risiko}
            minRows={2}
            aria-label="Tuliskan indikasi risiko"
            placeholder="Tuliskan indikasi risiko"
            onChange={(e) => setState(prevState => {
              return {
                ...prevState,
                indikasi_risiko:e.target.value
              }
            })}
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FieldLabelInfo titleSection title="PERLAKUAN RISIKO" />
          <AddButton
            title="Tambah perlakuan"
            noMargin
            onclick={() => addMenu()}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box
          maxHeight="40vh"
          overflow="auto"
          pb={0.5}
          sx={{
            "&::-webkit-scrollbar": {
              width: "3px",
            },
          }}
        >
          <Grid container spacing={2}>
            {state.values.map((tags, index) => (
              <Fragment key={`fragment-${index}`}>
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, bgcolor: `${index % 2 !== 0 && grey[100]}` }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FieldLabelInfo
                            titleSection
                            title={`SUB #${index + 1}`}
                          />
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <AddButton
                              errorColor
                              title="Hapus"
                              noMargin
                              onclick={() => minusMenu(tags.id)}
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo
                            title="Tahun"
                            titleField
                            information="Tahun"
                          />
                          {year == 0 ?
                            <AutocompleteSelectSingle
                              key={tags.tahun}
                              value={tags.tahun}
                              options={optionsYear()}
                              getOptionLabel={opt => opt.toString()}
                              handleChange={(e:number) => setState(prevState => {
                                const prevData = {...prevState}
                                const getIndex = prevData.values.findIndex(x => x.id === tags.id)
                                if (getIndex > -1){
                                  prevData.values[getIndex].tahun = e
                                  return prevData
                                }
                                return prevState
                              })}
                              placeHolder={"Pilih Tahun"}
                            />
                          :
                            <TextareaStyled
                              value={tags.tahun}
                              disabled
                            />
                          }
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo
                            title="Perlakuan Risiko"
                            titleField
                            information="Proses untuk menurunkan keterpaparan risiko yang dikaitkan dengan toleransi dan selera risiko
yang telah ditetapkan"
                          />
                          <TextareaStyled
                            aria-label={"Perlakuan Risiko"}
                            placeholder={"Perlakuan Risiko"}
                            value={tags.perlakuan_risiko}
                            onChange={(e) => setState(prevState => {
                              const prevData = {...prevState}
                              const getIndex = prevData.values.findIndex(x => x.id === tags.id)
                              if (getIndex > -1){
                                prevData.values[getIndex].perlakuan_risiko = e.target.value
                                return prevData
                              }
                              return prevState
                            })}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="Rincian Output" titleField />
                          <AutocompleteSelectSingle
                            bgWhite
                            key={tags.rincian_output?.id ?? 0}
                            value={tags.rincian_output}
                            options={optionRO}
                            getOptionLabel={(opt) => opt.value}
                            handleChange={(newVal: RoDto) =>
                              setState((prevState) => {
                                const prevData = {...prevState}
                                const getIndex = prevData.values.findIndex(x => x.id === tags.id)
                                if (getIndex > -1){
                                  prevData.values[getIndex].rincian_output = newVal
                                  return prevData
                                }
                                return prevState
                              })
                            }
                            placeHolder={"Pilih rincian output"}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FieldLabelInfo title="K/L PenanggungJawab" titleField />
                          <AutocompleteSelectMultiple
                            bgWhite
                            key={tags.stakeholderMultiple.length}
                            value={tags.stakeholderMultiple}
                            options={optionStakeholder}
                            getOptionLabel={(opt) => opt.value}
                            handleChange={(newVal: MiscMasterListStakeholderRes[]) => setState((prevState) => {
                              const prevData = {...prevState};
                              const getIndex = prevData.values.findIndex(x => x.id === tags.id);
                              if (getIndex > -1) {
                                prevData.values[getIndex].stakeholderMultiple = newVal;
                                return prevData;
                              }
                              return prevState;
                            })}
                            placeHolder={"Pilih K/L penanggungjawab"}
                            labelSelectAll={"Pilih semua K/L"}
                          />
                        </FormControl>
                      </Grid>
                      {/*<Grid item xs={12}>*/}
                      {/*  <Paper variant="outlined" sx={{ p: 2 }}>*/}
                      {/*    <Grid container spacing={2}>*/}
                      {/*      <Grid item xs={12}>*/}
                      {/*        <FieldLabelInfo*/}
                      {/*          titleSection*/}
                      {/*          title="PENANGGUNGJAWAB PERLAKUAN"*/}
                      {/*        />*/}
                      {/*      </Grid>*/}
                      {/*      <Grid item xs={12}>*/}
                      {/*        <FormControl fullWidth>*/}
                      {/*          <Typography gutterBottom>*/}
                      {/*            Indikasi Entitas Utama & Pendukung*/}
                      {/*          </Typography>*/}
                      {/*          <AddEntity*/}
                      {/*            optionStakeholder={optionStakeholder}*/}
                      {/*            state={state}*/}
                      {/*            setState={setState}*/}
                      {/*            indexTags={index}*/}
                      {/*          />*/}
                      {/*        </FormControl>*/}
                      {/*      </Grid>*/}
                      {/*    </Grid>*/}
                      {/*  </Paper>*/}
                      {/*</Grid>*/}
                    </Grid>
                  </Paper>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
