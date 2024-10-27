import React from "react";
import {
  Autocomplete,
  Chip,
  Divider,
  FormControl,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/app/components/textarea";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";
import { SxParams } from "@/app/executive-summary/types";
import {
  SxAutocomplete,
  SxAutocompleteTextField,
} from "@/app/components/dropdown/dropdownDefault";
import {
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
} from "@/app/components/autocomplete";

export const listKategori = [
  {
    id: "1",
    value: 1,
    name: "Ekonomi",
  },
  {
    id: "2",
    value: 2,
    name: "Geopolitik",
  },
  {
    id: "3",
    value: 3,
    name: "Teknologi",
  },
  {
    id: "4",
    value: 4,
    name: "Lingkungan",
  },
  {
    id: "5",
    value: 5,
    name: "Sosial",
  },
  {
    id: "6",
    value: 6,
    name: "Tata Kelola",
  },
];

export default function FormKategori({ mode }: { mode?: string }) {
  const [value, setValue] = React.useState<string | null>("");
  const [valueMulti, setValueMulti] = React.useState<string[]>([]);

  const optionsList = listKategori.map((item) => {
    return `${item["name"]}`;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Area Dampak" />
          {mode === "add" ? (
            <TextareaComponent
              label="Area Dampak"
              placeholder="Area Dampak"
              row={2}
            />
          ) : mode === "edit" ? (
            <TextareaComponent
              label="Area Dampak"
              placeholder="Area Dampak"
              row={2}
              value="-"
            />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Level" />
          <AutocompleteSelectSingle
            value={value}
            options={optionsList}
            getOptionLabel={(opt: any) => opt.value}
            handleChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            placeHolder={"Pilih level"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Chip label="Level Dampak" size="small" />
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sangat Rendah (1)" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Deskripsi sangat rendah (1)"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Rendah (2)" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Deskripsi rendah (2)"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sedang (3)" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Deskripsi sedang (3)"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Tinggi (4)" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Deskripsi tinggi (4)"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sangat Tinggi (5)" />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Deskripsi sangat tinggi (5)"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
