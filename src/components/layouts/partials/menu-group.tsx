import React from "react";
import { Typography, List, ListSubheader } from "@mui/material";
import { usePathname } from "next/navigation";

export const MenuGroup = ({ label, children, isExpanded }: IMenu & ILayout) => {
 const pathname = usePathname();
 const flagPathnameTheme = [pathname === "/", pathname === "/tema"].includes(
  true
 );

 return (
  <List
   component="nav"
   subheader={
    <ListSubheader
     component="div"
     sx={{
      bgcolor: "transparent",
      mb: "1rem",
      mx: isExpanded ? "24px" : 0,
     }}
    >
     <Typography
      fontSize="11px"
      color="white"
      textTransform="uppercase"
      sx={{ opacity: 0.5 }}
     >
      {flagPathnameTheme && isExpanded ? (
       <>
        {isExpanded ? (
         label
        ) : (
         <>{label.length >= 5 ? label.substring(0, 5) + "..." : label}</>
        )}
       </>
      ) : !flagPathnameTheme ? (
       <>
        {isExpanded ? (
         label
        ) : (
         <>{label.length >= 5 ? label.substring(0, 5) + "..." : label}</>
        )}
       </>
      ) : null}
     </Typography>
    </ListSubheader>
   }
  >
   {children}
  </List>
 );
};
