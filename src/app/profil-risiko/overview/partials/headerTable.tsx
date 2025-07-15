import React from "react";
import {
  Box,
  Grow,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { IdentificationRiskResDto } from "@/app/profil-risiko/identifikasi/pageModel";
import { InfoTooltip } from "@/components/InfoTooltip";
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
  isModal,
}: {
  noPadding?: boolean;
  noPaddingChip?: boolean;
  asTable?: boolean;
  viewOnly?: boolean;
  data?: IdentificationRiskResDto;
  isModal?: boolean;
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
      <TableContainer
        sx={{
          maxHeight: "64vh",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
        }}
      >
        <Table
          size="small"
          stickyHeader
          sx={{
            ...(asTable && {
              border: "1px solid #e0e0e0",
              // borderRadius: 5,
              borderCollapse: "unset",
            }),
            tr: {
              td: {
                py: noPadding ? 0.5 : 1.5,
              },
            },
            "tbody, thead": {
              "td, th": {
                borderRight: `1px solid ${grey[300]} !important`,
                "&:last-of-type": {
                  borderRight: `0 !important`,
                },
              },
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  bgcolor: blue[50],
                  // borderTopLeftRadius: 20,
                }}
              >
                Sasaran
              </TableCell>
              <TableCell align="center" sx={{ bgcolor: blue[50] }}>
                Indikator
              </TableCell>
              <TableCell
                width={isModal ? 140 : 200}
                align="center"
                sx={{ bgcolor: blue[50] }}
              >
                Target
              </TableCell>
              <TableCell
                width={isModal ? 60 : "auto"}
                align="center"
                sx={{
                  bgcolor: blue[50],
                  // borderTopRightRadius: 20,
                  whiteSpace: isModal ? "wrap" : "nowrap",
                  lineHeight: isModal ? 1.2 : 1,
                }}
              >
                Periode Pemantauan
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                ".MuiTableCell-stickyHeader": {
                  top: isModal ? 47 : 37,
                },
              }}
            >
              {[...new Array(4)].map((_, i) => (
                <TableCell sx={{ bgcolor: grey[100] }}>
                  <Typography
                    color={`${grey[500]} !important`}
                    fontSize={12}
                    textAlign="center"
                  >
                    {i + 1}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.sasaran &&
              data.sasaran.map((ssr, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell
                      rowSpan={data.indikator.length}
                      sx={{
                        verticalAlign: "top",
                      }}
                    >
                      {ssr}
                    </TableCell>
                    <TableCell
                      sx={{
                        verticalAlign: "top",
                      }}
                    >
                      {data.indikator[0].value}
                    </TableCell>
                    <TableCell
                      sx={{
                        verticalAlign: "top",
                      }}
                    >
                      {getTarget(data.indikator[0])}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        verticalAlign: "top",
                      }}
                    >
                      {data.periode}
                    </TableCell>
                  </TableRow>
                  {data.indikator.slice(1).map((child, childIndex) => (
                    <TableRow key={childIndex}>
                      <TableCell
                        sx={{
                          verticalAlign: "top",
                        }}
                      >
                        {child.value}
                      </TableCell>
                      <TableCell
                        sx={{
                          verticalAlign: "top",
                        }}
                      >
                        {getTarget(child)}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          verticalAlign: "top",
                        }}
                      >
                        {data.periode}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
