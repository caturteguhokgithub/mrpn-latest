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
import { ResultCategory, SubKategoriRisiko } from "./hooks/categoryModel";

function Row(props: {
  rowIndex: number;
  row: ResultCategory;
  handleEdit: any;
  handleDelete?: any;
  setRequestEdit?: (value: React.SetStateAction<SubKategoriRisiko>) => void;
}) {
  const { row, handleEdit, handleDelete, setRequestEdit, rowIndex } = props;
  // const [open, setOpen] = React.useState(false);

  const prosesBtnEdit = (value: SubKategoriRisiko, proses: string) => {
    const updated = {
      id: value.id,
      penetapan_kategori_risiko_id: value.penetapan_kategori_risiko_id,
      value: value.value ?? "",
      desc: value.desc ?? "",
    };

    if (setRequestEdit) {
      setRequestEdit(updated);
    }

    if (proses == "edit") {
      const dataEdit = {
        value: row.src_kategori_risiko.value,
        sub_kategori_risiko: updated,
      };

      handleEdit(dataEdit);
    }

    if (proses == "delete") {
      handleDelete();
    }
  };

  return (
    <React.Fragment>
      {row.sub_kategori_risiko.map((subItem: any, subIndex) => (
        <TableRow
          key={`${rowIndex}-${subIndex}`}
          sx={
            {
              // "& > *": { borderBottom: "unset" },
              // backgroundColor: rowIndex % 2 === 0 ? grey[100] : "transparent",
            }
          }
        >
          {subIndex === 0 && (
            <React.Fragment>
              <TableCell
                rowSpan={row.sub_kategori_risiko.length}
                sx={{ verticalAlign: "top" }}
              >
                {row.src_kategori_risiko.value}
              </TableCell>
              <TableCell
                rowSpan={row.sub_kategori_risiko.length}
                sx={{ verticalAlign: "top" }}
              >
                <Box
                  component="ul"
                  sx={{
                    ml: row.src_kategori_risiko.uraian.length > 1 ? 2 : 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: row.src_kategori_risiko.uraian,
                    }}
                  ></div>
                </Box>
              </TableCell>
            </React.Fragment>
          )}
          <TableCell sx={{ verticalAlign: "top" }}>{subItem.value}</TableCell>
          <TableCell>
            <Stack direction="row">
              <IconButton
                onClick={() => prosesBtnEdit(subItem, "edit")}
                sx={{
                  py: 0,
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <Iconify name="mdi:pencil" color={blue[500]} />
              </IconButton>
              <IconButton
                onClick={() => prosesBtnEdit(subItem, "delete")}
                sx={{
                  py: 0,
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <Iconify name="mdi:trash" color={red[500]} />
              </IconButton>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
      {/* <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={60}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.src_kategori_risiko.value}</TableCell>
        <TableCell>
          <Box
            component="ul"
            sx={{
              ml: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: row.src_kategori_risiko.uraian,
              }}
            ></div>
          </Box>
        </TableCell>
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
                        <Stack direction="row">
                          <IconButton
                            onClick={() => prosesBtnEdit(historyRow, "edit")}
                          >
                            <Iconify name="mdi:pencil" color={blue[500]} />
                          </IconButton>
                          <IconButton
                            onClick={() => prosesBtnEdit(historyRow, "delete")}
                          >
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
      </TableRow> */}
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  handleEdit,
  handleDelete,
  setRequestEdit,
  listDataCategory,
}: {
  handleEdit?: any;
  handleDelete?: any;
  setRequestEdit?: (value: React.SetStateAction<SubKategoriRisiko>) => void;
  listDataCategory: any;
}) {
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
            {/* <TableCell sx={{ bgcolor: bgColorTh }} /> */}
            <TableCell align="center" width={180} sx={{ bgcolor: bgColorTh }}>
              Kategori Risiko
            </TableCell>
            <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
              Uraian Kategori Risiko
            </TableCell>
            <TableCell align="center" width={300} sx={{ bgcolor: bgColorTh }}>
              Subkategori Risiko
            </TableCell>
            <TableCell width={100} align="center" sx={{ bgcolor: bgColorTh }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listDataCategory.map((row: ResultCategory, rowIndex: number) => (
            <Row
              key={row.id}
              row={row}
              rowIndex={rowIndex}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              setRequestEdit={setRequestEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
