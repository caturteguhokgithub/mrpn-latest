import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { TextareaStyled } from "@/app/components/textarea";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";

export default function FormPossibility({ mode }: { mode?: string }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level Kemungkinan" titleField />
          {mode == "edit" ? (
            <Typography>Jarang terjadi (2)</Typography>
          ) : (
            <AutocompleteSelectSingle
              value={""}
              options={[""]}
              getOptionLabel={(option) => option}
              handleChange={(newValue: any) => {
                console.log(newValue);
              }}
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
            value={mode == "edit" ? "Mode Edit" : ""}
            // onChange={(e) =>
            //   handleSubChange(key, "value", e.target.value)
            // }
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Frekuensi" titleField />
          <TextareaStyled
            minRows={2}
            placeholder="Frekuensi"
            value={mode == "edit" ? "Mode Edit" : ""}
            // onChange={(e) =>
            //   handleSubChange(key, "value", e.target.value)
            // }
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
