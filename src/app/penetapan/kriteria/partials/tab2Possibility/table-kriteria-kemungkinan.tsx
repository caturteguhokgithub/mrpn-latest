import React, { Fragment, useMemo } from "react";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import { bgColorTh } from "@/app/utils/color";
import { blue, grey, red } from "@mui/material/colors";
import usePossibilityList from "./hooks/usePossibility";
import { ResultPossibility } from "./hooks/possibilityModel";
import { referencePossibility } from "./reference";
import Iconify from "@/app/components/icons/iconify";

export default function TableKemungkinan({
  mode,
  payloadValues,
}: {
  mode?: string;
  payloadValues?: any;
}) {
  const renderTableRows = () => {
    switch (mode) {
      case "reference":
        return (
          <>
            {referencePossibility.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.level}</TableCell>
                <TableCell>{item.persentase}</TableCell>
                <TableCell>
                  {item.jumlah} atau {item.lfe}
                </TableCell>
              </TableRow>
            ))}
          </>
        );
      default:
        return (
          <TableRow>
            <TableCell colSpan={4}>
              <EmptyState
                icon={<IconEmptyData />}
                title="Data Kosong"
                description="Silahkan isi konten tabel ini"
              />
            </TableCell>
          </TableRow>
        );
    }
  };

  const renderTablesNotEmpty = () => {
    return (
      <Fragment>
        {payloadValues.map((row: ResultPossibility) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.level_kemungkinan}</TableCell>
            <TableCell>{row.probabilitas}</TableCell>
            <TableCell>{row.jumlah_frekuensi}</TableCell>
          </TableRow>
        ))}
      </Fragment>
    );
  };

  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table
        size="small"
        sx={{
          minWidth: 650,
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
            },
          },
        }}
      >
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell
              rowSpan={2}
              sx={{ bgcolor: bgColorTh }}
              align="center"
              width={200}
            >
              Level Kemungkinan
            </TableCell>
            <TableCell colSpan={2} align="center" sx={{ bgcolor: bgColorTh }}>
              Kemungkinan Terjadi
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Persentase
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }} align="center">
              Frekuensi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payloadValues?.length ? renderTablesNotEmpty() : renderTableRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
