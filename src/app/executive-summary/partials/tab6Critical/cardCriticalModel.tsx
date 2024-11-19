import {RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {MiscMasterListKategoriProyekRes} from "@/app/misc/master/masterServiceModel";

export interface ExsumCriticalState {
  id: number
  exsum_id:number
  ro:RoDto|undefined
  start_date:string
  end_date:string
  kategori_proyek_id:number
  strategy:string[]
  keterangan_kegiatan:string
  dependency:ExsumCriticalData|undefined
  kegiatan:KegiatanDto[]
  color?:string
}

export const initExsumCriticalReqDto:ExsumCriticalState = {
  id: 0,
  exsum_id: 0,
  ro: undefined,
  start_date: "",
  end_date: "",
  kategori_proyek_id: 0,
  strategy: [],
  keterangan_kegiatan:"",
  dependency:undefined,
  kegiatan:[]
}

export interface ExsumCriticalReqDto {
  id: number
  exsum_id:number
  ro_id:number
  start_date:string
  end_date:string
  kategori_proyek_id:number
  keterangan_kegiatan:string
  values:{
    tagging:string
  }[]
  depedencies:number
  kegiatan:KegiatanDto[]
  color:string
}

export interface TargetDto {
  target:string
  bulan:number
}
export interface KegiatanDto {
  id:number
  value:string
  start_date:string
  end_date:string
  target:TargetDto[]
}

export interface TaskAdditionalData {
  type:string
  tooltip_type:string
  penanggungjawab:string
  sumber_anggaran:string
  keterangan_kegiatan:string
  category:string
  target:TargetDto[]
}

export interface ExsumCriticalData {
  id:number
  kategori_proyek_id:number
  keterangan_kegiatan:string
  kategori_proyek:MiscMasterListKategoriProyekRes
  ro?:RoDto
  start_date:string
  end_date:string
  tagging_list:{
    id:number
    value:string
  }[]
  dependency:ExsumCriticalData|undefined
  kegiatan:KegiatanDto[]
  color:string
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetCriticalPathByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateCriticalPathByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumCriticalReqDto;
};