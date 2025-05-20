import {
  MiscMasterListPerpresRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import { ExsumRegulationDto } from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import React, { SetStateAction } from "react";
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/components/autocomplete";
import { IconFA } from "@/components/icons/icon-fa";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { TextareaStyled } from "@/app/components/textarea";

export default function FormRegulation({
  options,
  optionStakeholder,
  state,
  setState,
  setModalPeraturan,
}: {
  options: MiscMasterListPerpresRes[];
  optionStakeholder: MiscMasterListStakeholderRes[];
  state: ExsumRegulationDto;
  setState: (value: SetStateAction<ExsumRegulationDto>) => void;
  setModalPeraturan: any;
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Entitas" />
          <AutocompleteSelectMultiple
            key={state.stakeholder_id.length}
            value={state.stakeholder}
            options={optionStakeholder}
            getOptionLabel={(opt) => opt.value}
            handleChange={(e: MiscMasterListStakeholderRes[]) =>
              setState((prevState) => {
                let stID: number[] = [];
                if (e.length > 0) {
                  e.map((s) => {
                    stID.push(s.id);
                  });
                }
                return {
                  ...prevState,
                  stakeholder: e,
                  stakeholder_id: stID,
                };
              })
            }
            placeHolder={"Pilih entitas"}
            labelSelectAll={"Pilih semua entitas"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Peraturan Terkait" />
          <AutocompleteSelectSingle
            key={state.perpres_state?.id ?? 0}
            value={state.perpres_state}
            options={options}
            getOptionLabel={(opt) => opt.title}
            handleChange={(e: MiscMasterListPerpresRes) =>
              setState((prevState) => {
                return {
                  ...prevState,
                  perpres_state: e,
                  amanat: e?.value ?? "",
                  perpres: [{ id: e?.id ?? 0 }],
                };
              })
            }
            placeHolder={"Pilih peraturan terkait"}
          // actionButton={
          //   <Box onMouseDown={(e) => e.preventDefault()}>
          //     <Button
          //       startIcon={<IconFA name="circle-plus" size={14} />}
          //       fullWidth
          //       onClick={(e) => {
          //         e.preventDefault();
          //         setModalPeraturan(-1, true, "update");
          //       }}
          //     >
          //       Tambah Peraturan
          //     </Button>
          //   </Box>
          // }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Amanat Peraturan yang Terkait" />
          <Typography fontWeight={500}>{state.amanat || "-"}</Typography>
        </FormControl>
      </Grid>
    </Grid>
  );
}
