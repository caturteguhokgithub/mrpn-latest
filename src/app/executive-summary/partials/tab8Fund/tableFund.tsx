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
import { ExsumFundRes } from "@/app/executive-summary/partials/tab8Fund/cardFundModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";

function createData(aspectRo: string) {
  return {
    aspectRo,
    fund: [
      {
        keyRO: true,
        ro: "Penyediaan PMT bagi balita bermasalah gizi (termasuk balita dengan BB tidak bertambah sesuai usia/ (weight faltering)",
        indicator:
          "Balita bermasalah gizi (termasuk balita dengan BB tidak bertambah sesuai usia/(weight faltering) mendapat PMT",
        target1: 75,
        target2: 80,
        target3: 85,
        target4: 87,
        target5: 90,
        alocation: 200,
        fundSource: "-",
        instance: "Kemkes",
        location: "Seluruh provinsi",
      },
      {
        keyRO: false,
        ro: "Pendampingan balita dengan permasalahan gizi",
        indicator: "Balita dengan permasalahan gizi mendapatkan pendampingan",
        target1: 75,
        target2: 80,
        target3: 85,
        target4: 87,
        target5: 90,
        alocation: 200,
        fundSource: "-",
        instance: "Kemkes",
        location: "Seluruh provinsi",
      },
      {
        keyRO: false,
        ro: "Pelayanan gizi masyarakat di kab/kota",
        indicator: "Kab/kota yg menyelenggarakan pelayanan gizi masyarakat",
        target1: 75,
        target2: 80,
        target3: 85,
        target4: 87,
        target5: 90,
        alocation: 200,
        fundSource: "-",
        instance: "Kemkes",
        location: "Seluruh provinsi",
      },
    ],
  };
}

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

const TableFundPPKP = (props: { row?: RoDto[]; project: string }) => {
  const { row, project } = props;

  return (
    <Table size="small">
      <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
        <TableRow>
          <TableCell>Intervansi Kunci</TableCell>
          <TableCell>Indikator</TableCell>
          <TableCell align="center">Target</TableCell>
          <TableCell>Indikasi Alokasi Tahun Rencana (Rp Miliar)</TableCell>
          <TableCell>Sumber Pendanaan (Belanja KL/ DAK/BUMN/Swasta)</TableCell>
          <TableCell>Instansi Pelaksana RO</TableCell>
          <TableCell>
            Lokasi RO
            <br />
            (Prov./Kab./Kota)
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {row?.map((fundRow, index) => (
          <TableRow key={index}>
            <TableCell sx={{ verticalAlign: "top" }}>{fundRow.value}</TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              {fundRow.pkkr ? fundRow.pkkr : "-"}
            </TableCell>
            <TableCell align="right" sx={{ verticalAlign: "top" }}>
              {fundRow.target ? fundRow.target : "-"}
            </TableCell>
            <TableCell align="right" sx={{ verticalAlign: "top" }}>
              {fundRow.anggaran}
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              {fundRow.sumber_anggaran ? fundRow.sumber_anggaran : "-"}
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              {fundRow.kementrian.value ? fundRow.kementrian.value : "-"}
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              {fundRow.lokasi_ro ? fundRow.lokasi_ro : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function Row(props: { row: ExsumFundRes; project: string }) {
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
  data: ExsumFundRes[];
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
