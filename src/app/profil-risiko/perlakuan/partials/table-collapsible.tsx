import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { bgColorTh } from "@/app/utils/color";
import { blue, green, grey, orange, red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import theme from "@/theme";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { getDetailRO } from "@/lib/utils/roDetail";
import { RiskOverviewData } from "../../overview/pageModel";

function createData(
  id: number,
  keputusan: string,
  keterangan: string,
  target: string,
  waktu: string,
  penanggungjawab: string
) {
  return {
    id,
    keputusan,
    keterangan,
    target,
    waktu,
    penanggungjawab,
    pembiayaan: [
      {
        id: 1,
        ro: "Jaringan Irigasi Tersier Yang Direhabilitasi (QW) - Provinsi Kalimantan Tengah",
        tahun: 2025,
        target: 100,
        satuan: "unit",
        anggaran: "Rp200.000.000",
        sumber_anggaran: "APBN",
      },
      {
        id: 2,
        ro: "Pelatihan Pertanian bagi Non Aparatur (KSPP) - Kab. Tapin",
        tahun: 2025,
        target: 100,
        satuan: "unit",
        anggaran: "Rp200.000.000",
        sumber_anggaran: "APBN",
      },
      {
        id: 3,
        ro: "SID Cetak Sawah (QW) - Provinsi Kalimantan Tengah",
        tahun: 2025,
        target: 100,
        satuan: "unit",
        anggaran: "Rp200.000.000",
        sumber_anggaran: "APBN",
      },
    ],
  };
}

function Row(props: { row: RiskOverviewData; index?: number }) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  const { year, rpjmn } = useRKPContext((state) => state);

  let multiyear: number[] = [year];
  if (year == 0) {
    multiyear = GenerateRpjmnYear(rpjmn);
  }

  const { getMasterListObject } = usePenetapanGlobalVM();

  React.useEffect(() => {
    getMasterListObject();
  }, [year]);

  // const isOddRow = index % 2 !== 0;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          // bgcolor: isOddRow ? grey[100] : "transparent",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell width={300} sx={{ verticalAlign: "top" }}>
          {row.keputusan}
        </TableCell> */}
        <TableCell sx={{ verticalAlign: "top" }}>{row.keterangan_risiko}</TableCell>
        <TableCell sx={{ verticalAlign: "top" }} width={200}>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW I :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_triwulan_1 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW II :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_triwulan_2 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW III :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_triwulan_3 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW IV :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_triwulan_4 ?? "-"}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell sx={{ verticalAlign: "top" }} width={250}>
          {row.waktu}
        </TableCell>
        <TableCell sx={{ verticalAlign: "top" }} width={300}>
          {row.penanggung_jawab}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 1, bgcolor: grey[200] }}>
              <TableContainer
                component={Paper}
                elevation={0}
                variant="outlined"
                sx={{
                  maxHeight: 300,
                  "&::-webkit-scrollbar": {
                    width: "3px",
                  },
                  "tbody, thead": {
                    "td, th": {
                      borderRight: `1px solid ${grey[300]} !important`,
                      "&:last-of-type": {
                        borderRight: `1px solid ${grey[300]} !important`,
                      },
                    },
                  },
                }}
              >
                <Table stickyHeader size="small">
                  <TableHead sx={{ bgcolor: theme.palette.primary.light }}>
                    <TableRow>
                      <TableCell
                        rowSpan={2}
                        align="center"
                        sx={{ bgcolor: green[50], width: 30 }}
                      >
                        No
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        align="center"
                        sx={{ bgcolor: green[50] }}
                      >
                        Nomenklatur RO
                      </TableCell>
                      {multiyear.map((y, iY) => (
                        <TableCell
                          colSpan={4}
                          align={"center"}
                          sx={{ bgcolor: green[50] }}
                        >
                          {y}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: green[50] }}
                      >
                        Target
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: green[50] }}
                      >
                        Satuan
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: green[50] }}
                      >
                        Pembiayaan (Juta)
                      </TableCell>
                      <TableCell
                        width={150}
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: green[50] }}
                      >
                        Sumber Pembiayaan
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.rincian_output.map((rowItem) => (
                      <TableRow key={rowItem.id}>
                        <TableCell align="center">{rowItem.id}</TableCell>
                        <TableCell>
                          <Typography
                            component="span"
                            fontSize={14}
                            color={grey[600]}
                          >
                            {rowItem.code}
                          </Typography>{" "}
                          - {rowItem.value}{" "}
                          <Typography
                            component="span"
                            fontSize={14}
                            color={orange[600]}
                          >
                            ({rowItem.type})
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{rowItem.target}</TableCell>
                        <TableCell>{rowItem.satuan}</TableCell>
                        <TableCell align="right">{rowItem.anggaran}</TableCell>
                        <TableCell>{rowItem.sumber_anggaran}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData(
//     1,
//     "Mengurangi kemungkinan terjadinya risiko",
//     "Perbaikan struktur dan mekanisme manajemen produksi pangan dengan memaksimalkan peran petani dan keluarga petani sebagai tulang punggung produsen di lahan KSPP",
//     "",
//     "Oct 2024 sd Oct 2024",
//     "KEMENTERIAN PEKERJAAN UMUM"
//   ),
//   createData(
//     2,
//     "Mengurangi kemungkinan terjadinya risiko",
//     "Perbaikan struktur dan mekanisme manajemen produksi pangan dengan memaksimalkan peran petani dan keluarga petani sebagai tulang punggung produsen di lahan KSPP",
//     "",
//     "Oct 2024 sd Oct 2024",
//     "PEMERINTAH PROVINSI KALIMANTAN TENGAH"
//   ),
//   createData(
//     3,
//     "Mengurangi dampak risiko",
//     "Pelibatan aspirasi masyarakat dalam perencanaan pengembangan food estate Relokasi Area of Interest (AOI)",
//     "",
//     "Oct 2024 sd Oct 2024",
//     "KEMENTERIAN PERTANIAN"
//   ),
//   createData(
//     4,
//     "Mengurangi dampak risiko",
//     "Praktik pertanian presisi sesuai dengan kebutuhan lahan",
//     "",
//     "Oct 2024 sd Oct 2024",
//     "KEMENTERIAN PERTANIAN"
//   ),
// ];

export default function CollapsibleTable({ rowData }: { rowData: RiskOverviewData }) {
  // console.log(rowData)

  return (

    <Box sx={{ width: "calc(100% + 32px)", bgcolor: grey[50], m: -2, p: 1 }}>
      <TableContainer
        component={Paper}
        elevation={0}
        variant="outlined"
        sx={{
          maxHeight: "calc(100vh - 430px)",
          "&::-webkit-scrollbar": {
            width: "6px",
            cursor: "pointer",
          },
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
              "&:last-of-type": {
                borderRight: `1px solid ${grey[300]} !important`,
              },
            },
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: orange[50] }} />
              {/* <TableCell align="center" sx={{ bgcolor: orange[50] }}>
                Keputusan Perlakuan Risiko
              </TableCell> */}
              <TableCell align="center" sx={{ bgcolor: orange[50] }}>
                Deskripsi Perlakuan Risiko
              </TableCell>
              <TableCell
                align="center"
                width={150}
                sx={{ bgcolor: orange[50] }}
              >
                Target
              </TableCell>
              <TableCell
                align="center"
                width={200}
                sx={{ bgcolor: orange[50] }}
              >
                Waktu Rencana Perlakuan Risiko
              </TableCell>
              <TableCell
                align="center"
                width={200}
                sx={{ bgcolor: orange[50] }}
              >
                Penanggung Jawab
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            <Row key={rowData.id} row={rowData} />
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
