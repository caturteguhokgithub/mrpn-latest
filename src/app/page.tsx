"use client"

import useAuthorizationVM from "@/app/authorizationVM";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/lib/core/hooks/useHooks";
import {API_CONSTANT} from "@/lib/core/api/apiModel";
import LoadingPage from "@/components/loadingPage";

export default function Home() {

  const router = useRouter()
  const {
    user,
    token,
    setToken,
    menu,
    permission
  } = useAuthContext(state => state)

  const {
    doCheckSSO,
    processAuthUserFromSessionToken
  } = useAuthorizationVM()

  useEffect(() => {
    const token = sessionStorage.getItem(API_CONSTANT.token);
    if (token) {
      setToken({ token: token });
      processAuthUserFromSessionToken(token)
    } else{
      doCheckSSO()
    }
  }, []);

  // useEffect(() => {
  //   if (token) processAuthUserFromSessionToken(token.token)
  // }, [token]);

  useEffect(() => {
    if (user !== undefined && token !== undefined && menu.length > 0) {
      const lastPage = sessionStorage.getItem("last_page")
      if (lastPage){
        return router.replace(lastPage);
      }
      let route = menu[0].route;
      if (menu[0].submenu.length > 0) {
        route = menu[0].submenu[0].route;
      }
      router.replace(route);
    }
  }, [permission]);

  return <LoadingPage />

}