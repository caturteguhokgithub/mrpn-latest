import SearchField from "./search-bar";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchResult from "./search-result";
import TreeView from "./tree-view";
import { Fragment } from "react";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import usePenetapanObjectVM from "../pageVM";

export default function FormUPR({}: {}) {
  const { setStateTopic } = usePenetapanObjectVM();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Objek Shortlist</Typography>
          <AutocompleteSelectSingle
            value={""}
            options={[
              "Percepatan Pembangunan Destinasi Pariwisata Prioritas Danau Toba",
              "Eliminasi Penyakit Kusta & Schistosomiasis",
            ]}
            getOptionLabel={(option) => option}
            handleChange={(newValue: string) =>
              setStateTopic((prev) => ({
                ...prev,
                level_kemungkinan: newValue,
              }))
            }
            placeHolder={"Pilih objek shortlist"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>Entitas MRPN</Typography>
          <AutocompleteSelectSingle
            value={""}
            options={[
              "Badan Pengawas Tenaga Nuklir (BAPETEN)",
              "Pemerintah Kabupaten Kepulauan Mentawai",
              "Kementerian Lingkungan Hidup dan Kehutanan (KLHK)",
              "Kementerian Kelautan dan Sumber Daya Manusia (Kemenkes)",
              "Mahkamah Agung (MA)",
              "Kementerian Perhubungan (Kemenhub)",
              "Kementerian Dalam Negeri (Kemendagri)",
              "Kementerian Keuangan (Kemenkeu)",
              "Kementerian Energi dan Sumber Daya Mineral (ESDM)",
              "Kementerian Perindustrian (Kemenperin)",
              "Kementerian Perdagangan (Kemendag)",
            ]}
            getOptionLabel={(option) => option}
            handleChange={(newValue: string) =>
              setStateTopic((prev) => ({
                ...prev,
                level_kemungkinan: newValue,
              }))
            }
            placeHolder={"Pilih entitas MRPN"}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography gutterBottom>UPR</Typography>
          <Stack>
            <RadioGroup row sx={{ justifyContent: "space-between" }}>
              <FormControlLabel
                value="koordinator"
                control={<Radio />}
                label="Koordinator"
              />
              <FormControlLabel
                value="utama"
                control={<Radio />}
                label="Utama"
              />
              <FormControlLabel
                value="pendukung"
                control={<Radio />}
                label="Pendukung"
              />
            </RadioGroup>
          </Stack>
        </FormControl>
      </Grid>
    </Grid>
  );
}
