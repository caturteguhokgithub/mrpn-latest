import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

// Urgensi
export interface doResUrgensi {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
}

export interface doGetReqUrgensiDto {
  uraian_penetapan_object_id: number;
  tahun: number | string;
}

export interface doRequestUrgensiDto {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
}

export const initUrgensi: doRequestUrgensiDto = {
  id: 0,
  uraian_penetapan_object_id: 0,
  value: "",
};

export const initUrgensiShow: doGetReqUrgensiDto = {
  uraian_penetapan_object_id: 0,
  tahun: "0",
};

export type GetUrgensiServiceModel = BaseAPIServiceParam & {
  body: doGetReqUrgensiDto;
};

export type RequestUrgensiServiceModel = BaseAPIServiceParam & {
  body: doRequestUrgensiDto;
};

export type UrgensiResDto = doResUrgensi;

// Segmen
export interface doResSegmen {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
}

export interface doGetReqSegmenDto {
  uraian_penetapan_object_id: number;
  tahun: number | string;
}

export interface doRequestSegmenDto {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
}

export const initSegmen: doRequestSegmenDto = {
  id: 0,
  uraian_penetapan_object_id: 0,
  value: "",
};

export const initSegmenShow: doGetReqSegmenDto = {
  uraian_penetapan_object_id: 0,
  tahun: "0",
};

export type GetSegmenServiceModel = BaseAPIServiceParam & {
  body: doGetReqSegmenDto;
};

export type RequestSegmenServiceModel = BaseAPIServiceParam & {
  body: doRequestSegmenDto;
};

export type SegmenResDto = doResSegmen;

// SWOT
export interface valueSwot {
  id: number;
  exsum_swot_id: number;
  type: string;
  value: string;
  desc: string;
}

export interface doResSwot {
  id: number;
  uraian_penetapan_object_id: number;
  tahun: number | string;
  values: valueSwot[];
}

export interface doGetReqSwotDto {
  uraian_penetapan_object_id: number;
  tahun: number | string;
}

export interface doRequestSwotDto {
  id: number;
  uraian_penetapan_object_id: number;
  tahun: number | string;
  values: valueSwot[];
}

export const initSwot: doRequestSwotDto = {
  id: 0,
  uraian_penetapan_object_id: 0,
  tahun: 0,
  values: [],
};

export const initSwotShow: doGetReqSwotDto = {
  uraian_penetapan_object_id: 0,
  tahun: "0",
};

export type GetSwotServiceModel = BaseAPIServiceParam & {
  body: doGetReqSwotDto;
};

export type RequestSwotServiceModel = BaseAPIServiceParam & {
  body: doRequestSwotDto;
};

export type SwotResDto = doResSwot;

// Stakeholder
export interface StakeholderImageResDto {
  id: number;
  uraian_penetapan_objek_id: number;
  file: string;
}
export interface StakeholderImageReqDto {
  uraian_penetapan_objek_id: number;
  file: string;
}

export const initStakeholderShow: StakeholderImageResDto = {
  id: 0,
  uraian_penetapan_objek_id: 0,
  file: "",
};

export interface StakeholderGetReqDto {
  uraian_penetapan_objek_id: number;
}

export type UploadStakeholderServiceModel = BaseAPIServiceParam & {
  body: StakeholderImageReqDto;
};

export type GetStakeholderServiceModel = BaseAPIServiceParam & {
  body: StakeholderGetReqDto;
};

export type StakeholderResDto = StakeholderImageResDto;
