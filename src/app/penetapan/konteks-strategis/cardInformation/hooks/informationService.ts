import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  AddInformasiLainnyaServiceModel,
  GetInformasiLainnyaServiceModel,
  UpdateInformasiLainnyaServiceModel,
} from "./informationModel";

export async function doGetInformation(param: GetInformasiLainnyaServiceModel) {
  const resp = await post({
    ...param,
    // http://127.0.0.1:8000/api/penetapan/upr/informasiLainnya/show/
    url: "penetapan/upr/informasiLingkup/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateInformation(
  param: AddInformasiLainnyaServiceModel
) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/informasiLingkup/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateInformation(
  param: AddInformasiLainnyaServiceModel
) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/informasiLingkup/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteInformation(
  param: UpdateInformasiLainnyaServiceModel
) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/informasiLingkup/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
