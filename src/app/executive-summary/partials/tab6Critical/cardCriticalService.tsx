import {post} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  GetCriticalPathByExsumIdServiceModel,
  UpdateCriticalPathByExsumIdServiceModel
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";

export async function doGetCriticalPath(param: GetCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateCriticalPath(param: UpdateCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateCriticalRKPPath(param: UpdateCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/addRkp",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateCriticalPath(param: UpdateCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateCriticalRKPPath(param: UpdateCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/updateRkp",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteCriticalPath(param: UpdateCriticalPathByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/criticalPath/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}