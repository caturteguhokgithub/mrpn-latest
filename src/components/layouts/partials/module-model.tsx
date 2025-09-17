import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";

export interface ModuleResDto {
    appid: string,
    kdapp: string,
    nmapp: string,
    url: string,
    label: string,
    year_access: number[]
}

export interface DtoSwitchApp {
    target: string,
    tahun: string
}

export const initModuleResDto: ModuleResDto = {
    appid: "",
    kdapp: "",
    nmapp: "",
    url: "",
    label: "",
    year_access: []
}

export const initSwitchApp: DtoSwitchApp = {
    target: "",
    tahun: ""
}

export type switchApp = BaseAPIServiceParam & {
    body: DtoSwitchApp;
};