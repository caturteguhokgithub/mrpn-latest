"use client";

import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Collapse,
  Divider,
  Icon,
  Stack,
  Zoom,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Footer from "./footer";
import Header from "./header";
import { grey } from "@mui/material/colors";
import React from "react";
import Image from "next/image";
import { loadCSS } from "fg-loadcss";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { ILayout } from "../iLayout";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { doGetMasterListRpjmn } from "@/app/misc/master/masterService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { MiscMasterRPJMNRes } from "@/app/misc/master/masterServiceModel";

const Aside = dynamic(() => import("./aside"), { ssr: false });

export const isDeveloping = false;

export default function DashboardLayout(props: {
  children: React.ReactNode;
  noOverflow?: boolean;
  darkMode?: boolean;
}) {
  const { rpjmn, setRpjmn, year, setYear } = useRKPContext((state) => state);

  async function getRpjmn() {
    const response = await doGetMasterListRpjmn({
      body: {},
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterRPJMNRes = response.result;
      setRpjmn(result);
    }
  }

  useEffect(() => {
    if (rpjmn == undefined) {
      getRpjmn();
    }
    // else {
    //   if (year == 0) setYear(rpjmn.start);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpjmn]);

  const pathname = usePathname();
  const theme = useTheme();
  const drawerOpenKey = "drawerOpen";
  const [openNav, setOpenNav] = React.useState(true);
  const [checked, setChecked] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem(drawerOpenKey) === "true"
      : false
  );

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  useEffect(() => {
    localStorage.setItem(drawerOpenKey, JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v6.5.1/css/all.css"
    );
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  const flagPathnameTheme = [
    pathname === "/test",
    // pathname === "/tema",
  ].includes(true);

  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const sxMain = {
    borderTopLeftRadius: "50px",
    transition: "all 600ms ease",
    // width: checked ? "calc(100% - 44px)" : "100%",
    "&::-webkit-scrollbar": {
      width: "5px",
      borderRadius: "4px",
    },
    [theme.breakpoints.down("md")]: {
      borderTopLeftRadius: 0,
      p: 3,
      maxWidth: "100%",
      overflow: "auto",
    },
    ".table-collapsed": {
      ".MuiTableContainer-root": {
        //  maxWidth: checked ? "calc(100vw - 364px)" : "calc(100vw - 163px)",
        maxWidth: checked
          ? "calc(100vw - 364px)"
          : onlySmallScreen
          ? "100%"
          : "calc(100vw - 132px)",
        thead: {
          tr: {
            "&:not(:last-of-type)": {
              boxShadow: "none",
              th: {
                "&[colspan='1']": {
                  borderBottom: 0,
                },
                "&:not([colspan='1'])": {
                  backgroundColor: grey[200],
                },
              },
            },
          },
        },
        ".MuiTableRow-root": {
          boxShadow: "none",
        },
      },
      "&.perlakuan-risiko": {
        ".MuiTableContainer-root": {
          maxWidth: checked ? "calc(100vw - 348px)" : "calc(100vw - 132px)",
        },
      },
      "&.card-level-3": {
        ".MuiTableContainer-root": {
          maxWidth: checked ? "calc(100vw - 424px)" : "calc(100vw - 208px)",
        },
      },
      "&.thead-blue": {
        ".MuiTableCell-head": {
          backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
        },
      },
    },
  };

  const sxAside = {
    gridArea: "aside",
    bgcolor: theme.palette.primary.main,
    // bgcolor: theme.palette.secondary.dark,
    width: checked ? 280 : 64,
    transition: "width 600ms ease",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  };

  const sxWrapper = {
    display: "grid",
    gridTemplateColumns: checked
      ? "280px 1fr"
      : flagPathnameTheme && !checked
      ? "0 1fr"
      : "64px 1fr",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateAreas: `'aside header' 'aside main' 'aside footer'`,
    height: "100vh",
    transition: "grid-template-columns 600ms ease",
    ".table-sticky-actions-column": {
      maxWidth: "calc(100vw - 348px)",
      overflowX: "auto",
      transition: "max-width 300ms ease-in-out",
      "&::-webkit-scrollbar": {
        height: "5px",
      },
      "&.scroll": {
        ".box-shadow-scroll": {
          position: "relative",
          boxShadow: "none",
          "&:after": {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "30px",
            transition: "box-shadow 5s ease-in-out",
            transform: "translateX(-100%)",
            content: "''",
            pointerEvents: "none",
            boxShadow: "inset -10px 0 8px -8px rgba(5, 5, 5, 0.06)",
          },
        },
      },
    },
    ".table-sticky-horizontal": {
      ".MuiTableContainer-root": {
        maxWidth: "calc(100vw - 368px)",
      },
    },
    ".orgchart-container": {
      // maxWidth: "calc(100vw - 444px)",
      width: "calc(100vw - 404px)",
    },
    ".table-fund, .table-overflow-x-indication": {
      maxWidth: "calc(100vw - 392px)",
    },
    ".wording-kp-ellipsis": {
      span: {
        "&.MuiTypography-root": {
          maxWidth: "60vw",
        },
      },
    },
    ".mrpn-card-content": {
      // maxWidth: "calc(100vw - 348px)",
    },
    ".collapse-active": {
      ".table-sticky-actions-column": {
        maxWidth: "calc(100vw - 132px)",
      },
      ".table-sticky-horizontal": {
        ".MuiTableContainer-root": {
          maxWidth: "calc(100vw - 148px)",
        },
      },
      ".orgchart-container": {
        // maxWidth: "calc(100vw - 228px)",
        width: "calc(100vw - 188px)",
      },
      ".table-fund, .table-overflow-x-indication": {
        maxWidth: "calc(100vw - 192px)",
      },
      ".wording-kp-ellipsis": {
        span: {
          "&.MuiTypography-root": {
            maxWidth: "70vw",
          },
        },
      },
      ".mrpn-card-content": {
        maxWidth: "100%",
      },
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `'header' 'main' 'footer'`,
    },
  };

  const themeCondition = props.darkMode
    ? "#151c26"
    : theme.palette.primary.light;

  return (
    <Box sx={sxWrapper}>
      {/* <Box component="aside" sx={sxAside} onMouseOver={handleChange}></Box> */}
      <Box
        component="aside"
        sx={sxAside}
        position={props.darkMode ? "inherit" : "unset"}
        zIndex={props.darkMode ? 1 : "unset"}
      >
        <Collapse
          orientation="horizontal"
          in={checked}
          collapsedSize={64}
          sx={{
            width: "100%",
            transitionDelay: "300ms",
            ".MuiCollapse-wrapper, .MuiCollapse-wrapperInner": {
              width: "100%",
            },
          }}
        >
          <Aside isExpanded={checked} />
        </Collapse>
      </Box>
      <Box
        component="header"
        sx={{ gridArea: "header", p: "20px 0" }}
        bgcolor={props.darkMode ? "#1f2937" : "transparent"}
        position={props.darkMode ? "inherit" : "unset"}
        zIndex={props.darkMode ? 1 : "unset"}
      >
        {flagPathnameTheme ? null : (
          <Zoom
            in={!checked}
            style={{
              transitionDelay: "200ms",
            }}
          >
            <Box
              mt={0}
              position="absolute"
              left={25}
              zIndex={999}
              sx={{
                [theme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              <Image
                width={50}
                height={53}
                // src="https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png"
                src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
                alt="MRPN 2024"
                priority
              />
            </Box>
          </Zoom>
        )}
        <Header />
      </Box>
      <Box
        component="main"
        bgcolor={themeCondition}
        gridArea="main"
        // p="42px"
        p="24px"
        // pb="24px"
        position="relative"
        className={checked ? "" : "collapse-active"}
        sx={sxMain}
        // onMouseOver={handleChange}
      >
        <Stack
          borderRadius="50%"
          bgcolor={
            flagPathnameTheme ? "transparent" : theme.palette.primary.main
          }
          justifyContent="center"
          alignItems="center"
          position="absolute"
          zIndex={1}
          top={flagPathnameTheme ? "107px" : "42px"}
          left={flagPathnameTheme ? "42px" : "-15px"}
          onClick={handleChange}
          width="22px"
          height="22px"
          border={flagPathnameTheme ? 0 : "5px solid"}
          borderColor={theme.palette.primary.light}
          boxSizing="content-box"
          sx={{
            cursor: "pointer",
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        >
          {flagPathnameTheme ? (
            <Icon
              baseClassName="fas"
              className={`fa-bars-staggered`}
              sx={{
                fontSize: "20px",
                color: "white",
                // transform: checked ? "rotate(180deg)" : "rotate(0deg)",
                // transition: "all 1s ease",
                // position: "relative",
                // top: checked ? -1 : 0,
                // left: 0,
              }}
            />
          ) : (
            <Icon
              baseClassName="fas"
              className={`fa-chevron-right`}
              sx={{
                fontSize: "12px",
                color: "white",
                transform: checked ? "rotate(180deg)" : "rotate(0deg)",
                transition: "all 1s ease",
                position: "relative",
                top: checked ? -1 : 0,
                left: 0,
              }}
            />
          )}
        </Stack>
        <ILayout>{props.children}</ILayout>
      </Box>
      <Stack
        component="footer"
        sx={{
          gridArea: "footer",
          bgcolor: themeCondition,
          maxWidth: "100%",
        }}
        direction="column"
        justifyContent="center"
        px="42px"
      >
        <Divider
          variant="middle"
          sx={{ bgcolor: grey[200], m: 0, width: 160 }}
        />
        <Footer />
      </Stack>
    </Box>
  );
}
