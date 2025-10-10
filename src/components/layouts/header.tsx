import theme from "@/theme";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { blue, grey, orange, red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { IconKeluar } from "../icons";
import Aside from "./aside";
import { usePathname } from "next/navigation";
import useAuthorizationVM from "@/app/authorizationVM";
import { useAuthContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Iconify from "@/icons/iconify";
import ModulePopup from "./partials/module";
import useModuleVM from "./partials/module-vm";
import LockSetting from "./partials/lock";

gsap.registerPlugin(useGSAP);

// const sliderContent = [
//   "PRANALA",
//   "Pengendali\u00A0Risiko\u00A0&\u00A0Analisis\u00A0Pembangunan",
// ];

const sliderContent = [
  "MRPN",
  "Manajemen\u00A0Risiko\u00A0Pembangunan\u00A0Nasional",
];

const textStyles = ["abbreviation", "full-form"];

export default function Header({}) {
  const { user } = useAuthContext((state) => state);
  const { rpjmn, setYear, year, setRkpState } = useRKPContext((state) => state);
  const { doLogout } = useAuthorizationVM();
  const { dataListApp, switchApp } = useModuleVM();

  const optionsYear = () => {
    if (rpjmn !== undefined) {
      let opt: number[] = [0];
      for (let i = rpjmn.start; i <= rpjmn.end; i++) {
        opt.push(i);
      }
      return opt;
    }
    return [];
  };

  const setProviderYear = (year: number) => {
    setRkpState(undefined);
    setYear(year);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorYear, setAnchorYear] = React.useState<null | HTMLElement>(null);
  const [openDrawerMobile, setOpenDrawerMobile] = React.useState(false);
  const [emonevModal, setEmonevModal] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openYear = Boolean(anchorYear);
  const handleClickYear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorYear(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorYear(null);
  };

  const toggleDrawerMobile = (newOpen: boolean) => () => {
    setOpenDrawerMobile(newOpen);
  };

  const pathname = usePathname();
  const flagPathnameTheme = [
    pathname === "/test",
    pathname === "/tesst",
  ].includes(true);

  //  Slide-up Text
  const [sliderCounter, setSliderCounter] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [lockModal, setLockModal] = useState(false);

  useEffect(() => {
    const phrase = sliderContent[sliderCounter];
    let letterIndex = 0;

    const letterInterval = setInterval(() => {
      if (letterIndex < phrase.length) {
        setCurrentPhrase(phrase.substring(0, letterIndex + 1));
        letterIndex++;
      } else {
        clearInterval(letterInterval);
        setTimeout(() => {
          setSliderCounter(
            (prevCounter) => (prevCounter + 1) % sliderContent.length
          );
        }, 6000); // Delay before switching to the next phrase
      }
    }, 50); // Interval for each letter (adjust as desired)

    return () => clearInterval(letterInterval);
  }, [sliderCounter]);

  const currentStyle = textStyles[sliderCounter];

  // useGSAP(() => {
  //   const tlIn = gsap.timeline({
  //     repeat: -1,
  //     repeatDelay: 6,
  //     yoyo: true,
  //     delay: 2,
  //     defaults: {
  //       ease: "expo.in",
  //       stagger: { amount: 0.1 },
  //       delay: 0.1,
  //     },
  //   });

  //   tlIn
  //     .from(".group-1 .ff", { xPercent: -10, width: 0 })
  //     .to(".group-1 .ff", { xPercent: 0, delay: 0.1 })
  //     .from(".group-2 .ff", { xPercent: -10, width: 0 })
  //     .to(".group-2 .ff", { xPercent: 0, delay: 0.1 })
  //     .from(".group-3 .ff", { xPercent: -10, width: 0 })
  //     .to(".group-3 .ff", { xPercent: 0, delay: 0.1 })
  //     .from(".group-4 .ff", { xPercent: -10, width: 0 })
  //     .to(".group-4 .ff", { xPercent: 0, delay: 0.1 });
  // }, []);

  const menuStyle = {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
    ".MuiMenuItem-root": {
      py: "10px",
      "&:first-of-type, &:last-of-type": {
        py: 2,
      },
      "&:last-of-type": {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "white",
        padding: "0 42px",
        pl: "3rem",
        [theme.breakpoints.down("md")]: {
          px: 3,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack
          direction="column"
          justifyContent="center"
          sx={{
            [theme.breakpoints.down("md")]: {
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            },
          }}
        >
          {/* <Typography component="h1" fontWeight="800" fontSize="1.25rem">
      MRPN 2024
     </Typography>
     <Typography
      component="h1"
      letterSpacing={4}
      fontSize="1.25rem"
      fontWeight={300}
     >
      BAPPENAS
     </Typography> */}
          {/* <Typography
      component="h1"
      fontWeight="800"
      fontSize="1.25rem"
      lineHeight={1.2}
     >
      MRPN 2024
     </Typography> */}
          {flagPathnameTheme ? null : (
            <>
              <Box
                component="img"
                src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
                alt="MRPN 2024"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "40px",
                  [theme.breakpoints.up("md")]: {
                    display: "none",
                  },
                }}
              >
                {/* <Image
       width={50}
       height={53}
       src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
       alt="MRPN 2024"
       priority
      /> */}
              </Box>
              {/* <Typography
        component="h1"
        fontWeight="800"
        fontSize="1.25rem"
        lineHeight={1.2}
        color={theme.palette.primary.main}
       >
        PRANALA
       </Typography>
       <Typography
        component="p"
        fontWeight="400"
        fontSize="14px"
        letterSpacing="0.5px"
        lineHeight={1.3}
       >
        Pengendali Risiko dan Rencana Pembangunan
       </Typography> */}
              <Typography
                component="div"
                fontWeight="800"
                fontSize="1.25rem"
                lineHeight={1.2}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
              >
                <Box id="slider">
                  <Box
                    className={`span animation ${currentStyle}`}
                    id="sliderValue"
                    sx={{
                      "&.abbreviation": {
                        // color: theme.palette.primary.main,
                        color: "white",
                      },
                      "&.full-form": {
                        color: "white",
                      },
                    }}
                  >
                    {currentPhrase.split("").map((letter, index) => (
                      <span
                        key={index}
                        className={`${index}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </Box>
                </Box>
              </Typography>
              <Typography
                component="p"
                fontWeight="700"
                fontSize="20px"
                letterSpacing="0.5px"
                textTransform="uppercase"
                sx={{
                  display: "none",
                  [theme.breakpoints.down("md")]: {
                    display: "block",
                  },
                }}
              >
                {/* Pranala */}
                MRPN
              </Typography>
            </>
          )}
        </Stack>
        <Stack alignItems="center" direction="row" gap={2}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickYear}
            sx={{
              px: 2,
              borderRadius: 50,
              bgcolor: orange[800],
              "&:hover": {
                // bgcolor: blue[800],
                bgcolor: orange[900],
              },
            }}
            startIcon={<Iconify name="mdi:format-list-numbered" size={20} />}
          >
            <Typography variant="body1" textTransform="capitalize">
              {year == 0
                ? `RPJMN ${rpjmn?.start + "-" + rpjmn?.end}`
                : `RKP ${year}`}
            </Typography>
          </Button>
          <Button onClick={handleClick} sx={{ p: 0, m: 0, minWidth: 0 }}>
            <Avatar sx={{ bgcolor: "white", width: 36, height: 36 }}>
              <Iconify
                name="mdi:account-tie"
                size={20}
                color={theme.palette.primary.main}
              />
            </Avatar>
          </Button>
          <Box
            component="span"
            onClick={toggleDrawerMobile(true)}
            sx={{
              display: "inline-flex",
              cursor: "pointer",
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            }}
          >
            <Iconify name="mdi:menu" size={24} />
          </Box>
        </Stack>
        <Menu
          anchorEl={anchorYear}
          id="year"
          open={openYear}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                ...menuStyle,
                "&.MuiPaper-root": {
                  right: 94,
                  width: 240,
                  borderRadius: 3,
                  ".MuiList-root": {
                    py: 0,

                    ".MuiButtonBase-root": {
                      "&:first-of-type": {
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                      },
                    },
                  },
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {optionsYear().map((y, index) => (
            <MenuItem
              key={index}
              onClick={() => setProviderYear(y)}
              sx={{
                bgcolor: year == y ? blue[50] : null,
                color: year == y ? blue[700] : "inherit",
              }}
            >
              {y == 0 ? (
                <ListItemText>
                  <Stack
                    component="span"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      component="span"
                      fontWeight={year == y ? 700 : 400}
                    >
                      RPJMN {rpjmn?.start + "-" + rpjmn?.end}
                    </Typography>
                    {year == y && (
                      <Iconify name="mdi:checkbox-marked-outline" size={20} />
                    )}
                  </Stack>
                </ListItemText>
              ) : (
                <ListItemText>
                  <Stack
                    component="span"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      component="span"
                      fontWeight={year == y ? 700 : 400}
                    >
                      RKP {y}
                    </Typography>
                    {year == y && (
                      <Iconify name="mdi:checkbox-marked-outline" size={20} />
                    )}
                  </Stack>
                </ListItemText>
              )}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => setLockModal(true)}
            sx={{
              bgcolor: grey[200],
            }}
          >
            <ListItemText>
              <Stack
                component="span"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography component="span">Atur Penguncian</Typography>
                <Iconify name="mdi:cog-outline" size={20} />
              </Stack>
            </ListItemText>
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                ...menuStyle,
                "&.MuiPaper-root": {
                  right: 44,
                  width: 240,
                  borderRadius: 3,
                  ".MuiList-root": {
                    py: 0,
                  },
                },
                ".MuiAvatar-img": {
                  width: 24,
                  height: "auto",
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            sx={{
              py: "10px !important",
              gap: 1,
            }}
          >
            <Avatar
              alt={user?.name ?? ""}
              src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
            />
            <ListItemText
              sx={{
                span: {
                  fontWeight: 500,
                  maxWidth: 200,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              }}
            >
              {user?.name ?? ""}
            </ListItemText>
          </MenuItem>
          <Divider sx={{ m: "0 !important" }} />
          <MenuItem
            sx={{ py: "10px !important", gap: 1 }}
            // onClick={() =>
            //   window.open("https://e-monev.bappenas.go.id", "_self")
            // }
            onClick={() => setEmonevModal(true)}
          >
            <Avatar
              alt={user?.name ?? ""}
              src="https://private-mrpn.bappenas.go.id/fe/mrpn/logo-emonev.png"
            />
            <ListItemText
              sx={{
                span: {
                  fontWeight: 500,
                  maxWidth: 200,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              }}
            >
              Pindah ke E-Monev
            </ListItemText>
          </MenuItem>
          {/* <Divider sx={{ m: "0 !important" }} />

          {optionsYear().map((y, index) => (
            <MenuItem
              key={index}
              onClick={() => setProviderYear(y)}
              sx={{
                bgcolor: year == y ? blue[100] : null,
              }}
            >
              {y == 0 ? (
                <ListItemText>
                  RPJMN {rpjmn?.start + "-" + rpjmn?.end}
                </ListItemText>
              ) : (
                <ListItemText>Tahun {y}</ListItemText>
              )}
            </MenuItem>
          ))} */}

          <Divider sx={{ m: "0 !important" }} />
          <MenuItem
            sx={{
              bgcolor: red[100],
              py: 2,
            }}
            onClick={() => doLogout()}
          >
            <ListItemIcon>
              <IconKeluar color={red[800]} />
            </ListItemIcon>
            <ListItemText sx={{ color: red[800], span: { fontWeight: 500 } }}>
              Keluar Sistem
            </ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
      <Drawer
        anchor="right"
        open={openDrawerMobile}
        onClose={toggleDrawerMobile(false)}
        sx={{
          ".MuiPaper-elevation": {
            //   bgcolor: theme.palette.primary.main,
            bgcolor: theme.palette.secondary.dark,
          },
        }}
      >
        <Aside isExpanded={true} isMobile />
      </Drawer>
      <ModulePopup
        emonevModal={emonevModal}
        setEmonevModal={setEmonevModal}
        dataListApp={dataListApp}
        switchApp={switchApp}
      />
      <LockSetting lockModal={lockModal} setLockModal={setLockModal} />
    </Box>
  );
}
