import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface Root {
  code: number;
  message: string;
  result: ResultCategory[];
}
export interface ResultCategory {
  id: number;
  uraian_penetapan_object_id: number;
  // value: string;
  prioritas: string;
  // desc: string;
  src_kategori_id: number;
  sub_kategori_risiko: SubKategoriRisiko[];
  src_kategori_risiko: doMasterKategori;
}

export interface SubKategoriRisiko {
  id: number;
  penetapan_kategori_risiko_id: number;
  value: string;
  desc: string;
}

export interface doSubCategory {
  value: string
  desc: string
}

export interface doListCategory {
  value: string
  desc: string
  prioritas: number
  sub: doSubCategory[]
}

export interface doMasterKategori {
  id: number;
  value: string;
  uraian: string;
}
// export interface doRequestCategoryDto {
//   uraian_penetapan_object_id: number
//   lists: doListCategory[]
// }

export interface doRequestCategoryDto {
  uraian_penetapan_object_id: number
  // value: string
  // desc: string
  src_kategori_id: number;
  prioritas: number
  sub: doSubCategory[]
}

export const initCategory: doRequestCategoryDto = {
  uraian_penetapan_object_id: 0,
  // value: "",
  // desc: "",
  src_kategori_id: 0,
  prioritas: 1,
  sub: [
    {
      value: "",
      desc: ""
    }
  ]
}

export const initMasterCategory: doMasterKategori = {
  id: 0,
  value: "",
  uraian: ""
}

export const initSubCategory: SubKategoriRisiko = {
  id: 0,
  penetapan_kategori_risiko_id: 0,
  value: "",
  desc: ""
}

// export const initCategory: doRequestCategoryDto = {
//   uraian_penetapan_object_id: 0,
//   lists: [
//     {
//       value: "",
//       desc: "",
//       prioritas: 0,
//       sub: [
//         {
//           value: "",
//           desc: ""
//         }
//       ]
//     },
//   ]
// }

export type CreateCategoryServiceModel = BaseAPIServiceParam & {
  body: doRequestCategoryDto;
};

export type UpdateSubCategoryServiceModel = BaseAPIServiceParam & {
  body: SubKategoriRisiko;
};

export type DeleteSubCategoryServiceModel = BaseAPIServiceParam & {
  body: { id: number };
};