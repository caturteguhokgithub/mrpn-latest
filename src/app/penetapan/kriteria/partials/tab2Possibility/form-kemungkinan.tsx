import React, { SetStateAction } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "@/theme";
import TextareaComponent, { TextareaStyled } from "@/app/components/textarea";
import { doRequestPossibilityDto, doValues } from "./hooks/possibilityModel";

export default function FormKemungkinan({
  mode,
  state,
  setState,
}: {
  mode?: string
  state: doRequestPossibilityDto
  setState: (value: SetStateAction<doRequestPossibilityDto>) => void;
}) {
  const dataKemungkinan = [
    "Hampir tidak terjadi (1)",
    "Jarang terjadi (2)",
    "Kadang terjadi (3)",
    "Sering terjadi (4)",
    "Hampir pasti terjadi (5)",
  ];

  const handleChange = (index: number, field: keyof doValues, level_kemungkinan: string, value: string) => {
    setState((prev) => {
      const updatedValues = [...prev.values];
      updatedValues[index] = {
        ...updatedValues[index],
        ["level_kemungkinan"]: level_kemungkinan,
        [field]: value,
      };

      return {
        ...prev,
        values: updatedValues,
      };
    });
  };


  return (
    <Paper sx={{ overflowX: "auto", minWidth: "100% !important" }}>
      <Table size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell width="30%">Level Kemungkinan</TableCell>
            <TableCell>Probabilitas</TableCell>
            <TableCell>Jumlah Frekuensi</TableCell>
            <TableCell>Low frequency event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataKemungkinan.map((item, index) => {
            let detail = null;

            if (state !== undefined) {
              detail = state.values.find(
                (d) => d.level_kemungkinan === item
              );
            }

            return (
              <TableRow key={index}>
                <TableCell>{item}</TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Probabilitas"
                    minRows={2}
                    // width="100%"
                    value={detail?.probabilitas}
                    onChange={(e) => handleChange(index, "probabilitas", item, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Jumlah Frekuensi"
                    minRows={2}
                    // width="100%"
                    value={detail?.jumlah_frekuensi}
                    onChange={(e) =>
                      handleChange(index, "jumlah_frekuensi", item, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Low Frequency Event"
                    minRows={2}
                    // width="100%"
                    value={detail?.low_frekuensi}
                    onChange={(e) =>
                      handleChange(index, "low_frekuensi", item, e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </Paper>
  );
}
