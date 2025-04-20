import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/app/components/icons/icon-fa";
import { grey } from "@mui/material/colors";
import { ExsumFundDataTableRes } from "@/app/executive-summary/partials/tab8Fund/cardFundModel";
import { RODataTable } from "@/app/misc/rkp/rkpServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { FormatIDR } from "@/lib/utils/currency";
import { bgColorTh } from "@/app/utils/color";
import usePendanaanList from "../hooks/vm";

const TableFundPPKP = (props: { row?: RODataTable[]; project: string }) => {
  const { row, project } = props;
  const { year, rpjmn } = useRKPContext((store) => store);
  const { data, dataTableFund, loadingContext } = usePendanaanList();

  console.log(dataTableFund);


  let multiyear: number[] = [year];
  // if (year == 0) {
  //   multiyear = GenerateRpjmnYear(rpjmn);
  // }

  multiyear = GenerateRpjmnYear(rpjmn);

  const getRowData = (key: string, data: RODataTable | undefined) => {
    if (data == undefined) return "";
    const obj: any = JSON.parse(JSON.stringify(data));
    let val = obj[key];

    if (
      key == "anggaran_0" ||
      key == "anggaran_1" ||
      key == "anggaran_2" ||
      key == "anggaran_3" ||
      key == "anggaran_4"
    ) {
      const intVal: number = obj[key];
      val = (intVal / 1000).toFixed(2);
      return val;
    }

    return val;
  };

  const styleFixedColumn = {
    position: "sticky",
    left: 0,
    boxShadow: "5px 2px 5px rgba(0,0,0,0.1)",
    borderRight: "1px solid #e0e0e0",
    width: 250,
  };

  return (
    <TableContainer
      className="table-fund"
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        overflowX: "auto",
        maxHeight: "48vh",
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
      <Table
        size="small"
        sx={{
          tableLayout: "fixed",
          ...(year > 0
            ? {
              width: "100%",
              [theme.breakpoints.down("xl")]: {
                ...styleFixedColumn,
                width: 1500,
              },
            }
            : { width: 4000 }),
        }}
        stickyHeader
      >
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell
              rowSpan={2}
              sx={{
                ...(year > 0 ? null : styleFixedColumn),
                bgcolor: bgColorTh,
                zIndex: 3,
                textAlign: "center",
                whiteSpace: "nowrap",
                [theme.breakpoints.down("xl")]: {
                  ...styleFixedColumn,
                },
              }}
            >
              RO/Project
            </TableCell>

            {multiyear.map((y, iY) => (
              <TableCell
                colSpan={4}
                align={"center"}
                sx={{ bgcolor: bgColorTh }}
              >
                {y}
              </TableCell>
            ))}
            <TableCell
              rowSpan={2}
              sx={{
                width: 250,
                bgcolor: bgColorTh,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Instansi Pelaksana RO
            </TableCell>
            <TableCell
              rowSpan={2}
              sx={{ bgcolor: bgColorTh, textAlign: "center" }}
            >
              Lokasi RO
              <br />
              (Prov./Kab./Kota)
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 38,
              },
            }}
          >
            {multiyear.map((y, iY) => (
              <>
                <TableCell sx={{ bgcolor: bgColorTh, textAlign: "center" }}>
                  Target
                </TableCell>
                <TableCell sx={{ bgcolor: bgColorTh, textAlign: "center" }}>
                  Satuan
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: bgColorTh,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  Pembiayaan (Juta)
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: bgColorTh,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sumber Pembiayaan
                </TableCell>
              </>
            ))}
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: "calc(38px + 38px)",
              },
              "th:nth-of-type(1)": {
                ...(year > 0 ? null : styleFixedColumn),
                zIndex: 3,
                [theme.breakpoints.down("xl")]: {
                  ...styleFixedColumn,
                },
              },
            }}
          >
            {[...new Array(year > 0 ? 7 : 23)].map((_, i) => (
              <TableCell
                sx={{
                  bgcolor: grey[100],
                }}
              >
                <Typography color={grey[500]} fontSize={12} textAlign="center">
                  {i + 1}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTableFund?.map((fundRow, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{
                  ...(year > 0 ? null : styleFixedColumn),
                  verticalAlign: "top",
                  background: "white",
                  [theme.breakpoints.down("xl")]: {
                    ...styleFixedColumn,
                  },
                }}
              >
                <Typography
                  component="span"
                  color={grey[500]}
                  fontSize="0.9rem"
                >
                  {fundRow.code}
                </Typography>
                <br />
                {fundRow.value}
              </TableCell>

              {multiyear.map((y, iY) => (
                <>
                  <TableCell>{getRowData(`target_${iY}`, fundRow)}</TableCell>
                  <TableCell>{getRowData(`satuan_${iY}`, fundRow)}</TableCell>
                  <TableCell align={"right"}>
                    {FormatIDR(getRowData(`anggaran_${iY}`, fundRow))}
                  </TableCell>
                  <TableCell>
                    {getRowData(`sumber_anggaran_${iY}`, fundRow)}
                  </TableCell>
                </>
              ))}

              <TableCell sx={{ verticalAlign: "top" }}>
                {fundRow?.kementrian?.value ?? "-"}
              </TableCell>
              <TableCell sx={{ verticalAlign: "top" }}>
                {fundRow.lokasi_ro ? fundRow.lokasi_ro : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function TableFund({
  project,
  data,
}: {
  project?: string;
  data: ExsumFundDataTableRes[];
}) {
  return <TableFundPPKP project="KP" />;
}
