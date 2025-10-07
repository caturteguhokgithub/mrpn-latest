import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { SetStateAction, useEffect } from "react";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { ProPDto, RODataTable } from "@/app/misc/rkp/rkpServiceModel";
import { FormatIDR } from "@/lib/utils/currency";
import { ExsumIndicationStateValue } from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import FieldLabelInfo from "@/components/fieldLabelInfo";
import {
  AutoCompleteMultipleProp,
  AutocompleteSelectMultiple,
  AutocompleteSelectSingle,
  AutoCompleteSingleProp,
} from "@/components/autocomplete";
import { blue, orange, red } from "@mui/material/colors";
import FormProject from "@/app/executive-summary/partials/tab9Indication/partials/formProject";
import {
  MiscMasterListProvinsiRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import Iconify from "@/components/icons/iconify";

export default function FormPerlakuanRisiko({
  optionRO,
  listLocation,
  listProP,
  listStakeholder,
  state,
  setState,
  handleAddNomenklatur,
}: {
  optionRO: RODataTable[];
  listLocation: MiscMasterListProvinsiRes[];
  listProP: ProPDto[];
  listStakeholder: MiscMasterListStakeholderRes[];
  state: ExsumIndicationStateValue;
  setState: (value: SetStateAction<ExsumIndicationStateValue>) => void;
  handleAddNomenklatur: () => void;
}) {
  const { year, rpjmn } = useRKPContext((store) => store);

  useEffect(() => {
    if (state.type == "NON_RO" && year > 0) {
      handleListProject([year]);
    }
  }, [state.type, year]);

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

  const getRowData = (key: string, data: RODataTable | undefined) => {
    if (data == undefined) return "";
    const obj: any = JSON.parse(JSON.stringify(data));
    return obj[key];
  };

  const selectLocation: AutoCompleteMultipleProp<MiscMasterListProvinsiRes> = {
    value: state.non_rincian_output.location,
    options: listLocation,
    getOptionLabel: (opt) => opt.name,
    handleChange: (value: MiscMasterListProvinsiRes[]) =>
      setState((prev) => {
        const nonRO = state.non_rincian_output;
        nonRO.location = value;
        return {
          ...prev,
          non_rincian_output: nonRO,
        };
      }),
    placeHolder: "Pilih Lokasi",
    labelSelectAll: "Pilih semua lokasi",
  };

  const selectProP: AutoCompleteSingleProp<ProPDto> = {
    value: state.non_rincian_output.prop,
    options: listProP,
    getOptionLabel: (opt) => opt.code + " - " + opt.value,
    handleChange: (value: ProPDto) =>
      setState((prevState) => {
        const nonRO = state.non_rincian_output;
        nonRO.prop = value;
        return {
          ...prevState,
          non_rincian_output: nonRO,
        };
      }),
    placeHolder: "Pilih tagging ProP",
  };

  const selectStakeholder: AutoCompleteSingleProp<MiscMasterListStakeholderRes> =
    {
      value: state.non_rincian_output.kementrian,
      options: listStakeholder,
      getOptionLabel: (opt) => opt.value,
      handleChange: (value: MiscMasterListStakeholderRes) =>
        setState((prev) => {
          const nonRO = state.non_rincian_output;
          nonRO.kementrian = value;
          return {
            ...prev,
            non_rincian_output: nonRO,
          };
        }),
      placeHolder: "Pilih Penanggungjawab",
    };

  const handleListProject = (years: number[]) => {
    setState((prevState) => {
      const nonRO = prevState.non_rincian_output;

      years.sort((a, b) => a - b);

      nonRO.list.map((l, iL) => {
        const checkIndex = years.findIndex((x) => x == l.tahun);
        if (checkIndex == -1) {
          nonRO.list.splice(iL, 1);
        }
      });

      years.map((y) => {
        const getIndexList = nonRO.list.findIndex((x) => x.tahun == y);
        if (getIndexList == -1) {
          nonRO.list.push({
            tahun: y,
            target: "",
            satuan: "",
            anggaranString: "",
            anggaran: 0,
            sumber_anggaran: "",
          });
        }
      });

      nonRO.list.sort((a, b) => {
        let aYear: number =
          typeof a.tahun === "number" ? a.tahun : parseInt(a.tahun);
        let bYear: number =
          typeof b.tahun === "number" ? b.tahun : parseInt(b.tahun);
        return aYear - bYear;
      });

      return {
        ...prevState,
        tahun: years,
        non_rincian_output: nonRO,
      };
    });
  };

  const optionsNomenklatur = [
    "nomenklatur-1",
    "nomenklatur-2",
    "nomenklatur-3",
  ];

  return (
    <Box
      maxHeight="90vh"
      overflow="auto"
      // pb={0.5}
      // px={3}
      sx={{
        "&::-webkit-scrollbar": {
          width: "3px",
        },
      }}
    >
      <Grid container spacing={2} p={3} pt={0}>
        <Grid item xs={12} md={year == 0 ? 6 : 4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Tahun" titleField />
            {year == 0 ? (
              <AutocompleteSelectMultiple
                key={state.tahun.length}
                value={state.tahun}
                options={multiyear}
                getOptionLabel={(opt) => opt.toString()}
                handleChange={(e: number[]) => handleListProject(e)}
                placeHolder={"Pilih tahun"}
                labelSelectAll={"Pilih semua tahun"}
              />
            ) : (
              <Typography>{state.tahun.join(",")}</Typography>
            )}
            {/* <TextareaStyled value={state.tahun.join(",")} disabled /> */}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={year == 0 ? 3 : 4}>
          <FormControl fullWidth>
            <FieldLabelInfo title="Jenis Output" />
            <Stack direction="column" justifyContent="center" height={40}>
              <Box>
                <Chip
                  label={
                    state.type == "RO"
                      ? "RO"
                      : state.type == "NON_RO"
                      ? "NON-RO"
                      : "Pilih jenis output"
                  }
                  sx={{
                    px: 1,
                    fontWeight: 600,
                    bgcolor: state.type == "RO" ? blue[800] : orange[800],
                    textTransform: "uppercase",
                    color: "white",
                  }}
                />
              </Box>
            </Stack>
            {/* <ToggleButtonGroup
              disabled={true}
              color="primary"
              value={state.type}
              exclusive
              onChange={(
                event: React.MouseEvent<HTMLElement>,
                newAlignment: string
              ) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    type: newAlignment,
                  };
                });
              }}
            >
              <ToggleButton
                value="RO"
                sx={{
                  width: "50%",
                  lineHeight: 1,
                  color: blue[600],
                  borderColor: blue[600],
                  "&.Mui-selected": {
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                  },
                }}
              >
                RO
              </ToggleButton>
              <ToggleButton
                value="NON_RO"
                sx={{
                  width: "50%",
                  lineHeight: 1,
                  color: blue[600],
                  borderColor: blue[600],
                  "&.Mui-selected": {
                    bgcolor: red[700],
                    color: "white",
                  },
                }}
              >
                NON RO
              </ToggleButton>
            </ToggleButtonGroup> */}
          </FormControl>
        </Grid>

        {state.type != "" && (
          <Grid item xs={6} md={year == 0 ? 3 : 4}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Intervensi Kunci" />
              <FormControlLabel
                control={
                  <Checkbox
                    key={year}
                    disabled={state.type == "NON_RO" && year == 0}
                    checked={
                      state.type == "NON_RO" && year == 0
                        ? state.intervention
                        : state.intervention
                    }
                    onChange={(checked) =>
                      setState((prevState) => {
                        return {
                          ...prevState,
                          intervention: checked.target.checked,
                        };
                      })
                    }
                  />
                }
                label={
                  <Typography fontWeight={600} color={red[600]} fontSize={12}>
                    Intervensi Kunci
                  </Typography>
                }
              />
            </FormControl>
          </Grid>
        )}

        {state.type == "RO" && (
          <Grid item xs={12} md={year == 0 ? 12 : 12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Rincian Output" titleField />
              <AutocompleteSelectSingle
                value={state.rincian_output}
                options={optionRO}
                getOptionLabel={(opt) => opt.value}
                handleChange={(e: RODataTable) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      rincian_output: e,
                    };
                  });
                }}
                placeHolder={"Pilih rincian output"}
              />
            </FormControl>
          </Grid>
        )}

        {state.type == "NON_RO" && (
          <Grid item xs={12} md={year == 0 ? 12 : 12}>
            <FormControl fullWidth>
              <FieldLabelInfo title="Output" titleField />
              {/* <TextField
                value={state.non_rincian_output.nomenklatur}
                onChange={(e) =>
                  setState((prev) => {
                    const nonR0 = prev.non_rincian_output;
                    nonR0.nomenklatur = e.target.value;
                    return {
                      ...prev,
                      non_rincian_output: nonR0,
                    };
                  })
                }
                variant="outlined"
                size="small"
                placeholder="Nomenklatur RO/Project"
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              <AutocompleteSelectSingle
                key={state.non_rincian_output.nomenklatur}
                value={state.non_rincian_output.nomenklatur}
                options={optionsNomenklatur}
                getOptionLabel={(opt) => opt}
                handleChange={(e: string) =>
                  setState((prevState) => {
                    const nonRO = prevState.non_rincian_output;
                    nonRO.nomenklatur = e;
                    return {
                      ...prevState,
                      non_rincian_output: nonRO,
                    };
                  })
                }
                placeHolder={"Pilih nomenklatur RO/project"}
                actionButton={
                  <Box onMouseDown={(e) => e.preventDefault()}>
                    <Button
                      startIcon={<Iconify name="mdi:plus-circle" size={16} />}
                      fullWidth
                      onClick={handleAddNomenklatur}
                    >
                      Tambah Nomenklatur RO/Project
                    </Button>
                  </Box>
                }
              />
            </FormControl>
          </Grid>
        )}

        {state.type == "NON_RO" && (
          <FormProject
            state={state}
            setState={setState}
            selectStakeholder={selectStakeholder}
            selectLocation={selectLocation}
            selectProP={selectProP}
          />
        )}
      </Grid>

      {state.type == "RO" && state.rincian_output != undefined && (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            "td, th": {
              "&.MuiTableCell-root": {
                border: "1px solid rgb(224, 224, 224)",
              },
              "&:first-of-type": {
                borderLeft: 0,
              },
            },
            "&::-webkit-scrollbar": {
              height: "6px",
            },
          }}
        >
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell rowSpan={2}>Format Kode</TableCell>
                <TableCell rowSpan={2}>Penanggungjawab</TableCell>
                {multiyear.map((y, iY) => (
                  <TableCell colSpan={4} align={"center"}>
                    {y}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {multiyear.map((y, iY) => (
                  <>
                    <TableCell>Target</TableCell>
                    <TableCell>Satuan</TableCell>
                    <TableCell>Pembiayaan</TableCell>
                    <TableCell>Sumber Pembiayaan</TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{state.rincian_output.code}</TableCell>
                <TableCell>
                  {state.rincian_output?.kementrian?.value ?? "-"}
                </TableCell>
                {multiyear.map((y, iY) => (
                  <>
                    <TableCell>
                      {getRowData(`target_${iY}`, state.rincian_output)}
                    </TableCell>
                    <TableCell>
                      {getRowData(`satuan_${iY}`, state.rincian_output)}
                    </TableCell>
                    <TableCell align={"right"}>
                      {FormatIDR(
                        getRowData(`anggaran_${iY}`, state.rincian_output)
                      )}
                    </TableCell>
                    <TableCell>
                      {getRowData(
                        `sumber_anggaran_${iY}`,
                        state.rincian_output
                      )}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
