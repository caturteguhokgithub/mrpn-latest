import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {ManagementRoleDto} from "@/app/manajemen-role/pageModel";

export interface ManagementUserResDto {
  id: number
  name: string
  email: string
  type: string
  role: {
    id: number
    name: string
  }|undefined
}

export interface ManagementUserDataDto {
  id: number
  name: string
  email: string
  role: string
  role_id: number
  type: string
}

export interface ManagementUserStateDto {
  id:number
  type: string
  name: string
  email: string
  password: string
  role_id: ManagementRoleDto|undefined
}

export const initManagementUserReqDto:ManagementUserStateDto = {
  type: "",
  name: "",
  email: "",
  role_id: undefined,
  password: "",
  id: 0
}

export interface ManagementUserReqDto {
  id:number
  type: string
  name: string
  email: string
  password: string
  role_id: number
}

export type GetUserServiceModel = BaseAPIServiceParam & {
  body: {};
};

export type UpdateUserServiceModel = BaseAPIServiceParam & {
  body: ManagementUserReqDto;
};