"use client";

// import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

// const poppins = Poppins({
//  weight: ["300", "400", "500", "600", "700"],
//  subsets: ["latin"],
//  display: "swap",
// });

declare module "@mui/material/styles" {
  interface Palette {
    blueMrpn: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      darker: string;
    };
  }
  interface PaletteOptions {
    blueMrpn?: {
      light?: string;
      main?: string;
      dark?: string;
      contrastText?: string;
      darker?: string;
    };
  }
}

const theme = createTheme({
  typography: {
    //   fontFamily: "'Poppins', sans-serif",
    fontFamily: '"Inter", sans-serif',
    caption: {
      fontFamily: "'Open Sans', sans-serif",
    },
  },
  palette: {
    primary: {
      main: "#1880C9",
      light: "#F4F5F7",
      dark: "#05004E",
    },
    secondary: {
      main: "#1880C9",
      dark: "#1f2937",
      light: "#F6B236",
    },
    blueMrpn: {
      dark: "#2E6FAD",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          maxHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#1880C9",
          //  backgroundColor: "#1f2937",
          color: "#05004E",
          transition: "all 300ms ease",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
