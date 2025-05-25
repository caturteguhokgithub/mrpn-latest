import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

// Komite
// Add
export interface ReqAddMatDamKomite {
    id: number
    uraian_penetapan_object_id: number
    dampak: string
    prioritas: number
}

export const initReqAddMatDamKomite: ReqAddMatDamKomite = {
    id: 0,
    uraian_penetapan_object_id: 0,
    dampak: "",
    prioritas: 0
}

export type CreateReqAddMatDamKomite = BaseAPIServiceParam & {
    body: ReqAddMatDamKomite;
};

// Show
// Response
export interface ResShowMatDamKomite {
    id: number
    uraian_penetapan_object_id: number
    values: ValuesShowMatDamKomite[]
}

export interface ValuesShowMatDamKomite {
    id: number
    upr_matriks_dampak_id: number
    dampak: string
    prioritas: string
    areas: AreasShowMatDamKomite[]
}

export interface AreasShowMatDamKomite {
    id: number
    upr_matriks_dampak_list_id: number
    value: string
    area_levels: AreaLevels[]
}

export interface AreaLevels {
    id: number
    upr_matriks_dampak_list_area_id: number
    level: number
    value: string
}


// UPR
export interface ReqAddMatDamUpr {
    id: number
    matrix_id: number
    lists: List[]
}

export interface List {
    id: number
    value: string
    area: Area[]
}

export interface Area {
    id: number
    level: number
    value: string
}

export const initReqAddMatDamUpr: ReqAddMatDamUpr = {
    id: 0,
    matrix_id: 0,
    lists: [
        {
            id: 0,
            value: "",
            area: []
        }
    ]
}

export type CreateReqAddMatDamUpr = BaseAPIServiceParam & {
    body: ReqAddMatDamUpr;
};

export type UpdateReqMatDamUpr = BaseAPIServiceParam & {
    body: List;
};