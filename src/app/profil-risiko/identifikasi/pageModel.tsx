import { IndikatorDto } from "@/app/misc/rkp/rkpServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";
import { KPDto } from "@/app/executive-summary/partials/tab4Cascading/cardDiagram/cardDiagramModel";

export interface ProfileRiskDto {
  id: number
  uraian_penetapan_objek_id: number
  kategori_risiko: string
  insidentil: boolean
  peristiwa_risiko: string
  keterangan_risiko: string
  area_dampak: string
  penyebab_dampak: {
    penyebab: string[]
    dampak: string[]
  }
}

export interface IndikasiRisiko {
  exsum_id: number
  id: number
  indikasi_perlakuan_risiko: string
  indikasi_risiko: string
  kategori_risiko: string
  swot_id: number
}

export interface IdentificationRiskResDto {
  objek_mrpn: string
  rkp: KPDto
  topik: string
  sasaran: string[]
  indikasi_risiko: IndikasiRisiko[]
  indikator: IndikatorDto[]
  profile_risiko: ProfileRiskDto[]
  periode: string
}

export type GetIdentificationRiskServiceModel = BaseAPIServiceParam & {
  body: {
    uraian_penetapan_objek_id: number
  }
}

export interface IdentificationRiskAddReqDto {
  id: number
  uraian_penetapan_objek_id: number
  kategori_risiko: string
  insidentil: boolean
  peristiwa_risiko: string
  penyebab: string[]
  dampak: string[]
  area_dampak: string
}

export type UpdateOrCreateIdentificationRiskServiceModel = BaseAPIServiceParam & {
  body: IdentificationRiskAddReqDto
}

export const initIdentificationRiskAddReqDto: IdentificationRiskAddReqDto = {
  id: 0,
  uraian_penetapan_objek_id: 0,
  kategori_risiko: "",
  insidentil: false,
  peristiwa_risiko: "",
  penyebab: [""],
  dampak: [""],
  area_dampak: ""
}