import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  GetByRefIdAndLevelServiceModel,
} from "@/app/penetapan/konteks-strategis/cardIndikasiSasaran/model";
import { GetPenetapanLevelKebijakanByIDServiceModel } from "./model";

export async function doGetLevelKebijakan(param: GetPenetapanLevelKebijakanByIDServiceModel) {
  const resp = await post({
    ...param,
    url: "misc/master/kebijakanObjek",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}