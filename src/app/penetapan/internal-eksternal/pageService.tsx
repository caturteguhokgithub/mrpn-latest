import { get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetSegmenServiceModel, GetSwotServiceModel, GetUrgensiServiceModel } from "./pageModel";

export async function doGetUrgensi(param: GetUrgensiServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/urgensiProyek/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetSegmen(param: GetSegmenServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/penerimaManfaat/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

export async function doGetSwot(param: GetSwotServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/upr/swot/show"
    });
    if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// export async function doUnggahBuktiDukung(param: UploadBuktiDukungServiceModel) {
//     const resp = await post({
//         ...param,
//         url: "penetapan/object/buktiDukung/add",
//     });
//     if (resp) return Object.assign(new ResponseBaseDto(), resp);
// }
