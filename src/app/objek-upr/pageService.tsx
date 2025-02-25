import {del, get, post, put} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  GetPenetapanObjectCascadingServiceModel,
  GetPenetapanObjectEntityServiceModel,
  GetPenetapanObjectEntityUsulanServiceModel,
  GetPenetapanObjectIdServiceModel, GetPenetapanObjectNotaDinasServiceModel,
  GetPenetapanObjectShortListServiceModel, UpdateOrCreatePenetapanObjectEntityServiceModel,
  UpdateOrCreatePenetapanObjectLongListAssignObjectServiceModel,
  UpdateOrCreatePenetapanObjectLongListServiceModel, UpdateOrCreatePenetapanObjectNotaDinasServiceModel
} from "@/app/penetapan/objek/pageModel";

export async function doGetPenetapanObject(param: GetPenetapanObjectIdServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreatePenetapanObjectTopic(param: GetPenetapanObjectIdServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdatePenetapanObjectTopic(param: GetPenetapanObjectIdServiceModel) {
  const resp = await put({
    ...param,
    url: "penetapan/object/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeletePenetapanObjectTopic(param: GetPenetapanObjectIdServiceModel) {
  const resp = await del({
    ...param,
    url: "penetapan/object/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCratePenetapanObjectLongList(param: UpdateOrCreatePenetapanObjectLongListServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/longlist/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCratePenetapanObjectLongListAssignObject(param: UpdateOrCreatePenetapanObjectLongListAssignObjectServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/longlist/assignObjek",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPenetapanObjectShortList(param: GetPenetapanObjectShortListServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/shortlist",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPenetapanObjectCascading(param: GetPenetapanObjectCascadingServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/casecading",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPenetapanObjectEntity(param: GetPenetapanObjectEntityServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/getEntitas",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPenetapanObjectEntityUsulan(param: GetPenetapanObjectEntityUsulanServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/usulanUprLinsek/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateOrCreatePenetapanObjectEntityUsulan(param: UpdateOrCreatePenetapanObjectEntityServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/usulanUprLinsek/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetPenetapanObjectNotaDinas(param: GetPenetapanObjectNotaDinasServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/notaDinas/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateOrCreateGetPenetapanObjectNotaDinas(param: UpdateOrCreatePenetapanObjectNotaDinasServiceModel) {
  const resp = await post({
    ...param,
    url: "penetapan/object/notaDinas/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}