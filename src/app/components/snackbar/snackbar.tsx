import { Alert, Snackbar } from "@mui/material";
import { Slide, SlideProps } from "@mui/material";
import React from "react";
import Iconify from "../icons/iconify";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function Toast({
  label,
  open,
  handleClose,
  color,
}: {
  label: string;
  open: boolean;
  handleClose?: any;
  color?: string;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={
          color === "success"
            ? "success"
            : color === "warning"
            ? "warning"
            : color === "error"
            ? "error"
            : "info"
        }
        variant="filled"
        icon={color === "error" ? <Iconify name="mdi:trash" /> : undefined}
        sx={{ width: "100%" }}
      >
        {label}
      </Alert>
    </Snackbar>
  );
}
