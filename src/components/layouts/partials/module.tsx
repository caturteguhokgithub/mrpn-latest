import {
  Box,
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import Iconify from "@/icons/iconify";
import DialogComponent from "../../dialog";
import { bgColorTh } from "@/utils/color";
import SelectCustomTheme from "../../select";
import { DtoSwitchApp, ModuleResDto } from "./module-model";

export default function ModulePopup({
  emonevModal,
  setEmonevModal,
  dataListApp,
  switchApp,
}: {
  emonevModal: boolean;
  setEmonevModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataListApp: ModuleResDto[];
  switchApp: (param: DtoSwitchApp) => Promise<void>;
}) {
  // State untuk menyimpan tahun yang dipilih per modul
  const [selectedYear, setSelectedYear] = useState<Record<string, string>>({});

  const handleChangeYear = (appid: string, year: string) => {
    setSelectedYear((prev) => ({ ...prev, [appid]: year }));
  };

  // Function currying untuk type-safe event handler
  const handleSelectChange = (appid: string) => (e: SelectChangeEvent<string>) => {
    handleChangeYear(appid, e.target.value);
  };

  const handleSwitchApp = (appid: string) => {
    const year = selectedYear[appid];
    if (!year) {
      alert("Silahkan pilih tahun terlebih dahulu");
      return;
    }

    switchApp({ target: String(appid), tahun: String(year) });
  };

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
                "&:last-of-type": { borderRight: "0 !important" },
              },
            },
            tbody: {
              "tr:nth-child(odd) > td": { backgroundColor: grey[100] },
            },
          }}
          size="small"
        >
          <TableHead sx={{ bgcolor: bgColorTh }}>
            <TableRow>
              <TableCell width={70} align="center">No.</TableCell>
              <TableCell align="center">Modul/Subsistem</TableCell>
              <TableCell align="center" width={100}>Tahun</TableCell>
              <TableCell align="center" width={100}>Aksi</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataListApp.map((item, index) => (
              <TableRow key={item.appid}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>
                  <Typography textTransform="uppercase">
                    <Typography component="strong" fontWeight={600}>
                      {item.label}
                    </Typography>{" "}
                    <Typography component="span">- {item.nmapp}</Typography>
                  </Typography>
                </TableCell>
                <TableCell>
                  <SelectCustomTheme
                    value={selectedYear[item.appid] || ""}
                    onChange={handleSelectChange(item.appid)}
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
                    {item.year_access.map((yearItem) => (
                      <MenuItem key={yearItem} value={yearItem}>
                        {yearItem}
                      </MenuItem>
                    ))}
                  </SelectCustomTheme>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSwitchApp(item.appid)}
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