import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { bgColorTh } from "@/utils/color";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";
import { RiskOverviewData } from "../pageModel";

function ChipLevelRisiko(props: { level: any }) {
  return (
    <Box display={"flex"} justifyContent={"center"} width={"100%"}>
      {props.level ? (
        <Chip
          size="small"
          color={
            props.level === "Sangat Tinggi (5)"
              ? "error"
              : props.level === "Tinggi (4)"
              ? "warning"
              : props.level === "Rendah (2)"
              ? "success"
              : undefined
          }
          sx={{
            minWidth: 80,
            borderWidth: "2px",
            borderStyle: "solid",
            "& .MuiChip-label": {
              fontWeight: 600,
            },
            "&.MuiChip-colorWarning": {
              bgcolor: orange[100],
              borderColor: orange[600],
              color: orange[900],
            },
            "&.MuiChip-colorError": {
              bgcolor: red[100],
              borderColor: red[400],
              color: red[900],
            },
            "&.MuiChip-colorSuccess": {
              bgcolor: green[100],
              borderColor: green[400],
              color: green[900],
            },
            "&.MuiChip-root": {
              ...(props.level === "Sedang (3)" && {
                bgcolor: yellow[100],
                borderColor: yellow[700],
                color: yellow[900],
              }),
              ...(props.level === "Sangat Rendah (1)" && {
                bgcolor: blue[100],
                borderColor: blue[700],
                color: blue[900],
              }),
            },
          }}
          label={props.level}
        />
      ) : (
        "-"
      )}
    </Box>
  );
}

export default function TableOverview({ data }: { data: RiskOverviewData[] }) {
  return (
    <TableContainer
      className="table-overview"
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        overflowX: "auto",
        maxHeight: "48vh",
        tbody: {
          td: {
            "&:last-of-type": {
              borderRight: "1px solid rgb(224, 224, 224) !important",
            },
          },
        },
        "&::-webkit-scrollbar": {
          height: "12px",
          cursor: "pointer",
        },
      }}
    >
      <Table
        stickyHeader
        size="small"
        sx={{
          tableLayout: "fixed",
          width: 4000,
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
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell align="center" colSpan={4} sx={{ bgcolor: bgColorTh }}>
              Identifikasi Risiko
            </TableCell>
            <TableCell align="center" colSpan={2} sx={{ bgcolor: bgColorTh }}>
              Analisis & Evaluasi Risiko
            </TableCell>
            <TableCell align="center" colSpan={6} sx={{ bgcolor: bgColorTh }}>
              Perlakuan Risiko
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 37,
              },
            }}
          >
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Peristiwa Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Kategori Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Penyebab
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Dampak
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Nilai
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Prioritas Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Keputusan Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Deskripsi Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Waktu Rencana Perlakuan Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Output
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Penanggungjawab
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Risiko Residual Harapan
            </TableCell>
          </TableRow>
          <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 37 + 37,
              },
            }}
          >
            {[...new Array(12)].map((_, i) => (
              <TableCell sx={{ bgcolor: grey[100] }}>
                <Typography
                  color={`${grey[500]} !important`}
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
          {data.length > 0
            ? data.map((risk) =>
                risk.perlakuan_data.map((perlakuan, index) => (
                  <TableRow key={`${risk.id}-${index}`}>
                    {index === 0 && (
                      <>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {risk.peristiwa}
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {risk.kategori}
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          <Stack gap={1}>
                            {risk.penyebab && risk.penyebab.length > 0 ? (
                              risk.penyebab.map((item) => (
                                <Chip
                                  key={index}
                                  sx={{
                                    height: "auto",
                                    py: 1,
                                    "& .MuiChip-label": {
                                      overflow: "unset",
                                      whiteSpace: "normal",
                                    },
                                  }}
                                  label={item}
                                />
                              ))
                            ) : (
                              <Chip label="-" />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          <Stack gap={1}>
                            {risk.dampak && risk.dampak.length > 0 ? (
                              risk.dampak.map((item) => (
                                <Chip
                                  key={index}
                                  sx={{
                                    height: "auto",
                                    py: 1,
                                    "& .MuiChip-label": {
                                      overflow: "unset",
                                      whiteSpace: "normal",
                                    },
                                  }}
                                  label={item}
                                />
                              ))
                            ) : (
                              <Chip label="-" />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          <Stack
                            display="inline-flex"
                            direction="column"
                            gap={1}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                            >
                              <Typography variant="body2">LK:</Typography>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                component="strong"
                              >
                                {risk.analisis_lk}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                            >
                              <Typography variant="body2">LD:</Typography>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                component="strong"
                              >
                                {risk.analisis_ld}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                            >
                              <Typography variant="body2">BR:</Typography>
                              <Typography
                                variant="body2"
                                fontWeight={700}
                                component="strong"
                              >
                                {risk.analisis_br}
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Typography variant="body2">LEVEL</Typography>
                              <ChipLevelRisiko level={risk.analisis_level} />
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {risk.prioritas}
                        </TableCell>
                        <TableCell
                          rowSpan={risk.perlakuan_data.length}
                          sx={{ verticalAlign: "top" }}
                        >
                          {risk.keputusan}
                        </TableCell>
                      </>
                    )}

                    <TableCell sx={{ verticalAlign: "top" }}>
                      {perlakuan.keterangan_risiko}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {perlakuan.waktu}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <Stack gap={1}>
                        {perlakuan.rincian_output &&
                        perlakuan.rincian_output.length > 0 ? (
                          perlakuan.rincian_output.map((ro, index) => (
                            <Chip
                              key={index}
                              sx={{
                                height: "auto",
                                py: 1,
                                "& .MuiChip-label": {
                                  overflow: "unset",
                                  whiteSpace: "normal",
                                },
                              }}
                              label={`${ro.code} - ${ro.value}`}
                            />
                          ))
                        ) : (
                          <Chip label="-" />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {perlakuan.penanggung_jawab}
                    </TableCell>

                    {index === 0 && (
                      <TableCell
                        rowSpan={risk.perlakuan_data.length}
                        sx={{ verticalAlign: "top" }}
                      >
                        <Stack display="inline-flex" direction="column" gap={1}>
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            <Typography variant="body2">LK:</Typography>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              component="strong"
                            >
                              {risk.perlakuan_lk}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            <Typography variant="body2">LD:</Typography>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              component="strong"
                            >
                              {risk.perlakuan_ld}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" gap={0.5}>
                            <Typography variant="body2">BR:</Typography>
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              component="strong"
                            >
                              {risk.perlakuan_br}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" gap={1}>
                            <Typography variant="body2">LEVEL</Typography>
                            <ChipLevelRisiko level={risk.perlakuan_level} />
                          </Stack>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )
            : ""}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
