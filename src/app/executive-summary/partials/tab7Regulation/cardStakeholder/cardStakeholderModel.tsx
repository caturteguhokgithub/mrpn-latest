import { MiscMasterListStakeholderRes } from "@/app/misc/master/masterServiceModel";
import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import {
    ExsumRegulationDto,
    GetByExsumId,
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";

export interface ExsumStakeholderValueDto {
    type: string;
    label: string;
    value: string;
    stakeholder: MiscMasterListStakeholderRes[];
    isEdit: boolean
}

export interface ExsumStakeholderReqDto {
    id: number;
    exsum_id: number;
    values: ExsumStakeholderValueDto[];
}

export interface ExsumStakeholderImageValueDto {
    exsum_id: number;
    value: string;
}

export interface ExsumStakeholderImageReqDto {
    exsum_id: number;
    file: string;
}

export const initExsumStakeholderReqDto: ExsumStakeholderReqDto = {
    id: 0,
    exsum_id: 0,
    values: [
        {
            type: "COORDINATION",
            label: "Kementerian Koordinator",
            value: "",
            isEdit: true,
            stakeholder: [],
        },
        {
            type: "MAIN_ENTITY",
            label: "Entitas Sektor Utama",
            value: "",
            isEdit: true,
            stakeholder: [],
        },
        {
            type: "SUPPORT",
            label: "Entitas Pendukung",
            value: "",
            isEdit: true,
            stakeholder: [],
        },
    ],
};

export const initUploadImageStakeholderDto: ExsumStakeholderImageReqDto = {
    exsum_id: 0,
    file: ""
}

export type ExsumStakeholderResDto = ExsumStakeholderValueDto;

export type GetStakeholderByExsumIdServiceModel = BaseAPIServiceParam & {
    body: GetByExsumId;
};

export type UpdateStakeholderByExsumIdServiceModel = BaseAPIServiceParam & {
    body: ExsumStakeholderReqDto;
};

export type DeleteStakeholderByExsumIdServiceModel = BaseAPIServiceParam & {
    body: { id: number };
};

export type GetStakeholderImageByExsumIdServiceModel = BaseAPIServiceParam & {
    body: GetByExsumId;
};

export type UploadImageStakeholderByExsumIdServiceModel = BaseAPIServiceParam & {
    body: ExsumStakeholderImageReqDto;
};

export type ExsumStakeholderImageResDto = ExsumStakeholderImageValueDto;