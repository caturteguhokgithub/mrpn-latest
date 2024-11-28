import { BaseAPIServiceParam } from "@/lib/core/api/apiModel"
import { ExsumDto } from "@/lib/core/context/exsumContext";
import {ProjectDefaultDto} from "@/lib/core/context/rkpContext";
import {MiscMasterListProvinsiRes, MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";

export type GetRKPServiceModel = BaseAPIServiceParam & {
    body: {
        tahun:number|string
    };
};

export type OptionsRKP = ProjectDefaultDto

export type GetExsumServiceModel = BaseAPIServiceParam & {
    body: ExsumDto;
};

export type RkpDefaultReqV1Dto = {
    level: string
    ref_id: number
};

export type RkpDefaultReqV2Dto = {
    by: string
    id: number[]
    tahun : number|string
};

export type RkpDefaultReqV3Dto = {
    by: string
    id: number[]
};

export type RkpLocationReqDto = {
    // exsum_id: number[]
    exsum_id: number
    action: string
};

export type GetRkpLocationServiceModel = BaseAPIServiceParam & {
    body: RkpLocationReqDto;
};

export type RODataTable = RoDto & {
    target_0:string
    target_1:string
    target_2:string
    target_3:string
    target_4:string
    satuan_0:string
    satuan_1:string
    satuan_2:string
    satuan_3:string
    satuan_4:string
    anggaran_0:number
    anggaran_1:number
    anggaran_2:number
    anggaran_3:number
    anggaran_4:number
    sumber_anggaran_0:string
    sumber_anggaran_1:string
    sumber_anggaran_2:string
    sumber_anggaran_3:string
    sumber_anggaran_4:string
}

export type RoDetailDto = {
  tahun:number;
  target:string;
  satuan:string;
  anggaran:number;
  sumber_anggaran:string;
}

export interface RoDto {
    id:number
    src_rkp_prop_id:number
    tahun:number
    code:string
    value:string
    kementerian:string
    type_stakeholder:string
    kementrian_id:string
    kementrian:MiscMasterListStakeholderRes|undefined
    pkkr:string
    target:string
    fisik:string
    satuan:string
    lokasi_ro:string
    alokasi:number
    anggaran:number
    sumber_anggaran:string
    type:string
    intervention:boolean
    detail: RoDetailDto[]
    lokasi:MiscMasterListProvinsiRes[]
}
export type GetRkpROServiceModel = BaseAPIServiceParam & {
    body: RkpDefaultReqV2Dto;
};

export interface ProPDto {
    id:number
    src_rkp_kp_id:number
    code:string
    value:string
}
export type GetRkpPROPServiceModel = BaseAPIServiceParam & {
    body: RkpDefaultReqV3Dto;
};

export interface IndikatorDto {
    id:number
    code:string
    value:string
    target_0:string
    target_1:string
    target_2:string
    target_3:string
    target_4:string
    satuan:string
}
export interface SasaranDto {
    id:number
    code:string
    value:string
    indikator: IndikatorDto[]
}
export type RKPSasaranDto = ProjectDefaultDto & {
    sasaran: SasaranDto[]
};

export type GetRKPSasaranServiceModel = BaseAPIServiceParam & {
    body: RkpDefaultReqV1Dto;
};