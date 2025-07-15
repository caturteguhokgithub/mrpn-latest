import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { TextareaStyled } from "@/components/textarea";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { doValues } from "./hooks/possibilityModel";
import { cloneDeep, isEmpty } from "lodash";

interface FormPossibilityProps {
  mode?: string;
  state?: doValues; // Expecting state to be of type doValues
  setState: (value: doValues) => void; // Function to update state
  dropDownOptions: string[];
}

export default function FormPossibility({
  mode,
  state,
  setState,
  dropDownOptions,
}: FormPossibilityProps) {
  // useEffect(() => {
  //   if (mode === "edit" && state) {
  //     // Set initial values for edit mode
  //     setState(state);
  //   }
  // }, [mode, state, setState]);

  const handleChange = (field: keyof doValues, value: string) => {
    // Update state directly with a new object
    const tempState: any = !isEmpty(state)
      ? cloneDeep(state)
      : {
          level_kemungkinan: "",
          probabilitas: "",
          jumlah_frekuensi: "",
          low_frekuensi: "",
        };

    console.log({ tempState });
    if (!isEmpty(tempState)) {
      console.log({ tempState, value, field });
      setState({
        ...tempState,
        [field]: value,
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan" titleField />
          {mode == "edit" ? (
            <Typography>{state?.level_kemungkinan}</Typography>
          ) : (
            <AutocompleteSelectSingle
              value={state?.level_kemungkinan}
              options={dropDownOptions}
              getOptionLabel={(option) => option}
              handleChange={(newValue: string) =>
                handleChange("level_kemungkinan", newValue)
              }
              placeHolder={"Pilih level kemungkinan"}
            />
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Persentase" titleField />
          <TextareaStyled
            minRows={2}
            placeholder="Persentase"
            value={state?.probabilitas}
            onChange={(e) => handleChange("probabilitas", e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Frekuensi" titleField />
          <TextareaStyled
            minRows={2}
            placeholder="Frekuensi"
            value={state?.jumlah_frekuensi}
            onChange={(e) => handleChange("jumlah_frekuensi", e.target.value)}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
