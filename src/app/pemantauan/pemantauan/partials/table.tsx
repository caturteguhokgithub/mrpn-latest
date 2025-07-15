import React from "react";
import {
  Chip,
  SelectChangeEvent,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import TableMui from "@/components/table/table";
import { red } from "@mui/material/colors";
import ActionColumn from "@/components/actions/action";

const columns = [
  //  { Header: "ID", accessor: "id" },
  { Header: "Peristiwa Risiko", accessor: "peristiwa" },
  { Header: "Kategori Risiko", accessor: "kategori" },
  { Header: "Penyebab", accessor: "penyebab" },
  { Header: "Dampak", accessor: "dampak" },
  { Header: "LK", accessor: "lk" },
  { Header: "LD", accessor: "ld" },
  { Header: "BR", accessor: "br" },
  { Header: "Level Risiko", accessor: "level", renderAsChip: true },
  { Header: "Prioritas Risiko", accessor: "prioritas" },
  //  { Header: "", accessor: "actions" },
];

const data = [
  {
    id: 1,
    peristiwa: "Rendahnya alokasi anggaran untuk pengelolaan sampah ",
    kategori: "Risiko Ekonomi",
    penyebab:
      "Komitmen kepala daerah berkaitan dengan anggaran yang rendah terhadap sektor pengelolaan persampahan (Jakstranas tidak dipatuhi oleh Pemda)",
    dampak:
      "1. Anggaran dalam pengelolaan sampah di Pemda rata-rata dibawah 1%, 2. Pengelolaan sampah belum menjadi prioritas karena merupakan urusan wajib non layanan dasar, 3. penyelenggaraan pengelolaan sampah tidak optimal, 4. fasilitas pengelolaan sampah tidak optimal, 5. opsi teknologi pengelolaan sampah yang advance tidak bisa diimplmentasikan",
    lk: 5,
    ld: 4,
    br: 22,
    level: "Sangat Tinggi",
    prioritas: "1",
  },
  {
    id: 2,
    peristiwa:
      "Rendahnya pengawasan dan penegakan hukum terhadap penyelenggaraan pengelolaan sampah",
    kategori: "Risiko Tata Kelola",
    penyebab:
      "1. Belum adanya pihak yang bertanggungjawab dalam pengawasan, 2. belum optimalnya fungsi penegakan hukum di sektor persampahan",
    dampak: "Perbaikan kebijakan tidak dapat dilakukan dengan optimal",
    lk: 4,
    ld: 4,
    br: 19,
    level: "Tinggi",
    prioritas: "3",
  },
];

export default function TableAnalisis({}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [modalOpenView, setModalOpenView] = React.useState(false);
  const [modalOpenAdd, setModalOpenAdd] = React.useState(false);
  const [modalOpenEdit, setModalOpenEdit] = React.useState(false);
  const [modalOpenDelete, setModalOpenDelete] = React.useState(false);
  const [project, setProject] = React.useState("");

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  const handleModalOpenView = () => {
    setModalOpenView(true);
  };
  const handleModalOpenDelete = () => {
    setModalOpenDelete(true);
  };
  const handleModalOpenAdd = () => {
    setModalOpenAdd(true);
  };
  const handleModalOpenEdit = () => {
    setModalOpenEdit(true);
  };

  const handleModalClose = () => {
    setModalOpenView(false);
    setModalOpenDelete(false);
    setModalOpenAdd(false);
    setModalOpenEdit(false);
  };

  const filteredData = data.filter((row: any) =>
    columns.some((column: any) =>
      row[column.accessor]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  //  const handleRequestSort = (property: any) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  //  };

  //  const stableSort = (array: any, comparator: any) => {
  //   const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  //   stabilizedThis.sort((a: any, b: any) => {
  //    const order = comparator(a[0], b[0]);
  //    if (order !== 0) return order;
  //    return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el: any) => el[0]);
  //  };

  //  const getComparator = (order: any, orderBy: any) => {
  //   return order === "desc"
  //    ? (a: any, b: any) => (b[orderBy] < a[orderBy] ? -1 : 1)
  //    : (a: any, b: any) => (a[orderBy] < b[orderBy] ? -1 : 1);
  //  };

  //  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableMui
      stickyHeader
      columns={columns}
      data={data}
      tableHead={
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: 300 }}>Peristiwa Risiko</TableCell>
            <TableCell sx={{ minWidth: 200 }}>Kategori Risiko</TableCell>
            <TableCell sx={{ minWidth: 400 }}>Penyebab</TableCell>
            <TableCell sx={{ minWidth: 400 }}>Dampak</TableCell>
            <TableCell>
              {/* <TableSortLabel
           active={orderBy === "name"}
           direction={orderBy === "name" ? order : "asc"}
           onClick={() => handleRequestSort("name")}
          > */}
              Level Kemungkinan (LK)
              {/* </TableSortLabel> */}
            </TableCell>
            <TableCell>Level Dampak (LD)</TableCell>
            <TableCell>Besaran Risiko (BR)</TableCell>
            <TableCell>Level Risiko</TableCell>
            <TableCell>Prioritas Risiko</TableCell>
            <TableCell
              align="right"
              className="box-shadow-scroll"
              style={{
                position: "sticky",
                right: 0,
                background: "white",
              }}
            >
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
      }
      tableBody={
        <>
          {paginatedData.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>{row.peristiwa}</TableCell>
              <TableCell>{row.kegiatan}</TableCell>
              <TableCell>{row.penyebab}</TableCell>
              <TableCell>{row.dampak}</TableCell>
              <TableCell align="right">{row.lk}</TableCell>
              <TableCell align="right">{row.ld}</TableCell>
              <TableCell align="right">{row.br}</TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  label={row.level}
                  sx={{
                    fontWeight: 600,
                    color: row.level === "Sangat Tinggi" ? red[800] : "default",
                    borderColor:
                      row.level === "Sangat Tinggi" ? red[800] : "default",
                  }}
                />
              </TableCell>
              <TableCell align="right">{row.prioritas}</TableCell>
              <TableCell
                align="right"
                className="box-shadow-scroll"
                style={{
                  position: "sticky",
                  right: 0,
                  background: "white",
                }}
              >
                <ActionColumn
                  editClick={handleModalOpenEdit}
                  deleteClick={handleModalOpenDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </>
      }
    />
  );
}
