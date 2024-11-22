import {useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {useState} from "react";
import {RODataTable, RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {doGetDataProfileKunci} from "@/app/penetapan/konteks-strategis/cardProfileIntervensi/service";
import {API_CODE} from "@/lib/core/api/apiModel";

const useProfileKunciVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM()

  const [data, setData] = useState<RoDto[]>([])
  const [dataTable, setDataTable] = useState<RODataTable[]>([])

  async function getDataProfileKunci(){
    const response = await doGetDataProfileKunci({
      body:{id:objectState?.id ?? 0},
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      const result:RoDto[] = response.result
      setData(result)
    }
  }

  return {
    objectState,
    data,
    dataTable,
    getDataProfileKunci
  }
}

export default useProfileKunciVM;