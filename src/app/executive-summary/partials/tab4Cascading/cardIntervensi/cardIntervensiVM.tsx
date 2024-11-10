import {useExsumContext, useGlobalModalContext, useLoading, useRKPContext} from "@/lib/core/hooks/useHooks";
import {useEffect, useState} from "react";
import {ProPDto, RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {doGetPROP, doGetRO} from "@/app/misc/rkp/rkpService";
import {API_CODE} from "@/lib/core/api/apiModel";
import {
  ExsumInterventionProjectReqDto,
  ExsumInterventionState, initExsumInterventionState, ProjectTargetAnggaranDto, UpdateById, UpdateV2ExsumIntervention
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import {
  MiscMasterListStakeholderRes,
  MiscMasterListSumberPendanaanRes,
  MiscMasterRPJMNRes
} from "@/app/misc/master/masterServiceModel";
import {
  doGetMasterListRpjmn,
  doGetMasterListStakeholder,
  doGetMasterListSumberPendanaan
} from "@/app/misc/master/masterService";
import {
  doCreateIntervention, doDeleteInterventionOnlyRO,
  doGetIntervention, doUpdateInterventionOnlyRO
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiService";

const useCardIntervensiVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const {exsum} = useExsumContext()
  const {year,rpjmn, setRpjmn} = useRKPContext(state => state)

  const [listProP, setListProP] = useState<ProPDto[]>([])
  const [listSof, setListSof] = useState<MiscMasterListSumberPendanaanRes[]>([])
  const [listStakeholder, setListStakeholder] = useState<MiscMasterListStakeholderRes[]>([])
  const [modal, setModal] = useState<{ action: boolean, type: string }>({action: false, type: ""})
  const [modalDelete, setModalDelete] = useState(false);

  const [state, setState] = useState<ExsumInterventionState>({...initExsumInterventionState})
  const [data, setData] = useState<RoDto[]>([])

  async function getRpjmn() {
    const response = await doGetMasterListRpjmn({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })
    if (response?.code == API_CODE.success) {
      const result: MiscMasterRPJMNRes = response.result
      setRpjmn(result)
    }
  }

  async function getListProP() {
    if (exsum.id == 0){
      setListProP([])
      return
    }
    const response = await doGetPROP({
      body: {
        by: exsum.level,
        id: [exsum.ref_id]
      },
      errorModalContext: errorModalContext,
      loadingContext: loadingContext
    })
    if (response?.code == API_CODE.success) {
      const result: ProPDto[] = response.result
      setListProP(result)
    }
  }

  async function getListSumberPendanaan() {
    const response = await doGetMasterListSumberPendanaan({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListSumberPendanaanRes[] = response.result
      if (result) {
        setListSof(result)
      }
    }
  }

  async function getListStakeholder() {
    const response = await doGetMasterListStakeholder({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListStakeholderRes[] = response.result
      if (result) {
        setListStakeholder(result)
      }
    }
  }

  function handleChangeState<T>(data: T) {
    if (modal.type == "RO") {
      setState(prev => {
        return {
          ...prev,
          prop: undefined,
          ro: (data as RoDto[])
        }
      })
    }

    if (modal.type == "NON_RO" || modal.type == "NON_RO_UPDATE") {
      setState(prev => {
        return {
          ...prev,
          ro: [],
          prop: (data as ProPDto)
        }
      })
    }
  }

  async function getData() {
    const response = await doGetIntervention({
      body: {exsum_id: exsum.id},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })
    if (response?.code == API_CODE.success) {
      const result: RoDto[] = response.result

      setData(result)

      const roOnly = result.filter(x => x.type == "RO")
      setState(prev => {
        return {
          ...prev,
          ro: roOnly
        }
      })
    }
  }

  const handleSubmit = async () => {

    if ((modal.type == "NON_RO" || modal.type == "NON_RO_UPDATE") && (state.prop == undefined || state.kementrian == undefined)) {
      return
    }

    if (modal.type == "NON_RO_UPDATE"){
     const req:UpdateV2ExsumIntervention = {
       body: {
         id: state.id,
         prop: state.prop?.id ?? 0,
         code: state.code,
         nomenklatur: state.nomenklatur,
         kementrian_id: state.kementrian?.id ?? 0,
         indikator: state.indikator,
         target: state.list[0].target,
         satuan: state.list[0].satuan,
         anggaran: state.list[0].anggaran,
         sumber_anggaran: state.list[0].sumber_anggaran,
         type: modal.type,
         intervention: year == 0 ? true : state.intervensi
       },
       loadingContext: loadingContext,
       errorModalContext: errorModalContext,
     }
      const response = await doUpdateInterventionOnlyRO(req)
      if (response?.code == API_CODE.success) {
        await getData()
        setModal({action:false,type:""})
      }
      return
    }

    const request: ExsumInterventionProjectReqDto = {
      id: 0,
      exsum_id: exsum.id,
      type: modal.type,
      code: state.code,
      prop: state.prop?.id ?? 0,
      kementrian_id: state.kementrian?.id ?? 0,
      nomenklatur: state.nomenklatur,
      indikator: state.indikator,
      list: state.list,
      list_ro: state.ro,
      intervention: year == 0 ? true : state.intervensi
    }
    const response = await doCreateIntervention({
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })
    if (response?.code == API_CODE.success) {
      await getData()
      setModal({action:false,type:""})
    }
  }

  const handleModalDelete = async () => {
    const response = await doDeleteInterventionOnlyRO({
      body: {id : state.id},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })
    if (response?.code == API_CODE.success) {
      await getData()
      setModalDelete(false)
    }
  };

  return {
    year,
    exsum,
    rpjmn,
    state,
    setState,
    handleChangeState,
    data,
    listProP,
    listStakeholder,
    modal,
    setModal,
    handleSubmit,
    getRpjmn,
    getListProP,
    getListSumberPendanaan,
    getListStakeholder,
    getData,
    listSof,
    modalDelete,
    setModalDelete,
    handleModalDelete,
  }
}

export default useCardIntervensiVM;