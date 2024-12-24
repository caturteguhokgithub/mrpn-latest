import {post, put} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  GetTOWSByExsumIdServiceModel,
  UpdateTOWSByExsumIdServiceModel, UpdateTOWSByExsumIdServiceModelV2
} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";

export async function doGet(param: GetTOWSByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/matriksTows/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreate(param: UpdateTOWSByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/matriksTows/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}


export async function doCreateV2(param: UpdateTOWSByExsumIdServiceModelV2) {
  const resp = await post({
    ...param,
    url: "exsum/matriksTows/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdate(param: UpdateTOWSByExsumIdServiceModel) {
  const resp = await put({
    ...param,
    url: "exsum/matriksTows/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateV2(param: UpdateTOWSByExsumIdServiceModelV2) {
  const resp = await put({
    ...param,
    url: "exsum/matriksTows/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}