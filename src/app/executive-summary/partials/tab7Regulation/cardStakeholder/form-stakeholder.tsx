import React, { Fragment, useEffect, useState, SetStateAction } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TextareaStyled } from "@/app/components/textarea";
import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import SearchBar from "@/app/executive-summary/partials/tab2Profile/partials/imageSearch/searchBar";
import { grey } from "@mui/material/colors";
import StakeholderOptionsForm from "@/app/components/cardStakeholder";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { AutocompleteSelectMultiple } from "@/app/components/autocomplete";
import {
  ExsumCascadingStateDto,
  PropCascadingDto,
} from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramModel";
import {
  SxAutocomplete,
  SxAutocompleteTextField,
} from "@/app/components/dropdown/dropdownDefault";
import { listSelectKp } from "@/app/executive-summary/data";
import { listProvinsi } from "@/app/utils/provinsi";

type Option = (typeof listProvinsi)[number];

export default function FormStakeholder({
  title,
  listStakeholder,
  selectedStakeholder,
  setSelectedStakeholder,
  description,
  setDescription,
}: // setState,
{
  title: string;
  listStakeholder: MiscMasterListStakeholderRes[];
  selectedStakeholder: MiscMasterListStakeholderRes[];
  setSelectedStakeholder: (item: number[]) => void;
  description: string;
  setDescription: (item: string) => void;
  // setState: (value: SetStateAction<ExsumCascadingStateDto>) => void;
}) {
  const [columns, setColumns] = React.useState<Option[]>([]);
  const [selectAll, setSelectAll] = React.useState<boolean>(false);

  const handleToggleSelectAll = () => {
    setSelectAll((prev) => {
      if (!prev) setColumns([...listProvinsi]);
      else setColumns([]);
      return !prev;
    });
  };

  const [filteredImages, setFilteredImages] = useState<
    MiscMasterListStakeholderRes[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query: any) => {
    setSearchTerm(query);
    if (query) {
      const lowercasedQuery = query.toLowerCase();
      setFilteredImages(
        listStakeholder.filter((row) =>
          row.value.toLowerCase().includes(lowercasedQuery)
        )
      );
    } else {
      setFilteredImages(listStakeholder);
    }
  };

  useEffect(() => {
    setFilteredImages(listStakeholder);
  }, [listStakeholder]);

  const convertToCheckedImage = () => {
    let checked: number[] = [];
    selectedStakeholder.map((x) => {
      checked.push(x.id);
    });
    return checked;
  };

  return (
    <Grid item xs={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap={0.5} mb={1}>
            <Typography variant="h6" component="div" lineHeight={1.3}>
              {title}
            </Typography>
            {title !== "Kementerian Koordinator" && (
              <InfoTooltip
                titleSection
                title={
                  title === "Entitas Sektor Utama"
                    ? "Kementerian negara atau lembaga yang mempunyai tanggung jawab utama dalam mengelola risiko pada program, kegiatan, proyek, prioritas pembangunan, dan/atau jenis risiko tertentu yang bersifat lintas sektor"
                    : title === "Entitas Pendukung"
                    ? "Entitas MRPN Pendukung adalah K/L/P/BU/BL yang turut mendukung pelaksanaan Objek MRPN Lintas Sektor termasuk yang menjadi penanggung jawab atas suatu perlakuan risiko"
                    : null
                }
              />
            )}
          </Stack>
          <Stack>
            {/*<Autocomplete*/}
            {/*  multiple*/}
            {/*  disableCloseOnSelect*/}
            {/*  filterSelectedOptions*/}
            {/*  freeSolo={false}*/}
            {/*  size="small"*/}
            {/*  value={columns}*/}
            {/*  options={listProvinsi}*/}
            {/*  getOptionLabel={(option) => option.nama}*/}
            {/*  onChange={(_e, value, reason) => {*/}
            {/*    if (reason === "clear" || reason === "removeOption")*/}
            {/*      setSelectAll(false);*/}
            {/*    if (*/}
            {/*      reason === "selectOption" &&*/}
            {/*      value.length === listProvinsi.length*/}
            {/*    )*/}
            {/*      setSelectAll(true);*/}
            {/*    setColumns(value);*/}
            {/*  }}*/}
            {/*  renderInput={(params) => (*/}
            {/*    <TextField*/}
            {/*      {...params}*/}
            {/*      InputLabelProps={{*/}
            {/*        shrink: true,*/}
            {/*      }}*/}
            {/*      placeholder="Pilih provinsi"*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  PaperComponent={(paperProps) => {*/}
            {/*    const { children, ...restPaperProps } = paperProps;*/}
            {/*    return (*/}
            {/*      <Paper {...restPaperProps}>*/}
            {/*        <Box*/}
            {/*          onMouseDown={(e) => e.preventDefault()} // prevent blur*/}
            {/*          pl={1.5}*/}
            {/*          py={0.5}*/}
            {/*        >*/}
            {/*          <FormControlLabel*/}
            {/*            onClick={(e) => {*/}
            {/*              e.preventDefault(); // prevent blur*/}
            {/*              handleToggleSelectAll();*/}
            {/*            }}*/}
            {/*            label="Pilih semua provinsi"*/}
            {/*            control={*/}
            {/*              <Checkbox*/}
            {/*                id="select-all-checkbox"*/}
            {/*                checked={selectAll}*/}
            {/*              />*/}
            {/*            }*/}
            {/*          />*/}
            {/*        </Box>*/}
            {/*        <Divider />*/}
            {/*        {children}*/}
            {/*      </Paper>*/}
            {/*    );*/}
            {/*  }}*/}
            {/*  sx={{*/}
            {/*    ...SxAutocomplete,*/}
            {/*    ".MuiInputBase-root": {*/}
            {/*      borderRadius: 1,*/}
            {/*    },*/}
            {/*  }}*/}
            {/*/>*/}

            {/* <AutocompleteSelectMultiple
              value={state.values[indexTags].stakeholder.main}
              options={listStakeholder}
              getOptionLabel={(opt) => opt.value}
              handleChange={(val: MiscMasterListStakeholderRes[]) =>
                setState((prevState) => {
                  const prevValue = prevState.values;
                  const prevEntity = prevValue[indexTags].stakeholder;
                  prevEntity.main = val;
                  return {
                    ...prevState,
                    values: prevValue,
                  };
                })
              }
              placeHolder={
                title === "Kementerian Koordinator"
                  ? "Pilih kementerian koordinator"
                  : title === "Entitas Sektor Utama"
                  ? "Pilih entitas utama"
                  : "Pilih entitas pendukung"
              }
              labelSelectAll={
                title === "Kementerian Koordinator"
                  ? "Pilih semua kementerian"
                  : "Pilih semua entitas"
              }
            /> */}
            <SearchBar onSearch={handleSearch} />
            <Typography
              mt={1}
              variant="caption"
              component="span"
              color={grey[600]}
              fontStyle="italic"
            >
              Klik logo untuk pilih multi-anggota stakeholder
            </Typography>

            <StakeholderOptionsForm
              images={filteredImages}
              searchTerm={searchTerm}
              checkedImage={convertToCheckedImage()}
              handleCheckImage={setSelectedStakeholder}
            />
          </Stack>

          {/* <Typography gutterBottom>Keterangan</Typography>
     <TextareaStyled
      aira-label={`Deskripsi ${title}`}
      placeholder={`Deskripsi ${title}`}
      minRows={3}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
     /> */}
        </Stack>
      </Paper>
    </Grid>
  );
}
