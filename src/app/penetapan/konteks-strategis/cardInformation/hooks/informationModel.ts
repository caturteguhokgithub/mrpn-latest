import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface listsDao {
  id: number;
  upr_informasi_lainnya_id: number;
  value: string;
}
export interface doResInformasiLainnya {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
  // lists: listsDao[]
}

export interface doAddInformasiLainnyaDto {
  id: number;
  uraian_penetapan_object_id: number;
  value: string;
}

export const initAddInformasiLainnyaDto: doAddInformasiLainnyaDto = {
  id: 0,
  uraian_penetapan_object_id: 0,
  value: "",
};

export interface doGetReqInformasiLainnyaDto {
  uraian_penetapan_object_id: number;
}

export const initInformasiLainnyaShow: doGetReqInformasiLainnyaDto = {
  uraian_penetapan_object_id: 0,
};

export type GetInformasiLainnyaServiceModel = BaseAPIServiceParam & {
  body: doGetReqInformasiLainnyaDto;
};

export type AddInformasiLainnyaServiceModel = BaseAPIServiceParam & {
  body: doAddInformasiLainnyaDto;
};

export type UpdateInformasiLainnyaServiceModel = BaseAPIServiceParam & {
  body: doResInformasiLainnya;
};

export type InformasiLainnyaResDto = doResInformasiLainnya;
