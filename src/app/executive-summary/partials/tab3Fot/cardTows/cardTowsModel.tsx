import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface ExsumKeyword {
  id: number
  value: string
}
export interface ExsumTWOSOptions {
  so: ExsumKeyword[],
  wo: ExsumKeyword[],
  st: ExsumKeyword[],
  wt: ExsumKeyword[]
}
export interface ExsumTWOSDto {
  id: number
  type: string
  value: string
  keywords: ExsumKeyword[]
}

export interface ExsumTWOSResDto {
  tows: ExsumTWOSDto[],
  options: ExsumTWOSOptions,
  isEdit: boolean
}
export const initExsumTWOSResDto: ExsumTWOSResDto = {
  tows: [],
  options: {
    so: [],
    wo: [],
    st: [],
    wt: []
  },
  isEdit: true
}

export interface ExsumTWOSReqDto {
  exsum_id: number
  values: ExsumTWOSDto[]
}
export const initExsumTWOSRequestDto: ExsumTWOSReqDto = {
  exsum_id: 0,
  values: [
    {
      id: 0,
      type: "SO",
      value: "",
      keywords: []
    },
    {
      id: 0,
      type: "WO",
      value: "",
      keywords: []
    },
    {
      id: 0,
      type: "ST",
      value: "",
      keywords: []
    },
    {
      id: 0,
      type: "WT",
      value: "",
      keywords: []
    }
  ]
}

export interface ExsumTWOSReqDtoV2 {
  exsum_id: number
  values: string
}
export const initExsumTWOSRequestDtoV2: ExsumTWOSReqDtoV2 = {
  exsum_id: 0,
  values: ""
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetTOWSByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateTOWSByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumTWOSReqDto;
};

export type UpdateTOWSByExsumIdServiceModelV2 = BaseAPIServiceParam & {
  body: ExsumTWOSReqDtoV2;
};