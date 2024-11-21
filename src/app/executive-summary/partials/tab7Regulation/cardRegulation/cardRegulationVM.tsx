import {
  doCreateMasterPerpres,
  doGetMasterListPerpres,
  doGetMasterListStakeholder
} from "@/app/misc/master/masterService";
import {useExsumContext, useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import React, {useEffect, useState} from "react";
import {
  MiscMasterListPerpresCreateReq,
  MiscMasterListPerpresRes,
  MiscMasterListStakeholderRes
} from "@/app/misc/master/masterServiceModel";
import {API_CODE} from "@/lib/core/api/apiModel";
import {
  ExsumRegulationDto, ExsumRegulationResDto,
  initExsumRegulationDto
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import {
  doCreate,
  doDelete,
  doGet
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationService";

const initCreatePerpres = {
  title:"",
  value:"",
  flag:"new"
}

const useCardRegulationVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext()

  const [optionStakeholder, setOptionStakeholder] = useState<MiscMasterListStakeholderRes[]>([])

  const initStatePerpres = JSON.parse(JSON.stringify(initCreatePerpres))
  const [perpresState, setPerpresState] = useState<MiscMasterListPerpresCreateReq>(initStatePerpres)

  const [modalPeraturan, setModalPeraturan] = React.useState(false);
  const [perpres, setPerpres] = useState<MiscMasterListPerpresRes[]>([])
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data,setData] = useState<ExsumRegulationResDto[]>([])
  const initReq:ExsumRegulationDto = JSON.parse(JSON.stringify(initExsumRegulationDto))
  const [request, setRequest] = useState<ExsumRegulationDto>(initReq)

  async function getListPerpres(){
    const response = await doGetMasterListPerpres({
      body:{},
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      const result:MiscMasterListPerpresRes[] = response.result
      if (result){
        setPerpres(result)
      }
    }
  }

  async function createListPerpres(){
    const response = await doCreateMasterPerpres({
      body:perpresState,
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      getListPerpres()
      const initStatePerpres = JSON.parse(JSON.stringify(initCreatePerpres))
      setPerpresState(initStatePerpres)
      setModalPeraturan(false)
    }
  }

  async function getOptionStakeholder() {
    const response = await doGetMasterListStakeholder({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListStakeholderRes[] = response.result
      if (result) {
        setOptionStakeholder(result)
      }
    }
  }

  async function getData(){
    const response = await doGet({
      body:{exsum_id:exsum.id},
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      const result:ExsumRegulationResDto[] = response.result
      if (result){
        setData(result)
      }
    }
  }

  async function createData(){
    let req:ExsumRegulationDto = request
    req.exsum_id = exsum.id
    const response = await doCreate({
      body:req,
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      getData()
      setModalOpen(false)
      const initReq:ExsumRegulationDto = JSON.parse(JSON.stringify(initExsumRegulationDto))
      setRequest(initReq)
    }
  }

  async function deleteData(id:number){
    const response = await doDelete({
      body:{id:id},
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    })
    if (response?.code == API_CODE.success){
      getData()
      setModalOpen(false)
    }
  }

  useEffect(() => {
    if (optionStakeholder.length == 0) getOptionStakeholder();
    if (perpres.length == 0) getListPerpres();
    if (exsum.id !== 0) getData();
  }, [exsum]);

  return {
    data,
    optionStakeholder,
    perpres,
    modalOpen,
    setModalOpen,
    request,
    setRequest,
    createData,
    deleteData,
    perpresState,
    setPerpresState,
    createListPerpres,
    modalPeraturan,
    setModalPeraturan
  }

}

export default useCardRegulationVM