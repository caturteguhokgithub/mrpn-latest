import React from "react";
import { Grow, styled, Typography } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { IconFA } from "../icons/icon-fa";

export const InfoTooltip = ({
  title,
  titleSection,
  titleField,
  color,
}: {
  title: React.ReactNode;
  titleSection?: boolean;
  titleField?: boolean;
  color?: string;
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
        <IconFA
          name="circle-info"
          size={17}
          sx={{ cursor: "help", width: 24, color: color }}
        />
      </Typography>
    </HtmlTooltip>
  );
};
