import { get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetSegmenServiceModel, GetStakeholderServiceModel, GetSwotServiceModel, GetUrgensiServiceModel, RequestSegmenServiceModel, RequestSwotServiceModel, RequestUrgensiServiceModel, UploadStakeholderServiceModel } from "./pageModel";

// Urgensi
export async function doGetUrgensi(param: GetUrgensiServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/urgensiProyek/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateUrgensi(param: RequestUrgensiServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/urgensiProyek/update"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateUrgensi(param: RequestUrgensiServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/urgensiProyek/add"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// Segmen
export async function doGetSegmen(param: GetSegmenServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/penerimaManfaat/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateSegmen(param: RequestSegmenServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/penerimaManfaat/add"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateSegmen(param: RequestSegmenServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/penerimaManfaat/update"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// Swot
export async function doGetSwot(param: GetSwotServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/swot/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateSwot(param: RequestSwotServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/swot/add"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateSwot(param: RequestSwotServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/swot/update"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// Stakeholder
export async function doGetStakeholder(param: GetStakeholderServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/stakeholderMapping/show",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUnggahStakeholder(param: UploadStakeholderServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/stakeholderMapping/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// CP
export async function doGetCp(param: GetStakeholderServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/criticalPath/showFile",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUnggahCp(param: UploadStakeholderServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/criticalPath/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}