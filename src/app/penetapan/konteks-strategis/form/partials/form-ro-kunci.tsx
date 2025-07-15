import React from "react";
import {
  Chip,
  Divider,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";

export default function FormROKunci({ mode }: { mode?: string }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Kode RO</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Kode RO"
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
            <Typography gutterBottom>Nama RO</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Nama RO"
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
          <Divider>
            <Chip label="Indikator Sasaran" size="small" />
          </Divider>
        </Grid>
        <Grid item lg={12}>
          <FormControl fullWidth>
            <Typography gutterBottom>Uraian</Typography>
            {mode === "add" ? (
              <TextareaComponent label="Uraian" placeholder="Uraian" />
            ) : mode === "edit" ? (
              <TextareaComponent
                label="Uraian"
                placeholder="Uraian"
                value="-"
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>Satuan</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Satuan"
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
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>Target Fisik</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Target Fisik"
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
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>Keuangan</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Keuangan"
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
          <Divider />
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth>
            <Typography gutterBottom>Kementerian</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Kementerian"
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
            <Typography gutterBottom>Kode</Typography>
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Kode"
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
      </Grid>
    </>
  );
}
