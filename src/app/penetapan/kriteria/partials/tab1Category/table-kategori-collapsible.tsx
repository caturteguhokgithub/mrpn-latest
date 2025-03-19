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
import { blue, grey, red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import useCategoryList from "./hooks/useCategory";
import { ResultCategory } from "./hooks/categoryModel";

// function createData(category: string, uraian: string) {
//   return {
//     category,
//     uraian,
//     history: [
//       {
//         subCategory: "Prospek Ekonomi",
//         uraian:
//           "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts.",
//       },
//       {
//         subCategory: "Variabel Ekonomi",
//         uraian:
//           "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts.",
//       },
//     ],
//   };
// }

function Row(props: {
  row: ResultCategory;
  handleEdit: any;
  handleDelete?: any;
}) {
  const { row, handleEdit, handleDelete } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={60}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.value}</TableCell>
        <TableCell>{row.desc}</TableCell>
        {/* <TableCell>
          <Stack direction="row">
            <IconButton onClick={handleEdit}>
              <Iconify name="mdi:pencil" color={blue[500]} />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Iconify name="mdi:trash" color={red[500]} />
            </IconButton>
          </Stack>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} sx={{ bgcolor: grey[200], p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box m={1} ml={8}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      width={180}
                      sx={{ bgcolor: bgColorTh }}
                    >
                      Sub Kategori
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Uraian
                    </TableCell>
                    <TableCell
                      width={100}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sub_kategori_risiko.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          bgcolor: grey[50],
                        }}
                      >
                        {historyRow.value}
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: grey[50],
                        }}
                      >
                        {historyRow.desc}
                      </TableCell>
                      <TableCell
                        sx={{
                          bgcolor: grey[50],
                        }}
                      >
                        <Stack direction="row">
                          <IconButton onClick={handleEdit}>
                            <Iconify name="mdi:pencil" color={blue[500]} />
                          </IconButton>
                          <IconButton onClick={handleDelete}>
                            <Iconify name="mdi:trash" color={red[500]} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// const rows = [
//   createData(
//     "Ekonomi",
//     "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts."
//   ),
//   createData(
//     "Geopolitik",
//     "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts."
//   ),
//   createData(
//     "Teknologi",
//     "Risiko yang berasal dari ancaman ekonomi makro, pasar keuangan, rantai nilai ekonomi global, industri, atau kebijakan spesifik dapat menyebabkan kinerja pemerintah yang kurang. Contoh: resesi ekonomi, inflasi, fluktuasi harga komoditas, suku bunga, krisis hutang negara, dan asset bubble bursts."
//   ),
// ];

export default function CollapsibleTable({
  handleEdit,
  handleDelete,
}: {
  handleEdit?: any;
  handleDelete?: any;
}) {
  const { listDataCategory } = useCategoryList();

  // console.log({ listDataCategory });

  return (
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
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: bgColorTh }} />
            <TableCell align="center" width={180} sx={{ bgcolor: bgColorTh }}>
              Kategori Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Uraian
            </TableCell>
            {/* <TableCell width={100} align="center" sx={{ bgcolor: bgColorTh }}>
              Aksi
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {listDataCategory.map((row: ResultCategory) => (
            <Row
              key={row.id}
              row={row}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
