import {get, post} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  MiscMasterListKebijakanReq,
  MiscMasterListPerpresReq,
  MiscMasterListProvinsiReq,
  MiscMasterListStakeholderReq,
  MiscMasterRPJMNReq,
  MiscMasterListSumberPendanaanReq,
  MiscMasterListKategoriProyekReq,
  MasterListObjectReq,
  MasterRiskMatrixReq,
  MiscMasterListPerpresCreateReq,
  MiscMasterListPerpresCreateReqService, UpdateLogoStakeholderReq
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

export async function doGetMasterListRpjmn(param: MiscMasterRPJMNReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listRpjmn",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListSumberPendanaan(param: MiscMasterListSumberPendanaanReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listSumberPendanaan",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListlistKategoriProyek(param: MiscMasterListKategoriProyekReq) {
  const resp = await get({
    ...param,
    url: "misc/master/listKategoriProyek",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterListObject(param: MasterListObjectReq) {
  const resp = await post({
    ...param,
    url: "misc/master/objek",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetMasterRiskMatrix(param: MasterRiskMatrixReq) {
  const resp = await get({
    ...param,
    url: "misc/master/matriksRisiko",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateMasterPerpres(param: MiscMasterListPerpresCreateReqService){
  const resp = await post({
    ...param,
    url: "misc/master/addPerpres",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateLogoStakeholder(param: UpdateLogoStakeholderReq){
  const resp = await post({
    ...param,
    url: "misc/master/uploadLogo",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}