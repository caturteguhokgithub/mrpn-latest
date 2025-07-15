import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";

export default function FormSasaran({ mode }: { mode?: string }) {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Outcome/Dampak</Typography>
          {mode === "add" ? (
            <TextareaComponent
              label="Outcome/Dampak"
              placeholder="Outcome/Dampak"
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Outcome/Dampak"
              placeholder="Outcome/Dampak"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item lg={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Kode Sasaran AP</Typography>
          {mode === "add" ? (
            <TextField
              variant="outlined"
              placeholder="Kode Sasaran AP"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : mode === "edit" ? (
            <TextField
              variant="outlined"
              size="small"
              value="-"
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item lg={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Sasaran AP</Typography>
          {mode === "add" ? (
            <TextareaComponent label="Sasaran PN" placeholder="Sasaran PN" />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Sasaran PN"
              placeholder="Sasaran PN"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      {/* <Grid item lg={12}>
     <FormControl fullWidth>
      {mode === "add" ? (
       <FormControlLabel control={<Checkbox />} label="Highlight" />
      ) : mode === "edit" ? (
       <FormControlLabel control={<Checkbox />} label="Highlight" />
      ) : (
       <FormControlLabel control={<Checkbox />} label="Highlight" />
      )}
     </FormControl>
    </Grid> */}
    </Grid>
  );
}
