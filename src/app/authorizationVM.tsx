import { get, post } from "@/lib/core/api/apiBase";
import {
 API_CODE,
 API_CONSTANT,
 ResponseBaseDto,
} from "@/lib/core/api/apiModel";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
 useAuthContext,
 useGlobalModalContext,
 useLoading,
} from "@/lib/core/hooks/useHooks";
import { SelectChangeEvent } from "@mui/material";
import {AuthResDto, Menu, TokenPayload, UserDto} from "@/lib/core/context/authContext";

const useAuthorizationVM = () => {
 const {
  user,
  setUser,
  token,
  setToken,
  menu,
  setMenu,
  permission,
  setPermission,
   setImmutablePermission
 } = useAuthContext((state) => state);

 const URL_SSO = process.env.NEXT_PUBLIC_SSO_URL_API;
 const router = useRouter();
 const loadingContext = useLoading();
 const errorModalContext = useGlobalModalContext();

 const [credential, setCredential] = useState<{
  email: string;
  password: string;
 }>({
  email: "",
  password: "",
 });
 const [userDropdown, setUserDropdown] = React.useState("");
 const [modalErrorLogin, setModalErrorLogin] = useState<boolean>(false);

 const [isLoading, setIsLoading] = useState(false);

 const handleChangeUser = (event: SelectChangeEvent) => {
  const userDropdownId = event.target.value;
  setUserDropdown(userDropdownId);
 };

 async function doCheckSSO() {
  const resp = await get({
   body: {},
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/sso",
  });
  if (resp) {
   Object.assign(new ResponseBaseDto(), resp);
   if (resp.code == API_CODE.success) {
    let result: AuthResDto = resp.result;
    return processStoreUserAuthentication(result.access_token.token, result.user);
   }
  }
  return router.replace("/login");
 }

 async function doLogin() {
  setIsLoading(true);

  if (userDropdown === "1") {
   router.replace(URL_SSO ?? "");
   setIsLoading(false);
   return;
  }

  const response = await post({
   body: {
    email: credential.email,
    password: credential.password,
   },
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/login",
  });
  if (response) {
   Object.assign(new ResponseBaseDto(), response);
   if (response.code == API_CODE.success) {
    let result: AuthResDto = response.result;
    sessionStorage.setItem(API_CONSTANT.token, result.access_token.token)
    setIsLoading(false);
    return router.replace("/");
   }
  }

  setModalErrorLogin(true);
  setIsLoading(false);
 }

 async function doLogout() {
  const response = await get({
   body: {},
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/logout",
  });
  if (response) {
   Object.assign(new ResponseBaseDto(), response);
   if (response.code == API_CODE.success) {
    sessionStorage.clear();
    setUser(undefined);
    setToken(undefined);
    setMenu([]);
    setPermission([]);
    router.replace("/login");
   }
  }
 }

 async function getMenuConfig() {
  const response = await get({
   body: {},
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/menuConfig",
  });
  if (response) {
   Object.assign(new ResponseBaseDto(), response);
   if (response.code == API_CODE.success) {
    let result: Menu[] = response.result;
    return result;
   }
  }
  return [];
 }

 async function getPermission() {
  const response = await get({
   body: {},
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/permission",
  });
  if (response) {
   Object.assign(new ResponseBaseDto(), response);
   if (response.code == API_CODE.success) {
    let result: string[] = response.result;
    return result;
   }
  }
  return [];
 }

 async function getCurrentUserData() {
  const response = await get({
   body: {},
   loadingContext: loadingContext,
   errorModalContext: errorModalContext,
   url: "auth/me",
  });

  if (response) {
   Object.assign(new ResponseBaseDto(), response);
   if (response.code == API_CODE.success) {
    let result: UserDto = response.result;
    if (result !== null) {

     // const menu = await getMenuConfig();
     // setMenu(menu);
     //
     // const permission = await getPermission();
     // setPermission(permission);

     return result
    }
   }
   return undefined
  }

 }

 async function processAuthUserFromSessionToken(token:string){
  const user = await getCurrentUserData()
  if (user) {
   processStoreUserAuthentication(token, user)
   return true
  }else{
   sessionStorage.removeItem(API_CONSTANT.token)
   return false
  }
 }

 async function processStoreUserAuthentication(token:string, user:UserDto) {
  sessionStorage.setItem(API_CONSTANT.token, token);
  setUser(user);
  setToken({token:token});
  const menu = await getMenuConfig();
  setMenu(menu);
  const permission = await getPermission();
  setPermission(permission);
  setImmutablePermission(permission);
 }

 return {
  userDropdown,
  setUserDropdown,
  handleChangeUser,
  credential,
  setCredential,
  doCheckSSO,
  doLogin,
  doLogout,
  modalErrorLogin,
  setModalErrorLogin,
  isLoading,
  processAuthUserFromSessionToken
 };
};

export default useAuthorizationVM;
