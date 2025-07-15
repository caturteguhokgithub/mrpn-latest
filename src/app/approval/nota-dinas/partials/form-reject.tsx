import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import TextareaComponent from "@/components/textarea";

export default function FormReject({ mode }: { mode?: string }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {mode === "add" ? (
              <TextareaComponent
                label="Tuliskan Alasan Reject"
                placeholder="Tuliskan Alasan Reject"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Tuliskan Alasan Reject"
                placeholder="Tuliskan Alasan Reject"
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
