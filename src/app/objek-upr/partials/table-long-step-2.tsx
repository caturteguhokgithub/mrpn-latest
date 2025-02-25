import React from "react";
import {
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
import EmptyState from "@/app/components/empty";
import {IconEmptyData} from "@/app/components/icons";
import {usePenetapanTopicContext} from "@/lib/core/hooks/useHooks";
import {PenetapanObjectPrioritas, PenetapanObjectUraianDto} from "@/lib/core/context/penetapanTopicContext";

export default function TableLonglistStepTwo({mode}: { mode?: string }) {

  const {
    uraianState,
    setUraianState
  } = usePenetapanTopicContext(state => state)

  function handleChecked(checked: boolean, i: number) {
    const curUraian: PenetapanObjectUraianDto[] = uraianState
    curUraian[i].objek = checked
    setUraianState(curUraian)
  }

  return (
    <>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table sx={{minWidth: 650}} size="small">
          <TableHead sx={{bgcolor: theme.palette.primary.light}}>
            <TableRow>
              <TableCell width={70}>No.</TableCell>
              <TableCell>Uraian Objek MRPN Linsek</TableCell>
              <TableCell align="center">Prioritas</TableCell>
              <TableCell align="center">Pilih sebagai Objek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mode === "add" ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <EmptyState
                    icon={<IconEmptyData/>}
                    title="Data Kosong"
                    description="Silahkan isi konten tabel ini"
                  />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {uraianState.map((row, i) =>
                  row.prioritas.length > 0 && (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.rkp.value}</TableCell>
                    <TableCell align="center">{row.priotitas_order}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.objek}
                        onChange={(e) => handleChecked(e.target.checked, i)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
