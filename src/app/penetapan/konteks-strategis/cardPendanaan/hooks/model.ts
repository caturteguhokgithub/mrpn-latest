import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

// export interface doResPendanaan {
//     id: number
//     src_rkp_prop_id: number
//     tahun: string
//     code: string
//     value: string
//     target: string
//     satuan: string
//     anggaran: number
//     sumber_anggaran: string
//     type: string
//     intervention: boolean
//     kementrian: kementrian,
//     detail: detail[],
//     lokasi_ro: string
//     total_anggaran: number
// }

// export interface kementrian {
//     id: number
//     short: string
//     code: string
//     value: string
//     icon: string
//     type: string
// }

// export interface detail {
//     id: number
//     src_rincian_output_id: number
//     tahun: string | number
//     target: string
//     satuan: string
//     anggaran: string
//     sumber_anggaran: string
// }

export interface doGetReqPendanaanDto {
    uraian_penetapan_object_id: number
    tahun: string | number
}

export const initPendanaanShow: doGetReqPendanaanDto = {
    uraian_penetapan_object_id: 0,
    tahun: 0,
}

export type GetPendanaanServiceModel = BaseAPIServiceParam & {
    body: doGetReqPendanaanDto
};

export type PendanaanResDto = RoDto;