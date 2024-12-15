import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {RODataTable, RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {MasterRiskMatrixRes, MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";
import {RiskAnalysisDto} from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import {RiskOverviewData} from "@/app/profil-risiko/overview/pageModel";

export type RiskTreatmentDto = RiskAnalysisDto & {
  perlakuan: RiskTreatmentValueDto
}

export interface RiskTreatmentValueDto {
  id: number
  profil_risiko_id: number
  keputusan: string
  keterangan_risiko: string
  start_date: string
  end_date: string
  triwulan: number
  bukti_dukung: string
  matriks: MasterRiskMatrixRes
  penanggung_jawab: MiscMasterListStakeholderRes
  rincian_output: RoDto[]
}

export interface RiskTreatmentResDto {
  dataTable:RiskOverviewData[]
  profilRisiko: RiskTreatmentDto[]
  optionProfilRisiko: RiskAnalysisDto[]
  optionRo: RoDto[]
}

export type GetRiskTreatmentServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}

export interface RiskTreatmentReqDto {
  id: number
  profil_risiko_id: number
  keputusan: string
  ro: number[]
  keterangan_risiko: string
  start_date: string
  end_date: string
  src_stakeholder_id: number
  src_matriks_risiko_id: number
  triwulan: number
}

export type UpdateOrCreateRiskTreatmentServiceModel = BaseAPIServiceParam & {
  body: RiskTreatmentReqDto
}

export interface RiskTreatmentState {
  id: number
  profil_risiko: RiskAnalysisDto|undefined
  keputusan: string
  target: string
  keterangan_risiko:string
  ro: RoDto[]
  start_date: string
  end_date: string
  src_stakeholder: MiscMasterListStakeholderRes|undefined
  src_matriks_risiko: MasterRiskMatrixRes|undefined
  triwulan: number
}

export const initRiskTreatmentState:RiskTreatmentState = {
  id: 0,
  profil_risiko: undefined,
  keputusan: "",
  target: "",
  ro: [],
  start_date: "2024-10-10",
  end_date: "2024-10-10",
  src_stakeholder: undefined,
  src_matriks_risiko: undefined,
  triwulan: 0,
  keterangan_risiko: ""
}
