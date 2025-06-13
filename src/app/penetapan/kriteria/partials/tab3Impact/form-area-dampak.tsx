import React from "react";
import { Grid, TextField } from "@mui/material";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { ReqAddMatDamKomite } from "./hooks/model";

export default function FormAreaDampak({
  setRequestMatDamKomite,
  mode,
}: {
  setRequestMatDamKomite: React.Dispatch<
    React.SetStateAction<ReqAddMatDamKomite>
  >;
  mode?: string;
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FieldLabelInfo title="Area Dampak" />
        <TextField
          value={mode === "add" ? "" : ""}
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Area Dampak"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setRequestMatDamKomite &&
              setRequestMatDamKomite((prevState: ReqAddMatDamKomite) => ({
                ...prevState,
                dampak: e.target.value,
              }));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldLabelInfo title="Nomor Urut Prioritas" />
        <TextField
          value={mode === "add" ? "" : ""}
          type="number"
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Nomor Urut Prioritas"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setRequestMatDamKomite &&
              setRequestMatDamKomite((prevState: ReqAddMatDamKomite) => ({
                ...prevState,
                prioritas: Number(e.target.value),
              }));
          }}
        />
      </Grid>
    </Grid>
  );
}
