import {BaseAPIServiceParam} from "@/lib/core/api/apiModel";
import {ProjectDefaultDto} from "@/lib/core/context/rkpContext";
import {SasaranDto} from "@/app/misc/rkp/rkpServiceModel";

export type ExsumSupportProjectRes = ProjectDefaultDto & {
  sasaran: SasaranDto[]
  sasaran_kp: SasaranDto[]
}

export type ExsumSupportProjectReq = {
  level: string
  ref_id: number
};

export type GetSupportServiceModel = BaseAPIServiceParam & {
  body: ExsumSupportProjectReq;
};