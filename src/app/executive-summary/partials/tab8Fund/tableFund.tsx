import React from "react";
import {
  alpha,
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
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
import { IconFA } from "@/app/components/icons/icon-fa";
import { blue, green, grey, red } from "@mui/material/colors";
import { dataTema } from "../../dataTema";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import {
  ExsumFundDataTableRes,
  ExsumFundRes,
} from "@/app/executive-summary/partials/tab8Fund/cardFundModel";
import { RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { FormatIDR } from "@/lib/utils/currency";
import { bgColorTh } from "@/app/utils/color";

const ChevronBtn = ({ name }: { name: string }) => {
  return (
    <Button
      variant={name === "up" ? "contained" : "outlined"}
      sx={{ width: "auto", p: 1, minWidth: 0 }}
    >
      <IconFA name={`chevron-${name}`} size={12} />
    </Button>
  );
};

const FundSource = ({ value, isYear }: { value: string; isYear?: boolean }) => {
  return (
    <Stack
      display="inline-flex"
      direction="row"
      alignItems="center"
      boxSizing="border-box"
      border={`2px solid ${grey[300]}`}
      borderRadius="8px"
    >
      <Box
        color={theme.palette.primary.dark}
        bgcolor={grey[300]}
        border={`2px solid ${grey[300]}`}
        p="8px 16px"
        fontWeight={500}
        letterSpacing={0.2}
        fontSize={14}
        minWidth={isYear ? 0 : 120}
      >
        Estimasi Kebutuhan Pendanaan
      </Box>
      <Box
        p="8px 16px"
        fontWeight={700}
        fontSize={14}
        flexGrow={1}
        textAlign="right"
      >
        {value}
      </Box>
    </Stack>
  );
};

const TableFundPPKP = (props: { row?: RODataTable[]; project: string }) => {
  const { row, project } = props;

  const { year, rpjmn } = useRKPContext((store) => store);

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

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
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            <TableCell
              rowSpan={2}
              sx={{
                ...(year > 0 ? null : styleFixedColumn),
                bgcolor: bgColorTh,
                zIndex: 3,
                [theme.breakpoints.down("xl")]: {
                  ...styleFixedColumn,
                },
              }}
            >
              RO/Project
            </TableCell>
            {/* <TableCell rowSpan={2}>Indikator</TableCell> */}
            {/*<TableCell rowSpan={2} align="center">*/}
            {/*  Target*/}
            {/*</TableCell>*/}
            {/*<TableCell rowSpan={2} sx={{ width: 200 }}>*/}
            {/*  Indikasi Alokasi Tahun Rencana (Rp Miliar)*/}
            {/*</TableCell>*/}
            {/*<TableCell rowSpan={2} sx={{ width: 200 }}>*/}
            {/*  Sumber Pendanaan (Belanja KL/ DAK/BUMN/Swasta)*/}
            {/*</TableCell>*/}

            {multiyear.map((y, iY) => (
              <TableCell
                colSpan={4}
                align={"center"}
                sx={{ bgcolor: bgColorTh }}
              >
                {y}
              </TableCell>
            ))}
            <TableCell rowSpan={2} sx={{ width: 250, bgcolor: bgColorTh }}>
              Instansi Pelaksana RO
            </TableCell>
            <TableCell rowSpan={2} sx={{ bgcolor: bgColorTh }}>
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
                <TableCell sx={{ bgcolor: bgColorTh }}>Target</TableCell>
                <TableCell sx={{ bgcolor: bgColorTh }}>Satuan</TableCell>
                <TableCell sx={{ bgcolor: bgColorTh }}>
                  Pembiayaan (Juta)
                </TableCell>
                <TableCell sx={{ bgcolor: bgColorTh }}>
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
                <Typography color={grey[500]} fontSize={14} textAlign="center">
                  {i + 1}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {row?.map((fundRow, index) => (
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
              {/* <TableCell sx={{ verticalAlign: "top" }}>
                {fundRow.pkkr ? fundRow.pkkr : "-"}
              </TableCell> */}
              {/*<TableCell align="right" sx={{ verticalAlign: "top" }}>*/}
              {/*  {fundRow.target ? fundRow.target : "-"}*/}
              {/*</TableCell>*/}
              {/*<TableCell align="right" sx={{ verticalAlign: "top" }}>*/}
              {/*  {fundRow.anggaran}*/}
              {/*</TableCell>*/}
              {/*<TableCell sx={{ verticalAlign: "top" }}>*/}
              {/*  {fundRow.sumber_anggaran ? fundRow.sumber_anggaran : "-"}*/}
              {/*</TableCell>*/}

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

function Row(props: { row: ExsumFundDataTableRes; project: string }) {
  const { row, project } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={70} sx={{ py: 0.5 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronBtn name="up" /> : <ChevronBtn name="down" />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ py: 0.5, pl: 0 }}>
          <Typography component="span" color={grey[600]}>
            Proyek Prioritas:
          </Typography>{" "}
          <Typography component="span">{row.prop}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableFundPPKP row={row.intervensi} project="KP" />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TableFund({
  project,
  data,
}: {
  project: string;
  data: ExsumFundDataTableRes[];
}) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="collapsible table">
        <TableBody>
          {data.map((row, index) => (
            <Row key={index} row={row} project="KP" />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
