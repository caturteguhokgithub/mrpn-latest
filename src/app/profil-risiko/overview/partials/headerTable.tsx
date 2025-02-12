import React from "react";
import {
  Box,
  Grow,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { IdentificationRiskResDto } from "@/app/profil-risiko/identifikasi/pageModel";
import { InfoTooltip } from "@/app/components/InfoTooltip";
import { blue, grey } from "@mui/material/colors";
import { IndikatorDto } from "@/app/misc/rkp/rkpServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GetTarget } from "@/lib/utils/common";

export default function HeaderTable({
  noPadding,
  asTable,
  viewOnly,
  data,
  noPaddingChip,
}: {
  noPadding?: boolean;
  noPaddingChip?: boolean;
  asTable?: boolean;
  viewOnly?: boolean;
  data?: IdentificationRiskResDto;
}) {
  const { rpjmn, year } = useRKPContext((store) => store);

  const getTarget = (indikator: IndikatorDto) => {
    return GetTarget(rpjmn, year, indikator);
  };

  return (
    <React.Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={noPaddingChip ? 0 : 2}
        py={noPaddingChip ? 0 : 1.5}
      >
        <Stack
          direction="row"
          alignItems="center"
          border={1}
          borderColor={theme.palette.primary.main}
          borderRadius={20}
        >
          <Stack
            direction="row"
            bgcolor={theme.palette.primary.main}
            px={2}
            alignItems="center"
            height="34px"
            sx={{
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 24,
            }}
          >
            <Typography
              fontSize={13}
              color="white"
              fontWeight={600}
              lineHeight={1}
            >
              Topik
            </Typography>
          </Stack>
          <Box>
            <Typography px={1.5} fontSize={13} fontWeight={600}>
              {data?.topik ?? "-"}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <Table
        size="small"
        sx={{
          ...(asTable && {
            border: "1px solid #e0e0e0",
            borderRadius: 5,
            borderCollapse: "unset",
          }),
          tr: {
            td: {
              py: noPadding ? 0.5 : 1.5,
              "&:first-of-type": {
                border: 0,
              },
            },
            "&:last-of-type": {
              td: { border: 0 },
            },
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: blue[50], borderTopLeftRadius: 20 }}>
              Sasaran
            </TableCell>
            <TableCell sx={{ bgcolor: blue[50] }}>Indikator</TableCell>
            <TableCell align="center" sx={{ bgcolor: blue[50] }}>
              Target
            </TableCell>
            <TableCell
              align="center"
              sx={{ bgcolor: blue[50], borderTopRightRadius: 20 }}
            >
              Periode Pemantauan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.sasaran &&
            data.sasaran.map((ssr, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell rowSpan={data.indikator.length}>{ssr}</TableCell>
                  <TableCell>{data.indikator[0].value}</TableCell>
                  <TableCell align="center">
                    {getTarget(data.indikator[0])}
                  </TableCell>
                  <TableCell align="center">{data.periode}</TableCell>
                </TableRow>
                {data.indikator.slice(1).map((child, childIndex) => (
                  <TableRow key={childIndex}>
                    <TableCell>{child.value}</TableCell>
                    <TableCell align="center">{getTarget(child)}</TableCell>
                    <TableCell align="center">{data.periode}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
