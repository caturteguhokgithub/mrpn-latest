import theme from "@/theme";
import { Box, Typography } from "@mui/material";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Header({}) {
 useGSAP(() => {
  const tlIn = gsap.timeline({
   repeat: -1,
   repeatDelay: 6,
   yoyo: true,
   delay: 2,
   defaults: {
    ease: "expo.in",
    stagger: { amount: 0.1 },
    delay: 0.1,
   },
  });

  tlIn
   .from(".group-1 .ff", { xPercent: -10, width: 0 })
   .to(".group-1 .ff", { xPercent: 0, delay: 0.1 })
   .from(".group-2 .ff", { xPercent: -10, width: 0 })
   .to(".group-2 .ff", { xPercent: 0, delay: 0.1 })
   .from(".group-3 .ff", { xPercent: -10, width: 0 })
   .to(".group-3 .ff", { xPercent: 0, delay: 0.1 })
   .from(".group-4 .ff", { xPercent: -10, width: 0 })
   .to(".group-4 .ff", { xPercent: 0, delay: 0.1 });
 }, []);

 return (
  <>
   <Typography
    component="p"
    fontWeight="700"
    fontSize="20px"
    letterSpacing="0.5px"
    textTransform="uppercase"
    sx={{
     userSelect: "none",
     cursor: "default",
     "@keyframes myEffectExit": {
      "0%": {
       opacity: 0,
       transform: "translateY(0)",
      },
      "100%": {
       opacity: 1,
       transform: "translateY(-200%)",
      },
     },
     ".group-1, .group-2, .group-3, .group-4": {
      position: "relative",
      overflow: "hidden",
      display: "inline-flex",
     },

     ".ff": {
      position: "relative",
      "&.letter-e": {
       width: "12.66px" /* E */,
      },
      "&.letter-n": {
       width: "15.75px" /* N */,
      },
      "&.letter-g": {
       width: "15.52px" /* G */,
      },
      "&.letter-d": {
       width: "14.11px" /* D */,
      },
      "&.letter-a": {
       width: "15.44px" /* A */,
      },
      "&.letter-l": {
       width: "11.81px" /* L */,
      },
      "&.letter-i": {
       width: "6.13px" /* I */,
      },
      "&.letter-s": {
       width: "13.61px" /* S */,
      },
      "&.letter-k": {
       width: "14.09px" /* K */,
      },
      "&.letter-o": {
       width: "15.92px" /* O */,
      },
      "&.letter-and": {
       width: "13.94px" /* & */,
      },
      "&.letter-p": {
       width: "13.47px" /* P */,
      },
      "&.letter-m": {
       width: "19.14px" /* M */,
      },
      "&.letter-b": {
       width: "13.73px" /* B */,
      },
      "&.space": {
       width: "10px" /* B */,
      },
     },

     [theme.breakpoints.down("md")]: {
      fontSize: "1em",
      lineHeight: 1.2,
      display: "none",
     },
    }}
   >
    <Box component="span" color={theme.palette.primary.main}>
     P
    </Box>
    <Box component="span" className="ff-group group-1">
     <Box component="span" color="white" className="ff letter-e">
      e
     </Box>
     <Box component="span" color="white" className="ff letter-n">
      n
     </Box>
     <Box component="span" color="white" className="ff letter-g">
      g
     </Box>
     <Box component="span" color="white" className="ff letter-e">
      e
     </Box>
     <Box component="span" color="white" className="ff letter-n">
      n
     </Box>
     <Box component="span" color="white" className="ff letter-d">
      d
     </Box>
     <Box component="span" color="white" className="ff letter-a">
      a
     </Box>
     <Box component="span" color="white" className="ff letter-l">
      l
     </Box>
     <Box component="span" color="white" className="ff letter-i">
      i
     </Box>
     <Box component="span" color="white" className="ff space">
      &nbsp;
     </Box>
    </Box>
    <Box component="span" color={theme.palette.primary.main}>
     R
    </Box>
    <Box component="span" className="ff-group group-2">
     <Box component="span" color="white" className="ff letter-i">
      i
     </Box>
     <Box component="span" color="white" className="ff letter-s">
      s
     </Box>
     <Box component="span" color="white" className="ff letter-i">
      i
     </Box>
     <Box component="span" color="white" className="ff letter-k">
      k
     </Box>
     <Box component="span" color="white" className="ff letter-o">
      o
     </Box>
     <Box component="span" color="white" className="ff space">
      &nbsp;
     </Box>
     <Box component="span" color="white" className="ff letter-and">
      &
     </Box>
     <Box component="span" color="white" className="ff space">
      &nbsp;
     </Box>
    </Box>
    <Box component="span" color={theme.palette.primary.main}>
     Anal
    </Box>
    <Box component="span" className="ff-group group-3">
     <Box component="span" color="white" className="ff letter-i">
      i
     </Box>
     <Box component="span" color="white" className="ff letter-s">
      s
     </Box>
     <Box component="span" color="white" className="ff letter-i">
      i
     </Box>
     <Box component="span" color="white" className="ff letter-s">
      s
     </Box>
     <Box component="span" color="white" className="ff space">
      &nbsp;
     </Box>
     <Box component="span" color="white" className="ff letter-p">
      p
     </Box>
     <Box component="span" color="white" className="ff letter-e">
      e
     </Box>
     <Box component="span" color="white" className="ff letter-m">
      m
     </Box>
     <Box component="span" color="white" className="ff letter-b">
      b
     </Box>
     <Box component="span" color="white" className="ff letter-a">
      a
     </Box>
     <Box component="span" color="white" className="ff letter-n">
      n
     </Box>
     <Box component="span" color="white" className="ff letter-g">
      g
     </Box>
     <Box component="span" color="white" className="ff letter-and">
      u
     </Box>
     <Box component="span" color="white" className="ff letter-n">
      n
     </Box>
    </Box>
    <Box component="span" color={theme.palette.primary.main}>
     a
    </Box>
    <Box component="span" className="ff-group group-4">
     <Box component="span" color="white" className="ff letter-n">
      n
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
    Pranala
   </Typography>
  </>
 );
}
