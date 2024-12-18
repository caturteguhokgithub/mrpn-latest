import { decryptValue, encryptValue } from "../helpers/aesCryptoHelpers";
import { MODAL_TYPES } from "../provider/globalmodalProvider";
import {
  API_CODE,
  API_CONSTANT,
  BaseAPIServiceParam,
  getToken,
  ResponseBaseDto,
} from "./apiModel";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL_API;
const IS_ENCRYPT = false;
const REFRESH_TOKEN = { refreshing: false };

type APIParam = BaseAPIServiceParam & {
  url: string;
  usingBase?: boolean | undefined;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  body?: Object;
  headers?: any;
};

export const del = (param: APIParam) => {
  return fetchAPI({
    body: param.body,
    headers: param.headers,
    url: param.url,
    method: "POST",
    usingBase: param.usingBase ?? true,
    loadingContext: param.loadingContext,
    errorModalContext: param.errorModalContext,
  });
};

export const put = (param: APIParam) => {
  return fetchAPI({
    body: param.body,
    headers: param.headers ?? {},
    url: param.url,
    method: "POST",
    usingBase: param.usingBase ?? true,
    loadingContext: param.loadingContext,
    errorModalContext: param.errorModalContext,
  });
};

export const post = (param: APIParam) => {
  return fetchAPI({
    body: param.body,
    headers: param.headers ?? {},
    url: param.url,
    method: "POST",
    usingBase: param.usingBase ?? true,
    loadingContext: param.loadingContext,
    errorModalContext: param.errorModalContext,
  });
};

export const get = async (param: APIParam) => {
  return fetchAPI({
    headers: param.headers ?? {},
    url: param.url,
    method: "GET",
    usingBase: param.usingBase ?? true,
    loadingContext: param.loadingContext,
    errorModalContext: param.errorModalContext,
  });
};

const fetchAPI = async (param: APIParam) => {
  if (param.loadingContext != undefined) param.loadingContext.setLoading(true);
  if (!param.url.includes("sso") && !param.url.includes("login") && getToken()) {
    let token = "Bearer " + getToken();
    param.headers = { authorization: token, ...param.headers };
  }
  let headers = {
    "content-type": "application/json",
    ...param.headers,
    "app-version": "0.0.1"
  };

  let fetchParam: any;

  let stringBody = JSON.stringify(param.body);
  if (param.method === "GET") {
    fetchParam = {
      method: param.method,
      headers,
    };
  } else {
    fetchParam = {
      method: param.method,
      body: IS_ENCRYPT ? encryptValue(stringBody) : stringBody,
      headers,
    };
  }

  const response = await fetch(
    param.usingBase ? API_BASE + param.url : param.url,
    fetchParam
  );

  if (response.status == 503){
    if (param.errorModalContext != undefined) {
      param.errorModalContext.showModal(MODAL_TYPES.ERROR_MODAL, {
        code: 503,
        message: "",
      });
    }
    if (param.loadingContext != undefined) param.loadingContext.setLoading(false);
    return null;
  }

  if (!response.ok && response.status != 400 && response.status != 401){
    if (param.loadingContext != undefined) param.loadingContext.setLoading(false);
    return null
  }

  let responseJson = await mappingResponse(response);
  if (param.loadingContext != undefined) param.loadingContext.setLoading(false);

  // flow refresh token
  let response2 = null;
  async function fetchRetry() {
    if (param && param.headers) {
      delete param.headers.authorization;
    }
    response2 = await fetchAPI(param);
    if (response2 != null) {
      responseJson = response2;
    }
  }
  // TODO : HANDLE REFRESH TOKEN
  if (response.status == 401) {
    // if (REFRESH_TOKEN.refreshing == false) {
    //   REFRESH_TOKEN.refreshing = true;
    //   let refreshToken = sessionStorage.getItem(API_CONSTANT.refreshToken);
    //   const rResponse = await fetch(API_BASE + "/login/refreshToken", {
    //     method: "POST",
    //     body: IS_ENCRYPT
    //       ? encryptValue(JSON.stringify({ refreshToken }))
    //       : JSON.stringify({ refreshToken }),
    //     headers,
    //   });
    //   let rResponseJson = await mappingResponse(rResponse);
    //   if (rResponseJson.code == API_CODE.success) {
    //     sessionStorage.setItem(
    //       API_CONSTANT.token,
    //       rResponseJson.result?.token!
    //     );
    //     sessionStorage.setItem(
    //       API_CONSTANT.refreshToken,
    //       rResponseJson.result.refreshToken!
    //     );
    //     REFRESH_TOKEN.refreshing = false;
    //     await fetchRetry();
    //   }
    // } else {
    //   while (REFRESH_TOKEN.refreshing == true) {
    //     await new Promise<void>((resolve) =>
    //       setTimeout(function () {
    //         resolve();
    //       }, 1000)
    //     );
    //   }
    //   await fetchRetry();
    // }
  }
  // flow refresh token

  if (response.ok || response2 != null) {
    if (param.errorModalContext != undefined) {
      if (responseJson.code != API_CODE.success) {
        // param.errorModalContext.setResponseBaseDto({
        //   code: responseJson.code,
        //   message: responseJson.message,
        // });
        // param.errorModalContext.setModalShow(true);
      }
    }
    return responseJson;
  } else {
    if (param.errorModalContext != undefined) {
      param.errorModalContext.showModal(MODAL_TYPES.ERROR_MODAL, {
        code: responseJson.code
          ? responseJson.code
          : response.status,
        message:
          responseJson.message ||
          responseJson.messageError ||
          response.statusText,
      });
    }
    return null;
  }
};

export async function mappingResponse(response: Response): Promise<ResponseBaseDto> {
  let decrypted = null;
  let responseText = await response.text();
  
  if (IS_ENCRYPT) {
    try {
      decrypted = decryptValue(responseText);
    } catch (error) {
      decrypted = responseText;
    }
    return Object.assign(new ResponseBaseDto(), JSON.parse(decrypted)); 
  }
  return Object.assign(new ResponseBaseDto(), JSON.parse(responseText)); 
}
