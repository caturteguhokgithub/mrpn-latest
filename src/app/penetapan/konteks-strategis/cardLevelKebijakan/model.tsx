import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface PenetapanLevelKebijakanResDto {
    level: string
    nama: string
    sasaran: sasaranDto[]
}

export interface indikatorDto {
    value: string
    target: string
    satuan: string
}

export interface sasaranDto {
    value: string
    indikator: indikatorDto[]
}

export interface GetPenetapanLevelKebijakanByID {
    objek_id: number
}

export type GetPenetapanLevelKebijakanByIDServiceModel = BaseAPIServiceParam & {
    body: GetPenetapanLevelKebijakanByID;
};