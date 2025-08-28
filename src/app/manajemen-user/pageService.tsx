import { del, get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetUserServiceModel, UpdateUserServiceModel } from "@/app/manajemen-user/pageModel";

export async function doGetUser(
  param: GetUserServiceModel & { query?: Record<string, any> }
) {
  let url = "config/user/newShow";

  if (param.query) {
    const qs = new URLSearchParams(param.query).toString();
    url += `?${qs}`;
  }

  const resp = await get({
    ...param,
    url,
  });

  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateUser(param: UpdateUserServiceModel) {
  const resp = await post({
    ...param,
    url: "config/user/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateUser(param: UpdateUserServiceModel) {
  const resp = await put({
    ...param,
    url: "config/user/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteUser(param: UpdateUserServiceModel) {
  const resp = await del({
    ...param,
    url: "config/user/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}