import { post } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  CreateNonRoServiceModel,
  GetExsumInterventionByExsumIdServiceModel,
  UpdateById,
  UpdateExsumInterventionByExsumIdServiceModel,
  UpdateV2ExsumIntervention
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";

export async function doGetIntervention(param: GetExsumInterventionByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/intervensi/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateIntervention(param: UpdateExsumInterventionByExsumIdServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/intervensi/add",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateInterventionNonRo(param: CreateNonRoServiceModel) {
  const resp = await post({
    ...param,
    url: "exsum/intervensi/addNonRO",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteInterventionOnlyRO(param: UpdateById) {
  const resp = await post({
    ...param,
    url: "exsum/intervensi/delete",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateInterventionOnlyRO(param: UpdateV2ExsumIntervention) {
  const resp = await post({
    ...param,
    url: "exsum/intervensi/update",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}