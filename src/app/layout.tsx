import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import { Metadata } from "next";
import { CssBaseline } from "@mui/material";

import "./globals.css";
import "./styles.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { RKPProvider } from "@/lib/core/provider/rkpProvider";
import { defaultInitRkpState } from "@/lib/core/context/rkpContext";
import { AuthProvider } from "@/lib/core/provider/authProvider";
import { defaultInitAuthState } from "@/lib/core/context/authContext";
import {defaultPenetapanState} from "@/lib/core/context/penetapanContext";
import {PenetapanProvider} from "@/lib/core/provider/penetapanProvider";
// import Head from "next/head";

export const metadata: Metadata = {
 title: "MRPN 2024",
 icons: {
  icon: [
   {
    media: "(prefers-color-scheme: light)",
    url: "https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png",
    href:
     "https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png",
   },
   {
    media: "(prefers-color-scheme: dark)",
    url: "https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png",
    href:
     "https://res.cloudinary.com/caturteguh/image/upload/v1726181357/mrpn/logo-pranala-cmp_oly6uk.png",
   },
  ],
 },
};

export default function RootLayout(props: any) {
 return (
  <AuthProvider state={defaultInitAuthState}>
   <RKPProvider state={defaultInitRkpState}>
    <html lang="en">
     <body>
      <AppRouterCacheProvider>
       <ThemeProvider theme={theme}>
        <CssBaseline />
         <PenetapanProvider state={defaultPenetapanState}>
          {props.children}
         </PenetapanProvider>
       </ThemeProvider>
      </AppRouterCacheProvider>
     </body>
    </html>
   </RKPProvider>
  </AuthProvider>
 );
}
