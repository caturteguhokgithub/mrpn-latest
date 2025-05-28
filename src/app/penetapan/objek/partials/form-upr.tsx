import SearchField from "./search-bar";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchResult from "./search-result";
import TreeView from "./tree-view";
import { Fragment, useState } from "react";
import { AutocompleteSelectSingle } from "@/app/components/autocomplete";
import usePenetapanObjectVM from "../pageVM";
import AddButton from "@/app/components/buttonAdd";

export default function FormUPR({}: {}) {
  const { setStateTopic } = usePenetapanObjectVM();

  const [items, setItem] = useState([{ id: 1 }]);

  const add = () => {
    let arr = [...items];
    if (arr.length >= 10) {
      return;
    } else {
      arr.push({ id: Math.floor(Math.random() * 1000) });
    }
    const newItem = arr;
    setItem(newItem);
  };

  const minus = (nowId: any) => {
    let arr = [...items];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItem(newArr);
  };

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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600}>Entitas MRPN</Typography>
          <Box>
            <AddButton title="Tambah Entitas" small noMargin onclick={add} />
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {items.map((tags: any, key: any) => (
            <Grid item xs={12} key={`${tags.id}`}>
              <Paper
                variant="outlined"
                elevation={0}
                sx={{ p: 2, minWidth: "0 !important" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Stack justifyContent="space-between" direction="row" mb={1}>
                        <Typography gutterBottom>Entitas MRPN</Typography>
                        {key > 0 && (
                          <AddButton
                            small
                            errorColor
                            title="Hapus"
                            noMargin
                            onclick={() => minus(tags.id)}
                          />
                        )}
                      </Stack>
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
                        <RadioGroup
                          row
                          sx={{ justifyContent: "space-between" }}
                        >
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
