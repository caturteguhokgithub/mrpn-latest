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