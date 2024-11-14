import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { dataMatriks } from "@/app/penetapan/kriteria/dataMatriks";

export default function Matriks({
  levelId,
  handleClick,
  clickedCell,
  fontSize = [],
  noClick,
}: {
  levelId?: number;
  handleClick?: any;
  fontSize?: any;
  clickedCell?: any;
  noClick?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <Table
                sx={{
                  pointerEvents: noClick ? "none" : "unset",

                  "td, th": {
                    fontSize: 12,
                    p: 0.5,
                    transition: "opacity 200ms ease, font-size 500ms ease",
                    "&.active-cell": {
                      opacity: 1,
                    },
                    "&.deactive-cell": {
                      opacity: 0.5,
                    },
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    <TableCell colSpan={3} rowSpan={3} align="center">
                      {itemMatriks.header.title}
                    </TableCell>
                    <TableCell colSpan={5} align="center">
                      Level Dampak
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    {itemMatriks.header.levels.map((level, index) => (
                      <TableCell key={index} align="center">
                        {level}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow sx={{ bgcolor: grey[200] }}>
                    {itemMatriks.header.descriptions.map((desc, index) => (
                      <TableCell key={index} align="center">
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
                        transform: "rotate(270deg)",
                      }}
                    >
                      Level Kemungkinan
                    </TableCell>
                    <TableCell align="center" width={50}>
                      {5}
                    </TableCell>
                    <TableCell width={120} height={45}>
                      {itemMatriks.rows[0].frequency}
                    </TableCell>
                    {itemMatriks.rows[0].values.map((value, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={
                          clickedCell &&
                          clickedCell.rowIndex === 0 &&
                          clickedCell.colIndex === colIndex
                            ? "active-cell"
                            : isActive
                            ? "deactive-cell"
                            : "active-cell"
                        }
                        align="center"
                        width={150}
                        sx={{
                          fontWeight: 700,
                          bgcolor:
                            colorMap[itemMatriks.rows[0].colors[colIndex]],
                          userSelect: "none",
                          cursor: "pointer",
                          overflow: "hidden",
                          fontSize:
                            clickedCell &&
                            clickedCell.rowIndex === 0 &&
                            clickedCell.colIndex === colIndex
                              ? "20px !important"
                              : fontSize[colIndex] || "12px",
                        }}
                        onClick={() => {
                          handleClick(0, colIndex, value);
                          setIsActive(true);
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                  {itemMatriks.rows.slice(1).map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell align="center">{4 - rowIndex}</TableCell>
                      <TableCell height={45}>{row.frequency}</TableCell>
                      {row.values.map((value, colIndex) => (
                        <TableCell
                          ref={ref}
                          key={colIndex}
                          className={
                            clickedCell &&
                            clickedCell.rowIndex === rowIndex + 1 &&
                            clickedCell.colIndex === colIndex
                              ? "active-cell"
                              : isActive
                              ? "deactive-cell"
                              : "active-cell"
                          }
                          align="center"
                          sx={{
                            fontWeight: 700,
                            bgcolor: colorMap[row.colors[colIndex]],
                            userSelect: "none",
                            cursor: "pointer",
                            overflow: "hidden",
                            fontSize:
                              clickedCell &&
                              clickedCell.rowIndex === rowIndex + 1 &&
                              clickedCell.colIndex === colIndex
                                ? "20px !important"
                                : fontSize[colIndex] || "12px",
                            //   animation:
                            //    clickedCell &&
                            //    clickedCell.rowIndex === rowIndex + 1 &&
                            //    clickedCell.colIndex === colIndex
                            //     ? `${blinkShadow} infinite 2s ease-in`
                            //     : "none",
                          }}
                          onClick={() => {
                            handleClick(rowIndex + 1, colIndex, value);
                            setIsActive(true);
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

  return <Stack>{matriksFive}</Stack>;
}
