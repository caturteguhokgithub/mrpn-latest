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

export default function FormKemungkinanEmpty({
  mode,
  state,
  setState,
  handleChangePayload,
  payloadValues,
}: {
  mode?: string;
  state: doRequestPossibilityDto;
  setState: (value: SetStateAction<doRequestPossibilityDto>) => void;
  handleChangePayload: any;
  payloadValues: any;
}) {
  const dataKemungkinan = [
    "Hampir tidak terjadi (1)",
    "Jarang terjadi (2)",
    "Kadang terjadi (3)",
    "Sering terjadi (4)",
    "Hampir pasti terjadi (5)",
  ];

  // const handleChange = (
  //   index: number,
  //   field: keyof doValues,
  //   level_kemungkinan: string,
  //   value: string
  // ) => {
  //   setState((prev) => {
  //     const updatedValues = [...prev.values];
  //     updatedValues[index] = {
  //       ...updatedValues[index],
  //       ["level_kemungkinan"]: level_kemungkinan,
  //       [field]: value,
  //     };

  //     return {
  //       ...prev,
  //       values: updatedValues,
  //     };
  //   });
  // };

  console.log({ payloadValues });

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
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
                    value={payloadValues[index]?.probabilitas}
                    onChange={(e) =>
                      // handleChange(index, "probabilitas", item, e.target.value)
                      handleChangePayload(index, "probabilitas", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextareaStyled
                    placeholder="Frekuensi"
                    minRows={2}
                    value={payloadValues[index]?.jumlah_frekuensi}
                    onChange={(e) =>
                      handleChangePayload(
                        index,
                        "jumlah_frekuensi",
                        e.target.value
                      )
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
