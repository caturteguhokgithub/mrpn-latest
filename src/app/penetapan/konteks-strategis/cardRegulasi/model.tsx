import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { MiscMasterListPerpresRes } from "@/app/misc/master/masterServiceModel";

export interface doGetReqRegulasi {
  uraian_penetapan_object_id: number
  tahun: number | string
}

export interface RegulasiValueDto {
  id: number
  amanat: string
  perpres: MiscMasterListPerpresRes[]
}

export interface RegulasiExsumDto {
  id: number
  regulasi: RegulasiValueDto[]
}

export interface RegulasiResDto {
  exsum: RegulasiExsumDto
}

export type RegulasiData = RegulasiResDto

export type RegulasiState = RegulasiResDto

// export const initRegulasiState: RegulasiState = {
//   exsum: undefined
// }

export interface GetByRefIdAndLevel {
  id: number
}

export type GetRegulasiServiceModel = BaseAPIServiceParam & {
  body: doGetReqRegulasi
};

export type GetByRefIdAndLevelServiceModel = BaseAPIServiceParam & {
  body: GetByRefIdAndLevel;
};

export type CreateUpdateDeleteServiceModel = BaseAPIServiceParam & {
  body: RegulasiValueDto;
};
