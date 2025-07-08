import { IdentificationRiskResDto } from "@/app/profil-risiko/identifikasi/pageModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";

export interface RiskOverviewData {
  id: number
  peristiwa: string
  kategori: string
  penyebab: string[]
  dampak: string[]
  analisis_lk: number
  analisis_ld: number
  analisis_br: number
  analisis_level: string
  perlakuan_lk: number
  perlakuan_ld: number
  perlakuan_br: number
  perlakuan_level: string
  keputusan: string
  // keterangan_risiko: string
  // target_triwulan_1: string
  // target_triwulan_2: string
  // target_triwulan_3: string
  // target_triwulan_4: string
  // satuan_triwulan_1: string
  // satuan_triwulan_2: string
  // satuan_triwulan_3: string
  // satuan_triwulan_4: string
  // keterangan: string[]
  // waktu: string
  // penanggung_jawab: string
  prioritas: number
  // rincian_output: RoDto[]
  perlakuan_data: PerlakuanData[]
}

export interface PerlakuanData {
  id: number
  keterangan_risiko: string
  target_triwulan_1: string
  target_triwulan_2: string
  target_triwulan_3: string
  target_triwulan_4: string
  satuan_triwulan_1: string
  satuan_triwulan_2: string
  satuan_triwulan_3: string
  satuan_triwulan_4: string
  target_satuan_tw_1: string
  target_satuan_tw_2: string
  target_satuan_tw_3: string
  target_satuan_tw_4: string
  waktu: string
  src_stakeholder_id: number
  penanggung_jawab: string
  rincian_output: RoDto[]
}

export type RiskOverview = {
  object: IdentificationRiskResDto
  overviews: RiskOverviewData[]
  overviews_sekre: RiskOverviewData[]
}

export type GetRiskOverviewServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}