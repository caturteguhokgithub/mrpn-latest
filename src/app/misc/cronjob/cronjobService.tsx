import { get } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";
import {GetSysParamsServiceReqModel} from "@/app/misc/sysparams/sysParamServiceModel";

export async function doGetCronjob() {
  const resp = await get({
    url: "misc/cronjob/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}
