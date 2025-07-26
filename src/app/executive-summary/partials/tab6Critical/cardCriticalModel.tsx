import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { MiscMasterListKategoriProyekRes } from "@/app/misc/master/masterServiceModel";

export interface ExsumCriticalState {
  id: number;
  exsum_id: number;
  ro: RoDto | undefined;
  start_date: string;
  end_date: string;
  kategori_proyek_id: number;
  strategy: string[];
  keterangan_kegiatan: string;
  dependency: ExsumCriticalData | undefined;
  kegiatan: KegiatanDtoNew[];
  color?: string;
}

export const initExsumCriticalReqDto: ExsumCriticalState = {
  id: 0,
  exsum_id: 0,
  ro: undefined,
  start_date: "",
  end_date: "",
  kategori_proyek_id: 0,
  strategy: [],
  keterangan_kegiatan: "",
  dependency: undefined,
  kegiatan: [],
};

export interface ExsumCriticalReqDto {
  id: number;
  exsum_id: number;
  ro_id: number;
  start_date: string;
  end_date: string;
  kategori_proyek_id: number;
  keterangan_kegiatan: string;
  values: {
    tagging: string;
  }[];
  depedencies: number;
  kegiatan: KegiatanDtoNew[] | string;
  color: string;
}

export interface TargetDto {
  target: string;
  bulan: number;
}
export interface KegiatanDto {
  id: number;
  value: string;
  start_date: string;
  end_date: string;
  target: TargetDto[];
}

export interface TaskAdditionalData {
  type: string;
  tooltip_type: string;
  penanggungjawab: string;
  sumber_anggaran: string;
  keterangan_kegiatan: string;
  category: string;
  target: TargetDto[];
  strategy: {
    id: number;
    value: string;
  }[];
}

export interface MonthsDto {
  id: number;
  exsum_critical_path_kegiatan_id: number;
  name: string;
  aktivitas: string;
  target: string;
  satuan: string;
}

export interface KegiatanDtoNew {
  id: number;
  exsum_critical_path_id: number;
  color: string;
  kegiatan: string;
  satuan: string;
  total_kegiatan: number;
  no_urut: number | string;
  months: MonthsDto[];
}

export interface TaggingList {
  id: number;
  exsum_critical_path_id: number;
  value: string;
}

export interface ExsumCriticalData {
  id: number;
  exsum_id: number;
  kategori_proyek_id: number;
  start_date: string;
  end_date: string;
  ro_id: number;
  keterangan_kegiatan: string;
  depedencies: string;
  color: string;
  kegiatan: KegiatanDtoNew[];
  isEdit: boolean;
  ro: RoDto;
  tagging_list: TaggingList[];
  kategori_proyek: MiscMasterListKategoriProyekRes;
  dependency: ExsumCriticalData | undefined;
}

export interface MonthData {
  id: string | number;
  name: string;
  aktivitas: string;
  target: string;
  satuan: string;
}

export interface ChildData {
  id: number;
  kegiatan: string;
  target: string;
  satuan: string;
  color: string;
  total_kegiatan: number;
  no_urut: number | string;
  months: (MonthData | null)[];
}

export interface DataCPType {
  id: string;
  ro: string;
  type_ro: string;
  intervention: boolean;
  code_ro: string;
  code_pkkr: string;
  tagging: string[];
  category: string;
  kategori_proyek_id: number;
  responsible: string;
  fundSource: string;
  startYear: string;
  endYear: string;
  color: string;
  children: ChildData[];
}

export interface Summary {
  is_selected: number;
  total: number;
}

export interface DataRoKunci {
  roKunci: RoDto[];
  summary: Summary;
}

export const initDataRoKunci: DataRoKunci = {
  roKunci: [],
  summary: {
    is_selected: 0,
    total: 0,
  },
};

// export interface ExsumCriticalData {
//   id:number
//   kategori_proyek_id:number
//   keterangan_kegiatan:string
//   kategori_proyek:MiscMasterListKategoriProyekRes
//   ro?:RoDto
//   start_date:string
//   end_date:string
//   tagging_list:{
//     id:number
//     value:string
//   }[]
//   dependency:ExsumCriticalData|undefined
//   kegiatan:KegiatanDto[]
//   color:string
// }

export interface GetByExsumId {
  exsum_id: number;
}

export type GetCriticalPathByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateCriticalPathByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumCriticalReqDto;
};
