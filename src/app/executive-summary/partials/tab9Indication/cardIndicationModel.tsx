import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import {
  MiscMasterListPerpresRes,
  MiscMasterListStakeholderRes,
} from "@/app/misc/master/masterServiceModel";
import { ExsumSWOTValuesDto } from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotModel";
import { RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { ExsumTWOSDto } from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import {
  ExsumInterventionProjectReqDto,
  ExsumInterventionState,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import {
  ExsumRegulationDto,
  ExsumRegulationResDto,
  initExsumRegulationDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";

export const COORDINATOR = "Entitas Koordinator";
export const MAIN = "Entitas Utama";

export interface ModalDto {
  index: number;
  action: boolean;
  type: string;
}

export interface IndicationReqDto {
  keterangan: string;
  swot: number[];
}
export interface StakeholderReqDto {
  type: string;
  id: number;
}
export interface ExsumIndicationValueReqDto {
  tahun: number[];
  perlakuan_risiko: string;
  rincian_output_id: number;
  value: string;
  stakeholder: StakeholderReqDto[];
}
export interface ExsumIndicationReqDto {
  id: number;
  exsum_id: number;
  swot_id: number;
  indikasi_risiko: string;
  kategori_risiko: string;
  indikasi_perlakuan_risiko: string;
  values: ExsumIndicationValueReqDto[];
  regulasi: ExsumRegulationDto[];
}

export interface StakeholderResGroupDto {
  [key: string]: StakeholderResDto[];
}
export type StakeholderResDto = MiscMasterListStakeholderRes & {
  group: {
    type: string;
  };
};
export interface NonRoDto {
  exsum_id: number;
  exsum_indikasi_risiko_perlakuan_id: number;
  value: string;
}
export interface ExsumIndicationValueRes {
  id: number;
  tahun: number[];
  perlakuan_risiko: string;
  ro: RoDto | undefined;
  nonro: RoDto | undefined;
  stakeholder: StakeholderResDto[];
  groupStakeholder: StakeholderResGroupDto;
}
export interface ExsumIndicationResDto {
  id: number;
  exsum_id: number;
  jenis: string;
  indikasi_risiko: string;
  kategori_risiko: string;
  indikasi_perlakuan_risiko: string;
  perlakuan: ExsumIndicationValueRes[];
  tows?: ExsumTWOSDto;
  regulasi: ExsumRegulationResDto[];
  isEdit: boolean
}

export interface IndicationState {
  keterangan: string;
  keyword_swot: ExsumSWOTValuesDto[];
}
export interface OthersEntityState {
  type: string;
  entity: MiscMasterListStakeholderRes[];
}
export interface ExsumIndicationStateValue {
  id: number;
  tahun: number[];
  type: string;
  // perlakuan_risiko:string
  rincian_output: RODataTable | undefined;
  non_rincian_output: RODataTable | undefined;
  // non_rincian_output: ExsumInterventionState;
  intervention: boolean;
  // stakeholderMultiple:MiscMasterListStakeholderRes[]
  // stakeholder:{
  //   coordinator:MiscMasterListStakeholderRes|undefined
  //   main:MiscMasterListStakeholderRes[]
  //   others:OthersEntityState[]
  // }
}

export const initStateExsumIndicationValue: ExsumIndicationStateValue = {
  id: 0,
  tahun: [],
  rincian_output: undefined,
  non_rincian_output: undefined,
  // non_rincian_output: {
  //   id: 0,
  //   exsum_id: 0,
  //   type: "",
  //   code: "",
  //   kementrian: undefined,
  //   nomenklatur: "",
  //   indikator: "",
  //   list: [],
  //   intervensi: false,
  //   prop: undefined,
  //   ro: [],
  //   tahun: "",
  //   location: [],
  // },
  intervention: false,
  type: "",
};

export interface ExsumIndicationState {
  id: number;
  tows: ExsumTWOSDto | undefined;
  indikasi_risiko: string;
  kategori_risiko: string;
  perlakuan_risiko: string;
  values: ExsumIndicationStateValue[];
  regulation: ExsumRegulationDto[];
}

export const initStateExsumIndication: ExsumIndicationState = {
  id: 0,
  tows: undefined,
  indikasi_risiko: "",
  kategori_risiko: "",
  perlakuan_risiko: "",
  values: [],
  regulation: [],
};

export interface ExsumProfilRisikoOverview {
  kategori_risiko: string;
  peristiwa_risiko: string;
  keputusan: string;
  deskripsi_keterangan_risiko: string[]
}

export interface GetByExsumId {
  exsum_id: number;
}

export type GetIndicationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: GetByExsumId;
};

export type UpdateIndicationByIdServiceModel = BaseAPIServiceParam & {
  body: ExsumIndicationReqDto;
};

export type DeleteIndicationByIdServiceModel = BaseAPIServiceParam & {
  body: { id: number };
};
