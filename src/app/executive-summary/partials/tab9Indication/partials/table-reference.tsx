import {
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
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/utils/color";

export default function TableReference({}: {}) {
  return (
    <TableContainer
      className="table-overflow-x-indication"
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "calc(100vh - 520px)",
        "&::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
          cursor: "pointer",
          transition: "all 300ms ease-in",
        },
        "&:hover": {
          "&::-webkit-scrollbar": {
            height: "20px",
          },
        },
      }}
    >
      <Table
        size="small"
        stickyHeader
        sx={{
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
            },
          },
        }}
      >
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}>
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Kategori Risiko
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}>
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Peristiwa Risiko
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh }}>
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Keputusan
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}>
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Deskripsi
              </Typography>
            </TableCell>
          </TableRow>
          {/* <TableRow
            sx={{
              ".MuiTableCell-stickyHeader": {
                top: 37,
              },
            }}
          >
            {[...new Array(4)].map((_, i) => (
              <TableCell sx={{ bgcolor: grey[100] }}>
                <Typography
                  color={`${grey[500]} !important`}
                  fontSize={14}
                  textAlign="center"
                >
                  {i + 1}
                </Typography>
              </TableCell>
            ))}
          </TableRow> */}
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ verticalAlign: "top" }}>Risiko Sosial</TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              Partisipasi pihak swasta masih rendah dalam pengelolaan sampah
            </TableCell>
            <TableCell sx={{ verticalAlign: "top" }}>
              Mengurangi kemungkinan terjadinya risiko
            </TableCell>
            <TableCell sx={{ verticalAlign: "top", pl: 4 }}>
              <ul>
                <li>
                  Menyusun aturan pengangkutan sampah organik dan anorganik di
                  rumah tangga AAA 186
                </li>
                <li>
                  Sosialisasi berkelanjutan yang melibatkan penyuluh dan tokoh
                  informal dalam pemilahan sampah di tingkat RT RW BBB 185
                </li>
              </ul>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
