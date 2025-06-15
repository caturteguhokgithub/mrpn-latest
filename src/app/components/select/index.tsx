import React from "react";
import { Select, SxProps } from "@mui/material";
import theme from "@/theme";
import { grey } from "@mui/material/colors";

export default function SelectCustomTheme({
  value,
  children,
  onChange,
  defaultStyle,
  small,
  anchorRight,
  rounded,
  sx,
  multiple,
  renderValue,
}: {
  value: any;
  children: React.ReactNode;
  onChange?: any;
  defaultStyle?: boolean;
  small?: boolean;
  anchorRight?: boolean;
  rounded?: boolean;
  sx?: SxProps;
  multiple?: boolean;
  renderValue?: any;
}) {
  return (
    <Select
      size={small ? "small" : "medium"}
      value={value}
      onChange={onChange}
      multiple={multiple}
      renderValue={renderValue}
      displayEmpty
      inputProps={{
        paperprops: {
          sx: {
            "& .MuiMenuItem-root": {
              padding: 2,
            },
          },
        },
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: anchorRight ? "right" : "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: anchorRight ? "right" : "left",
        },
        PaperProps: {
          sx: {
            li: {
              fontSize: 14,
            },
          },
        },
      }}
      sx={{
        ".MuiSelect-icon": {
          color: defaultStyle || rounded ? "inherit" : "white",
        },
        ".MuiSelect-select": {
          color: theme.palette.secondary.dark,
        },
        "&.MuiInputBase-root": {
          fontSize: defaultStyle || rounded ? "inherit" : 14,
          py: 0,
          borderRadius: defaultStyle ? 2 : rounded ? 6 : 6,
          border: 0,
          bgcolor: defaultStyle
            ? "inherit"
            : rounded
            ? "white"
            : theme.palette.primary.main,
          color:
            defaultStyle || rounded ? "inherit" : theme.palette.primary.light,
        },
        ...sx,
      }}
    >
      {children}
    </Select>
  );
}
