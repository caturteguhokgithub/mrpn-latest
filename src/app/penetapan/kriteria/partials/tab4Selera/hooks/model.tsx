import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface doReqSeleraDto {
    id: number
    uraian_penetapan_objek_id: number
    type_user: string
    type_nilai: string
    pernyataan: string
    nilai: string
}

export const initSelera: doReqSeleraDto = {
    id: 0,
    uraian_penetapan_objek_id: 0,
    type_user: "",
    type_nilai: "",
    pernyataan: "",
    nilai: ""
}

export type CreateSeleraServiceModel = BaseAPIServiceParam & {
    body: doReqSeleraDto;
};

// Approval
export interface doReqSeleraApprovalDto {
    id: number,
    user_id: number,
    status: string,
    message: string,
    approvalable_id: number,
    approvalable_type: string,
    created_at: string
}

export const initApprovalSelera: doReqSeleraApprovalDto = {
    id: 0,
    user_id: 0,
    status: "",
    message: "",
    approvalable_id: 0,
    approvalable_type: "",
    created_at: ""
}

export type ApprovalSeleraServiceModel = BaseAPIServiceParam & {
    body: doReqSeleraApprovalDto;
};

export interface doGetSeleraDto {
    referensi: dtoSeleraRisiko[] | null,
    seleraRisiko: dtoSeleraRisiko[]
}
export interface dtoSeleraRisiko {
    id: number
    uraian_penetapan_objek_id: number
    type_user: string
    type_nilai: string
    pernyataan: string
    nilai: string
}