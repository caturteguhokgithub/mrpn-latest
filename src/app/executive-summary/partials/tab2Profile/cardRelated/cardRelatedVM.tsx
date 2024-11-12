import {useExsumContext, useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import React, {useEffect, useState} from "react";
import {
  ExsumRelatedInitState, exsumRelatedInitStateData, ExsumRelatedReqCh1Dto, ExsumRelatedReqCh2Dto,
  ExsumRelatedDto,
  initExsumRelatedDto, UpdateRelatedByExsumIdServiceModel, DeleteRelatedByExsumIdServiceModel
} from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import {API_CODE} from "@/lib/core/api/apiModel";
import {doGetMasterListKebijakan} from "@/app/misc/master/masterService";
import {MiscMasterListKebijakanRes} from "@/app/misc/master/masterServiceModel";
import {
  doCreate,
  doDelete,
  doGet,
  doUpdate
} from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedService";

const useCardRelatedVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const {exsum} = useExsumContext()

  const [options, setOptions] = useState<MiscMasterListKebijakanRes[]>([])
  const [data, setData] = useState<ExsumRelatedDto[]>([])
  const [request, setRequest] = useState<ExsumRelatedDto>({ ...initExsumRelatedDto })

  const iReq = JSON.parse(JSON.stringify(exsumRelatedInitStateData));
  const [state, setState] = useState<ExsumRelatedInitState>(iReq)
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);

  async function getMiscMasterListKebijakan(){
    const response = await doGetMasterListKebijakan({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result: MiscMasterListKebijakanRes[] = response.result;
      if (result) {
        setOptions(result)
      }
    }
  }

  async function getData() {
    const response = await doGet({
      body: {
        exsum_id: exsum.id
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumRelatedDto[] = response.result;
      if (result) {
        setData(result)
      } else {
        setData([])
      }
    }
  }

  useEffect(() => {
    getMiscMasterListKebijakan()
    if (exsum.id !== 0) {
      getData();
    }
  }, [exsum]);

  const updateData = async () => {
    let req:ExsumRelatedDto = {
      id: state.id,
      exsum_id: exsum.id,
      value: state.value,
      kebijakan: []
    }

    let opt:ExsumRelatedReqCh1Dto[] = []
    state.options.map(x => {
      let opt2:ExsumRelatedReqCh2Dto[] = []
      x.list.map(y => {
        if(y?.isCheck){
          opt2.push({src_kebijakan_list_id:y.id})
        }
      })
      opt.push({src_kebijakan_id:x.id, list:opt2})
    })

    req.kebijakan = opt

    const params:UpdateRelatedByExsumIdServiceModel = {
      body:req,
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    }

    let response;
    if (req.id == 0){
      response = await doCreate(params)
    }else{
      response = await doUpdate(params)
    }
    if (response?.code == API_CODE.success) {
      getData()
      setModal(false)
    }

  }

  const deleteData = async () => {
    const params:DeleteRelatedByExsumIdServiceModel = {
      body: {id:state.id},
      loadingContext:loadingContext,
      errorModalContext:errorModalContext
    }
    const response = await doDelete(params)
    if (response?.code == API_CODE.success) {
      getData()
      setModalDelete(false)
    }
  }

  return {
    options,
    data,
    request,
    setRequest,
    state,
    setState,
    modal,
    setModal,
    updateData,
    deleteData,
    modalDelete,
    setModalDelete
  }

}

export default useCardRelatedVM;