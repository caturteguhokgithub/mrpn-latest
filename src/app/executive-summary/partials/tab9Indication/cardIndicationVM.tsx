import {useExsumContext, useGlobalModalContext, useLoading, useRKPContext} from "@/lib/core/hooks/useHooks";
import React, {useEffect, useState} from "react";
import {
  COORDINATOR,
  ExsumIndicationReqDto, ExsumIndicationResDto,
  ExsumIndicationState, ExsumIndicationStateValue, ExsumIndicationValueReqDto, IndicationReqDto,
  initStateExsumIndication, MAIN, OthersEntityState, StakeholderReqDto, StakeholderResDto, StakeholderResGroupDto
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import {
  doCreateIndication, doDeleteIndication,
  doGetIndication, doUpdateIndication
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationService";
import {API_CODE} from "@/lib/core/api/apiModel";
import {RoDto} from "@/app/misc/rkp/rkpServiceModel";
import {doGetRO} from "@/app/misc/rkp/rkpService";
import {doGetSystemParamByModuleAndName} from "@/app/misc/sysparams/sysParamService";
import useCardTOWSVM from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsVM";
import {MiscMasterListStakeholderRes} from "@/app/misc/master/masterServiceModel";
import {doGetMasterListStakeholder} from "@/app/misc/master/masterService";
import {GetSysParamsServiceResModel} from "@/app/misc/sysparams/sysParamServiceModel";
import useCardSWOTVM from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotVM";
import {
  ExsumSWOTValuesDto
} from "@/app/executive-summary/partials/tab1Background/cardSwot/cardSwotModel";

const useCardIndicationVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const {exsum} = useExsumContext()
  const useCardSWOT = useCardSWOTVM();
  const {year,rpjmn} = useRKPContext(store => store)

  const [optionRiskType, setOptionRiskType] = useState<string[]>([])
  const [optionStrategy, setOptionStrategy] = useState<ExsumSWOTValuesDto[]>([])
  const [optionRO, setOptionRO] = useState<RoDto[]>([])
  const [optionStakeholder, setOptionStakeholder] = useState<MiscMasterListStakeholderRes[]>([])
  const [data, setData] = useState<ExsumIndicationResDto[]>([])

  const initState:ExsumIndicationState = JSON.parse(JSON.stringify(initStateExsumIndication))
  const [state, setState] = useState<ExsumIndicationState>(initState)
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalOpenDelete, setModalOpenDelete] = React.useState(false);

  const tows = useCardTOWSVM()

  const roInit:RoDto = {
    id: 0,
    src_rkp_prop_id: 0,
    tahun: 0,
    code: "",
    value: "-- Output Non RO --",
    kementerian: "",
    kementrian_id: "",
    kementrian: {
      id: 0,
      short: "",
      code: "",
      value: "",
      icon: ""
    },
    pkkr: "",
    target: "",
    fisik: "",
    satuan: "",
    lokasi_ro: "",
    alokasi: 0,
    anggaran: 0,
    sumber_anggaran: "",
    type: "RO",
    intervention: false,
    type_stakeholder: "",
    detail: [],
    lokasi: []
  }

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

  async function getOptionRO() {
    const response = await doGetRO({
      body: {
        by: exsum.level,
        id: [exsum.ref_id],
        tahun: year == 0 ? rpjmn?.start+"-"+rpjmn?.end : year
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success) {
      let result: RoDto[] = response.result

      result.push(roInit)
      setOptionRO(result)
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

  async function getData() {
    const response = await doGetIndication({
      body: {
        exsum_id: exsum.id
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success) {
      let result: ExsumIndicationResDto[] = response.result == null ? [] : response.result

      result.map((res,index) => {
        res.perlakuan.map((prl, indexPrl) => {
          let stData:StakeholderResGroupDto = {}
          prl.stakeholder.map((st) => {
            if (stData.hasOwnProperty(st.group.type)){
              stData[st.group.type].push(st)
            } else {
              stData[st.group.type] = [st]
            }
          })
          result[index].perlakuan[indexPrl].groupStakeholder = stData
        })
      })

      setData(result)
    }
  }

  const updateData = async () => {

    let values:ExsumIndicationValueReqDto[] = []
    state.values.map(value => {

      let stakeholders:StakeholderReqDto[] = []

      // const coordinatorStakeholder = value.stakeholder.coordinator
      // if (coordinatorStakeholder == undefined) return
      // stakeholders.push({
      //   type: COORDINATOR,
      //   id: coordinatorStakeholder.id
      // })
      //
      // const mainStakeholder = value.stakeholder.main
      // if (mainStakeholder == undefined) return
      // mainStakeholder.map(d => {
      //   stakeholders.push({
      //     type: MAIN,
      //     id: d.id
      //   })
      // })
      //
      // const othersStakeholder = value.stakeholder.others
      // if (othersStakeholder == undefined) return
      // othersStakeholder.map(d => {
      //   d.entity.map(e => {
      //     stakeholders.push({
      //       type: d.type,
      //       id: e.id
      //     })
      //   })
      // })

      const mainStakeholder = value.stakeholderMultiple
      if (mainStakeholder == undefined) return
      mainStakeholder.map(d => {
        stakeholders.push({
          type: MAIN,
          id: d.id
        })
      })

      const val:ExsumIndicationValueReqDto = {
        tahun:value.tahun,
        perlakuan_risiko: value.perlakuan_risiko,
        rincian_output_id: value.rincian_output?.id ?? 0,
        value:value.non_rincian_output,
        stakeholder: stakeholders
      }

      if (val.tahun.length > 0 ){
        values.push(val)
      }

    })

    const requestDto:ExsumIndicationReqDto = {
      id: state.id,
      exsum_id: exsum.id,
      swot_id: state.tows?.id ?? 0,
      indikasi_risiko: state.indikasi_risiko,
      kategori_risiko: state.kategori_risiko,
      values: values
    }

    let response
    if (requestDto.id == 0){
      response = await doCreateIndication({
        body:requestDto,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      })
    }else{
      response = await doUpdateIndication({
        body:requestDto,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      })
    }

    if (response?.code == API_CODE.success){
      getData()
      setModalOpen(false)
    }

  }

  async function deleteData(){
    const response = await doDeleteIndication({
      body: {id:state.id},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })
    if (response?.code == API_CODE.success){
      getData()
      setModalOpen(false)
      setModalOpenDelete(false)
    }
  }

  const handleModalOpenDelete = (id:number) => {
    setState(prevState => {
      return {
        ...prevState,
        id:id
      }
    })
    setModalOpenDelete(true)
  }

  const handleModalOpen = (id:number) => {
    if (id == 0) {
      const initState:ExsumIndicationState = JSON.parse(JSON.stringify(initStateExsumIndication))
      setState(initState)
    } else {

      const getIndex = data.findIndex(x => x.id == id)
      const dataByIndex = data[getIndex]

      let values:ExsumIndicationStateValue[] = []
      dataByIndex.perlakuan.map(prl => {
        const val:ExsumIndicationStateValue = {
          id: prl.id,
          tahun:prl.tahun,
          perlakuan_risiko: prl.perlakuan_risiko,
          rincian_output: prl.ro == undefined ? roInit : prl.ro,
          non_rincian_output: prl.nonro?.value ?? "",
          stakeholderMultiple: prl.stakeholder,
          stakeholder: {
            coordinator: undefined,
            main: [],
            others: []
          }
        }
        values.push(val)
      })

      const stateData:ExsumIndicationState = {
        id: id,
        tows: dataByIndex.tows,
        indikasi_risiko: dataByIndex.indikasi_risiko,
        kategori_risiko: dataByIndex.kategori_risiko,
        values: values
      }
      setState(stateData)

    }
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const data = useCardSWOT.data
    if (data != undefined) {
      setOptionStrategy(data.values)
    }
  }, [useCardSWOT.data]);

  useEffect(() => {
    if (optionRiskType.length == 0) getOptionRiskType()
    if (optionStakeholder.length == 0) getOptionStakeholder()
    if (exsum.id > 0) {
      getOptionRO()
      getData()
    };
  }, [exsum]);

  return {
    data,
    state,
    setState,
    optionRO,
    optionStrategy,
    optionRiskType,
    optionStakeholder,
    modalOpen,
    setModalOpen,
    updateData,
    handleModalOpen,
    handleModalClose,
    modalOpenDelete,
    setModalOpenDelete,
    handleModalOpenDelete,
    deleteData,
    dataTOWS:tows.data.tows
  }

}

export default useCardIndicationVM;