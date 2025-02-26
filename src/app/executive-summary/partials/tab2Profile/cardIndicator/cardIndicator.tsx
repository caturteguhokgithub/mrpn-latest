import React, { useEffect } from "react";
import {
  alpha,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import useCardSupportVM from "@/app/executive-summary/partials/tab2Profile/cardSupport/cardSupportVM";
import { useExsumContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { IndikatorDto } from "@/app/misc/rkp/rkpServiceModel";
import useCardIndikatorVM from "@/app/executive-summary/partials/tab2Profile/cardIndicator/cardIndikatorVM";
import theme from "@/theme";
import { DasarPemilihan } from "@/app/penetapan/objek/pageModel";
import { GenerateRpjmnYear, GetTarget } from "@/lib/utils/common";
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/app/utils/color";

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

export default function CardIndicator({ project }: { project: string }) {
  const { exsum } = useExsumContext();

  const { indikatorKP, getIndikatorProject } = useCardIndikatorVM();

  useEffect(() => {
    getIndikatorProject();
  }, [exsum]);

  const { rpjmn, year } = useRKPContext((store) => store);

  const getTarget = (indikator: IndikatorDto, paramYear: number) => {
    return GetTarget(rpjmn, paramYear, indikator);
  };

  return (
    <CardItem title={`Indikator ${exsum.level}`}>
      {indikatorKP.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table
            sx={{
              minWidth: 650,
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
          >
            <TableHead sx={{ bgcolor: bgColorTh }}>
              <TableRow>
                <TableCell width={150} sx={{ textAlign: "center" }}>
                  Kode
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Indikator</TableCell>
                {year > 0 && (
                  <TableCell sx={{ textAlign: "center" }}>Target</TableCell>
                )}
                {year == 0 &&
                  GenerateRpjmnYear(rpjmn).map((y, i) => (
                    <TableCell key={i} sx={{ textAlign: "center" }}>
                      Target {y}
                    </TableCell>
                  ))}
              </TableRow>
              <TableRow>
                {[...new Array(year > 0 ? 3 : 7)].map((_, i) => (
                  <TableCell sx={{ bgcolor: grey[100] }}>
                    <Typography
                      color={grey[500]}
                      fontSize={14}
                      textAlign="center"
                    >
                      {i + 1}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {indikatorKP.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  {year > 0 && <TableCell>{getTarget(row, year)}</TableCell>}
                  {year == 0 &&
                    GenerateRpjmnYear(rpjmn).map((y, i) => (
                      <TableCell key={i}>{getTarget(row, y)}</TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CardItem>
  );
}
