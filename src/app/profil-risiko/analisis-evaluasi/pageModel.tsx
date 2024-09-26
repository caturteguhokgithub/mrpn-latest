import {ProfileRiskDto} from "@/app/profil-risiko/identifikasi/pageModel";
import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {MasterRiskMatrixRes} from "@/app/misc/master/masterServiceModel";
import {RiskOverviewData} from "@/app/profil-risiko/overview/pageModel";

export interface RiskAnalysisValueDto {
  id: number
  profil_risiko_id: number
  src_matriks_risiko_id: number
  triwulan: number
  matriks: MasterRiskMatrixRes
}

export type RiskAnalysisDto = ProfileRiskDto & {
  analisis: RiskAnalysisValueDto
}
export interface RiskAnalysisResDto {
  dataTable:RiskOverviewData[]
  profilRisiko: RiskAnalysisDto[]
  options: ProfileRiskDto[]
}
export type GetRiskAnalysisServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}

export interface RiskAnalysisAddStateDto {
  id:number
  profil_risiko: ProfileRiskDto|undefined
  src_matriks_risiko: MasterRiskMatrixRes|undefined
  triwulan: number
}
export const initRiskAnalysisAddState:RiskAnalysisAddStateDto = {
  id: 0,
  profil_risiko: undefined,
  src_matriks_risiko: undefined,
  triwulan: 0
}

export interface RiskAnalysisAddReqDto {
  id:number
  profil_risiko_id: number
  src_matriks_risiko_id: number
  triwulan: number
}

export type UpdateOrCreateRiskAnalysisServiceModel = BaseAPIServiceParam & {
  body: RiskAnalysisAddReqDto
}
