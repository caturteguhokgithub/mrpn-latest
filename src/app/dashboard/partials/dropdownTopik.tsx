import React from "react";
import {
  FormControl,
  Grow,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { SxParams } from "@/app/executive-summary/types";

export const listTopik = [
  {
    id: "1",
    value: 1,
    code: "02.01.01",
    name: "Ketahanan Pangan",
    group: "KP",
    disabled: false,
  },
  {
    id: "2",
    value: 2,
    code: "03.01.01.02.6100",
    name: "Stunting",
    group: "P",
    disabled: true,
  },
  {
    id: "3",
    value: 3,
    code: "01.01.01.01",
    name: "Kemiskinan",
    group: "PROP",
    disabled: true,
  },
  {
    id: "4",
    value: 4,
    code: "01",
    name: "Persampahan",
    group: "PN",
    disabled: true,
  },
  {
    id: "5",
    value: 5,
    code: "01.01",
    name: "Pariwisata",
    group: "PP",
    disabled: true,
  },
  {
    id: "7",
    value: 7,
    code: "01.01.01.01.002",
    name: "Transisi Energi",
    group: "P",
    disabled: true,
  },
];

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

export default function DropdownTopik({
  handleChangeProject,
  variant,
}: {
  handleChangeProject?: any;
  variant?: string;
  showOnlyName?: boolean;
}) {
  const [value, setValue] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState("");

  const optionsList = listTopik.map((item) => {
    return `${item["name"]}`;
  });

  const sxParams: SxParams = { variant: variant };

  return (
    <FormControl size="small">
      <Autocomplete
        size="small"
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);

          const optionVal = listTopik.find((res: any) => {
            return res.name === newInputValue;
          });

          handleChangeProject(optionVal?.value || "");
        }}
        options={optionsList}
        renderInput={(params) => (
          <Tooltip title={value} followCursor TransitionComponent={Grow}>
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Pilih topik"
              sx={SxAutocompleteTextField(sxParams)}
            />
          </Tooltip>
        )}
        sx={SxAutocomplete(sxParams)}
      />
    </FormControl>
  );
}
