import {IdentificationRiskResDto} from "@/app/profil-risiko/identifikasi/pageModel";
import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {RoDto} from "@/app/misc/rkp/rkpServiceModel";

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
  keterangan_risiko: string
  keterangan: string[]
  waktu: string
  penanggung_jawab: string
  prioritas: number
  rincian_output:RoDto[]
}

export type RiskOverview = {
  object: IdentificationRiskResDto
  overviews: RiskOverviewData[]
}

export type GetRiskOverviewServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}