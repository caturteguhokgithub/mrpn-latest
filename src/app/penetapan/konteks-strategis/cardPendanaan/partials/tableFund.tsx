import React, { Fragment } from "react";
import {
  Button,
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import theme from "@/theme";
import { IconFA } from "@/components/icons/icon-fa";
import { grey, orange } from "@mui/material/colors";
import { ExsumFundDataTableRes } from "@/app/executive-summary/partials/tab8Fund/cardFundModel";
import { RODataTable } from "@/app/misc/rkp/rkpServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { FormatCurrency, FormatIDR } from "@/lib/utils/currency";
import { bgColorTh } from "@/utils/color";
import usePendanaanList from "../hooks/vm";
import Iconify from "@/components/icons/iconify";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";

const TableFundPPKP = (props: { row?: RODataTable[]; project: string }) => {
  const { row, project } = props;
  const { year, rpjmn } = useRKPContext((store) => store);
  const { data, dataTableFund, loadingContext } = usePendanaanList();

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
    <Fragment>
      {dataTableFund?.length == 0 ? (
        <EmptyState
          icon={<IconEmptyData />}
          title="Data Kosong"
          description="Silahkan isi konten tabel ini"
        />
      ) : (
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
              height: "12px",
              cursor: "pointer",
            },
          }}
        >
          <Table
            size="small"
            sx={{
              ...styleFixedColumn,
              tableLayout: "fixed",
              width: 4000,
            }}
            stickyHeader
          >
            <TableHead sx={{ bgcolor: bgColorTh }}>
              <TableRow>
                <TableCell
                  rowSpan={2}
                  sx={{
                    ...styleFixedColumn,
                    bgcolor: bgColorTh,
                    zIndex: 3,
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  RO/Project
                </TableCell>

                {multiyear.map((y, iY) => (
                  <TableCell
                    colSpan={3}
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
                    {/* <TableCell
                      sx={{
                        bgcolor: bgColorTh,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Sumber Pembiayaan
                    </TableCell> */}
                  </>
                ))}
              </TableRow>
              <TableRow
                sx={{
                  ".MuiTableCell-stickyHeader": {
                    top: "calc(38px + 38px)",
                  },
                  "th:nth-of-type(1)": {
                    ...styleFixedColumn,
                    zIndex: 3,
                  },
                }}
              >
                {[...new Array(18)].map((_, i) => (
                  <TableCell
                    sx={{
                      bgcolor: grey[100],
                    }}
                  >
                    <Typography
                      color={grey[500]}
                      fontSize={12}
                      textAlign="center"
                    >
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
                      ...styleFixedColumn,
                      verticalAlign: "top",
                      background: "white",
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
                    {fundRow.intervention ? (
                      <Tooltip
                        title="Intervensi Kunci"
                        followCursor
                        TransitionComponent={Grow}
                        sx={{ cursor: "default" }}
                      >
                        <Typography
                          component="p"
                          color={orange[700]}
                          fontSize="0.9rem"
                          lineHeight={1.3}
                        >
                          <Iconify
                            name="mdi:key-variant"
                            size={14}
                            sx={{ position: "relative", top: 2 }}
                          />{" "}
                          {fundRow.value}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography
                        component="p"
                        color={grey[900]}
                        fontSize="0.9rem"
                        lineHeight={1.3}
                      >
                        {fundRow.value}
                      </Typography>
                    )}
                  </TableCell>

                  {multiyear.map((y, iY) => (
                    <>
                      <TableCell align="right">
                        {getRowData(`target_${iY}`, fundRow) > 0
                          ? FormatCurrency(getRowData(`target_${iY}`, fundRow))
                          : getRowData(`target_${iY}`, fundRow)}
                      </TableCell>
                      <TableCell>
                        {getRowData(`satuan_${iY}`, fundRow)}
                      </TableCell>
                      <TableCell align={"right"}>
                        {FormatIDR(getRowData(`anggaran_${iY}`, fundRow))}
                      </TableCell>
                      {/* <TableCell>
                        {getRowData(`sumber_anggaran_${iY}`, fundRow) ?? "-"}
                      </TableCell> */}
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
      )}
    </Fragment>
  );
};

export default function TableFund({
  project,
}: // data,
{
  project?: string;
  // data: ExsumFundDataTableRes[];
}) {
  return <TableFundPPKP project="KP" />;
}
