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
import {GetTarget} from "@/lib/utils/common";

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

  const getTarget = (indikator: IndikatorDto) => {
    return GetTarget(rpjmn, year, indikator)
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
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <TableRow>
                <TableCell width={150}>Kode</TableCell>
                <TableCell>Indikator</TableCell>
                <TableCell>Target</TableCell>
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
                  <TableCell>{getTarget(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </CardItem>
  );
}
