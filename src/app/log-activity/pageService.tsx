import {get} from "@/lib/core/api/apiBase";
import {ResponseBaseDto} from "@/lib/core/api/apiModel";

export async function doGetLogActivity(){
  const resp = await get({
    url: "config/log-activity/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}