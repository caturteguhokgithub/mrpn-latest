import { useGlobalModalContext, useLoading, usePenetapanTopicContext, useRKPContext } from "@/lib/core/hooks/useHooks";
import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  RegulasiData,
  RegulasiResDto, RegulasiValueDto,
} from "@/app/penetapan/konteks-strategis/cardRegulasi/model";
import {
  doGetRegulasi,
} from "@/app/penetapan/konteks-strategis/cardRegulasi/service";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { MiscMasterListPerpresRes } from "@/app/misc/master/masterServiceModel";

const useCardRegulasi = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM()

  const [data, setData] = useState<MiscMasterListPerpresRes[]>([])

  async function getData() {
    const response = await doGetRegulasi({
      body: {
        id: objectState?.id ?? 0,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success) {
      let result: RegulasiResDto = response.result

      let data: MiscMasterListPerpresRes[] = []

      if (result.exsum != null) {
        result.exsum.regulasi.map(res => {
          data = [...data, ...res.perpres]
        })
      }

      setData(data)
    }
  }

  useEffect(() => {
    if (objectState !== undefined) {
      getData();
    }
  }, [objectState]);



  return {
    objectState,
    getData,
    data,
  }

}

export default useCardRegulasi