"use client";

import { Alert, Snackbar } from "@mui/material";
import { Slide, SlideProps } from "@mui/material";
import React from "react";
import Iconify from "../icons/iconify";
import { useToast } from "@/lib/core/context/toastContext";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function Toast() {
  const { toast, hideToast } = useToast();

  return (
    <Snackbar
      open={toast.isOpen}
      autoHideDuration={3000}
      onClose={hideToast}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={hideToast}
        severity={toast.type}
        variant="filled"
        icon={
          toast.type === "error" ? (
            <Iconify name="mdi:delete-forever-outline" size={22} />
          ) : undefined
        }
        sx={{ width: "100%" }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}
