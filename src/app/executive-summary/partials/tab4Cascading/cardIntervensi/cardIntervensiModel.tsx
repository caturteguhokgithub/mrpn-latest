import { ProPDto, RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { MiscMasterListProvinsiRes, MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface ProjectTargetAnggaranDto {
  tahun: number | string
  target: string
  satuan: string
  anggaran: number
  anggaranString: string
  sumber_anggaran: string
}

export interface ExsumInterventionProjectReqDto {
  id: number
  exsum_id: number
  type: string
  code: string
  prop: number
  kementrian_id: number
  nomenklatur: string
  indikator: string
  intervention: boolean
  list: ProjectTargetAnggaranDto[]
  list_ro: RoDto[]
  tahun: number | string
  lokasi: any[]
  src_rincian_output_id: number
}

export interface ProjectReqDto {
  tahun: number | string,
  exsum_id: number
  type: string
  code: string
  prop: number
  kementrian_id: number
  nomenklatur: string
  indikator: string
  lokasi: {
    src_provinsi_id: number;
  }[];
}

export interface ExsumInterventionState {
  id: number
  exsum_id: number
  type: string
  code: string
  kementrian: MiscMasterListStakeholderRes | undefined
  nomenklatur: string
  indikator: string
  list: ProjectTargetAnggaranDto[]
  intervensi: boolean,
  prop: ProPDto | undefined
  ro: RODataTable[]
  tahun: number | string
  location: MiscMasterListProvinsiRes[]
  src_rincian_output_id: number
}

export const initExsumInterventionState: ExsumInterventionState = {
  id: 0,
  exsum_id: 0,
  type: "",
  code: "",
  kementrian: undefined,
  nomenklatur: "",
  indikator: "",
  list: [],
  intervensi: false,
  prop: undefined,
  ro: [],
  location: [],
  tahun: "",
  src_rincian_output_id: 0
}

export const initProjectReqDto: ProjectReqDto = {
  tahun: "",
  exsum_id: 0,
  type: "",
  code: "",
  prop: 0,
  kementrian_id: 0,
  nomenklatur: "",
  indikator: "",
  lokasi: []
}

export interface GetByExsumId {
  exsum_id: number
}

export type GetExsumInterventionByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateExsumInterventionByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumInterventionProjectReqDto;
};

export type CreateNonRoServiceModel = BaseAPIServiceParam & {
  body: ProjectReqDto;
};

export type UpdateById = BaseAPIServiceParam & {
  body: { id: number };
};

export type UpdateV2ExsumIntervention = BaseAPIServiceParam & {
  body: {
    id: number;
    prop: number;
    code: string;
    nomenklatur: string;
    kementrian_id: number;
    indikator: string;
    target: string;
    satuan: string;
    anggaran: number;
    sumber_anggaran: string;
    type: string;
    intervention: boolean;
    lokasi: any[]
    tahun: number | string
    list: ProjectTargetAnggaranDto[]
  }
}