import React, { SetStateAction } from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import TextareaComponent, { TextareaStyled } from "@/components/textarea";
import { dtoGetApproval } from "@/app/penetapan/objek/pageModel";

export default function FormNote({
  mode,
  state,
  setState,
}: {
  mode?: string
  state?: dtoGetApproval;
  setState?: (value: SetStateAction<dtoGetApproval>) => void;
}) {
  const handleChange = (e: string) => {
    if (setState) {
      setState((prevState) => ({
        ...prevState,
        message: e,
      }));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          {mode === "add" ? (
            <TextareaStyled
              aria-label="Catatan penolakan"
              placeholder="Catatan penolakan"
              minRows={3}
              value={state?.message ?? ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          ) : mode === "edit" ? (
            <TextareaStyled
              aria-label="Catatan penolakan"
              placeholder="Catatan penolakan"
              minRows={3}
              value={state?.message ?? ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
