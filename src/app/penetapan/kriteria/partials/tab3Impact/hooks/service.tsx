import { post } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { CreateReqAddMatDamKomite, CreateReqAddMatDamUpr, UpdateReqMatDamUpr } from "./model";

export async function doCreateMatDamKomite(param: CreateReqAddMatDamKomite) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampak/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateMatDamKomite(param: CreateReqAddMatDamKomite) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampak/update",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doShowMatDamKomite(param: any) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampak/show",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteMatDamKomite(param: CreateReqAddMatDamKomite) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampak/delete",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doCreateMatDamUpr(param: CreateReqAddMatDamUpr) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampakLevel/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUpdateMatDamUpr(param: UpdateReqMatDamUpr) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampakLevel/update",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doDeleteMatDamUpr(param: CreateReqAddMatDamUpr) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/matriksDampakLevel/delete",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}