import React from "react";
import {
  Chip,
  Divider,
  FormControl,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import TextareaComponent from "@/app/components/textarea";

export default function FormKemungkinan({ mode }: { mode?: string }) {
  return (
    <>
      {mode === "add" ? (
        <Paper sx={{ overflowX: "auto", minWidth: "100% !important" }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell width="30%">Level Kemungkinan</TableCell>
                <TableCell>Probabilitas</TableCell>
                <TableCell>Jumlah Frekuensi</TableCell>
                <TableCell>Low frequency event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Hampir tidak terjadi (1)</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Probabilitias"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Jumlah Frekuensi"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Low frequency event"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jarang terjadi (2)</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Probabilitias"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Jumlah Frekuensi"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Low frequency event"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Kadang terjadi (3)</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Probabilitias"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Jumlah Frekuensi"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Low frequency event"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sering terjadi (4)</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Probabilitias"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Low frequency event"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Jumlah Frekuensi"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hampir pasti terjadi (5)</TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Probabilitias"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Jumlah Frekuensi"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Low frequency event"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Level Kemungkinan" />
              <Typography fontWeight={600}>Hampir tidak terjadi (1)</Typography>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Chip
                label="Non low frequency event dalam 1 periode analisis"
                size="small"
              />
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Probabilitias" />
              <TextField
                variant="outlined"
                size="small"
                placeholder="Deskripsi probabilitias"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Jumlah Frekuensi" />
              <TextField
                variant="outlined"
                size="small"
                placeholder="Deskripsi jumlah Frekuensi"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Low frequency event" />
              <TextField
                variant="outlined"
                size="small"
                placeholder="Deskripsi low frequency event"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </>
  );
}
