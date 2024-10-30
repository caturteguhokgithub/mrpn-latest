import {ProjectDefaultDto} from "@/lib/core/context/rkpContext";
import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";
import {IndikatorDto, ProPDto, RoDto} from "@/app/misc/rkp/rkpServiceModel";

export const DasarPemilihan:{
  id:number
  value:string
}[] = [
  {
    id:1,
    value:"Merupakan Fokus & Perhatian Presiden"
  },
  {
    id:2,
    value:"Mempunyai Nilai Strategis dalam Pencapaian Sasaran Prioritas Nasional/Agenda Pembangunan"
  },{
    id:3,
    value:"Memiliki Faktor Risiko yang Tinggi (Diantaranya Anggaran, Ruang Lingkup, Kinerja, & Rekam Jejak Akuntabilitas)"
  },{
    id:4,
    value:"Pertimbangan Lain yang Relevan"
  },
]

export const KriteriaPemilihanEntity:{
  id:number
  value:string
}[] = [
  {
    id:1,
    value:"Kesesuaian dengan Arahan (Direktif) Presiden"
  },
  {
    id:2,
    value:"Memiliki Amanat dalam Peraturan Perundang-undangan"
  },{
    id:3,
    value:"Tercantum dalam Dokumen RKP & RPJMN"
  },{
    id:4,
    value:"Memiliki Tuga & Fungsi yang Relevan"
  },{
    id:5,
    value:"Memiliki Kontribusi Intervensi yang Signifikan Sesuai dengan Kerangka Kerja Logis (Diantaranya Anggaran, Kelembagaan, & Regulasi)"
  },
]

export interface PenetapanObjectVMState {
  id:number
  code:string
  topik:string
  tahun:number
  values:ProjectDefaultDto[]
}

export const initPenetapanObjectState:PenetapanObjectVMState = {
  id: 0,
  code: "",
  topik: "",
  tahun: 2025,
  values: []
}

export interface PenetapanObjectReqDto {
  id:number
  code:string
  topik:string
  tahun:number|string
  values:ProjectDefaultDto[]
}

export interface PenetapanObjectLongListReqValueDto {
  uraian_id:number,
  prioritas:string[]
}
export interface PenetapanObjectLongListReqDto {
  values:PenetapanObjectLongListReqValueDto[]
}

export interface PenetapanObjectLongListAssignObjectReqValueDto {
  uraian_id:number,
  assignObjek:boolean
}
export interface PenetapanObjectLongListAssignObjectReqDto {
  values:PenetapanObjectLongListAssignObjectReqValueDto[]
}

export type GetPenetapanObjectIdServiceModel = BaseAPIServiceParam & {
  body: {  };
};

export type UpdateOrCreatePenetapanObjectServiceModel = BaseAPIServiceParam & {
  body: PenetapanObjectReqDto;
};

export type UpdateOrCreatePenetapanObjectLongListServiceModel = BaseAPIServiceParam & {
  body: PenetapanObjectLongListReqDto;
};

export type UpdateOrCreatePenetapanObjectLongListAssignObjectServiceModel = BaseAPIServiceParam & {
  body: PenetapanObjectLongListAssignObjectReqDto;
};


export type PenetapanObjectShortListSasaranIndikatorDto = IndikatorDto

export interface PenetapanObjectShortListSasaranDto {
  id: number
  code: string
  value: string
  indikator: PenetapanObjectShortListSasaranIndikatorDto[]
}

export type PenetapanObjectShortListRKPDto = ProjectDefaultDto & {
  sasaran:PenetapanObjectShortListSasaranDto[]
}

export interface PenetapanObjectEntityDto {
  type: string
  value: string
  stakeholder:MiscMasterListStakeholderRes[]
}

export interface PenetapanObjectShortListExsumDto {
  id:number,
  kelembagaan: PenetapanObjectEntityDto[]
}

export interface PenetapanObjectShortListDto {
  id: number
  penetapan_object_rkp_id: number
  level: string
  ref_id: number
  objek: boolean
  approve_profil_risiko: boolean
  rkp : PenetapanObjectShortListRKPDto
  exsum : PenetapanObjectShortListExsumDto|null
}

export type GetPenetapanObjectShortListServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};

export type GetPenetapanObjectCascadingServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};

export type GetPenetapanObjectEntityServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};

export type GetPenetapanObjectNotaDinasServiceModel = BaseAPIServiceParam & {
  body: { id_topik:number };
};

export interface PenetapanObjectEntityItemDto {
  id:number,
  value:string
}

export type PenetapanObjectStateEntityDto = MiscMasterListStakeholderRes & {
  items:PenetapanObjectEntityItemDto[]
}

export interface PenetapanObjectEntityCheckedDto {
  entitas:MiscMasterListStakeholderRes
  items:PenetapanObjectEntityItemDto[]
}

export type GetPenetapanObjectEntityUsulanServiceModel = BaseAPIServiceParam & {
  body: { id:number };
};

export interface PenetapanObjectEntityValueReqDto {
  entitas:number,
  kriteria:string[]
}

export interface PenetapanObjectEntityReqDto {
  id_objek:number
  values:PenetapanObjectEntityValueReqDto[]
}

export type UpdateOrCreatePenetapanObjectEntityServiceModel = BaseAPIServiceParam & {
  body: PenetapanObjectEntityReqDto;
};

export interface NotaDinasReqDto {
  penetapan_object_id:number
  penjelasan_objek_mrpn:string
  penjelasan_usulan_upr:string
  lokasi:string
  tanggal:string
  direktorat:string
  dibuat:string
  disetujui:string
  ttd_pembuat:string
  ttd_pembuat_filename:string
  ttd_penyetuju:string
  ttd_penyetuju_filename:string
}

export type UpdateOrCreatePenetapanObjectNotaDinasServiceModel = BaseAPIServiceParam & {
  body: NotaDinasReqDto;
};

export type PropDto = ProPDto & {
  ro:RoDto[]
}

export interface SasaranDto {
  id: number
  code: string
  value: string
  indikator: {
    value: string[]
    prop:PropDto[][]
  }
}

export type KPDto = ProjectDefaultDto & {
  sasaran: SasaranDto
}

export type PPDto = ProjectDefaultDto & {
  kp: KPDto[][]
}

export type PNDto = ProjectDefaultDto & {
  pp: PPDto
}

export type RKPCascadingDto = { pn : PNDto }