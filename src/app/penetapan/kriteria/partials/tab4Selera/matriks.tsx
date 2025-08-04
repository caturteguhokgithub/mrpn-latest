import React, { Fragment } from "react";
import {
  Box,
  Chip,
  FormControl,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { dataMatriks } from "./dataMatriks";
import theme from "@/theme";
import { bgColorTh } from "@/utils/color";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import { doGetSeleraDto } from "./hooks/model";

const CircleNumber = ({
  value,
  position,
  color,
}: {
  value: number;
  position: string;
  color: string;
}) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: `1px solid black`,
        position: "absolute",
        top: "50%",
        left: position === "left" ? 12 : "auto",
        right: position === "right" ? 12 : "auto",
        transform: "translateY(-50%)",
        bgcolor: color === "green" ? green[600] : blue[600],
        color: "white",
        fontSize: 12,
      }}
    >
      {value}
    </Box>
  );
};

const getBorderStyle = (
  levelDampak: string,
  // targetLevel: string,
  value: number,
  rightValues: number[],
  topValues: number[]
) => {
  const isRight = levelDampak && rightValues.includes(value);
  const isTop = levelDampak && topValues.includes(value);
  return {
    borderRight: isRight ? "3px dashed black !important" : "none",
    borderTop: isTop ? "3px dashed black !important" : "none",
  };
};

