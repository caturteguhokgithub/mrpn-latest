import {get, post} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  MiscMasterListKebijakanReq,
  MiscMasterListPerpresReq,
  MiscMasterListProvinsiReq, MiscMasterListStakeholderReq
} from "@/app/misc/master/masterServiceModel";

export async function doGetMasterListKebijakan(param: MiscMasterListKebijakanReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listKebijakan",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListProvinsi(param: MiscMasterListProvinsiReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listProvinsi",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListPerpres(param: MiscMasterListPerpresReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listPerpres",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListStakeholder(param: MiscMasterListStakeholderReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listStakeholder",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}