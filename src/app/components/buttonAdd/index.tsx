import React from "react";
import { Button, Icon } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import Link from "next/link";

export default function AddButton({
  title,
  url,
  filled,
  small,
  noMargin,
  onclick,
  sx,
  startIcon,
  fullWidth,
  errorColor,
  color,
}: {
  title?: React.ReactNode;
  url?: string;
  filled?: boolean;
  small?: boolean;
  noMargin?: boolean;
  onclick?: () => void;
  sx?: React.CSSProperties;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  errorColor?: boolean | any;
  color?: string;
}) {
  const buttonAdd = (
    <Button
      fullWidth={fullWidth}
      color={errorColor ? "error" : color == "success" ? "success" : "primary"}
      variant={filled ? "contained" : "outlined"}
      size={small ? "small" : "medium"}
      startIcon={
        startIcon ? (
          startIcon
        ) : (
          <Icon
            baseClassName="fas"
            className={errorColor ? "fa-trash-alt" : `fa-plus-circle`}
            sx={{
              fontSize: small || errorColor ? "16px !important" : "18px",
            }}
          />
        )
      }
      sx={{
        ...sx,
        mx: noMargin ? 0 : 1,
        borderRadius: "50px",
        minHeight: 30,
        lineHeight: 1,
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        transition: "all 300ms ease-in-out",
        "&:hover": {
          bgcolor: errorColor
            ? red[800]
            : color == "success"
            ? green[700]
            : blue[800],
          color: "white",
        },
        ".MuiButton-icon": {
          ...(!title && { mr: 0 }),
        },
      }}
      onClick={onclick}
    >
      {title || ""}
    </Button>
  );

  return (
    <>
      {onclick ? (
        buttonAdd
      ) : (
        <Link href={`${url}`} style={{ width: fullWidth ? "100%" : "auto" }}>
          {buttonAdd}
        </Link>
      )}
    </>
  );
}
