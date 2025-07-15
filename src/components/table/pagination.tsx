import React from "react";
import { IconButton, Select, MenuItem, Stack } from "@mui/material";
import {
 FirstPage,
 LastPage,
 KeyboardArrowLeft,
 KeyboardArrowRight,
} from "@mui/icons-material";

const CustomPaginationActions = (props: any) => {
 const { count, page, rowsPerPage, onPageChange } = props;

 const handleFirstPageButtonClick = (event: any) => {
  onPageChange(event, 0);
 };

 const handleBackButtonClick = (event: any) => {
  onPageChange(event, page - 1);
 };

 const handleNextButtonClick = (event: any) => {
  onPageChange(event, page + 1);
 };

 const handleLastPageButtonClick = (event: any) => {
  onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
 };

 return (
  <Stack direction="row" marginLeft="auto">
   <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
    <FirstPage />
   </IconButton>
   <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
    <KeyboardArrowLeft />
   </IconButton>
   <IconButton
    onClick={handleNextButtonClick}
    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
   >
    <KeyboardArrowRight />
   </IconButton>
   <IconButton
    onClick={handleLastPageButtonClick}
    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
   >
    <LastPage />
   </IconButton>
  </Stack>
 );
};

export default CustomPaginationActions;
