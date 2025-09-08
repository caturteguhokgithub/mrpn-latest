import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Iconify from "@/icons/iconify";
import DialogComponent from "../../dialog";
import { bgColorTh } from "@/utils/color";
import SelectCustomTheme from "../../select";

export default function ModulePopup({
  emonevModal,
  setEmonevModal,
}: {
  emonevModal: boolean;
  setEmonevModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [roDropdown, setRoDropdown] = React.useState("");

  const handleChangeRo = (event: SelectChangeEvent) => {
    setRoDropdown(event.target.value);
  };

  const tahunModul = ["2025", "2026", "2027", "2028", "2029"];

  const dataModule = [
    {
      id: "1",
      name: "Renjakl",
      desc: "Aplikasi eMonev Renjakl",
      tahun: "2025",
      url: "https://e-monev.bappenas.go.id",
    },
    {
      id: "2",
      name: "Renjakl",
      desc: "Aplikasi eMonev Renjakl",
      tahun: "2025",
      url: "https://e-monev.bappenas.go.id",
    },
    {
      id: "3",
      name: "Renjakl",
      desc: "Aplikasi eMonev Renjakl",
      tahun: "2025",
      url: "https://e-monev.bappenas.go.id",
    },
  ];

  return (
    <DialogComponent
      tableMode
      title="Modul E-Monev"
      dialogOpen={emonevModal}
      dialogClose={() => setEmonevModal(false)}
    >
      <Box px={3} pb={1}>
        <Typography>
          Silahkan pilih{" "}
          <Typography component="strong" fontWeight={600}>
            modul
          </Typography>{" "}
          dan tahun anggaran yang ingin Anda akses
        </Typography>
      </Box>
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
            tbody: {
              "tr:nth-child(odd) > td": {
                backgroundColor: grey[100],
              },
            },
          }}
          size="small"
        >
          <TableHead sx={{ bgcolor: bgColorTh }}>
            <TableRow>
              <TableCell width={70} align="center">
                No.
              </TableCell>
              <TableCell align="center">Modul/Subsistem</TableCell>
              <TableCell align="center" width={100}>
                Tahun
              </TableCell>
              <TableCell align="center" width={100}>
                Aksi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataModule.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell>
                  <Typography textTransform="uppercase">
                    <Typography component="strong" fontWeight={600}>
                      {item.name}
                    </Typography>{" "}
                    <Typography component="span">- {item.desc}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <SelectCustomTheme
                    defaultStyle
                    small
                    anchorRight
                    value={roDropdown}
                    onChange={handleChangeRo}
                  >
                    <MenuItem value="" disabled>
                      <Typography
                        fontSize={14}
                        fontStyle="italic"
                        color={grey[600]}
                        fontWeight={600}
                      >
                        Pilih tahun
                      </Typography>
                    </MenuItem>
                    {tahunModul.map((yearItem, index) => (
                      <MenuItem key={index} value={yearItem}>
                        {yearItem}
                      </MenuItem>
                    ))}
                  </SelectCustomTheme>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(item.url, "_self")}
                    sx={{ aspectRatio: "1 / 1", minWidth: 0, padding: 1 }}
                  >
                    <Iconify name="mdi:link-variant" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogComponent>
  );
}
