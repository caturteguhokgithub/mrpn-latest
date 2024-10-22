import React, { Fragment, useEffect, useState } from "react";
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
import {
  SxAutocompleteTextField,
  SxAutocomplete,
} from "@/app/components/dropdown/dropdownRkp";
import { columns } from "@/app/manajemen-role/setting";
import { listProvinsi } from "@/app/utils/provinsi";

type Option = (typeof listProvinsi)[number];

export default function FormStakeholder({
  noTitle,
  title,
  listStakeholder,
  selectedStakeholder,
  setSelectedStakeholder,
  description,
  setDescription,
}: {
  noTitle?: boolean;
  title: string;
  listStakeholder: MiscMasterListStakeholderRes[];
  selectedStakeholder: MiscMasterListStakeholderRes[];
  setSelectedStakeholder: (item: number[]) => void;
  description?: string;
  setDescription?: (item: string) => void;
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
    <Grid item xs={12} md={12}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ minWidth: "0 !important", p: 2, height: "100%" }}
      >
        <Stack direction="column">
          {noTitle ? null : (
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              lineHeight={1.3}
              sx={{ minHeight: 54 }}
            >
              {title}
            </Typography>
          )}

          <Stack>
            {" "}
            <Autocomplete
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              freeSolo={false}
              size="small"
              value={columns}
              options={listProvinsi}
              getOptionLabel={(option) => option.nama}
              onChange={(_e, value, reason) => {
                if (reason === "clear" || reason === "removeOption")
                  setSelectAll(false);
                if (
                  reason === "selectOption" &&
                  value.length === listProvinsi.length
                )
                  setSelectAll(true);
                setColumns(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Pilih provinsi"
                />
              )}
              PaperComponent={(paperProps) => {
                const { children, ...restPaperProps } = paperProps;
                return (
                  <Paper {...restPaperProps}>
                    <Box
                      onMouseDown={(e) => e.preventDefault()} // prevent blur
                      pl={1.5}
                      py={0.5}
                    >
                      <FormControlLabel
                        onClick={(e) => {
                          e.preventDefault(); // prevent blur
                          handleToggleSelectAll();
                        }}
                        label="Pilih semua provinsi"
                        control={
                          <Checkbox
                            id="select-all-checkbox"
                            checked={selectAll}
                          />
                        }
                      />
                    </Box>
                    <Divider />
                    {children}
                  </Paper>
                );
              }}
              sx={{
                ...SxAutocomplete,
                ".MuiInputBase-root": {
                  borderRadius: 1,
                },
              }}
            />
            {/* <SearchBar onSearch={handleSearch} />
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
            /> */}
          </Stack>

          {/*<Typography gutterBottom>*/}
          {/*  Keterangan*/}
          {/*</Typography>*/}
          {/*<TextareaStyled*/}
          {/*  aira-label={`Deskripsi ${title}`}*/}
          {/*  placeholder={`Deskripsi ${title}`}*/}
          {/*  minRows={3}*/}
          {/*  value={description}*/}
          {/*  onChange={(e) => setDescription(e.target.value)}*/}
          {/*/>*/}
        </Stack>
      </Paper>
    </Grid>
  );
}
