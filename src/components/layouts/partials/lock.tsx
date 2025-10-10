import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { grey, red, blue } from "@mui/material/colors";
import React, { useState } from "react";
import DialogComponent from "../../dialog";
import { bgColorTh } from "@/utils/color";
import Iconify from "@/components/icons/iconify";

export default function LockSetting({
  lockModal,
  setLockModal,
}: {
  lockModal: boolean;
  setLockModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [lockedItems, setLockedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const data = [
    "RPJMN",
    "RKP 2025",
    "RKP 2026",
    "RKP 2027",
    "RKP 2028",
    "RKP 2029",
  ];

  const handleToggleLock = (item: string) => {
    setLockedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <DialogComponent
      tableMode
      width={600}
      title="Atur Penguncian"
      dialogOpen={lockModal}
      dialogClose={() => setLockModal(false)}
      closeButton
    >
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table
          sx={{
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
              <TableCell align="center">RPJMN/RKP</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item}>
                <TableCell>{item}</TableCell>
                <TableCell align="center">
                  <Box minWidth={100}>
                    <Stack
                      display="inline-flex"
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      onClick={() => handleToggleLock(item)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Iconify
                        name={
                          lockedItems[item]
                            ? "mdi:lock"
                            : "mdi:lock-open-variant"
                        }
                        onClick={() => handleToggleLock(item)}
                        size={24}
                        color={lockedItems[item] ? red[700] : blue[700]}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                      <Typography
                        fontSize={14}
                        color={lockedItems[item] ? red[700] : blue[700]}
                      >
                        {lockedItems[item] ? "Kunci" : "Buka"}
                      </Typography>
                    </Stack>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogComponent>
  );
}