export default function SeleraMatriks({
  levelId,
  darkMode,
  levelDampak,
  dataSelera,
  penetapan,
}: {
  levelId?: number;
  darkMode?: boolean;
  levelDampak: string;
  dataSelera?: doGetSeleraDto;
  penetapan?: boolean;
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
      {levelDampak != "" ? (
        dataMatriks.map((itemMatriks, index) => (
          <Fragment key={index}>
            {penetapan && (
              <Stack gap={1}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <Typography gutterBottom color={grey[600]}>
                      Selera Risiko
                    </Typography>
                    <Box>
                      <Chip
                        color="primary"
                        label={levelDampak}
                        sx={{
                          fontSize: 14,
                          px: 1,
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={9}>
                  <FormControl fullWidth>
                    <Typography gutterBottom color={grey[600]}>
                      Pernyataan Selera Risiko
                    </Typography>
                    <Typography fontWeight={600}>
                      {dataSelera &&
                      dataSelera.referensi &&
                      dataSelera.referensi[0]
                        ? dataSelera.referensi[0].pernyataan
                        : "-"}
                    </Typography>
                  </FormControl>
                </Grid>
              </Stack>
            )}
            {levelId === itemMatriks.id && (
              <>
                <Table
                  sx={{
                    border: `1px solid ${grey[300]}`,
                    td: {
                      "&:first-of-type, &:nth-of-type(2)": {
                        color: darkMode
                          ? "white"
                          : theme.palette.secondary.dark,
                      },
                    },
                    tr: {
                      "&:first-of-type": {
                        td: {
                          "&:nth-of-type(3)": {
                            color: darkMode
                              ? "white"
                              : theme.palette.secondary.dark,
                          },
                        },
                      },
                    },
                  }}
                >
                  <TableHead
                    sx={{
                      "td, th": {
                        borderColor: darkMode ? grey[700] : grey[300],
                        bgcolor: darkMode ? "unset" : bgColorTh,
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        rowSpan={3}
                        align="center"
                        sx={{
                          p: 1,
                          color: darkMode
                            ? grey[400]
                            : theme.palette.secondary.dark,
                        }}
                      >
                        {itemMatriks.header.title}
                      </TableCell>
                      <TableCell
                        colSpan={5}
                        align="center"
                        sx={{
                          p: 1,
                          color: darkMode
                            ? grey[400]
                            : theme.palette.secondary.dark,
                        }}
                      >
                        Level Dampak
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {itemMatriks.header.levels.map((level, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          sx={{
                            p: 1,
                            color: darkMode
                              ? grey[400]
                              : theme.palette.secondary.dark,
                          }}
                        >
                          {level}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {itemMatriks.header.descriptions.map((desc, index) => (
                        <TableCell
                          key={index}
                          align="center"
                          sx={{
                            p: 1,
                            color: darkMode
                              ? grey[400]
                              : theme.palette.secondary.dark,
                          }}
                        >
                          {desc}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      "td, th": {
                        borderColor: darkMode ? grey[700] : grey[300],
                      },
                    }}
                  >
                    <TableRow
                      sx={{
                        "&:first-of-type ": {
                          td: { "&:first-of-type": { border: 0 } },
                        },
                      }}
                    >
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
                      <TableCell align="center" sx={{ fontWeight: 600 }}>
                        {5}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {itemMatriks.rows[0].frequency}
                      </TableCell>
                      {itemMatriks.rows[0].values.map((value, colIndex) => {
                        const konservatifStyle = getBorderStyle(
                          levelDampak,
                          value,
                          [7],
                          [7]
                        );
                        const moderatStyle = getBorderStyle(
                          levelDampak,
                          value,
                          [12],
                          [12]
                        );
                        const tinggiStyle = getBorderStyle(
                          levelDampak,
                          value,
                          [17],
                          [17]
                        );

                        return (
                          <TableCell
                            key={colIndex}
                            align="center"
                            width={150}
                            sx={{
                              fontWeight: 700,
                              bgcolor:
                                colorMap[itemMatriks.rows[0].colors[colIndex]],
                              position: "relative",
                              ...(levelDampak == "konservatif" &&
                                konservatifStyle),
                              ...(levelDampak == "moderat" && moderatStyle),
                              ...(levelDampak == "tinggi" && tinggiStyle),
                              // borderRight:
                              //   value === 12
                              //     ? "3px dotted darkgray !important"
                              //     : "none",
                              // borderTop:
                              //   value === 12
                              //     ? "3px dotted darkgray !important"
                              //     : "none",
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {itemMatriks.rows.slice(1).map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" sx={{ fontWeight: 600 }}>
                          {4 - rowIndex}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {row.frequency}
                        </TableCell>
                        {row.values.map((value, colIndex) => {
                          const rendahStyle = getBorderStyle(
                            levelDampak,
                            value,
                            [4, 3, 2, 5],
                            [4, 5]
                          );
                          const konservatifStyle = getBorderStyle(
                            levelDampak,
                            value,
                            [9, 8, 6, 10],
                            [9, 10]
                          );
                          const moderatStyle = getBorderStyle(
                            levelDampak,
                            value,
                            [14, 13, 11, 15],
                            [14, 15]
                          );
                          const tinggiStyle = getBorderStyle(
                            levelDampak,
                            value,
                            [19, 18, 16],
                            [19, 20]
                          );

                          return (
                            <TableCell
                              key={colIndex}
                              align="center"
                              sx={{
                                fontWeight: 700,
                                bgcolor: colorMap[row.colors[colIndex]],
                                position: "relative",
                                ...(levelDampak == "rendah" && rendahStyle),
                                ...(levelDampak == "konservatif" &&
                                  konservatifStyle),
                                ...(levelDampak == "moderat" && moderatStyle),
                                ...(levelDampak == "tinggi" && tinggiStyle),
                              }}
                            >
                              {value === 13 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={3}
                                  color="green"
                                  position="left"
                                /> */}
                                </>
                              ) : value === 16 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={2}
                                  color="green"
                                  position="left"
                                />
                                <CircleNumber
                                  value={4}
                                  color="green"
                                  position="right"
                                /> */}
                                </>
                              ) : value === 18 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={1}
                                  color="green"
                                  position="left"
                                />
                                <CircleNumber
                                  value={4}
                                  color="blue"
                                  position="right"
                                /> */}
                                </>
                              ) : value === 19 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={3}
                                  color="blue"
                                  position="right"
                                /> */}
                                </>
                              ) : value === 23 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={2}
                                  color="blue"
                                  position="left"
                                /> */}
                                </>
                              ) : value === 24 ? (
                                <>
                                  {value}
                                  {/* <CircleNumber
                                  value={1}
                                  color="blue"
                                  position="left"
                                /> */}
                                </>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Fragment>
        ))
      ) : (
        <EmptyState
          icon={<IconEmptyPage />}
          title="Matriks Selera Risiko Kosong"
          description="Silahkan pilih level dampak untuk menampilkan matriks selera risiko"
        />
      )}
    </>
  );

  return (
    <Stack>
      {matriksFive}
      {/* {levelMatriks} */}
    </Stack>
  );
}
