import React from "react";
import {
  alpha,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/app/utils/color";

export default function TableDetail() {
  const data = {
    Januari: [
      {
        task: "Proses pemilihan konsultan rencana study dan pengembangan Proses pemilihan konsultan rencana study dan pengembangan Proses pemilihan konsultan rencana study dan pengembangan",
        target: "1 Dok",
      },
      { task: "Penetapan konsultan", target: "1 PT/Lembaga" },
    ],
    Februari: [{ task: "Penetapan konsultan", target: "1 PT/Lembaga" }],
    Maret: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    April: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    Mei: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    Juni: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    Juli: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    Agustus: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    September: [
      { task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" },
    ],
    Oktober: [{ task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" }],
    November: [
      { task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" },
    ],
    Desember: [
      { task: "Pelaksanaan study dan kelembagaan", target: "1 Draft" },
    ],
  };

  return (
    <>
      <Table
        sx={{
          minWidth: 650,
          "th, td": {
            p: {
              fontSize: "14px !important",
            },
          },
        }}
        size="small"
        stickyHeader
      >
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh }}>
              <Typography variant="body2" fontWeight={600}>
                No.
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }}>
              <Typography variant="body2" fontWeight={600}>
                RO/Project Kunci
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, width: 150 }}>
              <Typography variant="body2" fontWeight={600}>
                Target
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([month, tasks]) => (
            <>
              <TableRow key={month}>
                <TableCell colSpan={3} sx={{ bgcolor: grey[100] }}>
                  <Typography variant="body2" fontWeight={600}>
                    {month}
                  </Typography>
                </TableCell>
              </TableRow>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body2">{index + 1}.</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{task.task}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{task.target}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
