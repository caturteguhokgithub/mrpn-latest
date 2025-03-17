import { get, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import { GetKategoriRisikoServiceModel } from "./pageModel";

export async function doGetKategoriRisiko(param: GetKategoriRisikoServiceModel) {
    const resp = await post({
        ...param,
        url: "penetapan/object/kategoriRisiko/show"
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
