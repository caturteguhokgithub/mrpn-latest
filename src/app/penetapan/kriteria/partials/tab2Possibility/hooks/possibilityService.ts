import { del, post, put } from "@/lib/core/api/apiBase";
import { ResponseBaseDto } from "@/lib/core/api/apiModel";

export async function doGetPossibility(param: any) {
  const resp = await post({
    ...param,
    url: "penetapan/kriteriaRisiko/show",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}

// export async function doCreatePossibility(ps
