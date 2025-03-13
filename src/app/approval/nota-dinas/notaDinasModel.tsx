// import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";


export interface GetBuktiDukungResDto {
    id: number
    penetapan_object_id: number
    user_id: number
    file: string
}

export interface GetBuktiDukungDto {
    penetapan_object_id: number
}

export interface BuktiDukungReqDto {
    penetapan_object_id: number;
    user_id: number;
    file: string;
    filename: string;
}

export const initUploadBuktiDukung: BuktiDukungReqDto = {
    penetapan_object_id: 0,
    user_id: 0,
    file: "",
    filename: "",
}

export type GetBuktiDukungServiceModel = BaseAPIServiceParam & {
    body: GetBuktiDukungDto
};

export type UploadBuktiDukungServiceModel = BaseAPIServiceParam & {
    body: BuktiDukungReqDto;
};

export type BuktiDukungResDto = GetBuktiDukungResDto;