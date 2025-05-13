import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { UpdatePossibilityServiceModel } from "./possibilityModel";

export async function doGetPossibility(param: any) {
  const resp = await post({
    ...param,
    url: "penetapan/kriteriaRisiko/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// export async function doCreatePossibility(param: any) {
//   const resp = await post({
//     ...param,
//     url: "exsum/urgensiProyek/add",
//   });
//   if (resp) return Object.assign(new ResponseBaseDto(), resp);
// }

export async function doUpdatePossibility(
  param: UpdatePossibilityServiceModel
) {
  const resp = await put({
    ...param,
    url: "penetapan/kriteriaRisiko/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeletePossibility(param: any) {
  const resp = await del({
    ...param,
    url: "penetapan/kriteriaRisiko/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
