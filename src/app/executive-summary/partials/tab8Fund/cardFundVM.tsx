import {useExsumContext, useGlobalModalContext, useLoading, useRKPContext} from "@/lib/core/hooks/useHooks";
import {useState} from "react";
import {ExsumFundDataTableRes, ExsumFundRes} from "@/app/executive-summary/partials/tab8Fund/cardFundModel";
import {API_CODE} from "@/lib/core/api/apiModel";
import {doGetExsumFund} from "@/app/executive-summary/partials/tab8Fund/cardFundService";
import {RODataTable, RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {GenerateProjectData} from "@/lib/utils/common";

const useCardFundVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const {exsum} = useExsumContext()
  const {year, rpjmn} = useRKPContext(store => store)

  const [dataFund, setDataFund] = useState<ExsumFundRes[]>([])
  const [dataTableFund, setDataTableFund] = useState<ExsumFundDataTableRes[]>([])

  const getDataFund = async () => {
    const response = await doGetExsumFund({
      body: {
        exsum_id : exsum.id
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success) {
      let result: ExsumFundRes[] = response.result
      setDataFund(result)

      let finalDataTable:ExsumFundDataTableRes[] = []
      result.map(x => {
        const dataTable = GenerateProjectData(x.intervensi, year, rpjmn)
        finalDataTable.push({
          prop: x.prop,
          intervensi: dataTable
        })
      })


      setDataTableFund(finalDataTable)
    }
  }

  return {
    exsum,
    dataFund,
    dataTableFund,
    getDataFund
  }

}

export default useCardFundVM;