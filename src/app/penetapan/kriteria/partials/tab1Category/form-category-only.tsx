import React from "react";
import { Grid, TextField } from "@mui/material";
import TextareaComponent from "@/app/components/textarea";

export default function FormCategoryOnly() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Kategori"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextareaComponent width="100%" row={2} label="" placeholder="Uraian" />
      </Grid>
    </Grid>
  );
}
