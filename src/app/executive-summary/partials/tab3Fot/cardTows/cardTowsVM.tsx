import {useExsumContext, useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import React, {useEffect, useState} from "react";
import {
  ExsumTWOSResDto,
  ExsumTWOSOptions,
  ExsumTWOSReqDto,
  initExsumTWOSRequestDto,
  UpdateTOWSByExsumIdServiceModel,
  initExsumTWOSResDto,
  ExsumTWOSReqDtoV2,
  UpdateTOWSByExsumIdServiceModelV2,
} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsModel";
import {API_CODE} from "@/lib/core/api/apiModel";
import {
  doCreate,
  doCreateV2,
  doGet,
  doUpdate,
  doUpdateV2
} from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsService";

const useCardTOWSVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext()

  const initTows = JSON.parse(JSON.stringify(initExsumTWOSResDto))
  const [ data, setData ] = useState<ExsumTWOSResDto>(initTows)
  const [ request, setRequest ] = useState<ExsumTWOSReqDto>(initExsumTWOSRequestDto)
  const [ options, setOptions ] = useState<ExsumTWOSOptions>()
  const [ modalOpen, setModalOpen] = React.useState(false);

  async function getData() {
    const response = await doGet({
      body: {
        exsum_id: exsum.id
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const initTows = JSON.parse(JSON.stringify(initExsumTWOSResDto))
      const result:ExsumTWOSResDto = response.result == null ? initTows : response.result
      if (result) {

        setData(result)
        setOptions(result.options)

        if (result.tows.length){
          const req:ExsumTWOSReqDto = {
            exsum_id: exsum.id,
            values: result.tows
          }
          setRequest(req)
        }
      }
    }
  }

  async function updateData(){
    const req:ExsumTWOSReqDto = {...request}
    req.exsum_id = exsum.id
    const params:UpdateTOWSByExsumIdServiceModel = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    }

    let response
    if (data.tows.length == 0){
      response = await doCreate(params)
    }else{
      response = await doUpdate(params)
    }

    if (response?.code == API_CODE.success) {
      getData().then(r => {
        setModalOpen(false)
      })
    }
  }

  async function updateDataV2(){
    const req:ExsumTWOSReqDto = {...request}
    req.exsum_id = exsum.id

    const reqV2:ExsumTWOSReqDtoV2 = {
      exsum_id : exsum.id,
      values: JSON.stringify(req.values)
    }
    const params:UpdateTOWSByExsumIdServiceModelV2 = {
      body: reqV2,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    }

    let response
    if (data.tows.length == 0){
      response = await doCreateV2(params)
    }else{
      response = await doUpdateV2(params)
    }

    if (response?.code == API_CODE.success) {
      getData().then(r => {
        setModalOpen(false)
      })
    }
  }

  useEffect(() => {
    if (exsum.id !== 0) {
      getData();
    }
  }, [exsum]);

  return {
    data,
    options,
    setOptions,
    request,
    setRequest,
    modalOpen,
    setModalOpen,
    updateData:updateDataV2
  }

}

export default useCardTOWSVM;