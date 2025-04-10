import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface Root {
  code: number;
  message: string;
  result: ResultPossibility[];
}

export interface ResultPossibility {
  id: number;
  uraian_penetapan_objek_id: number;
  level_kemungkinan: string;
  probabilitas: string;
  jumlah_frekuensi: string;
  low_frekuensi: string;
}

export interface doValues {
  level_kemungkinan: string
  probabilitas: string
  jumlah_frekuensi: string
  low_frekuensi: string
}

export interface doRequestPossibilityDto {
  uraian_penetapan_objek_id: number
  values: doValues[]
}

export const initPossibility: doRequestPossibilityDto = {
  uraian_penetapan_objek_id: 0,
  values: [
    {
      level_kemungkinan: "",
      probabilitas: "",
      jumlah_frekuensi: "",
      low_frekuensi: ""
    }
  ]
}

export type UpdatePossibilityServiceModel = BaseAPIServiceParam & {
  body: doRequestPossibilityDto;
};
