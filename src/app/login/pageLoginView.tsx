"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  DialogActions,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { grey, red } from "@mui/material/colors";
import { loadCSS } from "fg-loadcss";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import theme from "@/theme";
import { IconFA } from "../components/icons/icon-fa";
import SelectCustomTheme from "../components/select";
import { listUser } from "../utils/data";
import useAuthorizationVM from "@/app/authorizationVM";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/core/hooks/useHooks";
import DialogComponent from "@/components/dialog";
import LoadingPage from "../components/loadingPage";

gsap.registerPlugin(useGSAP);

export default function PageLoginView() {
  const {
    credential,
    setCredential,
    doLogin,
    userDropdown,
    handleChangeUser,
    modalErrorLogin,
    setModalErrorLogin,
    isLoading,
  } = useAuthorizationVM();

  const [togglePassword, setTogglePassword] = React.useState(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const [showLogin, setShowLogin] = React.useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseForm = () => {
    setShowLogin(false);
  };

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v6.5.1/css/all.css"
    );
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  React.useEffect(() => {
    const handleEnterPress = (e: any) => {
      if (e.key === "Enter") {
        doLogin;
      }
    };
    window.addEventListener("keydown", handleEnterPress);
    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  const buttonLogin = (
    <Box mt={showLogin ? 0 : 5}>
      <Button
        // type="submit"
        fullWidth
        className="glow-on-hover cta"
        onClick={!showLogin ? handleShowLogin : doLogin}
        sx={{
          mt: 2,
          px: 4,
          lineHeight: 1,
        }}
      >
        <span>
          <Typography
            component="span"
            fontSize={18}
            fontWeight={700}
            color="white"
          >
            Masuk Sistem
          </Typography>
          <span className="svg">
            <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1">
              <g
                id="arrow"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <path
                  className="one"
                  d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  className="two"
                  d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
                <path
                  className="three"
                  d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </svg>
          </span>
        </span>
      </Button>
    </Box>
  );

  const BatikCorner = ({ position }: { position: string }) => {
    return (
      <Box
        position="fixed"
        top={position === "tr" || position === "tl" ? 0 : "unset"}
        right={position === "tr" || position === "br" ? 0 : "unset"}
        bottom={position === "br" || position === "bl" ? 0 : "unset"}
        left={position === "tl" || position === "bl" ? 0 : "unset"}
        zIndex={1}
        sx={{
          img: {
            [theme.breakpoints.down("md")]: {
              height: "15vh !important",
            },
          },
        }}
      >
        <Image
          alt="Batik Corner"
          src={process.env.NEXT_PUBLIC_BASE_URL + "/mrpn/batik-corner-cmp.png"}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            height: "45vh",
            transform:
              position === "tr"
                ? "rotate(0deg)"
                : position === "br"
                ? "rotate(90deg)"
                : position === "tl"
                ? "rotate(270deg)"
                : "rotate(180deg)",
            //  opacity: 0.4,
            //  transform: "scale(1.2)",
          }}
        />
      </Box>
    );
  };

  const sxTextField = {
    bgcolor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 3,
    outline: "none",
    border: 0,
    "&:hover": {
      border: 0,
    },
    input: {
      fontSize: "1.1rem",
      bgcolor: "white",
      px: 3,
      borderRadius: 3,
      "&:focus": {
        outline: "none",
        borderColor: "inherit",
        boxShadow: "none",
      },
      "&::-webkit-input-placeholder": {
        color: grey[700],
        opacity: 1,
        fontStyle: "italic",
      },
    },
  };

  useGSAP(() => {
    const handleMouseMove = (event: any) => {
      const { clientX, clientY } = event;
      const x = (window.innerWidth - clientX) / 20;
      const y = (window.innerHeight - clientY) / 20;

      gsap.to(".box-parallax-bg", {
        x: x,
        y: y,
        ease: "power2.out",
      });

      gsap.to(".map-parallax-bg", {
        x: x / -5,
        y: y / -5,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const bappenasBlock = (
    <Box
      mt={showLogin ? 4 : 0}
      sx={{
        [theme.breakpoints.down("md")]: {
          mt: 0,
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        },
      }}
    >
      <Box
        py={2}
        px={4}
        bgcolor="white"
        borderRadius={5}
        boxShadow="0px 10px 15px -3px rgba(0,0,0,0.6)"
        width="auto"
        display="inline-block"
        sx={{
          [theme.breakpoints.down("md")]: {
            py: 1.5,
            px: 3,
            borderRadius: "0 0 20px 20px",
          },
        }}
      >
        <Stack
          direction="row"
          gap={3}
          sx={{
            img: {
              [theme.breakpoints.down("md")]: {
                height: "30px !important",
              },
            },
          }}
        >
          <Image
            alt="Bappenas"
            src="https://res.cloudinary.com/caturteguh/image/upload/v1724366680/mrpn/logo-only-bappenas-cmp_vcnfqq.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "auto",
              height: "50px",
            }}
          />
          <Image
            alt="Indonesia Emas 2045"
            src="https://res.cloudinary.com/caturteguh/image/upload/v1724121579/mrpn/logo-id-emas-sm_ptgbn4.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "50px" }}
          />
          <Image
            alt="79 Nusantara Baru Indonesia Maju"
            src="https://res.cloudinary.com/caturteguh/image/upload/v1724121579/mrpn/logo-ri-79-sm_zyzbgi.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "50px" }}
          />
        </Stack>
      </Box>
    </Box>
  );

  const leftBlock = (
    <Stack gap={4}>
      <Box>
        <Box display="inline-block">
          <Stack
            direction={showLogin ? "row" : "column"}
            gap={2}
            alignItems="center"
            sx={{
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                gap: 1,
              },
            }}
          >
            <Collapse
              in={showLogin}
              sx={{
                [theme.breakpoints.down("md")]: {
                  img: { height: "100px !important" },
                },
              }}
            >
              <Image
                alt="Logo MRPN"
                // src="https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png"
                src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  display: showLogin ? "inline-block" : "none",
                  width: "auto",
                  height: "110px",
                  filter: "drop-shadow(0px 12px 14px #000000)",
                }}
              />
            </Collapse>
            <Collapse
              in={!showLogin}
              sx={{
                [theme.breakpoints.down("md")]: {
                  img: { height: "180px !important" },
                },
              }}
            >
              <Image
                alt="Logo MRPN"
                // src="https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png"
                src="https://res.cloudinary.com/caturteguh/image/upload/v1708049745/mrpn/logo-2024_ne4yaj.png"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  display: !showLogin ? "inline-block" : "none",
                  width: "auto",
                  height: "250px",
                  filter: "drop-shadow(0px 12px 14px #000000)",
                }}
              />
            </Collapse>
            <Stack
              direction="column"
              alignItems={showLogin ? "flex-start" : "center"}
            >
              <Typography
                fontWeight={900}
                fontSize="clamp(3rem, 100vw, 6rem)"
                color="white"
                component="h1"
                lineHeight={1}
                textTransform="uppercase"
                letterSpacing={1.7}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "4rem",
                  },
                }}
              >
                {/* Manajemen Risiko
       <br />
       Pembangunan Nasional */}
                {/* Pranala */}
                MRPN
              </Typography>
              <Typography
                // fontStyle="italic"
                color="white"
                component="h1"
                fontSize="clamp(1rem, 2vw, 1.15rem)"
                lineHeight={1.4}
                textTransform="uppercase"
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "0.8rem",
                  },
                }}
              >
                {/* National Risk Management Information System */}
                Manajemen Risiko Pembangunan Nasional
              </Typography>
            </Stack>
            {!showLogin && bappenasBlock}
          </Stack>

          {showLogin && bappenasBlock}
          {/* <Divider
      sx={{
       my: 2,
       borderColor: "white",
       borderWidth: "1px",
       width: "100%",
       opacity: 0.3,
       [theme.breakpoints.down("md")]: { my: 1 },
      }}
     />
     <Typography
      fontStyle="italic"
      color="white"
      component="h1"
      fontSize="clamp(1rem, 2vw, 1.2rem)"
      lineHeight={1.4}
      textTransform="uppercase"
      sx={{
       [theme.breakpoints.down("md")]: {
        fontSize: "0.9rem",
       },
      }}
     >
      National Risk Management Information System
     </Typography> */}
        </Box>
      </Box>
    </Stack>
  );

  const rightBlock = (
    <Box
      px={7}
      py={6}
      width="100%"
      maxWidth={520}
      //   bgcolor="rgba(255, 255, 255, 0.1)"
      border="2px solid rgba(255,255,255,0.1)"
      boxShadow="0 0 40px rgba(8,7,16,0.6)"
      //   boxShadow="10px 10px 20px #babecc, -10px -10px 20px #ffffff"
      borderRadius={8}
      sx={{
        position: "relative",
        backdropFilter: "blur(16px)",
        transition: "300ms all ease-in-out",
        "&:hover": {
          border: `1px solid ${grey[600]}`,
          boxShadow: "0 7px 50px 10px #000000aa",
          transform: "scale(1.015)",
          // filter: "brightness(1.2)",
          backdropFilter: "blur(10px)",
        },
        [theme.breakpoints.down("md")]: {
          mt: 5,
          px: 5,
          py: 4,
          mx: "auto",
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleCloseForm}
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          transition: "all 500ms ease",
          bgcolor: red[500],
          "&:hover": {
            bgcolor: red[800],
          },
        }}
      >
        <IconFA
          name="xmark"
          color="white"
          size={16}
          sx={{
            fontWeight: 900,
          }}
        />
      </IconButton>
      <form>
        <Stack
          gap={4}
          sx={{
            [theme.breakpoints.down("md")]: { gap: 2 },
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            color="white"
            fontSize="2rem"
            fontWeight={900}
            textTransform="uppercase"
            letterSpacing={1.5}
            sx={{
              [theme.breakpoints.down("md")]: {
                fontSize: "1.5rem",
              },
            }}
          >
            Login
          </Typography>
          <SelectCustomTheme
            rounded
            anchorRight
            value={userDropdown}
            onChange={handleChangeUser}
            sx={{
              width: "100%",
              ".MuiInputBase-input": {
                paddingLeft: "24px",
                minWidth: "360px",
                [theme.breakpoints.down("md")]: {
                  minWidth: "100%",
                },
              },
              "&.MuiInputBase-root.MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          >
            <MenuItem value="" disabled>
              <Typography
                fontSize={16}
                fontStyle="italic"
                color={grey[600]}
                fontWeight={600}
              >
                Pilih user
              </Typography>
            </MenuItem>
            {listUser.map((userLabel, index) => (
              <MenuItem key={index} value={userLabel.id}>
                {userLabel.user}
              </MenuItem>
            ))}
          </SelectCustomTheme>
          {userDropdown === "1" ? (
            buttonLogin
          ) : userDropdown === "" ? null : (
            <>
              <Stack gap={2}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Username"
                  variant="outlined"
                  fullWidth
                  required
                  sx={sxTextField}
                  value={credential.email}
                  onChange={(e) =>
                    setCredential((prevState) => {
                      return {
                        ...prevState,
                        email: e.target.value,
                      };
                    })
                  }
                />
                <TextField
                  type={togglePassword ? "text" : "password"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          <IconFA
                            name={togglePassword ? "eye-slash" : "eye"}
                            size={15}
                            sx={{ width: 20 }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    onKeyPress: (e) => {
                      if (e.key === "Enter") {
                        doLogin();
                      }
                    },
                  }}
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  required
                  sx={sxTextField}
                  value={credential.password}
                  onChange={(e) =>
                    setCredential((prevState) => {
                      return {
                        ...prevState,
                        password: e.target.value,
                      };
                    })
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        p: 0,
                        ".MuiSvgIcon-root": {
                          fill: grey[500],
                        },
                      }}
                    />
                  }
                  label={
                    <Stack direction="row" alignItems="flex-start">
                      <Typography color={grey[500]} fontSize="0.9rem">
                        Ingatkan Saya
                      </Typography>
                    </Stack>
                  }
                  sx={{ gap: 1, ml: 0 }}
                />
              </Stack>
              {buttonLogin}
              <Typography
                component="small"
                fontSize={14}
                color={grey[500]}
                textAlign="center"
              >
                Belum punya akun? Hubungi{" "}
                <a href="/">
                  <Typography
                    component="span"
                    sx={{
                      textDecoration: "underline",
                      transition: "all 500ms ease-in-out",
                      "&:hover": {
                        fontWeight: 600,
                        textDecoration: "unset",
                      },
                    }}
                    fontSize={14}
                  >
                    Admin
                  </Typography>
                </a>
              </Typography>
            </>
          )}
        </Stack>
      </form>
    </Box>
  );

  const batikCenter = (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      zIndex={1}
      sx={{
        transform: "translate(-50%, -50%)",
        [theme.breakpoints.down("md")]: { img: { height: "70vh !important" } },
      }}
      className="map-parallax-bg"
    >
      <Image
        alt="Bg Batik"
        src={process.env.NEXT_PUBLIC_BASE_URL + "/mrpn/batik-center-cmp.png"}
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{
          width: "auto",
          height: "150vh",
          //  opacity: 0.4,
          //  transform: "scale(1.2)",
        }}
      />
    </Box>
  );

  const batikBg = (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      zIndex={0}
      sx={{ transform: "translate(-50%, -50%)" }}
      //    className="box-parallax-bg"
    >
      <Image
        alt="Bg Batik"
        src={process.env.NEXT_PUBLIC_BASE_URL + "/mrpn/bg-utama-cmp.jpg"}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "auto",
          height: "120vh",
          opacity: 0.07,
          //  transform: "scale(1.2)",
        }}
      />
    </Box>
  );

  return (
    <Stack
      className="login-page"
      width="100%"
      height="100vh"
      position="relative"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <BatikCorner position="tr" />
      <BatikCorner position="br" />
      {batikCenter}
      {batikBg}
      <BatikCorner position="tl" />
      <BatikCorner position="bl" />
      <Container
        sx={{
          maxWidth: "1400px !important",
          position: "relative",
          zIndex: 2,
          //  mt: "92px",
          [theme.breakpoints.down("md")]: {
            px: 4,
            mt: 5,
          },
        }}
      >
        <Stack
          direction={showLogin ? "row" : "column"}
          justifyContent={showLogin ? "space-between" : "center"}
          alignItems="center"
          sx={{
            [theme.breakpoints.down("md")]: { flexDirection: "column" },
          }}
        >
          {isLoading && <LoadingPage gyro />}
          {leftBlock}
          <Collapse
            in={showLogin}
            sx={{
              minWidth: 520,
              [theme.breakpoints.down("md")]: { minWidth: "90%" },
            }}
          >
            {rightBlock}
          </Collapse>
          {!showLogin && buttonLogin}
        </Stack>

        <DialogComponent
          width={"200px"}
          dialogOpen={modalErrorLogin}
          dialogClose={() => setModalErrorLogin(false)}
          title="Login Gagal"
          dialogFooter={
            <DialogActions sx={{ p: 2, px: 3 }}>
              <Button
                variant="contained"
                onClick={() => setModalErrorLogin(false)}
              >
                OK
              </Button>
            </DialogActions>
          }
        >
          Maaf username atau password Anda salah
        </DialogComponent>
      </Container>
    </Stack>
  );
}
