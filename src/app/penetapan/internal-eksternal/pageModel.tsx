import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";


export interface doResUrgensi {
    id: number
    exsum_id: number
    value: string
}

export interface doGetReqUrgensiDto {
    uraian_penetapan_object_id: number
    tahun: number | string
}

export interface doAddUrgensiDto {
    uraian_penetapan_object_id: number;
    value: string;
}

export const initUrgensi: doAddUrgensiDto = {
    uraian_penetapan_object_id: 0,
    value: "0"
}

export const initUrgensiShow: doGetReqUrgensiDto = {
    uraian_penetapan_object_id: 0,
    tahun: "0"
}

export type GetUrgensiServiceModel = BaseAPIServiceParam & {
    body: doGetReqUrgensiDto
};

export type UrgensiServiceModel = BaseAPIServiceParam & {
    body: doAddUrgensiDto;
};

export type UrgensiResDto = doResUrgensi;


// Segmen
export interface doResSegmen {
    id: number
    uraian_penetapan_object_id: number
    value: string
}

export interface doGetReqSegmenDto {
    uraian_penetapan_object_id: number
    tahun: number | string
}

export interface doAddSegmenDto {
    uraian_penetapan_object_id: number;
    value: string;
}

export const initSegmen: doAddSegmenDto = {
    uraian_penetapan_object_id: 0,
    value: "0"
}

export const initSegmenShow: doGetReqSegmenDto = {
    uraian_penetapan_object_id: 0,
    tahun: "0"
}

export type GetSegmenServiceModel = BaseAPIServiceParam & {
    body: doGetReqSegmenDto
};

export type SegmenServiceModel = BaseAPIServiceParam & {
    body: doAddSegmenDto;
};

export type SegmenResDto = doResSegmen;

// SWOT
export interface valueSwot {
    id: number
    exsum_swot_id: number
    type: string
    value: string
    desc: string
}

export interface doResSwot {
    id: number
    exsum_id: number
    values: valueSwot[]
}

export interface doGetReqSwotDto {
    uraian_penetapan_object_id: number
    tahun: number | string
}

export const initSwotShow: doGetReqSwotDto = {
    uraian_penetapan_object_id: 0,
    tahun: "0"
}

export type GetSwotServiceModel = BaseAPIServiceParam & {
    body: doGetReqSwotDto
};

export type SwotResDto = doResSwot;