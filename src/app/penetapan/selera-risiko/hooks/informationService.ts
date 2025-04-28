import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { AddInformasiLainnyaServiceModel, DeleteListInformasiLainnyaServiceModel } from "./informationModel";

export async function doGetInformation(param: any) {
  const resp = await post({
    ...param,
    // http://127.0.0.1:8000/api/penetapan/upr/informasiLainnya/show/
    url: "penetapan/upr/informasiLainnya/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateInformation(param: AddInformasiLainnyaServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/upr/informasiLainnya/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateInformation(param: AddInformasiLainnyaServiceModel) {
  const resp = await put({
    ...param,
    url: "penetapan/upr/informasiLainnya/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteInformation(param: any) {
  const resp = await del({
    ...param,
    url: "penetapan/upr/informasiLainnya/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteListInformation(param: DeleteListInformasiLainnyaServiceModel) {
  const resp = await del({
    ...param,
    url: "penetapan/upr/informasiLainnya/deleteList",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
