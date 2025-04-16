import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { bgColorTh } from "@/app/utils/color";
import { grey } from "@mui/material/colors";
import { referenceImpact } from "./reference";

export default function TableDampak({ mode }: { mode?: string }) {
  return (
    <>
      <Paper sx={{ overflowX: "auto" }} elevation={0} variant="outlined">
        <Table
          size="small"
          sx={{
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
          <TableHead sx={{ bgcolor: bgColorTh }}>
            <TableRow>
              <TableCell rowSpan={3} colSpan={2} align="center">
                Area Dampak
              </TableCell>
              <TableCell colSpan={5} align="center">
                Level Dampak
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">3</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center">5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Tidak Signifikan</TableCell>
              <TableCell align="center">Kurang Signifikan</TableCell>
              <TableCell align="center">Cukup Signifikan</TableCell>
              <TableCell align="center">Signifikan</TableCell>
              <TableCell align="center">Sangat Signifikan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referenceImpact.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell
                    width={160}
                    rowSpan={row.levels.length}
                    sx={{ bgcolor: bgColorTh }}
                  >
                    {row.area}
                  </TableCell>
                  <TableCell width={300}>{row.levels[0].name}</TableCell>
                  {row.levels[0].details.map((detail, idx) => (
                    <TableCell key={idx} sx={{ verticalAlign: "top" }}>
                      {detail}
                    </TableCell>
                  ))}
                </TableRow>
                {row.levels.slice(1).map((level, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{level.name}</TableCell>
                    {level.details.map((detail, i) => (
                      <TableCell key={i} sx={{ verticalAlign: "top" }}>
                        {detail}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
