import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import TextareaComponent from "@/app/components/textarea";

export default function FormNote({ mode }: { mode?: string }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          {mode === "add" ? (
            <TextareaComponent label="Catatan" placeholder="Catatan" />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Catatan"
              placeholder="Catatan"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
