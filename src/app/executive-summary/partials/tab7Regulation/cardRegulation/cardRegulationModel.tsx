import {MiscMasterListPerpresRes, MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";
import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";

export interface ExsumRegulationResDto {
  id:number
  tahun:number[]
  exsum_id:number
  amanat:string
  perpres:MiscMasterListPerpresRes[]
  entitas: MiscMasterListStakeholderRes[]
}

export interface ExsumRegulationDto {
  id:number
  tahun:number[]
  exsum_id:number
  amanat:string
  perpres_state:MiscMasterListPerpresRes|undefined
  perpres:{id:number}[]
  stakeholder: MiscMasterListStakeholderRes[]
  stakeholder_id:number[]
}
export const initExsumRegulationDto:ExsumRegulationDto = {
  id: 0,
  tahun:[],
  exsum_id: 0,
  amanat: "",
  stakeholder: [],
  stakeholder_id: [],
  perpres_state: undefined,
  perpres: [],
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetRegulationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type CreateRegulationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumRegulationDto;
};

export type DeleteRegulationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};