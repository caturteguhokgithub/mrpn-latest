import React, { Fragment } from "react";
import {
  Box,
  FormControl,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { dataMatriks } from "../../kriteria/dataMatriks";

export default function FormatBP({
  form,
  levelId,
  target,
  kapasitas,
  inherent,
  note,
}: {
  form: React.ReactNode;
  target: React.ReactNode;
  kapasitas: React.ReactNode;
  inherent: React.ReactNode;
  note: React.ReactNode;
  levelId: number;
}) {
  const colorMap: { [key: string]: string } = {
    blue: blue[400],
    green: green[400],
    yellow: yellow[400],
    orange: orange[400],
    red: red[400],
  };

  const matriksFive = (
    <>
      {dataMatriks.map((itemMatriks, index) => (
        <Fragment key={index}>
          {levelId === itemMatriks.id && (
            <>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    <TableCell
                      colSpan={3}
                      rowSpan={3}
                      align="center"
                      sx={{ p: 1 }}
                    >
                      {itemMatriks.header.title}
                    </TableCell>
                    <TableCell colSpan={5} align="center" sx={{ p: 1 }}>
                      Level Dampak
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    {itemMatriks.header.levels.map((level, index) => (
                      <TableCell key={index} align="center" sx={{ p: 1 }}>
                        {level}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    {itemMatriks.header.descriptions.map((desc, index) => (
                      <TableCell key={index} align="center" sx={{ p: 1 }}>
                        {desc}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      width={70}
                      rowSpan={5}
                      align="center"
                      sx={{
                        p: 1,
                        transform: "rotate(270deg)",
                      }}
                    >
                      Level Kemungkinan
                    </TableCell>
                    <TableCell align="center">{5}</TableCell>
                    <TableCell>{itemMatriks.rows[0].frequency}</TableCell>
                    {itemMatriks.rows[0].values.map((value, colIndex) => (
                      <TableCell
                        key={colIndex}
                        align="center"
                        width={150}
                        sx={{
                          fontWeight: 700,
                          bgcolor:
                            colorMap[itemMatriks.rows[0].colors[colIndex]],
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                  {itemMatriks.rows.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell align="center">{4 - rowIndex}</TableCell>
                      <TableCell>{row.frequency}</TableCell>
                      {row.values.map((value, colIndex) => (
                        <TableCell
                          key={colIndex}
                          align="center"
                          sx={{
                            fontWeight: 700,
                            bgcolor: colorMap[row.colors[colIndex]],
                          }}
                        >
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Fragment>
      ))}
    </>
  );

  const levelMatriks = (
    <Table>
      <TableHead>
        <TableRow sx={{ bgcolor: grey[200] }}>
          <TableCell>Level Risiko</TableCell>
          <TableCell align="center">Besaran Risiko </TableCell>
          <TableCell align="center">Warna</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Sangat Tinggi (5)</TableCell>
          <TableCell align="center">21 - 25</TableCell>
          <TableCell align="center" sx={{ bgcolor: red[400] }}>
            Merah
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Tinggi (4)</TableCell>
          <TableCell align="center">18 - 20</TableCell>
          <TableCell align="center" sx={{ bgcolor: orange[400] }}>
            Oranye
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sedang (3)</TableCell>
          <TableCell align="center">12 - 15</TableCell>
          <TableCell align="center" sx={{ bgcolor: yellow[400] }}>
            Kuning
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Rendah (2)</TableCell>
          <TableCell align="center">7 - 11</TableCell>
          <TableCell align="center" sx={{ bgcolor: green[400] }}>
            Hijau
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sangat Rendah (1)</TableCell>
          <TableCell align="center">1 - 6</TableCell>
          <TableCell align="center" sx={{ bgcolor: blue[400] }}>
            Biru
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography fontStyle="italic" fontSize={14}>
          Target
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {target}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography fontStyle="italic" fontSize={14}>
          Kapasitas
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {kapasitas}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography fontStyle="italic" fontSize={14}>
          Inherent Risk
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {inherent}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography fontStyle="italic" fontSize={14}>
          Keterangan
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {note}
        </Typography>
      </Stack>
      <Stack gap={1}>
        <Typography fontStyle="italic" fontSize={14}>
          Tuliskan pernyataan selera risiko
        </Typography>
        <Box>
          <FormControl sx={{ width: "50%" }}>{form}</FormControl>
        </Box>
        {/* <Stack display="grid" gridTemplateColumns="2.75fr 1.25fr" gap={2}>
    {matriksFive}
    {levelMatriks}
   </Stack> */}
      </Stack>
    </Stack>
  );
}
