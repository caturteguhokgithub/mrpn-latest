import React from "react";
import {
  alpha,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { dataTema } from "../../../dataTema";
import { ExsumSupportProjectRes } from "@/app/executive-summary/partials/tab2Profile/cardSupport/cardSupportModel";
import { ExsumDto } from "@/lib/core/context/exsumContext";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { IndikatorDto } from "@/app/misc/rkp/rkpServiceModel";
import { bgColorTh } from "@/utils/color";
import { GetTarget } from "@/lib/utils/common";
import { grey } from "@mui/material/colors";

export const getLevel = (level: string) => {
  switch (level) {
    case "PN":
      return "PN";
    case "PP":
      return "PN";
    case "KP":
      return "PP";
    case "PROP":
      return "KP";
    case "P":
      return "PROP";
    default:
      return "KP";
  }
};

export default function TableSupport({
  data,
  exsum,
}: {
  data: ExsumSupportProjectRes;
  exsum: ExsumDto;
}) {
  const { rpjmn, year } = useRKPContext((store) => store);

  const getTarget = (year: number, indikator: IndikatorDto) => {
    return GetTarget(rpjmn, year, indikator);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "40vh",
        "&::-webkit-scrollbar": {
          width: "6px",
          cursor: "pointer",
        },
      }}
    >
      <Table
        sx={{
          minWidth: 1200,
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
              "&:last-of-type": {
                borderRight: `0 !important`,
              },
            },
          },
        }}
        size="small"
        stickyHeader
      >
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell
              width={year > 0 ? "auto" : "10%"}
              sx={{ bgcolor: bgColorTh, textAlign: "center" }}
            >
              {getLevel(exsum.level)}
            </TableCell>
            <TableCell
              width={100}
              sx={{
                bgcolor: bgColorTh,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Kode Sasaran {getLevel(exsum.level)}
            </TableCell>
            <TableCell
              width="25%"
              sx={{
                bgcolor: bgColorTh,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Sasaran {getLevel(exsum.level)}
            </TableCell>
            <TableCell
              width="20%"
              sx={{ bgcolor: bgColorTh, textAlign: "center" }}
            >
              Indikator
            </TableCell>
            {year == 0 ? (
              rpjmn && (
                <>
                  {[0, 1, 2, 3, 4].map((r) => (
                    <TableCell
                      width={200}
                      sx={{ bgcolor: bgColorTh, textAlign: "center" }}
                    >
                      Target {rpjmn.start + r}
                    </TableCell>
                  ))}
                </>
              )
            ) : (
              <TableCell
                width={200}
                sx={{ bgcolor: bgColorTh, textAlign: "center" }}
              >
                Target
              </TableCell>
            )}
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 37,
              },
            }}
          >
            {[...new Array(year == 0 ? 9 : 5)].map((_, i) => (
              <TableCell sx={{ bgcolor: grey[100] }}>
                <Typography color={grey[500]} fontSize={14} textAlign="center">
                  {i + 1}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sasaran.map((sasaran, index) => (
            <React.Fragment key={`sasaran-${index}`}>
              <TableRow>
                {index === 0 && (
                  <TableCell
                    rowSpan={data.sasaran.reduce(
                      (acc, s) => acc + s.indikator.length,
                      0
                    )}
                    sx={{ verticalAlign: "top" }}
                  >
                    {data.value}
                  </TableCell>
                )}
                <TableCell
                  rowSpan={sasaran.indikator.length}
                  sx={{ verticalAlign: "top" }}
                >
                  {sasaran.code}
                </TableCell>
                <TableCell
                  rowSpan={sasaran.indikator.length}
                  sx={{ verticalAlign: "top" }}
                >
                  {sasaran.value}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top" }}>
                  {sasaran.indikator.length > 0
                    ? sasaran.indikator[0].value
                    : ""}
                </TableCell>

                {sasaran.indikator.length > 0 && year == 0 ? (
                  rpjmn && (
                    <>
                      {[0, 1, 2, 3, 4].map((r) => (
                        <TableCell sx={{ verticalAlign: "top" }}>
                          {getTarget(rpjmn.start + r, sasaran.indikator[0])}
                        </TableCell>
                      ))}
                    </>
                  )
                ) : (
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {getTarget(year, sasaran.indikator[0])}
                  </TableCell>
                )}
              </TableRow>
              {sasaran.indikator.slice(1).map((indikator, i) => (
                <TableRow key={`indikator-${index}-${i}`}>
                  <TableCell sx={{ verticalAlign: "top" }}>
                    {indikator.value}
                  </TableCell>

                  {year == 0 ? (
                    rpjmn && (
                      <>
                        {[0, 1, 2, 3, 4].map((r) => (
                          <TableCell sx={{ verticalAlign: "top" }}>
                            {getTarget(rpjmn.start + r, indikator)}
                          </TableCell>
                        ))}
                      </>
                    )
                  ) : (
                    <TableCell width={200}>
                      {getTarget(year, indikator)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
