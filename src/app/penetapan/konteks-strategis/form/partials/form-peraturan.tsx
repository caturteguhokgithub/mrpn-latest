import React from "react";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import TextareaComponent from "@/components/textarea";
import FieldLabelInfo from "@/components/fieldLabelInfo";

export default function FormPeraturan({ mode }: { mode?: string }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Peraturan Terkait"
              information="Peraturan Terkait"
            />
            {mode === "add" ? (
              <TextareaComponent
                label="Peraturan Terkait"
                placeholder="Peraturan Terkait"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Peraturan Terkait"
                placeholder="Peraturan Terkait"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo
              title="Amanat Peraturan yang Terkait"
              information="Amanat Peraturan yang Terkait"
            />
            {mode === "add" ? (
              <TextareaComponent
                label="Amanat Peraturan yang Terkait"
                placeholder="Amanat Peraturan yang Terkait"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Amanat Peraturan yang Terkait"
                placeholder="Amanat Peraturan yang Terkait"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
