import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  CreateUpdateDeleteServiceModel,
  GetRegulasiServiceModel,
  RequestRegulasiServiceModel
} from "@/app/penetapan/konteks-strategis/cardRegulasi/model";

export async function doGetRegulasi(param: GetRegulasiServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/kerangkaRegulasi/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteRegulasi(param: RequestRegulasiServiceModel) {
  const resp = await del({
    ...param,
    url: "penetapan/upr/kerangkaRegulasi/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateRegulasi(param: RequestRegulasiServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/kerangkaRegulasi/add"
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateRegulasi(param: RequestRegulasiServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/kerangkaRegulasi/update"
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}