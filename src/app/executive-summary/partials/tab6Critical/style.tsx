import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { grey } from "@mui/material/colors";

export const StyledPaper = styled(Paper)({
  width: "100%",
  overflowX: "auto",
});

export const StyledTable = styled(Table)({
  minWidth: 650,
  borderCollapse: "separate",
});

export const BlockCell = styled(TableCell)(({ color }) => ({
  textAlign: "center",
  padding: "2px",
  "&:first-of-type": {
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
  },
  "&:last-of-type": {
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
  },
  "& > div": {
    height: "30px",
    backgroundColor: color,
    color: "white",
    padding: "4px 8px",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderRadius: "8px",
  },
}));

export const ParentRow = styled(TableRow)(({ color }) => ({
  fontWeight: "bold",
  backgroundColor: color,
}));

export const ChildRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
});

export const ParentBlock = styled(Box)(({ color }) => ({
  // backgroundColor: "#e5e5f7",
  // opacity: 0.8,
  // backgroundSize: "5px 5px",
  // backgroundImage:
  //   "repeating-linear-gradient(to right, #444cf7, #444cf7 1px, #e5e5f7 1px, #e5e5f7)",
  backgroundColor: `${color}`,
  opacity: 0.8,
  backgroundSize: "10px 10px",
  backgroundImage: `repeating-linear-gradient(65deg, ${grey[800]} 0, ${grey[800]} 1px, ${color} 0, ${color} 50%)`,
}));

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 600,
    fontSize: "14px !important",
    // border: "1px solid #dadde9",
    // boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  },
}));
