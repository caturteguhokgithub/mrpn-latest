import React from "react";
import {
  Autocomplete,
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
          <FieldLabelInfo title="Kategori Risiko" />
          <AutocompleteSelectSingle
            value={value}
            options={optionsList}
            getOptionLabel={(opt: any) => opt.value}
            handleChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            placeHolder={"Pilih kategori risiko"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Sub Kategori Risiko" />
          <AutocompleteSelectMultiple
            value={valueMulti}
            options={optionsList}
            getOptionLabel={(opt: any) => opt.value}
            handleChange={(event: any, newValue: string[]) => {
              setValueMulti(newValue);
            }}
            placeHolder={"Pilih sub kategori risiko"}
            labelSelectAll={"Pilih semua sub kategori"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FieldLabelInfo title="Uraian" />
          {mode === "add" ? (
            <TextareaComponent label="Uraian" placeholder="Uraian" />
          ) : mode === "edit" ? (
            <TextareaComponent label="Uraian" placeholder="Uraian" value="-" />
          ) : (
            <Typography fontWeight={600}>-</Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
}
