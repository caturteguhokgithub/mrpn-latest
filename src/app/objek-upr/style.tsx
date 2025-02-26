import theme from "@/theme";
import { alpha } from "@mui/material";

export const styleToggleButton = [
 {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 1,
  mt: 2,
  mb: 2,
  p: "1px",
  button: {
   //  bgcolor: "white",
   transition: "all 800ms ease-in-out",
   span: {
    //   lineHeight: 1.2,
    py: 2,
    height: "100%",
    //   display: "inline-flex",
    //   alignItems: "center",
   },
   "&:hover": {
    //   bgcolor: alpha(theme.palette.primary.main, 0.1),
    color: alpha(theme.palette.secondary.dark, 0.8),
    background: `linear-gradient(135deg, ${alpha(
     theme.palette.primary.main,
     0.3
    )} 100%, rgba(255, 255, 255, 0.2) 100%),url(https://res.cloudinary.com/caturteguh/image/upload/v1715510168/mrpn/bg-button-theme_cxwxph.jpg)`,
    //   backgroundSize: "140%",
    //   backgroundPosition: "-240px -125px",
    backgroundSize: "100%",
    backgroundPosition: "right 45.5%",
   },
   "&.Mui-selected": {
    // bgcolor: theme.palette.primary.main,
    // color: "white",
    color: "white",
    background: `linear-gradient(135deg, ${alpha(
     theme.palette.primary.main,
     1
    )} 40%, rgba(255, 255, 255, 0.2) 100%),url(https://res.cloudinary.com/caturteguh/image/upload/v1715510168/mrpn/bg-button-theme_cxwxph.jpg)`,
    backgroundSize: "120%",
    backgroundPosition: "right center",
    ".MuiBox-root": {
     bgcolor: theme.palette.primary.main,
     color: "white",
     borderRight: "1px solid white",
    },
    "&:hover": {
     bgcolor: theme.palette.primary.main,
     color: "white",
    },
   },
  },
  [theme.breakpoints.down("md")]: {
   gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.down("sm")]: {
   gridTemplateColumns: "1fr",
  },
 },
];
