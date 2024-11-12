import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import {MiscMasterListKebijakanRes} from "@/app/misc/master/masterServiceModel";

export interface ExsumRelatedReqCh1Dto {
  src_kebijakan_id:number
  src_kebijakan?: {
    id:number
    name:string
  }
  list:ExsumRelatedReqCh2Dto[]
}
export interface ExsumRelatedReqCh2Dto {
  src_kebijakan_list_id:number
  src_kebijakan_list?:{
    id:number
    value:string
  }
}
export interface ExsumRelatedDto {
  id: number
  exsum_id: number
  value: string
  kebijakan: ExsumRelatedReqCh1Dto[]
}

export const initExsumRelatedDto:ExsumRelatedDto = {
  id: 0,
  exsum_id: 0,
  value: "",
  kebijakan: []
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetRelatedByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateRelatedByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumRelatedDto;
};

export type DeleteRelatedByExsumIdServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};

export interface ExsumRelatedInitState {
  id:number
  value: string
  options: MiscMasterListKebijakanRes[]
}

export const exsumRelatedInitStateData:ExsumRelatedInitState = {
  id:0,
  value:"",
  options:[]
}
