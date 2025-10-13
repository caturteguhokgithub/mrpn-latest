import React from "react";
import { Grow, styled, Typography } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { IconFA } from "../icons/icon-fa";
import Iconify from "../icons/iconify";

export const InfoTooltip = ({
  title,
  titleSection,
  titleField,
  color,
  icon,
}: {
  title: React.ReactNode;
  titleSection?: boolean;
  titleField?: boolean;
  color?: string;
  icon?: React.ReactNode;
}) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 600,
      //  fontSize: theme.typography.pxToRem(20),
      fontSize: "14px !important",
      border: "1px solid #dadde9",
      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    },
  }));

  return (
    <HtmlTooltip
      title={title}
      followCursor
      TransitionComponent={Grow}
      placement="bottom-start"
    >
      <Typography
        lineHeight={1}
        sx={{
          span: {
            position: "relative",
            top: titleSection ? 2 : titleField ? -1 : 1,
          },
        }}
      >
        {icon || (
          <Iconify
            name="mdi:information-slab-circle"
            size={18}
            sx={{ cursor: "help", color: color, position: "relative", top: 1 }}
          />
        )}
      </Typography>
    </HtmlTooltip>
  );
};
