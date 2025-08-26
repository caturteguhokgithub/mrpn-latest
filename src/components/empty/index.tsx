import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function EmptyState({
  title,
  description,
  icon,
  dense,
  button,
}: {
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  dense?: boolean;
  button?: React.ReactNode;
}) {
  return (
    <Stack
      width="100%"
      minHeight={dense ? "200px" : "300px"}
      justifyContent="center"
      alignItems="center"
    >
      <Stack alignItems="center">
        {icon}
        {title && (
          <Typography
            component="h2"
            fontWeight="600"
            fontSize="16px"
            textTransform="capitalize"
            mt={2}
            color="text.primary"
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            component="p"
            fontSize="14px"
            mt={1}
            color="text.secondary"
          >
            {description}
          </Typography>
        )}
      </Stack>
      {button && <Box mt={2}>{button && button}</Box>}
    </Stack>
  );
}
