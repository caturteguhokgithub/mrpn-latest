import { post } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetRiskOverviewServiceModel } from "@/app/profil-risiko/overview/pageModel";
import { GetPenetapanObjectEntityUsulanServiceModel, ReqApprovalPengesahanServiceModel } from "@/app/penetapan/objek/pageModel";

export async function doGetRiskOverview(param: GetRiskOverviewServiceModel) {
  const resp = await post({
    ...param,
    url: "profilRisiko/overview/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetApproval(param: GetPenetapanObjectEntityUsulanServiceModel) {
  const resp = await post({
    ...param,
    url: "profilRisiko/getApproval",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateApproval(param: ReqApprovalPengesahanServiceModel) {
  const resp = await post({
    ...param,
    url: "profilRisiko/approve",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}