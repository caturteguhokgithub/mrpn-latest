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
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { bgColorTh } from "@/app/utils/color";
import { blue, grey, red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import Iconify from "@/app/components/icons/iconify";
import AddButton from "@/app/components/buttonAdd";
import {
  AreasShowMatDamKomite,
  ReqAddMatDamKomite,
  ReqAddMatDamUpr,
  ResShowMatDamKomite,
  ValuesShowMatDamKomite,
} from "./hooks/model";

function Row(props: {
  row: ValuesShowMatDamKomite;
  setRequestMatDamKomite?: (
    value: React.SetStateAction<ReqAddMatDamKomite>
  ) => void;
  setRequestMatDamUpr?: (value: React.SetStateAction<ReqAddMatDamUpr>) => void;
  handleEdit: any;
  handleDelete?: any;
  handleDeleteArea?: any;
  handleEditArea?: any;
}) {
  const {
    row,
    handleEdit,
    handleDelete,
    handleDeleteArea,
    setRequestMatDamUpr,
    setRequestMatDamKomite,
    handleEditArea,
  } = props;

  const [open, setOpen] = React.useState(true);

  const prosesBtnEdit = (
    komite: ValuesShowMatDamKomite,
    upr: AreasShowMatDamKomite
  ) => {
    if (setRequestMatDamUpr) {
      setRequestMatDamUpr((prevState) => ({
        ...prevState,
        id: upr.id,
        matrix_id: upr.id,
        lists: [
          {
            id: upr.id,
            value: upr.value,
            area: upr.area_levels,
          },
        ],
      }));
    }

    if (setRequestMatDamKomite) {
      setRequestMatDamKomite((prevState) => ({
        ...prevState,
        dampak: komite.dampak,
      }));
    }

    handleEdit();
  };

  const prosesBtnDelete = (upr: AreasShowMatDamKomite) => {
    if (setRequestMatDamUpr) {
      setRequestMatDamUpr((prevState) => ({
        ...prevState,
        id: upr.id,
        matrix_id: upr.id,
      }));
    }

    handleDelete();
  };

  const prosesBtnEditArea = (
    komite: ValuesShowMatDamKomite,
    act: string
  ) => {
    if (setRequestMatDamKomite) {
      setRequestMatDamKomite((prevState) => ({
        ...prevState,
        id: komite.id,
        dampak: komite.dampak,
        prioritas: Number(komite.prioritas),
      }));
    }

    if (act === "edit") {
      handleEditArea();
    } else {
      handleDeleteArea();
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={8} sx={{ fontWeight: 600, bgcolor: blue[100] }}>
          {row.dampak}
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" justifyContent="center">
            <IconButton onClick={() => prosesBtnEditArea(row, "edit")}>
              <Iconify name="mdi:pencil" color={blue[500]} />
            </IconButton>
            <IconButton onClick={() => prosesBtnEditArea(row, "delete")}>
              <Iconify name="mdi:trash" color={red[500]} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={10} sx={{ bgcolor: grey[200], p: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box m={1} ml={8}>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ bgcolor: bgColorTh }}>
                  <TableRow>
                    <TableCell
                      rowSpan={3}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      Dampak
                    </TableCell>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      Level Dampak
                    </TableCell>
                    <TableCell
                      rowSpan={3}
                      width={110}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      Aksi
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      width={220}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      1
                    </TableCell>
                    <TableCell
                      width={220}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      2
                    </TableCell>
                    <TableCell
                      width={220}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      3
                    </TableCell>
                    <TableCell
                      width={220}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      4
                    </TableCell>
                    <TableCell
                      width={220}
                      align="center"
                      sx={{ bgcolor: bgColorTh }}
                    >
                      5
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Tidak Signifikan
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Kurang Signifikan
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Cukup Signifikan
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Signifikan
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: bgColorTh }}>
                      Sangat Signifikan
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.areas.map((resultRow) => (
                    <TableRow key={resultRow.value}>
                      <TableCell
                        sx={{
                          bgcolor: grey[50],
                        }}
                      >
                        {resultRow.value}
                      </TableCell>
                      {[1, 2, 3, 4, 5].map((level) => {
                        const item = resultRow.area_levels.find(
                          (lvl) => lvl.level == level
                        );
                        return (
                          <TableCell key={level} sx={{ bgcolor: grey[50] }}>
                            {item ? item.value : "-"}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        sx={{
                          bgcolor: grey[50],
                        }}
                      >
                        <Stack direction="row">
                          <IconButton
                            onClick={() => prosesBtnEdit(row, resultRow)}
                          >
                            <Iconify name="mdi:pencil" color={blue[500]} />
                          </IconButton>
                          <IconButton
                            onClick={() => prosesBtnDelete(resultRow)}
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
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleImpactTable({
  data,
  setRequestMatDamKomite,
  setRequestMatDamUpr,
  handleEdit,
  handleDelete,
  handleDeleteArea,
  handleEditArea,
}: {
  data: ValuesShowMatDamKomite[];
  setRequestMatDamKomite?: (
    value: React.SetStateAction<ReqAddMatDamKomite>
  ) => void;
  setRequestMatDamUpr?: (value: React.SetStateAction<ReqAddMatDamUpr>) => void;
  handleEdit?: any;
  handleDelete?: any;
  handleDeleteArea?: any;
  handleEditArea?: any;
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
      }}
    >
      <Table
        size="small"
        stickyHeader
        sx={{
          minWidth: 650,
          "tbody, thead": {
            "td, th": {
              borderRight: `1px solid ${grey[300]} !important`,
              "&:last-of-type": {
                borderRight: `0 !important`,
              },
            },
          },
        }}
      >
        <TableHead sx={{ bgcolor: bgColorTh }}>
          <TableRow>
            <TableCell
              align="center"
              width={50}
              sx={{ bgcolor: bgColorTh }}
            ></TableCell>
            <TableCell colSpan={8} align="center" sx={{ bgcolor: bgColorTh }}>
              Area Dampak
            </TableCell>
            <TableCell width={80} align="center" sx={{ bgcolor: bgColorTh }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row
              key={row.dampak}
              row={row}
              setRequestMatDamKomite={setRequestMatDamKomite}
              setRequestMatDamUpr={setRequestMatDamUpr}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDeleteArea={handleDeleteArea}
              handleEditArea={handleEditArea}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
