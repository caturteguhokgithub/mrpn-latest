import React, { Fragment } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";

export default function TablePendanaan() {
  const rows = [
    {
      uraian: "Peningkatan Produksi Padi KSPP Kalimantan Tengah",
      tahunAnggaran: [3, 52, 2, 33, 1],
    },
    {
      uraian: "Peningkatan Produktivitas Padi KSPP Kalimantan Tengah",
      tahunAnggaran: [3, 52, 2, 33, 1],
    },
  ];

  const rowsAnggaranPertahun = [32, 22, 33, 11, 21];
  const rowsSumberAnggaran = ["APBN", "APBN", "APBN", "APBN", "APBN"];

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "calc(100vh - 430px)",
        "&::-webkit-scrollbar": {
          width: "6px",
          cursor: "pointer",
        },
        "tbody, thead": {
          "td, th": {
            borderRight: `1px solid ${grey[300]} !important`,
            "&:last-of-type": {
              borderRight: `1px solid ${grey[300]} !important`,
            },
          },
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell width={150} sx={{ bgcolor: bgColorTh }}>
              Item
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }}>Uraian</TableCell>
            {[2025, 2026, 2027, 2028, 2029].map((cellYear) => (
              <TableCell align="center" width={200} sx={{ bgcolor: bgColorTh }}>
                {cellYear}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {index === 0 && (
                <TableCell
                  rowSpan={rows.length}
                  sx={{
                    verticalAlign: "middle",
                    fontWeight: 500,
                    bgcolor: bgColorTh,
                  }}
                >
                  Indikator
                </TableCell>
              )}
              <TableCell>{row.uraian}</TableCell>
              {row.tahunAnggaran.map((tahun, idx) => (
                <TableCell key={idx} align="center">
                  {tahun}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              colSpan={2}
              align="right"
              sx={{
                verticalAlign: "middle",
                fontWeight: 500,
                bgcolor: bgColorTh,
              }}
            >
              Anggaran per Tahun
            </TableCell>
            {rowsAnggaranPertahun.map((cellItem, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={{ fontWeight: 500, bgcolor: bgColorTh }}
              >
                {cellItem}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={2}
              align="right"
              sx={{
                verticalAlign: "middle",
                fontWeight: 500,
                bgcolor: bgColorTh,
              }}
            >
              Sumber Anggaran
            </TableCell>
            {rowsSumberAnggaran.map((cellItem, idx) => (
              <TableCell
                key={idx}
                align="center"
                sx={{ fontWeight: 500, bgcolor: bgColorTh }}
              >
                {cellItem}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
{
  /* {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.ro}</TableCell>
              <TableCell>
                <Box
                  component="ul"
                  sx={{
                    ml: subItem.detailSub?.length > 1 ? 2 : 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {subItem.detailSub?.map((detail: any, detailIndex: any) => (
                    <Fragment key={detailIndex}>
                      {subItem.detailSub.length > 1 ? (
                        <li>{detail}</li>
                      ) : (
                        detail
                      )}
                    </Fragment>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))} */
}
