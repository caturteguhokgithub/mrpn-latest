import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import {
  doGetIndikasiSasaran
} from "@/app/penetapan/konteks-strategis/cardIndikasiSasaran/service";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  PenetapanIndikasiSasaranResDto
} from "@/app/penetapan/konteks-strategis/cardIndikasiSasaran/model";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { PenetapanLevelKebijakanResDto } from "./model";
import { doGetLevelKebijakan } from "./service";

const useLevelKebijakanVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM()

  const [levelKebijakanData, setLevelKebijakanData] = useState<PenetapanLevelKebijakanResDto[]>([])

  async function getDataLevelKebijakan() {
    const response = await doGetLevelKebijakan({
      body: {
        objek_id: objectState?.id ?? 0
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      let result: PenetapanLevelKebijakanResDto[] = response.result
      setLevelKebijakanData(result)
    }
  }

  return {
    objectState,
    levelKebijakanData,
    getDataLevelKebijakan,
  }
}

export default useLevelKebijakanVM