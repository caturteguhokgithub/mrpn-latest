import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

type LoadingProps = {
  isLoading: boolean;
  children?: JSX.Element | JSX.Element[];
};

export const ILoading = ({ isLoading, children }: LoadingProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      {/* <CircularProgress color="inherit" /> */}
      <div className="clones-loader"></div>
      {children}
    </Backdrop>
  );
};
