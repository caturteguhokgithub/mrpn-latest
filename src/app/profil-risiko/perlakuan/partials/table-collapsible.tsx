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
import { green, grey, orange } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { GenerateRpjmnYear } from "@/lib/utils/common";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import theme from "@/theme";
import { PerlakuanData } from "../../overview/pageModel";

function Row(props: { row: PerlakuanData; index?: number }) {
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
        <TableCell width={100}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={50} align="center" sx={{ verticalAlign: "top" }}>
          <Typography variant="body1">{(index ?? 0) + 1}.</Typography>
        </TableCell>
        <TableCell sx={{ verticalAlign: "top" }}>
          {row.keterangan_risiko}
        </TableCell>
        <TableCell sx={{ verticalAlign: "top" }} width={200}>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW I :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_satuan_tw_1 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW II :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_satuan_tw_2 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW III :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_satuan_tw_3 ?? "-"}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1} alignItems="center">
            <Typography width={52} fontSize={14}>
              TW IV :
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
              {row.target_satuan_tw_4 ?? "-"}
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
        <TableCell colSpan={7} sx={{ p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 1, bgcolor: grey[200], pl: 10 }}>
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
                        No.
                      </TableCell>
                      <TableCell
                        rowSpan={2}
                        align="center"
                        sx={{ bgcolor: green[50], width: 30 }}
                      >
                        Kode PKKR
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
                          colSpan={3}
                          align={"center"}
                          sx={{ bgcolor: green[50] }}
                        >
                          {y}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      {multiyear.map((y, iY) => (
                        <React.Fragment key={iY}>
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
                        </React.Fragment>
                      ))}
                      {/* <TableCell
                        width={150}
                        align="center"
                        style={{ top: "37px" }}
                        sx={{ bgcolor: green[50] }}
                      >
                        Sumber Pembiayaan
                      </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.rincian_output
                      ? row.rincian_output.map((rowItem, itemIndex) => (
                          <TableRow key={rowItem.id}>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {itemIndex + 1}.
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              {rowItem.pkkr ?? "-"}
                            </TableCell>
                            <TableCell>
                              {/* <Typography
                                component="span"
                                fontSize={14}
                                color={grey[600]}
                              >
                                {rowItem.code}
                              </Typography>{" "}
                              -  */}
                              {rowItem.value}{" "}
                              <Typography
                                component="span"
                                fontSize={14}
                                color={orange[600]}
                              >
                                ({rowItem.type})
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              {rowItem.target}
                            </TableCell>
                            <TableCell>{rowItem.satuan}</TableCell>
                            <TableCell align="right">
                              {rowItem.anggaran}
                            </TableCell>
                            {/* <TableCell>{rowItem.sumber_anggaran}</TableCell> */}
                          </TableRow>
                        ))
                      : ""}
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

export default function CollapsibleTable({
  rowData,
}: {
  rowData: PerlakuanData[];
}) {
  // console.log(rowData)

  return (
    <Box
      sx={{
        width: "calc(100% + 32px)",
        bgcolor: grey[50],
        m: -2,
        p: 1,
        pl: 10,
      }}
    >
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
              <TableCell align="center" width={50} sx={{ bgcolor: orange[50] }}>
                <Typography variant="body2" fontWeight={600}>
                  No.
                </Typography>
              </TableCell>
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
                width={300}
                sx={{ bgcolor: orange[50] }}
              >
                Penanggung Jawab
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => (
              <Row key={row.id} row={row} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
