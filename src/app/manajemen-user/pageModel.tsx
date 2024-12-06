import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {ManagementRoleDto} from "@/app/manajemen-role/pageModel";
import {ProjectDefaultDto} from "@/lib/core/context/rkpContext";

export type OptionKP = ProjectDefaultDto & {
  tahun: string
}

export interface ManagementUserResDto {
  id: number
  name: string
  email: string
  type: string
  role: {
    id: number
    name: string
  } | undefined
  list_kp_id: number[]
}

export interface ManagementUserDataDto {
  id: number
  name: string
  email: string
  role: string
  role_id: number
  type: string
  list_kp_id: number[]
}

export interface ManagementUserStateDto {
  id: number
  type: string
  name: string
  email: string
  password: string
  role_id: ManagementRoleDto | undefined
  options: OptionKP[]
}

export const initManagementUserReqDto: ManagementUserStateDto = {
  type: "",
  name: "",
  email: "",
  role_id: undefined,
  password: "",
  id: 0,
  options: []
}

export interface ManagementUserReqDto {
  id: number
  type: string
  name: string
  email: string
  password: string
  role_id: number
  list_kp_id: number[]
}

export type GetUserServiceModel = BaseAPIServiceParam & {
  body: {};
};

export type UpdateUserServiceModel = BaseAPIServiceParam & {
  body: ManagementUserReqDto;
};