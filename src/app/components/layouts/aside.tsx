import React from "react";
import { Typography, Box, Stack, Collapse, Button } from "@mui/material";
import Image from "next/image";
import { MenuItem } from "./partials/menu";
import { MenuGroup } from "./partials/menu-group";
import { SubmenuItem } from "./partials/submenu";
import {
 IconDashboard,
 IconExecutive,
 IconKeluar,
 IconManajemen,
 IconPemantauan,
 IconPenetapan,
 IconProfil,
} from "../icons";
import { IconFA } from "../icons/icon-fa";
import { IconSupport } from "../icons/support";
import { IconApproval } from "../icons/approval";
import useAuthorizationVM from "@/app/authorizationVM";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { Menu } from "@/lib/core/context/authContext";

const getIcon = (icon: string) => {
 switch (icon) {
  case "IconDashboard": {
   return <IconDashboard />;
  }
  case "IconExecutive": {
   return <IconExecutive />;
  }
  case "IconPenetapan": {
   return <IconPenetapan />;
  }
  case "IconProfil": {
   return <IconProfil />;
  }
  case "IconPemantauan": {
   return <IconPemantauan />;
  }
  case "IconApproval": {
   return <IconApproval />;
  }
  case "IconMaturitas": {
   return <IconFA name="seedling" size={18} />;
  }
  case "IconSupport": {
   return <IconSupport />;
  }
  case "IconManajemen": {
   return <IconManajemen />;
  }
  default: {
   return <IconDashboard />;
  }
 }
};

function getMenuItem(
 indexMn: number,
 isExpanded: boolean | undefined,
 mn: Menu,
 type: string
) {
 if (mn.type === type) {
  return (
   <MenuItem
    hasChild={mn.submenu.length > 0}
    key={indexMn}
    isExpanded={isExpanded}
    label={mn.name}
    icon={getIcon(mn.icon)}
    url={mn.route}
    menuParentActive={
     typeof window !== "undefined"
      ? window.location.pathname.includes(mn.route)
      : false
    }
   >
    {mn.submenu.map((sm, indexSm) => (
     <SubmenuItem
      key={indexSm}
      label={sm.name}
      url={mn.route}
      urlLv2={sm.route}
     />
    ))}
   </MenuItem>
  );
 }
}

export default function Aside({
 isExpanded,
 isMobile,
}: {
 isExpanded?: boolean;
 isMobile?: boolean;
}) {
 const { menu } = useAuthContext((state) => state);

 const { doLogout } = useAuthorizationVM();

 const CompanyIcon = (
  <Stack
   width="100%"
   height="120px"
   alignItems="center"
   justifyContent="center"
   direction="row"
  >
   <Collapse in={isExpanded}>
    <Stack
     width="100%"
     height="120px"
     alignItems="center"
     justifyContent="center"
     direction="row"
     gap={2}
    >
     <Box
      sx={{
       transition: "all 300ms ease",
      }}
     >
      <Image
       width={64}
       height={68}
       src="https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png"
       alt="MRPN 2024"
       priority
      />
     </Box>
     <Typography
      color="white"
      fontSize="14px"
      fontWeight={600}
      variant="caption"
      textTransform="uppercase"
      lineHeight={1.3}
      maxWidth="136px"
     >
      Manajemen Risiko Pembangunan Nasional
     </Typography>
    </Stack>
   </Collapse>
  </Stack>
 );

 const Sidemenu = (
  <Stack
   direction="column"
   justifyContent="space-between"
   height={isMobile ? "calc(100% + 16px)" : "calc(100% - 120px)"}
   maxHeight={isMobile ? "calc(100% + 16px)" : "calc(100% - 120px)"}
   sx={{
    pt: isMobile ? 3 : 0,
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
     width: "3px",
    },
   }}
  >
   <Stack gap="40px" direction="column">
    <MenuGroup isExpanded={isExpanded} label="menu">
     <Stack direction="column" gap={1}>
      {menu.map((mn, indexMn) =>
       getMenuItem(indexMn, isExpanded, mn, "GENERAL")
      )}
     </Stack>
    </MenuGroup>

    {menu.filter((x) => x.type == "CONFIG").length > 0 && (
     <MenuGroup isExpanded={isExpanded} label="administrator">
      <Stack direction="column" gap={1}>
       {menu.map((mn, indexMn) =>
        getMenuItem(indexMn, isExpanded, mn, "CONFIG")
       )}
      </Stack>
     </MenuGroup>
    )}
   </Stack>
   <MenuItem
    isExpanded={isExpanded}
    reflect
    label="keluar sistem"
    icon={<IconKeluar />}
    url={"javascript:void(0)"}
    onclick={() => doLogout()}
   />
  </Stack>
 );

 return (
  <Box color="white" px="0" height="100vh" pb={4}>
   {isMobile ? null : CompanyIcon}
   {Sidemenu}
  </Box>
 );
}
