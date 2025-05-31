import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { useState } from "react";
import {
  initRiskAnalysisAddState,
  RiskAnalysisAddReqDto, RiskAnalysisAddStateDto, RiskAnalysisDto,
  RiskAnalysisResDto
} from "@/app/profil-risiko/analisis-evaluasi/pageModel";
import {
  doCreateRiskAnalysis, doDeleteRiskAnalysis,
  doGetRiskAnalysis,
  doUpdateRiskAnalysis
} from "@/app/profil-risiko/analisis-evaluasi/pageService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { doGetMasterRiskMatrix } from "@/app/misc/master/masterService";
import { MasterRiskMatrixRes } from "@/app/misc/master/masterServiceModel";
import { ProfileRiskDto } from "@/app/profil-risiko/identifikasi/pageModel";
import { RiskOverviewData } from "@/app/profil-risiko/overview/pageModel";

export const useRiskAnalysisVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const {
    objectState
  } = usePenetapanGlobalVM()

  const [optionsRiskMatrix, setOptionsRiskMatrix] = useState<MasterRiskMatrixRes[]>([])
  const getMasterRiskMatrix = async () => {
    const response = await doGetMasterRiskMatrix({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      let result: MasterRiskMatrixRes[] = response.result
      setOptionsRiskMatrix(result)
    }
  }

  const [optionsRisk, setOptionRisk] = useState<ProfileRiskDto[]>([])
  const [riskAnalysisData, setRiskAnalysisData] = useState<RiskAnalysisDto[]>([])
  const [dataTable, setDataTable] = useState<RiskOverviewData[]>([])

  const getRiskAnalysisData = async () => {
    const response = await doGetRiskAnalysis({
      body: {
        uraian_penetapan_objek_id: objectState?.id ?? 0
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      let result: RiskAnalysisResDto = response.result

      const obj = Object.groupBy(result.dataTable, (risk) => risk.analisis_br)
      const sorted = Object.keys(obj).sort((a, b) => (parseInt(a) < parseInt(b)) ? 1 : -1)

      const finalDataTable = result.dataTable.reduce<RiskOverviewData[]>(
        (a, b) => {
          let prior: number = 1
          const getIndex = sorted.findIndex(x => parseInt(x) == b.analisis_br)
          if (getIndex > -1) {
            prior = getIndex + 1
          }
          b.prioritas = prior
          return [...a, b]
        },
        []
      )

      setDataTable(finalDataTable)
      setRiskAnalysisData(result.profilRisiko)
      setOptionRisk(result.options)

    }
  }

  const initState: RiskAnalysisAddStateDto = JSON.parse(JSON.stringify(initRiskAnalysisAddState))
  const [state, setState] = useState<RiskAnalysisAddStateDto>(initState)

  const updateOrCreateOrDelete = async () => {

    const today = new Date();
    const quarter = Math.floor((today.getMonth() + 3) / 3);

    const request: RiskAnalysisAddReqDto = {
      id: state.id,
      profil_risiko_id: state.profil_risiko?.id ?? 0,
      src_matriks_risiko_id: state.src_matriks_risiko?.id ?? 0,
      triwulan: quarter
    }

    let response

    if (modal.action == "delete") {
      response = await doDeleteRiskAnalysis({
        body: request,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext
      })
    } else {
      if (state.id == 0) {
        response = await doCreateRiskAnalysis({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext
        })
      } else {
        response = await doUpdateRiskAnalysis({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext
        })
      }
    }

    if (response?.code == API_CODE.success) {
      getRiskAnalysisData()
      actionModal(false, "create")
    }

  }

  const [modal, setModal] = useState<{ isOpen: boolean, action: string }>({ isOpen: false, action: "create" })
  const actionModal = (isOpen: boolean, action: string, id?: number) => {
    let initState: RiskAnalysisAddStateDto = JSON.parse(JSON.stringify(initRiskAnalysisAddState))
    if (id != undefined) {
      const getIndex = riskAnalysisData.findIndex(x => x.analisis.id == id)
      if (getIndex > -1) {
        const reqData = riskAnalysisData[getIndex]
        initState = {
          id: reqData.analisis.id,
          profil_risiko: reqData,
          src_matriks_risiko: reqData.analisis.matriks,
          triwulan: reqData.analisis.triwulan
        }
      }
    }

    setState(initState)

    setModal({
      isOpen: isOpen,
      action: action
    })
  }

  return {
    optionsRisk,
    setOptionRisk,
    riskAnalysisData,
    dataTable,
    state,
    setState,
    modal,
    actionModal,
    optionsRiskMatrix,
    getMasterRiskMatrix,
    getRiskAnalysisData,
    updateOrCreateOrDelete
  }
}

export default useRiskAnalysisVM