import React from "react";
import { Box, alpha } from "@mui/material";
import Image from "next/image";
import { grey } from "@mui/material/colors";

export const CardWithStamp = ({
 rejectStamp,
 approvalStamp,
 children,
}: {
 rejectStamp?: boolean;
 approvalStamp?: boolean;
 children?: React.ReactNode;
}) => {
 return (
  <Box
   position="relative"
   sx={{
    "&:before": {
     content: rejectStamp || approvalStamp ? "''" : "none",
     bgcolor: alpha(grey[500], 0.3),
     width: "100%",
     height: "100%",
     position: "absolute",
     top: 0,
     left: 0,
     borderRadius: "20px",
     zIndex: 10,
    },
   }}
  >
   <Box
    sx={{
     userSelect: rejectStamp || approvalStamp ? "none" : "unset",
     pointerEvents: rejectStamp || approvalStamp ? "none" : "unset",
    }}
   >
    {children}
   </Box>
   <Box position="absolute" top={20} right={30} zIndex={15}>
    {rejectStamp && (
     <Image
      alt="MRPN"
      src="https://res.cloudinary.com/caturteguh/image/upload/v1721703228/mrpn/ttd/stamp-rejected_gdzucv.png"
      width={0}
      height={0}
      sizes="100vw"
      style={{
       width: "auto",
       height: "150px",
       opacity: 1,
       transform: "rotate(70deg)",
      }}
     />
    )}
    {approvalStamp && (
     <Image
      alt="MRPN"
      src="https://res.cloudinary.com/caturteguh/image/upload/v1721703223/mrpn/ttd/stamp-approved_dduusw.png"
      width={0}
      height={0}
      sizes="100vw"
      style={{
       width: "auto",
       height: "150px",
       opacity: 1,
       transform: "rotate(70deg)",
      }}
     />
    )}
   </Box>
  </Box>
 );
};
