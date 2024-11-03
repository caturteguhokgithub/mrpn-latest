import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";
import {ExsumSWOTValuesDto} from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotModel";
import {RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {ExsumTWOSDto} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";

export const COORDINATOR = "Entitas Koordinator"
export const MAIN = "Entitas Utama"

export interface IndicationReqDto {
  keterangan:string
  swot:number[]
}
export interface StakeholderReqDto {
  type:string
  id:number
}
export interface ExsumIndicationValueReqDto {
  tahun:number
  perlakuan_risiko:string
  rincian_output_id:number
  stakeholder:StakeholderReqDto[]
}
export interface ExsumIndicationReqDto {
  id:number,
  exsum_id:number
  swot_id:number
  indikasi_risiko:string
  kategori_risiko:string
  values:ExsumIndicationValueReqDto[]
}

export interface StakeholderResGroupDto {
  [key: string]: StakeholderResDto[]
}
export type StakeholderResDto = MiscMasterListStakeholderRes & {
  group:{
    "type" : string
  }
}
export interface ExsumIndicationValueRes {
  id:number
  tahun:number
  perlakuan_risiko:string
  ro:RoDto
  stakeholder:StakeholderResDto[]
  groupStakeholder:StakeholderResGroupDto
}
export interface ExsumIndicationResDto {
  id:number,
  exsum_id:number
  jenis:string
  indikasi_risiko:string
  kategori_risiko:string
  perlakuan:ExsumIndicationValueRes[]
  tows?:ExsumTWOSDto
}

export interface IndicationState {
  keterangan:string
  keyword_swot:ExsumSWOTValuesDto[]
}
export interface OthersEntityState {
  type:string
  entity:MiscMasterListStakeholderRes[]
}
export interface ExsumIndicationStateValue {
  id:number
  tahun:number
  perlakuan_risiko:string
  rincian_output:RoDto|undefined
  stakeholderMultiple:MiscMasterListStakeholderRes[]
  stakeholder:{
    coordinator:MiscMasterListStakeholderRes|undefined
    main:MiscMasterListStakeholderRes[]
    others:OthersEntityState[]
  }
}
export interface ExsumIndicationState {
  id:number
  tows:ExsumTWOSDto|undefined
  indikasi_risiko:string
  kategori_risiko:string
  values:ExsumIndicationStateValue[]
}

export const initStateExsumIndication:ExsumIndicationState = {
  id: 0,
  tows: undefined,
  indikasi_risiko: "",
  kategori_risiko: "",
  values: [

  ]
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetIndicationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateIndicationByIdServiceModel = BaseAPIServiceParam & {
  body: ExsumIndicationReqDto;
};

export type DeleteIndicationByIdServiceModel = BaseAPIServiceParam & {
  body: {id:number};
};