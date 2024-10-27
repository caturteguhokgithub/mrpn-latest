import React from "react";
import { Icon, IconButton, Link, Stack, styled } from "@mui/material";
import theme from "@/theme";
import { blue, green, red } from "@mui/material/colors";
import { IconFA } from "../icons/icon-fa";

export const ActionIcon = ({
  icon,
  onclick,
  color,
}: {
  icon: string;
  onclick?: () => void;
  color: string;
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
          <IconFA size={14} name={icon} />
        </IconButton>
      ) : (
        <IconButton aria-label="edit" color="primary" sx={iconStyle}>
          <IconFA size={14} name={icon} />
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
}: {
  editUrl?: string;
  viewUrl?: string;
  deleteUrl?: string;
  editClick?: () => void;
  viewClick?: () => void;
  deleteClick?: () => void;
  center?: boolean;
}) {
  return (
    <Stack
      direction="row"
      justifyContent={center ? "center" : "flex-end"}
      width="100%"
      gap={1}
    >
      {viewUrl && (
        <Link href={viewUrl}>
          <ActionIcon icon="eye" color="approval" />
        </Link>
      )}
      {viewClick && (
        <ActionIcon icon="eye" color="approval" onclick={viewClick} />
      )}
      {editUrl && (
        <Link href={editUrl}>
          <ActionIcon icon="pencil" color="primary" />
        </Link>
      )}
      {editClick && (
        <ActionIcon icon="pencil" color="primary" onclick={editClick} />
      )}
      {deleteUrl && (
        <Link href={deleteUrl}>
          <ActionIcon icon="trash" color="danger" />
        </Link>
      )}
      {deleteClick && (
        <ActionIcon icon="trash" color="danger" onclick={deleteClick} />
      )}
    </Stack>
  );
}
