import React from "react";
import {
  Autocomplete,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextareaComponent from "@/components/textarea";
import {
  SxAutocompleteTextField,
  SxAutocomplete,
} from "@/components/dropdown/dropdownRkp";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import { grey } from "@mui/material/colors";
import { paramVariantDefault } from "@/utils/constant";

export default function FormProfilRo({ mode }: { mode?: string }) {
  const [project, setProject] = React.useState("");
  const [pkkrCode, setPkkrCode] = React.useState("");
  const [klCode, setKlCode] = React.useState("");
  const [collapsePkkr, setCollapsePkkr] = React.useState(false);

  const [valuePkkr, setValuePkkr] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState("");
  const [valueKl, setValueKl] = React.useState<string | null>("");
  const [inputValueKl, setInputValueKl] = React.useState("");

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleChangePkkr = (value: any) => {
    setPkkrCode(value);
    setCollapsePkkr(!collapsePkkr);
  };

  const handleChangeKl = (value: any) => {
    setKlCode(value);
  };

  const listKodeKl = [
    {
      id: "1",
      value: "1",
      code: "KL-001.001",
      name: "Kementerian Kesehatan",
    },
    {
      id: "2",
      value: "2",
      code: "KL-001.002",
      name: "Kementerian Pertanian",
    },
    {
      id: "3",
      value: "3",
      code: "KL-002.001",
      name: "Kementerian PUPR",
    },
    {
      id: "4",
      value: "4",
      code: "KL-002.002",
      name: "Kementerian Perindustrian",
    },
  ];

  const optionsListKl = listKodeKl.map((item) => {
    return item["code"];
  });

  const listKodePKKR = [
    {
      id: "1",
      value: "1",
      code: "PKKR-001.001",
      name: "PKKR Name 1",
    },
    {
      id: "2",
      value: "2",
      code: "PKKR-001.002",
      name: "PKKR Name 2",
    },
    {
      id: "3",
      value: "3",
      code: "PKKR-002.001",
      name: "PKKR Name 3",
    },
    {
      id: "4",
      value: "4",
      code: "PKKR-002.002",
      name: "PKKR Name 4",
    },
  ];

  const optionsListPkkr = listKodePKKR.map((item) => {
    return item["name"];
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>Kode KL</Typography>
            {mode === "add" || mode === "edit" ? (
              <Autocomplete
                size="small"
                options={optionsListKl}
                // isOptionEqualToValue={(value: any) => value.value}
                // getOptionLabel={(option) => option.code}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Pilih kode KL"
                    sx={SxAutocompleteTextField(paramVariantDefault)}
                  />
                )}
                //
                value={valueKl}
                onChange={(event: any, newValue: string | null) => {
                  setValueKl(newValue);
                }}
                inputValue={inputValueKl}
                onInputChange={(event, newInputValue) => {
                  setInputValueKl(newInputValue);

                  const optionVal = listKodeKl.find((res: any) => {
                    return res.code === newInputValue;
                  });

                  handleChangeKl(optionVal?.value || "");
                }}
                //
                sx={{
                  ...SxAutocomplete,
                  ".MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>KL</Typography>
            {mode === "add" || mode === "edit" ? (
              <TextField
                size="small"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  input: {
                    WebkitTextFillColor: `${grey[800]} !important`,
                    bgcolor: grey[200],
                  },
                }}
                value={
                  klCode === "1"
                    ? listKodeKl[0].name
                    : klCode === "2"
                    ? listKodeKl[1].name
                    : klCode === "3"
                    ? listKodeKl[2].name
                    : klCode === "4"
                    ? listKodeKl[3].name
                    : "-"
                }
              />
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4}>
          <FormControl fullWidth>
            <Typography gutterBottom>Kode PKKR</Typography>
            {mode === "add" ? (
              <Autocomplete
                size="small"
                value={valuePkkr}
                onChange={(event: any, newValue: string | null) => {
                  setValuePkkr(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);

                  const optionVal = listKodePKKR.find((res: any) => {
                    return res.name === newInputValue;
                  });

                  handleChangePkkr(optionVal?.value || "");
                }}
                options={optionsListPkkr}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Pilih kode PKKR"
                    sx={SxAutocompleteTextField(paramVariantDefault)}
                  />
                )}
                sx={{
                  ...SxAutocomplete,
                  ".MuiInputBase-root": {
                    borderRadius: 1,
                  },
                }}
              />
            ) : mode === "edit" ? (
              "-"
            ) : (
              <Typography fontWeight={600}>-</Typography>
            )}
          </FormControl>
        </Grid>
        {pkkrCode === "" ? (
          <Grid item lg={12}>
            <Paper variant="outlined" sx={{ minWidth: "100% !important" }}>
              <EmptyState
                icon={<IconEmptyPage />}
                title="Data Kosong"
                description="Silahkan isi konten ini"
              />
            </Paper>
          </Grid>
        ) : (
          <>
            <Grid item lg={12}>
              <FormControl fullWidth>
                <Typography gutterBottom>Rincian Output (RO)</Typography>
                {mode === "add" ? (
                  <TextareaComponent
                    label="Rincian Output (RO)"
                    placeholder="Rincian Output (RO)"
                  />
                ) : mode === "edit" ? (
                  <TextareaComponent
                    label="Rincian Output (RO)"
                    placeholder="Rincian Output (RO)"
                    value="-"
                  />
                ) : (
                  <Typography fontWeight={600}>-</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <Typography gutterBottom>Target</Typography>
                {mode === "add" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Nilai"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Satuan"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                ) : mode === "edit" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value="2000"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      size="small"
                      value="Orang"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                ) : (
                  <Typography fontWeight={600}>-</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={6}>
              <FormControl fullWidth>
                <Typography gutterBottom>Anggaran</Typography>
                {mode === "add" ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Anggaran"
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
          </>
        )}
      </Grid>
    </>
  );
}
