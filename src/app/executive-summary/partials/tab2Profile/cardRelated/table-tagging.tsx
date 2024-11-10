import React, { Fragment } from "react";
import {
  alpha,
  Chip,
  Icon,
  IconButton,
  Paper,
  Stack,
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
import { ExsumRelatedDto } from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import DialogDelete from "@/app/components/dialogDelete";
import ActionColumn from "@/app/components/actions/action";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { usePathname } from "next/navigation";
import { hasPrivilege } from "@/lib/core/helpers/authHelpers";
import { bgColorTh } from "@/app/utils/color";

export default function TableTagging({
  project,
  data,
  handleDelete,
}: {
  project: string;
  data: ExsumRelatedDto[];
  handleDelete: any;
}) {
  const { permission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const [modalDelete, setModalDelete] = React.useState(false);

  const handleModalDelete = () => {
    setModalDelete(true);
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      variant="outlined"
      sx={{
        maxHeight: "40vh",
        "&::-webkit-scrollbar": {
          width: "6px",
          cursor: "pointer",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <TableRow>
            {hasPrivilege(permission, pathname, "delete") && (
              <TableCell sx={{ width: 80, bgcolor: bgColorTh }}>Aksi</TableCell>
            )}
            <TableCell sx={{ bgcolor: bgColorTh }}>Kebijakan</TableCell>
            <TableCell sx={{ width: "50%", bgcolor: bgColorTh }}>
              Keterangan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((x, index) => (
            <>
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {hasPrivilege(permission, pathname, "delete") && (
                  <TableCell sx={{ textAlign: "center", verticalAlign: "top" }}>
                    <ActionColumn center deleteClick={handleModalDelete} />
                  </TableCell>
                )}
                <TableCell>
                  {/* {x.kebijakan.map((y, index2) => (
                    <Chip
                      key={index2}
                      size="small"
                      label={y.src_kebijakan?.name}
                    />
                  ))} */}
                  <Paper variant="outlined" sx={{ p: 1 }}>
                    <Typography fontSize={14} fontWeight={500}>
                      17 Program Prioritas
                    </Typography>
                    <Stack
                      marginTop={1}
                      display="inline-flex"
                      alignItems="center"
                      direction="row"
                      gap={0.5}
                      flexWrap="wrap"
                    >
                      <Chip
                        size="small"
                        label={
                          "Melanjutkan pemerataan ekonomi dan penguatan UMKM melalui program kredit usaha dan pembangunan Ibu Kota Nusantara (IKN) serta kota-kota inovatif-karakteristik-mandiri lainnya"
                        }
                        sx={{
                          height: "auto",
                          ".MuiChip-label": {
                            whiteSpace: "wrap",
                            lineHeight: 1.2,
                            py: 0.6,
                          },
                        }}
                      />
                      <Chip
                        size="small"
                        label={"Pemberantasan kemiskinan"}
                        sx={{
                          height: "auto",
                          ".MuiChip-label": {
                            whiteSpace: "wrap",
                            lineHeight: 1.2,
                            py: 0.6,
                          },
                        }}
                      />
                      <Chip
                        size="small"
                        label={"Mencapai swasembada pangan, energi dan air"}
                        sx={{
                          height: "auto",
                          ".MuiChip-label": {
                            whiteSpace: "wrap",
                            lineHeight: 1.2,
                            py: 0.6,
                          },
                        }}
                      />
                    </Stack>
                  </Paper>
                </TableCell>
                <TableCell>{x.value}</TableCell>
              </TableRow>
              <DialogDelete
                title="Hapus Data"
                handleOpenModal={modalDelete}
                handleDelete={() => handleDelete(x.id)}
                handleCloseModal={() => setModalDelete(false)}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
