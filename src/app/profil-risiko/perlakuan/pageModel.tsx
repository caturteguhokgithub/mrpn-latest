import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { MasterRiskMatrixRes, MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { RiskAnalysisDto } from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";

export type RiskTreatmentDto = RiskAnalysisDto & {
  perlakuan: RiskTreatmentReqDto & {
    perlakuan_data: Perlakuan[]
    matriks: MasterRiskMatrixRes | undefined
  }
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
  target_triwulan_1: string
  satuan_triwulan_1: string
  target_triwulan_2: string
  satuan_triwulan_2: string
  target_triwulan_3: string
  satuan_triwulan_3: string
  target_triwulan_4: string
  satuan_triwulan_4: string
}

export interface RiskTreatmentResDto {
  dataTable: RiskOverviewData[]
  profilRisiko: RiskTreatmentDto[]
  optionProfilRisiko: RiskAnalysisDto[]
  optionRo: RoDto[]
}

export type GetRiskTreatmentServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}

// export interface RiskTreatmentReqDto {
//   id: number
//   profil_risiko_id: number
//   keputusan: string
//   ro: number[]
//   keterangan_risiko: string
//   start_date: string
//   end_date: string
//   src_stakeholder_id: number
//   src_matriks_risiko_id: number
//   triwulan: number
//   target_triwulan_1: string
//   satuan_triwulan_1: string
//   target_triwulan_2: string
//   satuan_triwulan_2: string
//   target_triwulan_3: string
//   satuan_triwulan_3: string
//   target_triwulan_4: string
//   satuan_triwulan_4: string
// }

export interface RiskTreatmentReqDto {
  id: number
  profil_risiko_id: number
  profil_risiko: RiskAnalysisDto | undefined
  src_matriks_risiko_id: number
  src_matriks_risiko: MasterRiskMatrixRes | undefined
  keputusan: string
  perlakuan: Perlakuan[] | string
}

export interface Perlakuan {
  id: number
  keterangan_risiko: string
  target_triwulan_1: string
  satuan_triwulan_1: string
  target_triwulan_2: string
  satuan_triwulan_2: string
  target_triwulan_3: string
  satuan_triwulan_3: string
  target_triwulan_4: string
  satuan_triwulan_4: string
  ro: number[],
  rincian_output: RoDto[] | undefined,
  start_date: string
  end_date: string
  src_stakeholder_id: number
  src_stakeholder: MiscMasterListStakeholderRes | undefined
}

export const initPerlakuanStateReq: Perlakuan = {
  id: 0,
  keterangan_risiko: "",
  target_triwulan_1: "",
  satuan_triwulan_1: "",
  target_triwulan_2: "",
  satuan_triwulan_2: "",
  target_triwulan_3: "",
  satuan_triwulan_3: "",
  target_triwulan_4: "",
  satuan_triwulan_4: "",
  ro: [],
  rincian_output: undefined,
  start_date: "",
  end_date: "",
  src_stakeholder_id: 0,
  src_stakeholder: undefined
}

export const initRiskTreatmentStateReq: RiskTreatmentReqDto = {
  id: 0,
  profil_risiko_id: 0,
  profil_risiko: undefined,
  src_matriks_risiko_id: 0,
  src_matriks_risiko: undefined,
  keputusan: "",
  perlakuan: [{ ...initPerlakuanStateReq }]
}


export type UpdateOrCreateRiskTreatmentServiceModel = BaseAPIServiceParam & {
  body: RiskTreatmentReqDto
}

export interface RiskTreatmentState {
  id: number
  profil_risiko: RiskAnalysisDto | undefined
  src_matriks_risiko: MasterRiskMatrixRes | undefined
  keputusan: string
  target: string
  keterangan_risiko: string
  ro: RoDto[]
  start_date: string
  end_date: string
  src_stakeholder: MiscMasterListStakeholderRes | undefined
  triwulan: number
  target_triwulan_1: string
  satuan_triwulan_1: string
  target_triwulan_2: string
  satuan_triwulan_2: string
  target_triwulan_3: string
  satuan_triwulan_3: string
  target_triwulan_4: string
  satuan_triwulan_4: string
}

export const initRiskTreatmentState: RiskTreatmentState = {
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
  keterangan_risiko: "",
  target_triwulan_1: "",
  satuan_triwulan_1: "",
  target_triwulan_2: "",
  satuan_triwulan_2: "",
  target_triwulan_3: "",
  satuan_triwulan_3: "",
  target_triwulan_4: "",
  satuan_triwulan_4: "",
}
