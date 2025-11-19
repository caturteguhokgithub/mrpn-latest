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
import { grey } from "@mui/material/colors";
import { bgColorTh } from "@/utils/color";
import {
  ExsumIndicationState,
  ExsumProfilRisikoOverview,
} from "../cardIndicationModel";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import { SetStateAction } from "react";

export default function TableReference({
  data,
  setModalReference,
  state,
  setState,
}: {
  data?: ExsumProfilRisikoOverview[];
  setModalReference: any;
  state: ExsumIndicationState;
  setState: (value: SetStateAction<ExsumIndicationState>) => void;
}) {
  const handleListProject = (item: ExsumProfilRisikoOverview) => {
    setState((prevState) => ({
      ...prevState,
      kategori_risiko: item.kategori_risiko,
      indikasi_risiko: item.peristiwa_risiko,
      perlakuan_risiko: Array.isArray(item.deskripsi_keterangan_risiko)
        ? item.deskripsi_keterangan_risiko.join(", ")
        : item.deskripsi_keterangan_risiko,
    }));

    setModalReference(false);
  };

  return (
    <TableContainer
      className="table-overflow-x-indication"
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "calc(100vh - 320px)",
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
                Keputusan Perlakuan Risiko
              </Typography>
            </TableCell>
            <TableCell
              width="40%"
              sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}
            >
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Perlakuan Risiko
              </Typography>
            </TableCell>
            <TableCell sx={{ bgcolor: bgColorTh, whiteSpace: "nowrap" }}>
              <Typography variant="body1" fontWeight={600} textAlign="center">
                Aksi
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
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ verticalAlign: "top" }}>
                  {row.kategori_risiko}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top" }}>
                  {row.peristiwa_risiko}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top" }}>
                  {row.keputusan}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top", pl: 4 }}>
                  {row.deskripsi_keterangan_risiko &&
                  Array.isArray(row.deskripsi_keterangan_risiko) ? (
                    <ol type="1" style={{ margin: 0, paddingLeft: 0 }}>
                      {row.deskripsi_keterangan_risiko.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ol>
                  ) : (
                    row.deskripsi_keterangan_risiko
                  )}
                </TableCell>
                <TableCell sx={{ verticalAlign: "top" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ whiteSpace: "nowrap", borderRadius: "100px" }}
                    onClick={() => handleListProject(row)}
                  >
                    Gunakan Data
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <EmptyState
                  icon={<IconEmptyData width={100} />}
                  title={`Data Referensi Risiko Kosong`}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
