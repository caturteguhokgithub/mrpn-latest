import React from "react";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import TextareaComponent from "@/components/textarea";

export default function FormTable({ mode }: { mode?: string }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Tahun</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Tahun"
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
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Lokasi</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Lokasi"
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
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Nama PKPPR</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Nama PKPPR"
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
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>KL Utama</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="KL Utama"
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
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Latar Belakang</Typography>
            {mode === "add" ? (
              <TextareaComponent
                label="Latar Belakang"
                placeholder="Latar Belakang"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Latar Belakang"
                placeholder="Latar Belakang"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Ruang Lingkup</Typography>
            {mode === "add" ? (
              <TextareaComponent
                label="Ruang Lingkup"
                placeholder="Ruang Lingkup"
              />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Ruang Lingkup"
                placeholder="Ruang Lingkup"
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
