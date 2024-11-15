import React from "react";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import FieldLabelInfo from "@/app/components/fieldLabelInfo";

export const LabelRadio = ({
  heading,
  description,
  value,
  rangeValue,
}: {
  heading: string;
  description: any;
  value?: string | any;
  rangeValue?: string | any;
}) => {
  return (
    <Stack direction="column" justifyContent="flex-start">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography
          component="h2"
          fontSize="18px"
          fontWeight={600}
          textTransform="none"
        >
          {heading} {value && `(Nilai ${value})`}{" "}
          <Typography component="span" fontSize="16px" color={grey[600]}>
            {rangeValue && `(Range Matriks ${rangeValue})`}
          </Typography>
        </Typography>
        {/* <FieldLabelInfo
     iconOnly
     titleSection
     title={heading}
     information={heading}
    /> */}
      </Stack>
      <Typography
        component="div"
        color={grey[700]}
        textTransform="none"
        fontSize={15}
        mt={1}
      >
        {description}
      </Typography>
    </Stack>
  );
};
