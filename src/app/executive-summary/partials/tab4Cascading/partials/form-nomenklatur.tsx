import React, { SetStateAction } from "react";
import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TableProfilRoKunci from "../table-profil-ro-kunci";
import {
  SxAutocompleteTextField,
  SxAutocomplete,
} from "@/components/dropdown/dropdownRkp";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { listTagProP } from "@/app/executive-summary/data";
import { paramVariantDefault } from "@/utils/constant";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { ProPDto } from "@/app/misc/rkp/rkpServiceModel";
import {
  ExsumCascadingStateDto,
  PropCascadingDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramModel";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import TableProp from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/table-prop";

export default function FormNomenklatur({
  optionStakeholder,
  optionProp,
  state,
  setState,
}: {
  optionStakeholder: MiscMasterListStakeholderRes[];
  optionProp: PropCascadingDto[];
  state: ExsumCascadingStateDto;
  setState: (value: SetStateAction<ExsumCascadingStateDto>) => void;
}) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Nomenklatur IKU"
              information="Nomenklatur IKU"
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Nomenklatur IKU"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <FieldLabelInfo title="KL Pengampu" information="KL Pengampu" />
            <AutocompleteSelectSingle
              key={optionStakeholder.length}
              value={state.src_stakeholder_id}
              options={optionStakeholder}
              getOptionLabel={(opt) => opt.value}
              handleChange={(e: MiscMasterListStakeholderRes) =>
                setState((prevState) => {
                  return {
                    ...prevState,
                    src_stakeholder_id: e,
                  };
                })
              }
              placeHolder={"Pilih KL Pengampu"}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <TableProp data={optionProp} setState={setState} />
    </>
  );
}
