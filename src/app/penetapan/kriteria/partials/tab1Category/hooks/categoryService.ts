import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { CreateCategoryServiceModel } from "./categoryModel";

export async function doGetCategory(param: any) {
  const resp = await post({
    ...param,
    url: "penetapan/object/kategoriRisiko/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateCategory(param: CreateCategoryServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/kategoriRisiko/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// export async function doUpdateCategory(param: any) {
//   const resp = await put({
//     ...param,
//     url: "exsum/urgensiProyek/update",
//   });
//   if (resp) return Object.assign(new ResponseBaseDto(), resp);
// }

// export async function doDeleteCategory(param: any) {
//   const resp = await del({
//     ...param,
//     url: "exsum/urgensiProyek/delete",
//   });
//   if (resp) return Object.assign(new ResponseBaseDto(), resp);
// }
