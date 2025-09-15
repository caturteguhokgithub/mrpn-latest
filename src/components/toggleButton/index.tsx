import React from "react";
import { Box, ToggleButton, Typography } from "@mui/material";
import theme from "@/theme";
import { green, grey, red, yellow } from "@mui/material/colors";
import { IconFA } from "../icons/icon-fa";
import Iconify from "../icons/iconify";

export default function CustomToggleButton({
  value,
  label,
  code,
  variant,
  disabled,
  valueLabel,
  minheight,
  approvalPage,
}: {
  value: string;
  valueLabel?: string;
  label: string;
  code?: string | boolean | any;
  variant?: string;
  disabled?: boolean;
  minheight?: number;
  approvalPage?: boolean;
}) {
  const conditionColor =
    variant === "danger"
      ? `${red[700]} !important`
      : variant === "warning"
      ? `${yellow[800]} !important`
      : variant === "success"
      ? `${green[700]} !important`
      : theme.palette.primary.main;

  return (
    <ToggleButton
      disabled={disabled}
      value={value}
      aria-label={label}
      sx={{
        p: 0,
        justifyContent: "flex-start",
        color: theme.palette.primary.main,
        borderRadius: "12px !important",
        border: `1px solid ${theme.palette.primary.main}`,
        borderLeftColor: `${theme.palette.primary.main} !important`,
        minHeight: minheight,
        "&.Mui-selected": {
          bgcolor: conditionColor,
          border: `1px solid ${conditionColor}`,
          ".MuiBox-root": {
            bgcolor: conditionColor,
          },
        },
        "&.Mui-disabled": {
          borderLeftColor: "#0000001f !important",
        },
      }}
    >
      {valueLabel && (
        <>
          {code && (
            <Box
              component="span"
              px={2}
              py={1.5}
              bgcolor={grey[200]}
              lineHeight={1.2}
              sx={{
                borderStartStartRadius: "12px",
                borderEndStartRadius: "12px",
              }}
            >
              {code}
              <br />
              {valueLabel}
            </Box>
          )}
        </>
      )}
      <Typography px={3} component="span" fontWeight={600}>
        {label}
      </Typography>
      {!disabled && approvalPage && (
        <Box
          position="absolute"
          right={16}
          top="50%"
          //  bgcolor={theme.palette.primary.main}
          //  px={1.2}
          //  py={0.5}
          lineHeight={1}
          sx={{
            // borderTopLeftRadius: 6,
            // borderBottomLeftRadius: 6,
            transform: "translateY(-50%)",
          }}
        >
          <Iconify
            name="mdi:check-circle"
            size={24}
            // sx={{
            //  position: "absolute",
            //  right: 20,
            //  top: "50%",
            //  transform: "translateY(-50%)",
            // }}
          />
          {/* <Typography
      fontSize={11}
      color="white"
      textTransform="capitalize"
      letterSpacing={0.5}
     >
      Selera Risiko Terpilih
     </Typography> */}
        </Box>
      )}
    </ToggleButton>
  );
}
