import React, { Fragment } from "react";
import { IconButton, Link, Stack } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { IconFA } from "../icons/icon-fa";
import Iconify from "@/icons/iconify";

export const ActionIcon = ({
  icon,
  onclick,
  color,
  size,
  disabled,
}: {
  icon: string;
  onclick?: () => void;
  color: string;
  size?: string;
  disabled?: boolean;
}) => {
  const iconStyle = {
    bgcolor:
      color === "approval"
        ? green[600]
        : color === "primary"
        ? blue[600]
        : red[600],
    color: "white",
    transition: "all 300ms",
    "&:hover": {
      bgcolor:
        color === "approval"
          ? green[800]
          : color === "primary"
          ? blue[800]
          : red[800],
    },
  };

  return (
    <Fragment>
      {onclick ? (
        <IconButton
          aria-label="edit"
          color="primary"
          sx={iconStyle}
          onClick={onclick}
          disabled={disabled}
        >
          <Iconify name={`mdi:${icon}`} size={size == "sm" ? 16 : 18} />
          {/* <IconFA
            size={size == "sm" ? 12 : 14}
            name={icon}
            sx={{ width: "auto" }}
          /> */}
        </IconButton>
      ) : (
        <IconButton
          aria-label="edit"
          color="primary"
          sx={iconStyle}
          disabled={disabled}
        >
          <Iconify name={`mdi:${icon}`} size={size == "sm" ? 16 : 18} />
          {/* <IconFA
            size={size == "sm" ? 12 : 14}
            name={icon}
            sx={{ width: "auto" }}
          /> */}
        </IconButton>
      )}
    </Fragment>
  );
};

export default function ActionColumn({
  editUrl,
  viewUrl,
  deleteUrl,
  editClick,
  viewClick,
  deleteClick,
  center,
  size,
  disabled,
}: {
  editUrl?: string;
  viewUrl?: string;
  deleteUrl?: string;
  editClick?: () => void;
  viewClick?: () => void;
  deleteClick?: () => void;
  center?: boolean;
  size?: string;
  disabled?: boolean;
}) {
  return (
    <Stack
      direction="row"
      justifyContent={center ? "center" : "flex-end"}
      width="100%"
      gap={size == "sm" ? 0.3 : 1}
    >
      {viewUrl && (
        <Link href={viewUrl}>
          <ActionIcon
            icon="eye"
            color="approval"
            size={size}
            disabled={disabled}
          />
        </Link>
      )}
      {viewClick && (
        <ActionIcon
          icon="eye"
          color="approval"
          onclick={viewClick}
          size={size}
          disabled={disabled}
        />
      )}
      {editUrl && (
        <Link href={editUrl}>
          <ActionIcon icon="pencil" color="primary" disabled={disabled} />
        </Link>
      )}
      {editClick && (
        <ActionIcon
          icon="pencil"
          color="primary"
          onclick={editClick}
          size={size}
          disabled={disabled}
        />
      )}
      {deleteUrl && (
        <Link href={deleteUrl}>
          <ActionIcon
            icon="trash"
            color="danger"
            size={size}
            disabled={disabled}
          />
        </Link>
      )}
      {deleteClick && (
        <ActionIcon
          icon="trash"
          color="danger"
          onclick={deleteClick}
          size={size}
          disabled={disabled}
        />
      )}
    </Stack>
  );
}
