import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";

export const stakeholderType = [
 {
  type: "COORDINATION",
  label: "Kementerian Koordinator",
  value: "",
  stakeholder: [],
 },
 {
  type: "MAIN_ENTITY",
  label: "Entitas Sektor Utama",
  value: "",
  stakeholder: [],
 },
 {
  type: "SUPPORT",
  label: "Entitas Pendukung",
  value: "",
  stakeholder: [],
 },
];

// LIST KEBIJAKAN
export type MiscMasterListKebijakanReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListKebijakanChildRes {
 id: number;
 src_kebijakan_id: number;
 value: string;
 isCheck?: boolean;
}
export interface MiscMasterListKebijakanRes {
 id: number;
 name: string;
 list: MiscMasterListKebijakanChildRes[];
}

// LIST PROVINSI
export type MiscMasterListProvinsiReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListProvinsiRes {
 id: number;
 kode: string;
 level: string;
 name: string;
}

// LIST PERPRES
export type MiscMasterListPerpresReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListPerpresRes {
 id: number;
 title: string;
 value: string;
 flag: string;
}
export interface MiscMasterListPerpresCreateReq {
 title: string;
 value: string;
 flag: string;
}

export type MiscMasterListPerpresCreateReqService = BaseAPIServiceParam & {
 body: MiscMasterListPerpresCreateReq
}

// LIST STAKEHOLDER
export type MiscMasterListStakeholderReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListStakeholderRes {
 id: number;
 short: string;
 code: string;
 value: string;
 icon: string;
}

// RPJMN
export type MiscMasterRPJMNReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterRPJMNRes {
 id: number;
 start: number;
 end: number;
 status: string;
}

// LIST SUMBER PENDANAAN
export type MiscMasterListSumberPendanaanReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListSumberPendanaanRes {
 id: number;
 name: string;
}

// LIST KATEGORI PROYEK
export type MiscMasterListKategoriProyekReq = BaseAPIServiceParam & {
 body: {};
};
export interface MiscMasterListKategoriProyekRes {
 id: number;
 name: string;
}

// LIST RKP BY OBJECT
export type MasterListObjectReq = BaseAPIServiceParam & {
 body: {
  tahun: number|string;
 };
};
export interface MasterListObjectRes {
 id: number;
 level: string;
 ref_id: string;
 objek: boolean;
 rkp: ProjectDefaultDto;
}

// LIST RISK MATRIX
export type MasterRiskMatrixReq = BaseAPIServiceParam & {
 body: {};
};
export interface MasterRiskMatrixRes {
 id: number;
 dampak: number;
 kemungkinan: number;
 warna: string;
 nilai: number;
 level: string;
}
