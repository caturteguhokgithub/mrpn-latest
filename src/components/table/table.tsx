import React, { useState } from "react";
import {
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 InputBase,
 Box,
 TablePagination,
 Paper,
 Stack,
 Chip,
} from "@mui/material";
import Highlighter from "react-highlight-words";
import CustomPaginationActions from "./pagination";
import { grey } from "@mui/material/colors";

const TableMui = ({
 columns,
 data,
 tableHead,
 tableBody,
 stickyHeader,
 renderAsChip,
}: {
 columns: any;
 data: any;
 tableHead?: React.ReactNode;
 tableBody?: React.ReactNode;
 stickyHeader?: boolean;
 renderAsChip?: React.ReactNode;
}) => {
 const [searchQuery, setSearchQuery] = useState("");
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [isScrolled, setIsScrolled] = React.useState(false);
 const tableContainerRef = React.useRef<HTMLDivElement>(null);
 const [order, setOrder] = React.useState("asc");
 const [orderBy, setOrderBy] = React.useState("name");

 React.useEffect(() => {
  const handleScroll = () => {
   if (tableContainerRef.current && tableContainerRef.current.scrollLeft > 0) {
    setIsScrolled(true);
   } else {
    setIsScrolled(false);
   }
  };

  const tableContainer = tableContainerRef.current;
  tableContainer?.addEventListener("scroll", handleScroll);

  return () => {
   tableContainer?.removeEventListener("scroll", handleScroll);
  };
 }, []);

 const handleSearchChange = (event: any) => {
  setSearchQuery(event.target.value);
  setPage(0);
 };

 const handleChangePage = (event: any, newPage: any) => {
  setPage(newPage);
 };

 const handleChangeRowsPerPage = (event: any) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
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
  <>
   <Paper>
    <Stack p={2}>
     <InputBase
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search..."
      sx={{
       px: 2,
       py: 0.5,
       maxWidth: 300,
       border: `1px solid ${grey[300]}`,
       borderRadius: 12,
       fontSize: 14,
      }}
     />
    </Stack>
    <TableContainer
     className={
      isScrolled
       ? "scroll table-sticky-actions-column"
       : "table-sticky-actions-column"
     }
     ref={tableContainerRef}
    >
     <Table style={{ minWidth: 650 }} stickyHeader={stickyHeader}>
      {tableHead ? (
       tableHead
      ) : (
       <TableHead>
        <TableRow>
         {columns.map((column: any) => (
          <TableCell key={column.accessor}>{column.Header}</TableCell>
         ))}
        </TableRow>
       </TableHead>
      )}
      <TableBody>
       <>
        {tableBody ? (
         tableBody
        ) : (
         <>
          {paginatedData.map((row: any, rowIndex: any) => (
           <TableRow key={rowIndex}>
            {columns.map((column: any) => (
             <TableCell key={column.accessor}>
              {column.renderAsChip ? (
               <Chip label={row[column.accessor]} />
              ) : (
               <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={row[column.accessor].toString()}
               />
              )}
              <Highlighter
               highlightClassName="YourHighlightClass"
               searchWords={[searchQuery]}
               autoEscape={true}
               textToHighlight={row[column.accessor].toString()}
              />
             </TableCell>
            ))}
           </TableRow>
          ))}
         </>
        )}
       </>
      </TableBody>
     </Table>
    </TableContainer>
    <TablePagination
     component="div"
     count={filteredData.length}
     page={page}
     onPageChange={handleChangePage}
     rowsPerPage={rowsPerPage}
     onRowsPerPageChange={handleChangeRowsPerPage}
     rowsPerPageOptions={[5, 10, 25]}
     ActionsComponent={CustomPaginationActions}
     sx={{
      ".MuiToolbar-root": {
       pl: 0,
      },
      ".MuiTablePagination-spacer": {
       display: "none",
      },
     }}
    />
   </Paper>
  </>
 );
};

export default TableMui;
