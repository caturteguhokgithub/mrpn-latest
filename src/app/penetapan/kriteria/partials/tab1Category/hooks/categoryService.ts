import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { CreateCategoryServiceModel, CreateOrUpdateMasterCategoryServiceModel, DeleteSubCategoryServiceModel, doMasterKategori, UpdateSubCategoryServiceModel } from "./categoryModel";

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

export async function doGetMasterCategory() {
  const resp = await post({
    url: "penetapan/object/masterKategori/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateMasterCategory(param: CreateOrUpdateMasterCategoryServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/masterKategori/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateMasterCategory(param: CreateOrUpdateMasterCategoryServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/masterKategori/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateSubCategory(param: UpdateSubCategoryServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/kategoriRisiko/updateSubKategori",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteSubCategory(param: UpdateSubCategoryServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/kategoriRisiko/deleteSubkategori",
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
