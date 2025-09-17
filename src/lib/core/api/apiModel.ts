import { GlobalModalContext } from "../context/globalmodalContext";
import { LoadingContextProps } from "../context/loadingContext";

export class ResponseBaseDto {
  code: number | string | undefined;
  message: string | undefined;
  description?: string | undefined;
  result?: any;
  pageInfo?: any;
  messageError?: string;
  codeSystem?: string;
  redirect_url?: string;
}

export type BaseAPIServiceParam = {
  loadingContext?: LoadingContextProps;
  errorModalContext?: GlobalModalContext;
};

export const API_CODE = {
  success: 200,
};

export const API_CONSTANT = {
  token: "tk",
  functionList: "pf",
  refreshToken: "rt",
  peopleType: "pt",
  user: 'un',
};

export function getToken(): string {
  return sessionStorage.getItem(API_CONSTANT.token) ?? "";
}
