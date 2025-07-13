import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface doReqSeleraDto {
    uraian_penetapan_objek_id: number
    type_user: string
    type_nilai: string
    pernyataan: string
}

export const initSelera: doReqSeleraDto = {
    uraian_penetapan_objek_id: 0,
    type_user: "",
    type_nilai: "",
    pernyataan: ""
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