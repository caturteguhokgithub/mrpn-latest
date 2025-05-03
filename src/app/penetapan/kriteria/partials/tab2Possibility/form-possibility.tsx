import React, { useEffect } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { TextareaStyled } from "@/app/components/textarea";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import { doValues } from "./hooks/possibilityModel";

interface FormPossibilityProps {
  mode?: string;
  state: doValues; // Expecting state to be of type doValues
  setState: (value: doValues) => void; // Function to update state
}

export default function FormPossibility({
  mode,
  state,
  setState,
}: FormPossibilityProps) {
  console.log("FormPossibility state", state, mode);
  // useEffect(() => {
  //   if (mode === "edit" && state) {
  //     // Set initial values for edit mode
  //     setState(state);
  //   }
  // }, [mode, state, setState]);

  const handleChange = (field: keyof doValues, value: string) => {
    // Update state directly with a new object
    setState({
      ...state,
      [field]: value,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan" titleField />
          {mode == "edit" ? (
            <Typography>{state.level_kemungkinan}</Typography>
          ) : (
            <AutocompleteSelectSingle
              value={state.level_kemungkinan}
              options={[
                "Hampir tidak terjadi (1)",
                "Jarang terjadi (2)",
                "Kadang terjadi (3)",
                "Sering terjadi (4)",
                "Hampir pasti terjadi (5)",
              ]}
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
            value={state.probabilitas}
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
            value={state.jumlah_frekuensi}
            onChange={(e) => handleChange("jumlah_frekuensi", e.target.value)}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
