import { post } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { ApprovalSeleraServiceModel, CreateSeleraServiceModel } from "./model";

export async function doCreateSelera(param: CreateSeleraServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/seleraRisiko/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetApprovalSelera(param: ApprovalSeleraServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/seleraRisiko/getApproval",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}