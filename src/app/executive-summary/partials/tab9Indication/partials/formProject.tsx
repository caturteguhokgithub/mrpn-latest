import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import {
  AutoCompleteMultipleProp,
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
  AutoCompleteSingleProp,
} from "@/components/autocomplete";
import { red } from "@mui/material/colors";
import { TextareaStyled } from "@/components/textarea";
import TableAnggaran from "@/app/executive-summary/partials/tab4Cascading/table-anggaran";
import React, { SetStateAction } from "react";
import {
  ExsumIndicationState,
  ExsumIndicationStateValue,
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import {
  ExsumInterventionProjectReqDto,
  ExsumInterventionState,
  ProjectTargetAnggaranDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import {
  MiscMasterListProvinsiRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import { ProPDto } from "@/app/misc/rkp/rkpServiceModel";
import theme from "@/theme";
import { FormatCurrency } from "@/lib/utils/currency";

export default function FromProject({
  selectLocation,
  selectProP,
  selectStakeholder,
  state,
  setState,
}: {
  selectLocation: AutoCompleteMultipleProp<MiscMasterListProvinsiRes>;
  selectProP: AutoCompleteSingleProp<ProPDto>;
  selectStakeholder: AutoCompleteSingleProp<MiscMasterListStakeholderRes>;
  state: ExsumIndicationStateValue;
  setState: (value: SetStateAction<ExsumIndicationStateValue>) => void;
}) {
  return (
    <>
      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Format Kode" />
          <TextField
            value={state.non_rincian_output.code}
            onChange={(e) =>
              setState((prev) => {
                const nonR0 = prev.non_rincian_output;
                nonR0.code = e.target.value;
                return {
                  ...prev,
                  non_rincian_output: nonR0,
                };
              })
            }
            variant="outlined"
            size="small"
            placeholder="Format Kode"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={7}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tagging ProP" />
          <AutocompleteSelectSingle
            key={state.non_rincian_output.prop?.id}
            value={selectProP.value}
            options={selectProP.options}
            getOptionLabel={selectProP.getOptionLabel}
            handleChange={selectProP.handleChange}
            placeHolder={selectProP.placeHolder}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={5}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Penanggungjawab" />
          <AutocompleteSelectSingle
            key={state.non_rincian_output.id}
            value={selectStakeholder.value}
            options={selectStakeholder.options}
            handleChange={selectStakeholder.handleChange}
            placeHolder={selectStakeholder.placeHolder}
            getOptionLabel={selectStakeholder.getOptionLabel}
          />
        </FormControl>
      </Grid>
      {/*<Grid item xs={12} md={7}>*/}
      {/*  <FormControl fullWidth>*/}
      {/*    <FieldLabelInfo title="Nomenklatur RO/Project"/>*/}
      {/*    <TextField*/}
      {/*      value={state.non_rincian_output.nomenklatur}*/}
      {/*      onChange={(e) =>*/}
      {/*        setState((prev) => {*/}
      {/*          const nonR0 = prev.non_rincian_output*/}
      {/*          nonR0.nomenklatur = e.target.value*/}
      {/*          return {*/}
      {/*            ...prev,*/}
      {/*            non_rincian_output: nonR0,*/}
      {/*          };*/}
      {/*        })*/}
      {/*      }*/}
      {/*      variant="outlined"*/}
      {/*      size="small"*/}
      {/*      placeholder="Nomenklatur RO/Project"*/}
      {/*      InputLabelProps={{*/}
      {/*        shrink: true,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </FormControl>*/}
      {/*</Grid>*/}
      <Grid item xs={12} md={7}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Lokasi" />
          <AutocompleteSelectMultiple
            value={selectLocation.value}
            options={selectLocation.options}
            getOptionLabel={selectLocation.getOptionLabel}
            handleChange={selectLocation.handleChange}
            placeHolder={selectLocation.placeHolder}
            labelSelectAll={selectLocation.labelSelectAll}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Indikator Project" />
          <TextareaStyled
            value={state.non_rincian_output.indikator}
            onChange={(e) =>
              setState((prev) => {
                const nonR0 = prev.non_rincian_output;
                nonR0.indikator = e.target.value;
                return {
                  ...prev,
                  non_rincian_output: nonR0,
                };
              })
            }
            aria-label="Tuliskan Indikator Project"
            placeholder="Tuliskan Indikator Project"
            minRows={3}
          />
        </FormControl>
      </Grid>

      {state.non_rincian_output.list.length > 0 && (
        <Grid item xs={12}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    Tahun
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    Target
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    Pembiayaan
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    Sumber Pembiayaan
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.non_rincian_output.list.map((row, index) => (
                <GetTableRow
                  key={index}
                  tahun={row.tahun}
                  state={state}
                  setState={setState}
                />
              ))}
            </TableBody>
          </Table>
        </Grid>
      )}
    </>
  );
}

function GetTableRow({
  tahun,
  state,
  setState,
}: {
  tahun: number | string;
  state: ExsumIndicationStateValue;
  setState: (value: SetStateAction<ExsumIndicationStateValue>) => void;
}) {
  const data = state.non_rincian_output.list.find((x) => x.tahun == tahun);
  const handleStateChange = (
    value: string,
    type: keyof ProjectTargetAnggaranDto
  ) => {
    setState((prevState) => {
      let prevSt = { ...prevState };
      let prev = prevSt.non_rincian_output;
      const indexData = prev.list.findIndex((x) => x.tahun == tahun);
      if (indexData > -1) {
        if (type == "target") {
          prev.list[indexData].target = value;
        }
        if (type == "satuan") {
          prev.list[indexData].satuan = value;
        }
        if (type == "anggaranString") {
          prev.list[indexData].anggaranString = FormatCurrency(value);
          prev.list[indexData].anggaran = parseInt(
            value.replace(/[^,\d]/g, "").toString()
          );
        }
        if (type == "sumber_anggaran") {
          prev.list[indexData].sumber_anggaran = value;
        }
      }
      return prevSt;
    });
  };

  return data == undefined ? null : (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{tahun}</TableCell>
      <TableCell>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              value={data.target}
              onChange={(e) => handleStateChange(e.target.value, "target")}
              variant="outlined"
              size="small"
              placeholder="Nilai"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              value={data.satuan}
              onChange={(e) => handleStateChange(e.target.value, "satuan")}
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Satuan"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <TextField
          value={data.anggaranString}
          onChange={(e) => handleStateChange(e.target.value, "anggaranString")}
          variant="outlined"
          size="small"
          placeholder="0"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ input: { textAlign: "right" }, px:0 }}
          InputProps={{
            endAdornment: <InputAdornment position="end" sx={{px:0, marginLeft:0}}>.000,00</InputAdornment>,
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={data.sumber_anggaran}
          onChange={(e) => handleStateChange(e.target.value, "sumber_anggaran")}
          variant="outlined"
          size="small"
          placeholder="Sumber Pembiayaan"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TableCell>
    </TableRow>
  );
}
