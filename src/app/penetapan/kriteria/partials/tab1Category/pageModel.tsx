import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";


export interface subKategoriRisiko {
    id: number
    penetapan_kategori_risiko_id: number
    value: string
    desc: string
}

export interface doResKategoriRisiko {
    id: number
    uraian_penetapan_object_id: number
    value: string
    prioritas: string
    desc: string
    sub_kategori_risiko: subKategoriRisiko
}

export interface doGetReqKategoriRisikoDto {
    uraian_penetapan_object_id: number
}

export type GetKategoriRisikoServiceModel = BaseAPIServiceParam & {
    body: doGetReqKategoriRisikoDto
};

export type ResponseGet = doResKategoriRisiko;