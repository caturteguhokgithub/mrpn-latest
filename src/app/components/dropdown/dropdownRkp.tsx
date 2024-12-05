import React, { useEffect } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Grow,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import { listSelectKp } from "@/app/executive-summary/data";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { SxParams } from "@/app/executive-summary/types";
import useRkpVM from "@/components/dropdown/rkpVM";
import { useExsumContext, useRKPContext } from "@/lib/core/hooks/useHooks";

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
  handleChangeProject,
  variant,
}: {
  //  project?: any;
  handleChangeProject?: any;
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
  } = useRkpVM();

  useEffect(() => {
    if (allowedSelectRKP.length == 0) {
      getAllowedSelectRKP();
    }
  }, []);

  useEffect(() => {
    if (allowedSelectRKP.length > 0 && rpjmn != undefined) {
      getData().then(r => {
        if (r && rkpState) {
          triggerChange(rkpState)
        }
      })
    }
  }, [allowedSelectRKP,year, rpjmn]);

  const sxParams: SxParams = { variant: variant };

  if (options.length == 0) return null

  return (
    <FormControl size="small">
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
      {/*  */}
      {/* <SelectCustomTheme
    small
    anchorRight
    value={project}
    onChange={handleChangeProject}
   >
    <MenuItem value="" disabled>
     <Typography fontSize={14} fontStyle="italic">
      Pilih Kegiatan Pembangunan (KP)
     </Typography>
    </MenuItem>
    {listSelectKp.map(({ id, value, nama_kp }) => (
     <MenuItem key={id} value={value}>
      {nama_kp.length >= 48 ? (
       <Tooltip title={nama_kp} followCursor TransitionComponent={Grow}>
        <Typography
         aria-owns={open ? "mouse-over-popover" : undefined}
         aria-haspopup="true"
         onMouseEnter={handlePopoverOpen}
         onMouseLeave={handlePopoverClose}
         sx={{ fontSize: 14 }}
        >
         {nama_kp.substring(0, 48) + "..."}
        </Typography>
       </Tooltip>
      ) : (
       nama_kp
      )}
     </MenuItem>
    ))}
   </SelectCustomTheme> */}
    </FormControl>
  );
}
