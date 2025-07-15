import React from "react";
import {
  FormControl,
  Grid,
  Grow,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SelectCustomTheme from "@/components/select";
import { grey } from "@mui/material/colors";
import FieldLabelInfo from "@/components/fieldLabelInfo";

export default function FormTable({ mode }: { mode?: string }) {
  const [roDropdown, setRoDropdown] = React.useState("");

  const handleChangeRo = (event: SelectChangeEvent) => {
    setRoDropdown(event.target.value);
  };

  const listKlasifikasi = [
    "L1: Entitas Utama Unit Pemilik Risiko",
    "L1: Entitas Pendukung Unit Pemilik Risiko (UPR)",
    "L2: Sekretariat Komite",
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Nama User" information="Nama User" />
            {mode === "add" ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Nama User"
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
            <FieldLabelInfo title="Klasifikasi" information="Klasifikasi" />
            {mode === "add" || mode === "edit" ? (
              <SelectCustomTheme
                defaultStyle
                small
                anchorRight
                value={roDropdown}
                onChange={handleChangeRo}
              >
                <MenuItem value="" disabled>
                  <Typography
                    fontSize={14}
                    fontStyle="italic"
                    color={grey[600]}
                    fontWeight={600}
                  >
                    Pilih klasifikasi
                  </Typography>
                </MenuItem>
                {listKlasifikasi.map((klasifikasiLabel, index) => (
                  <MenuItem key={index} value={klasifikasiLabel}>
                    {klasifikasiLabel}
                  </MenuItem>
                ))}
              </SelectCustomTheme>
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
