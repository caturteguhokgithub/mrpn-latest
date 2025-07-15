import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import { IconFA } from "@/components/icons/icon-fa";
import { VisuallyHiddenInput } from "@/utils/constant";
import TextareaComponent from "@/components/textarea";

export default function FormTable({ mode }: { mode?: string }) {
  const [project, setProject] = React.useState("");
  const [progressStatus, setProgressStatus] = React.useState<string | null>(
    "left"
  );

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleUserLevel = (
    event: React.MouseEvent<HTMLElement>,
    newUserLevel: string | null
  ) => {
    setProgressStatus(newUserLevel);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Peristiwa Kerugian"
            information="Peristiwa Kerugian"
          />
          {mode === "add" ? (
            <TextareaComponent
              label="Peristiwa Kerugian"
              placeholder="Peristiwa Kerugian"
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Peristiwa Kerugian"
              placeholder="Peristiwa Kerugian"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sebab Kerugian" information="Sebab Kerugian" />
          {mode === "add" ? (
            <TextareaComponent
              label="Sebab Kerugian"
              placeholder="Sebab Kerugian"
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Sebab Kerugian"
              placeholder="Sebab Kerugian"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tanggal" information="Tanggal" />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Tanggal"
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
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Lokasi" information="Lokasi" />
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="KLBUBL yang Terlibat"
            information="KLBUBL yang Terlibat"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="KLBUBL yang Terlibat"
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Dampak Keuangan (Rp)"
            information="Dampak Keuangan (Rp)"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Dampak Keuangan (Rp)"
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Dampak Non-keuangan"
            information="Dampak Non-keuangan"
          />
          {mode === "add" ? (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Dampak Non-keuangan"
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo
            title="Tindakan Korektif"
            information="Tindakan Korektif"
          />
          {mode === "add" ? (
            <TextareaComponent
              label="Tindakan Korektif"
              placeholder="Tindakan Korektif"
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Tindakan Korektif"
              placeholder="Tindakan Korektif"
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Keterangan" information="Keterangan" />
          {mode === "add" ? (
            <TextareaComponent label="Keterangan" placeholder="Keterangan" />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Keterangan"
              placeholder="Keterangan"
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
