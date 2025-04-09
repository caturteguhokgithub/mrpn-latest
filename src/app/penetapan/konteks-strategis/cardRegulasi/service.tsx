import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  CreateUpdateDeleteServiceModel,
  GetByRefIdAndLevelServiceModel,
  GetRegulasiServiceModel
} from "@/app/penetapan/konteks-strategis/cardRegulasi/model";

export async function doGetRegulasi(param: GetRegulasiServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/kerangkaRegulasi/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateRegulasi(param: CreateUpdateDeleteServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/konteks/regulasi/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateRegulasi(param: CreateUpdateDeleteServiceModel) {
  const resp = await put({
    ...param,
    url: "penetapan/konteks/regulasi/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteRegulasi(param: CreateUpdateDeleteServiceModel) {
  const resp = await del({
    ...param,
    url: "penetapan/konteks/regulasi/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}