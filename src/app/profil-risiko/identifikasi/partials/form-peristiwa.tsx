import React from "react";
import { FormControl, Grid, Typography } from "@mui/material";
import { TextareaStyled } from "@/app/components/textarea";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";

export default function FormPeristiwa({}: {}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl
          fullWidth
          sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}
        >
          <FieldLabelInfo
            title="Dibuat Tanggal Jam"
            sx={{ "& > p": { margin: 0 } }}
          />
          <Typography>24 Okt 2025 09:56:22</Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Peristiwa Risiko Strategis MRPN LS"
            titleField
          />
          <TextareaStyled minRows={4} placeholder="Peristiwa Risiko" />
        </FormControl>
      </Grid>
    </Grid>
  );
}
