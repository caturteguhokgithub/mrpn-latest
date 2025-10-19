import { post } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  DeleteIndicationByIdServiceModel,
  GetIndicationByExsumIdServiceModel,
  UpdateIndicationByIdServiceModel
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";

export async function doGetIndication(param: GetIndicationByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/indikasiRisiko/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateIndication(param: UpdateIndicationByIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/indikasiRisiko/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateIndication(param: UpdateIndicationByIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/indikasiRisiko/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteIndication(param: DeleteIndicationByIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/indikasiRisiko/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetRefIndication(param: GetIndicationByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/profilrisiko/overview",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
