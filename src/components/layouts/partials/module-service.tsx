import { get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { DtoSwitchApp, switchApp } from "./module-model";

export async function doGetListApp() {
    const resp = await get({
        url: "emonev/getListApp",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doSwitchApp(param: switchApp) {
    const resp = await post({
        ...param,
        url: "emonev/switchApp",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}