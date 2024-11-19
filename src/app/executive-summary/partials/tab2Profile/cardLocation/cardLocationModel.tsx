import { BaseAPIServiceParam } from "@/lib/core/api/apiModel";
import {MiscMasterListProvinsiRes} from "@/app/misc/master/masterServiceModel";

export interface ExsumLocationDto {
  id: number
  exsum_id: number
  keterangan:string
  provinsi: MiscMasterListProvinsiRes[]
  lokasi:number[]
}

interface ExsumLocationValue {
  keterangan:string
  provinsi:number[]
}
export interface ExsumLocationUpdateDto {
  id:number
  exsum_id: number
  lokasi: MiscMasterListProvinsiRes[]
  keterangan:string
}


export const initExsumLocationUpdateDto:ExsumLocationUpdateDto = {
  id:0,
  exsum_id: 0,
  lokasi: [],
  keterangan: ""
}

export type GetLocationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: {
    exsum_id: number
  };
};

export type UpdateLocationByExsumIdServiceModel = BaseAPIServiceParam & {
  body: ExsumLocationUpdateDto;
};
