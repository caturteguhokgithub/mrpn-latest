import { get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetBuktiDukungServiceModel, UploadBuktiDukungServiceModel } from "./notaDinasModel";

export async function doGetBuktiDukung(param: GetBuktiDukungServiceModel) {
    const resp = await get({
        ...param,
        url: `penetapan/object/buktiDukung/show?penetapan_object_id=${param.body.penetapan_object_id}`
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doUnggahBuktiDukung(param: UploadBuktiDukungServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/object/buktiDukung/add",
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
