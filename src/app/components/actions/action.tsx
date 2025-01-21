import React from "react";
import { Icon, IconButton, Link, Stack, styled } from "@mui/material";
import theme from "@/theme";
import { blue, green, red } from "@mui/material/colors";
import { IconFA } from "../icons/icon-fa";

export const ActionIcon = ({
  icon,
  onclick,
  color,
  size,
}: {
  icon: string;
  onclick?: () => void;
  color: string;
  size?: string;
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
    <>
      {onclick ? (
        <IconButton
          aria-label="edit"
          color="primary"
          sx={iconStyle}
          onClick={onclick}
        >
          <IconFA
            size={size == "sm" ? 12 : 14}
            name={icon}
            sx={{ width: "auto" }}
          />
        </IconButton>
      ) : (
        <IconButton aria-label="edit" color="primary" sx={iconStyle}>
          <IconFA
            size={size == "sm" ? 12 : 14}
            name={icon}
            sx={{ width: "auto" }}
          />
        </IconButton>
      )}
    </>
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
}: {
  editUrl?: string;
  viewUrl?: string;
  deleteUrl?: string;
  editClick?: () => void;
  viewClick?: () => void;
  deleteClick?: () => void;
  center?: boolean;
  size?: string;
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
          <ActionIcon icon="eye" color="approval" size={size} />
        </Link>
      )}
      {viewClick && (
        <ActionIcon
          icon="eye"
          color="approval"
          onclick={viewClick}
          size={size}
        />
      )}
      {editUrl && (
        <Link href={editUrl}>
          <ActionIcon icon="pencil" color="primary" />
        </Link>
      )}
      {editClick && (
        <ActionIcon
          icon="pencil"
          color="primary"
          onclick={editClick}
          size={size}
        />
      )}
      {deleteUrl && (
        <Link href={deleteUrl}>
          <ActionIcon icon="trash" color="danger" size={size} />
        </Link>
      )}
      {deleteClick && (
        <ActionIcon
          icon="trash"
          color="danger"
          onclick={deleteClick}
          size={size}
        />
      )}
    </Stack>
  );
}
