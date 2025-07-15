import React, { CSSProperties } from "react";
import {
  Button,
  Grow,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconFA } from "../icons/icon-fa";
import { grey } from "@mui/material/colors";
import { InfoTooltip } from "../InfoTooltip";

export default function FieldLabelInfo({
  title,
  information,
  titleSection,
  iconOnly,
  buttonInfo,
  buttonInfoOnclick,
  titleField,
  sx,
}: {
  title?: string | React.ReactNode;
  information?: React.ReactNode;
  titleSection?: boolean;
  iconOnly?: boolean;
  buttonInfo?: boolean;
  buttonInfoOnclick?: () => void;
  titleField?: boolean;
  sx?: SxProps;
}) {
  const buttonInfoContent = (
    <Button
      size="small"
      variant="outlined"
      sx={{ py: 0, position: "relative", top: -2 }}
      onClick={buttonInfoOnclick}
    >
      Lihat Matriks
    </Button>
  );

  return (
    <>
      {iconOnly ? (
        <InfoTooltip
          title={information}
          titleSection={titleSection}
          titleField={titleField}
        />
      ) : (
        <Stack direction="row" alignItems="center" gap={0.5} sx={sx}>
          {titleSection ? (
            <Typography fontWeight={600}>{title}</Typography>
          ) : (
            <Typography gutterBottom fontSize={14} color={grey[600]}>
              {title}
            </Typography>
          )}
          {buttonInfo ? (
            buttonInfoContent
          ) : (
            <>
              {information && (
                <InfoTooltip
                  title={information}
                  titleSection={titleSection}
                  titleField={titleField}
                />
              )}
            </>
          )}
        </Stack>
      )}
    </>
  );
}
