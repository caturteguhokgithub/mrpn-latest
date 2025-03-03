import React from "react";
import { Typography, Box, Stack, Collapse } from "@mui/material";
import Image from "next/image";
import { MenuItem } from "./partials/menu";
import { MenuGroup } from "./partials/menu-group";
import { SubmenuItem } from "./partials/submenu";
import { IconDashboard, IconKeluar, IconManajemen } from "../icons";
import useAuthorizationVM from "@/app/authorizationVM";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import { Menu } from "@/lib/core/context/authContext";
import Iconify from "../icons/iconify";
import useLayoutVM from "./hooks";

const getIcon = (icon: string) => {
  switch (icon) {
    case "IconDashboard": {
      return <Iconify name="mdi:view-dashboard" size={20} />;
    }
    case "IconExecutive": {
      return <Iconify name="mdi:book-open-page-variant" size={20} />;
    }
    case "IconPenetapan": {
      return <Iconify name="mdi:stamper" size={20} />;
    }
    case "IconProfil": {
      return <Iconify name="mdi:account-file-text" size={20} />;
    }
    case "IconPemantauan": {
      return <Iconify name="mdi:television-guide" size={20} />;
    }
    case "IconApproval": {
      return <Iconify name="mdi:checkbox-multiple-marked-circle" size={20} />;
    }
    case "IconMaturitas": {
      return <Iconify name="mdi:leaf" size={20} />;
    }
    case "IconSupport": {
      return <Iconify name="mdi:headset" size={20} />;
    }
    case "IconManajemen": {
      return <IconManajemen />;
    }
    case "IconObject": {
      return <Iconify name="mdi:cube" size={20} />;
    }
    case "IconLogActivity": {
      return <Iconify name="mdi:account-clock" size={20} />;
    }
    case "IconUserMgmt": {
      return <Iconify name="mdi:account-group" size={20} />;
    }
    case "IconUserRole": {
      return <Iconify name="mdi:account-cog" size={20} />;
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
  type: string,
  clickOpenCollapse: (index: number) => void,
  clickOutsideCollapse: () => void,
  activeMenuIndex: number | null
) {
  if (mn.type === type) {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";

    const isParentActive =
      typeof window !== "undefined"
        ? currentPath.includes(mn.route) && currentPath !== "/penetapan/objek"
        : false;

    const isChildActive = mn.submenu.some((sm) =>
      typeof window !== "undefined"
        ? currentPath.includes(sm.route) && currentPath !== "/penetapan/objek"
        : false
    );

    const isActive = isParentActive || isChildActive;
    const isSubmenuOpen = activeMenuIndex === indexMn;

    return (
      <MenuItem
        openSubmenu={isActive || isSubmenuOpen}
        clickOpenCollapse={() => clickOpenCollapse(indexMn)}
        clickOutsideCollapse={clickOutsideCollapse}
        hasChild={mn.submenu.length > 0}
        key={indexMn}
        isExpanded={isExpanded}
        label={mn.name}
        icon={getIcon(mn.icon)}
        url={mn.route}
        menuParentActive={isParentActive}
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

  const { clickOutsideCollapse } = useLayoutVM();

  const [activeMenuIndex, setActiveMenuIndex] = React.useState<number | null>(
    null
  );

  const handleClickOpenCollapse = (index: number) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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
              //  src="https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png"
              src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
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
              getMenuItem(
                indexMn,
                isExpanded,
                mn,
                "GENERAL",
                handleClickOpenCollapse,
                clickOutsideCollapse,
                activeMenuIndex
              )
            )}
          </Stack>
        </MenuGroup>

        {menu.filter((x) => x.type == "CONFIG").length > 0 && (
          <MenuGroup isExpanded={isExpanded} label="administrator">
            <Stack direction="column" gap={1}>
              {menu.map((mn, indexMn) =>
                getMenuItem(
                  indexMn,
                  isExpanded,
                  mn,
                  "CONFIG",
                  handleClickOpenCollapse,
                  clickOutsideCollapse,
                  activeMenuIndex
                )
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
        url={"/"}
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
