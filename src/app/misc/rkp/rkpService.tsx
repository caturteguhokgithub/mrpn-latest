import { get, post } from "@/lib/core/api/apiBase";
import {
  GetExsumServiceModel,
  GetRkpLocationServiceModel, GetRkpPROPServiceModel, GetRkpROServiceModel, GetRKPSasaranServiceModel,
  GetRKPServiceModel
} from "./rkpServiceModel";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";

export async function doGetRKP(params: GetRKPServiceModel) {
  const resp = await post({
    ...params,
    url: "misc/rkp/list",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetExsum(params: GetExsumServiceModel) {
  const resp = await post({
    ...params,
    url: "exsum/getExsum",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetRkpLocation(params: GetRkpLocationServiceModel) {
  const resp = await post({
    ...params,
    url: "misc/rkp/lokasi",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetKP() {
  const resp = await get({
    url: "misc/rkp/getKP",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetRO(params: GetRkpROServiceModel) {
  const resp = await post({
    ...params,
    url: "misc/rkp/getRO",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetNonRO(params: GetRkpROServiceModel) {
  const resp = await post({
    ...params,
    url: "misc/rkp/getNonRO",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPROP(params: GetRkpPROPServiceModel) {
  const resp = await post({
    ...params,
    url: "misc/rkp/getProp",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetRKPSasaranIndikator(param: GetRKPSasaranServiceModel) {
  const resp = await post({
    ...param,
    url: "misc/rkp/sasaranIndikator",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}