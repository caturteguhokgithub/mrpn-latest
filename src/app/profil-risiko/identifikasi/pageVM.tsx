import {useState} from "react";
import {
  doGetIdentificationRisk,
  doCreateIdentificationRisk, doUpdateIdentificationRisk, doDeleteIdentificationRisk
} from "@/app/profil-risiko/identifikasi/pageService";
import {useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {API_CODE, ResponseBaseDto} from "@/lib/core/api/apiModel";
import {
  IdentificationRiskAddReqDto,
  IdentificationRiskResDto,
  initIdentificationRiskAddReqDto, UpdateOrCreateIdentificationRiskServiceModel
} from "@/app/profil-risiko/identifikasi/pageModel";
import {doGetSystemParamByModuleAndName} from "@/app/misc/sysparams/sysParamService";
import {GetSysParamsServiceResModel} from "@/app/misc/sysparams/sysParamServiceModel";

const useIdentificationRiskVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const {
    objectState
  } = usePenetapanGlobalVM()

  const [modal, setModal] = useState<{isOpen:boolean, action:string}>({isOpen:false, action:"create"})
  const [dataIdentificationRisk, setDataIdentificationRisk] = useState<IdentificationRiskResDto|undefined>(undefined)

  const getIdentificationRiskData = async () => {
    const response = await doGetIdentificationRisk({
      body: {
        uraian_penetapan_objek_id: objectState?.id ?? 0
      },
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code === API_CODE.success){
      const result:IdentificationRiskResDto = response.result
      setDataIdentificationRisk(result)
    }
  }

  const [optionRiskType, setOptionRiskType] = useState<string[]>([])
  async function getOptionRiskType(){
    const response = await doGetSystemParamByModuleAndName({
      body: {
        module:"RISK",
        name:"RISK_TYPE"
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success) {
      let result: GetSysParamsServiceResModel = response.result
      const paramValue:string[] = JSON.parse(result.value);
      setOptionRiskType(paramValue)
    }
  }

  const initReq:IdentificationRiskAddReqDto = JSON.parse(JSON.stringify(initIdentificationRiskAddReqDto))
  const [request, setRequest] = useState<IdentificationRiskAddReqDto>(initReq)

  const actionModal = (isOpen: boolean, action: string, id?:number) => {
    let initReq:IdentificationRiskAddReqDto = JSON.parse(JSON.stringify(initIdentificationRiskAddReqDto))
    if (id != undefined){
      const data = dataIdentificationRisk?.profile_risiko ?? []
      const getIndex = data.findIndex(x => x.id === id)
      if (getIndex > -1){
        const reqData = data[getIndex]
        initReq = {
         id: reqData.id,
         uraian_penetapan_objek_id: reqData.uraian_penetapan_objek_id,
         kategori_risiko: reqData.kategori_risiko,
         insidentil: reqData.insidentil,
         peristiwa_risiko: reqData.peristiwa_risiko,
         penyebab: reqData.penyebab_dampak.penyebab,
         dampak: reqData.penyebab_dampak.dampak
       }
      }
    }

    setRequest(initReq)

    setModal({
      isOpen: isOpen,
      action: action
    })
  }

  const updateOrCreateOrDelete = async () => {

    const req:IdentificationRiskAddReqDto = {
      ...request,
      uraian_penetapan_objek_id:objectState?.id ?? 0
    }

    let response
    if (modal.action !== "delete"){

      if (req.id == 0){
        response = await doCreateIdentificationRisk({
          body:req,
          loadingContext:loadingContext,
          errorModalContext:errorModalContext
        })
      } else {
        response = await doUpdateIdentificationRisk({
          body:req,
          loadingContext:loadingContext,
          errorModalContext:errorModalContext
        })
      }

    } else{
      response = await doDeleteIdentificationRisk({
        body:req,
        loadingContext:loadingContext,
        errorModalContext:errorModalContext
      })
    }

    if (response?.code === API_CODE.success){
      getIdentificationRiskData()
      setModal({isOpen:false,action:"create"})
    }

  }

  return {
    modal,
    setModal,
    getIdentificationRiskData,
    dataIdentificationRisk,
    setDataIdentificationRisk,
    request,
    setRequest,
    updateOrCreateOrDelete,
    optionRiskType,
    getOptionRiskType,
    actionModal
  }

}

export default useIdentificationRiskVM;