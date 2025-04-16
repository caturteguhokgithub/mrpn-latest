import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface listsDao {
    id: number
    upr_informasi_lainnya_id: number
    value: string
    file: string
}
export interface doResInformasiLainnya {
    id: number
    uraian_penetapan_object_id: number
    lists: listsDao[]
}

export interface doReqInformasiLainnya {
    id: number
    uraian_penetapan_object_id: number
    lists: listsDao[]
}

export const initAddInformasiLainnyaDto: doReqInformasiLainnya = {
    id: 0,
    uraian_penetapan_object_id: 0,
    lists: [
        {
            id: 0,
            upr_informasi_lainnya_id: 0,
            value: "",
            file: "",
        }
    ]
}

export interface doGetReqInformasiLainnyaDto {
    uraian_penetapan_object_id: number
}

export const initInformasiLainnyaShow: doGetReqInformasiLainnyaDto = {
    uraian_penetapan_object_id: 0,
}

export type GetInformasiLainnyaServiceModel = BaseAPIServiceParam & {
    body: doGetReqInformasiLainnyaDto
};

export type AddInformasiLainnyaServiceModel = BaseAPIServiceParam & {
    body: doReqInformasiLainnya;
};

export type InformasiLainnyaResDto = doResInformasiLainnya;