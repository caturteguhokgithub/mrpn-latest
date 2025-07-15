import React from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Grow,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import { listSelectKp, listSelectKpName } from "@/app/executive-summary/data";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { SxParams } from "@/app/executive-summary/types";

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

export default function DropdownDefault({
  //  project,
  handleChangeProject,
  variant,
  showOnlyName,
}: {
  //  project?: any;
  handleChangeProject?: any;
  variant?: string;
  showOnlyName?: boolean;
}) {
  const [value, setValue] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState("");

  const optionsListKp = listSelectKp.map((item) => {
    return `${item["name"]}`;
  });

  const optionsListKpName = listSelectKpName.map((item) => {
    return `${item["name"]}`;
  });

  const sxParams: SxParams = { variant: variant };

  return (
    <FormControl size="small">
      <Autocomplete
        size="small"
        value={value}
        // isOptionEqualToValue={(value: any) => value.value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);

          const optionVal = listSelectKp.find((res: any) => {
            return res.name === newInputValue;
          });

          handleChangeProject(optionVal?.value || "");
        }}
        options={showOnlyName ? optionsListKpName : optionsListKp}
        // renderOption={(props, option: any) => (
        //  <li
        //   {...props}
        //   style={{
        //    pointerEvents: option.disabled ? "none" : "auto",
        //    opacity: option.disabled ? 0.5 : 1,
        //   }}
        //  >
        //   {option.name}
        //  </li>
        // )}
        renderInput={(params) => (
          <Tooltip title={value} followCursor TransitionComponent={Grow}>
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
