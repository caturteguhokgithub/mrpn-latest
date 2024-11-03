import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Footer({}) {
 return (
  <>
   <Typography fontSize={14} color={grey[600]} py={2}>
    Hak Cipta &copy; {new Date().getFullYear()} | MRPN - Kementerian
    PPN/Bappenas. All Rights Reserved
   </Typography>
  </>
 );
}
