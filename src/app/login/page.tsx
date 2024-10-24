"use client";
// import {router} from "next/client";

import PageLoginView from "@/app/login/pageLoginView";
import {useEffect} from "react";

const ENV = process.env.NEXT_PUBLIC_ENV;
const URL_SSO = process.env.NEXT_PUBLIC_SSO_URL_API;

export default function PageLogin() {
  useEffect(() => {
    if (ENV !== 'dev') {
      // router.replace(URL_SSO ?? "https://indpis.bappenas.go.id")
      window.location.replace(URL_SSO ?? "https://indpis.bappenas.go.id")
    }
  }, []);
  return <PageLoginView />
}
