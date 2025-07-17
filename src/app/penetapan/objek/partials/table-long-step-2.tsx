import React from "react";
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
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import { usePenetapanTopicContext } from "@/lib/core/hooks/useHooks";
import {
  PenetapanObjectPrioritas,
  PenetapanObjectUraianDto,
} from "@/lib/core/context/penetapanTopicContext";
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/utils/color";

export default function TableLonglistStepTwo({ mode }: { mode?: string }) {
  const { uraianState, setUraianState } = usePenetapanTopicContext(
    (state) => state
  );

  // console.log(uraianState);

  function handleChecked(checked: boolean, i: number) {
    const curUraian: PenetapanObjectUraianDto[] = uraianState;
    curUraian[i].objek = checked;
    setUraianState(curUraian);
  }

  return (
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
            <TableCell width={70}>No.</TableCell>
            <TableCell>Uraian Objek MRPN LS</TableCell>
            <TableCell align="center">Prioritas</TableCell>
            <TableCell align="center">Pilih sebagai Objek</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mode === "add" ? (
            <TableRow>
              <TableCell colSpan={7}>
                <EmptyState
                  icon={<IconEmptyData />}
                  title="Data Kosong"
                  description="Silahkan isi konten tabel ini"
                />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {uraianState
                .slice()
                .sort((a, b) => {
                  // Jika ranking = 0, dianggap paling besar
                  const rankA = a.ranking === 0 ? Infinity : a.ranking;
                  const rankB = b.ranking === 0 ? Infinity : b.ranking;
                  return rankA - rankB;
                })
                .map(
                  (row, i) =>
                    row.prioritas.length > 0 && (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{row.rkp.value}</TableCell>
                        <TableCell align="center">
                          {row.ranking === 0 ? "-" : row.ranking}
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox
                            checked={row.objek}
                            onChange={(e) => handleChecked(e.target.checked, i)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
