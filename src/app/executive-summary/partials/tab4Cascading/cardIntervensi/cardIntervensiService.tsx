import {post} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  ExsumInterventionProjectReqDto,
  GetExsumInterventionByExsumIdServiceModel, UpdateExsumInterventionByExsumIdServiceModel
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