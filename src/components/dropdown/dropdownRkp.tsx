import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Grow,
  Tooltip,
  Autocomplete,
  TextField,
  Input,
  OutlinedInput,
  InputAdornment,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { listSelectKp } from "@/app/executive-summary/data";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { SxParams } from "@/app/executive-summary/types";
import useRkpVM from "@/components/dropdown/rkpVM";
import { useExsumContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { IconFA } from "../icons/icon-fa";

export const SxAutocompleteTextField = (params: SxParams) => {
  return {
    "input::-webkit-input-placeholder": {
      color: params.variant === "primary" ? "white" : grey[600],
      opacity: 1,
      fontStyle: "italic",
    },
  };
};

export const SxAutocomplete = (params: SxParams) => {
  return {
    minWidth: 300,
    color:
      params.variant === "primary" ? "white" : theme.palette.secondary.dark,
    ".MuiInputBase-root": {
      height: "38px",
      fontWeight: 600,
      fontSize: 14,
      py: 0,
      borderRadius: 6,
      bgcolor:
        params.variant === "primary" ? theme.palette.primary.main : "white",
      [theme.breakpoints.down("md")]: {
        fontSize: 12,
      },
    },
    ".MuiInputBase-input": {
      color:
        params.variant === "primary" ? "white" : theme.palette.secondary.dark,
    },
    ".MuiSvgIcon-root": {
      //   fill: "white",
      fill: params.variant === "primary" ? "white" : grey[600],
    },
    [theme.breakpoints.down("md")]: {
      minWidth: 200,
    },
  };
};

export default function DropdownRkp({
  //  project,
  // handleChangeProject,
  variant,
}: {
  //  project?: any;
  // handleChangeProject?: any;
  variant?: string;
}) {
  const rkpContext = useRKPContext((state) => state);
  const { rkp, setRkp, rkpState, setRkpState, year, rpjmn } = rkpContext;

  const {
    options,
    handleChangeOptions,
    value,
    allowedSelectRKP,
    getAllowedSelectRKP,
    getData,
    triggerChange,
    handleSearchChange,
    highlightText,
    filteredOptions,
    searchKeyword,
    loadingContext,
    useLoading,
  } = useRkpVM();

  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    if (allowedSelectRKP.length == 0) {
      getAllowedSelectRKP();
    }
  }, []);

  useEffect(() => {
    if (allowedSelectRKP.length > 0 && rpjmn != undefined) {
      getData().then((r) => {
        if (r && rkpState) {
          triggerChange(rkpState);
        }
      });
    }
  }, [allowedSelectRKP, year, rpjmn]);

  const sxParams: SxParams = { variant: variant };

  if (options.length == 0) return null;

  return (
    <Fragment>
      {rkpState && (
        <Autocomplete
          key={options.length}
          size="small"
          value={value}
          getOptionLabel={(option: any) =>
            option.value
              ? option.level + " - " + option.code + " - " + option.value
              : ""
          }
          getOptionDisabled={(option: any) =>
            options.some((selectedOption) => {
              return !allowedSelectRKP.includes(option.level);
            })
          }
          onChange={(event: any, newValue: any | undefined) => {
            handleChangeOptions(newValue);
          }}
          options={options}
          renderInput={(params) => (
            <Tooltip
              title={value ? value.value : ""}
              followCursor
              TransitionComponent={Grow}
            >
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Pilih kegiatan pembangunan"
                sx={SxAutocompleteTextField(sxParams)}
              />
            </Tooltip>
          )}
          sx={SxAutocomplete(sxParams)}
        />
      )}
      {/* {isLoading && !rkpState ? (
        <Stack
          width="100%"
          height="50vh"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <CircularProgress />
          <Stack gap={1} flexDirection="column">
            <Typography fontSize={18} fontWeight={600}>
              Harap Tunggu
            </Typography>
            <Typography>Sedang mengambil data dari server</Typography>
          </Stack>
        </Stack>
      ) : ( */}
      <Fragment>
        {!rkpState && (
          <Stack direction="column" gap={1}>
            <Stack direction="column" gap={1}>
              <OutlinedInput
                type="text"
                size="small"
                inputProps={{
                  shrink: true,
                }}
                // placeholder="Cari kegiatan pembangunan"
                placeholder="Cari kegiatan prioritas"
                value={searchKeyword}
                onChange={handleSearchChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <IconFA
                        name="search"
                        size={16}
                        sx={{
                          width: 18,
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Typography color={grey[600]}>
                {/* Silahkan pilih kegiatan pembangunan di bawah ini */}
                Silahkan pilih kegiatan prioritas di bawah ini
              </Typography>
            </Stack>
            <Box maxHeight="calc(100vh - 460px)" overflow="auto">
              <RadioGroup
                value={value?.code || ""}
                onChange={(event) => {
                  const selectedOption: any = options.find(
                    (option) => option.code === event.target.value
                  );
                  handleChangeOptions(selectedOption);
                }}
              >
                {(searchKeyword ? filteredOptions : options).map((option) => (
                  <Tooltip
                    key={option.code}
                    title={option.value}
                    followCursor
                    TransitionComponent={Grow}
                  >
                    <FormControlLabel
                      value={option.code}
                      control={<Radio />}
                      className="wording-kp-ellipsis"
                      label={
                        <>
                          {searchKeyword
                            ? highlightText(
                                `${option.level} - ${option.code} - ${option.value}`,
                                searchKeyword
                              )
                            : `${option.level} - ${option.code} - ${option.value}`}
                        </>
                      }
                      disabled={!allowedSelectRKP.includes(option.level)}
                      sx={{
                        lineHeight: 1,
                        display:
                          searchKeyword && !filteredOptions.includes(option)
                            ? "none"
                            : "flex",
                        span: {
                          "&.MuiTypography-root": {
                            display: "block",
                            maxWidth: "60vw",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </RadioGroup>
            </Box>
          </Stack>
        )}
      </Fragment>
      {/* )} */}
    </Fragment>
  );
}
