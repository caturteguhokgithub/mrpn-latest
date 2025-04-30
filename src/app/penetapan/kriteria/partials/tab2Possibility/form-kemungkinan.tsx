import React, { SetStateAction } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
  mode?: string;
  state: doRequestPossibilityDto;
  setState: (value: SetStateAction<doRequestPossibilityDto>) => void;
}) {
  const dataKemungkinan = [
    "Hampir tidak terjadi (1)",
    "Jarang terjadi (2)",
    "Kadang terjadi (3)",
    "Sering terjadi (4)",
    "Hampir pasti terjadi (5)",
  ];

  const handleChange = (
    index: number,
    field: keyof doValues,
    level_kemungkinan: string,
    value: string
  ) => {
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
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        // overflowX: "auto",
        // maxHeight: "48vh",
        "td, th": {
          "&.MuiTableCell-root": {
            border: "1px solid rgb(224, 224, 224)",
          },
          "&:first-of-type": {
            borderLeft: 0,
          },
        },
        "&::-webkit-scrollbar": {
          height: "6px",
          cursor: "pointer",
        },
      }}
    >
      <Table size="small">
        <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
          <TableRow>
            <TableCell width={240} align="center">
              Level Kemungkinan
            </TableCell>
            <TableCell align="center">Persentase</TableCell>
            <TableCell colSpan={2} align="center">
              Frekuensi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataKemungkinan.map((item, index) => {
            let detail = null;

            if (state !== undefined) {
              detail = state.values.find((d) => d.level_kemungkinan === item);
            }

            return (
              <TableRow key={index}>
                <TableCell>{item}</TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Persentase"
                    minRows={2}
                    // width="100%"
                    value={detail?.probabilitas}
                    onChange={(e) =>
                      handleChange(index, "probabilitas", item, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Frekuensi"
                    minRows={2}
                    // width="100%"
                    value={detail?.jumlah_frekuensi}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "jumlah_frekuensi",
                        item,
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Frekuensi"
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
    </TableContainer>
  );
}
