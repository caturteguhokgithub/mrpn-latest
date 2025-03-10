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

  return (
    <Stack gap={2}>
      {/* <Stack>
        <Typography fontStyle="italic" fontSize={14}>
          Target
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {target}
        </Typography>
      </Stack>
      <Stack>
        <Typography fontStyle="italic" fontSize={14}>
          Kapasitas
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {kapasitas}
        </Typography>
      </Stack>
      <Stack>
        <Typography fontStyle="italic" fontSize={14}>
          Inherent Risk
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {inherent}
        </Typography>
      </Stack>
      <Stack>
        <Typography fontStyle="italic" fontSize={14}>
          Keterangan
        </Typography>
        <Typography sx={{ width: "50%" }} color={grey[900]}>
          {note}
        </Typography>
      </Stack> */}
      <Stack gap={0.5}>
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
