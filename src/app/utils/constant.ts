import { styled } from "@mui/material";
import { SxParams } from "../executive-summary/types";

export const mainUrl = "/penetapan/konteks-strategis/";
export const addUrl = `${mainUrl}form/add`;
export const editUrl = `${mainUrl}form/edit`;

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const paramVariantDefault: SxParams = { variant: "default" };
