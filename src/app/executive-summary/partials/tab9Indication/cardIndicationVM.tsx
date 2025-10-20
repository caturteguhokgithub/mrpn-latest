import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import {
  COORDINATOR,
  ExsumIndicationReqDto,
  ExsumIndicationResDto,
  ExsumIndicationState,
  ExsumIndicationStateValue,
  ExsumIndicationValueReqDto,
  ExsumProfilRisikoOverview,
  IndicationReqDto,
  initStateExsumIndication,
  initStateExsumIndicationValue,
  MAIN,
  ModalDto,
  OthersEntityState,
  StakeholderReqDto,
  StakeholderResDto,
  StakeholderResGroupDto,
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationModel";
import {
  doCreateIndication,
  doDeleteIndication,
  doGetIndication,
  doGetRefIndication,
  doUpdateIndication,
} from "@/app/executive-summary/partials/tab9Indication/cardIndicationService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { ProPDto, RODataTable, RoDto } from "@/app/misc/rkp/rkpServiceModel";
import { doGetNonRO, doGetPROP, doGetRO } from "@/app/misc/rkp/rkpService";
import { doGetSystemParamByModuleAndName } from "@/app/misc/sysparams/sysParamService";
import useCardTOWSVM from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsVM";
import {
  initMiscMasterListPerpres,
  MiscMasterListPerpresCreateReq,
  MiscMasterListPerpresRes,
  MiscMasterListProvinsiRes,
  MiscMasterListStakeholderRes,
  MiscMasterListSumberPendanaanRes,
} from "@/app/misc/master/masterServiceModel";
import {
  doCreateMasterPerpres,
  doGetMasterListPerpres,
  doGetMasterListProvinsi,
  doGetMasterListStakeholder,
  doGetMasterListSumberPendanaan,
} from "@/app/misc/master/masterService";
import { GetSysParamsServiceResModel } from "@/app/misc/sysparams/sysParamServiceModel";
import { GenerateProjectData, GenerateRpjmnYear } from "@/lib/utils/common";
import {
  ExsumRegulationDto,
  initExsumRegulationDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";
import {
  ExsumInterventionProjectReqDto,
  ExsumInterventionState,
  initProjectReqDto,
  ProjectReqDto,
  UpdateV2ExsumIntervention,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiModel";
import {
  doCreateIntervention,
  doCreateInterventionNonRo,
  doDeleteInterventionOnlyRO,
  doUpdateInterventionOnlyRO,
} from "@/app/executive-summary/partials/tab4Cascading/cardIntervensi/cardIntervensiService";
import { grey } from "@mui/material/colors";

const useCardIndicationVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();
  const { year, rpjmn } = useRKPContext((store) => store);

  // DATA
  const [data, setData] = useState<ExsumIndicationResDto[]>([]);
  const [dataProfilOverview, setDataProfilOverview] = useState<ExsumProfilRisikoOverview[]>([]);

  // Non RO
  const [reqNonRo, setReqNonRo] = useState<ProjectReqDto>({
    ...initProjectReqDto,
  });

  // OPTION
  const [optionRiskType, setOptionRiskType] = useState<string[]>([]);
  const [optionRO, setOptionRO] = useState<RoDto[]>([]);
  const [optionNonRO, setOptionNonRO] = useState<RoDto[]>([]);
  const [dataTableNonRO, setDataTableNonRO] = useState<RODataTable[]>([]);
  const [dataTable, setDataTable] = useState<RODataTable[]>([]);
  const [optionStakeholder, setOptionStakeholder] = useState<
    MiscMasterListStakeholderRes[]
  >([]);
  const [listLocation, setListLocation] = useState<MiscMasterListProvinsiRes[]>(
    []
  );
  const [listProP, setListProP] = useState<ProPDto[]>([]);
  const [listSof, setListSof] = useState<MiscMasterListSumberPendanaanRes[]>(
    []
  );
  const [listPerpres, setListPerpres] = useState<MiscMasterListPerpresRes[]>(
    []
  );
  const [modalNomenklatur, setModalNomenklatur] = useState(false);
  const [modalReference, setModalReference] = useState(false);

  // STATE
  const initState: ExsumIndicationState = JSON.parse(
    JSON.stringify(initStateExsumIndication)
  );
  const [state, setState] = useState<ExsumIndicationState>(initState);
  const initStateValue: ExsumIndicationStateValue = JSON.parse(
    JSON.stringify(initStateExsumIndicationValue)
  );
  const [stateValue, setStateValue] =
    useState<ExsumIndicationStateValue>(initStateValue);
  const initStateRegulation: ExsumRegulationDto = JSON.parse(
    JSON.stringify(initExsumRegulationDto)
  );
  const [stateRegulation, setStateRegulation] =
    useState<ExsumRegulationDto>(initStateRegulation);
  const initStatePerpres = JSON.parse(
    JSON.stringify(initMiscMasterListPerpres)
  );
  const [stateNewRegulation, setStateNewRegulation] =
    useState<MiscMasterListPerpresCreateReq>(initStatePerpres);

  const [edited, setEdited] = useState(false);

  // MODAL
  const [modalOpen, setModalOpen] = useState<ModalDto>({
    index: -1,
    action: false,
    type: "",
  });
  const [modalOutput, setModalOutput] = useState<ModalDto>({
    index: -1,
    action: false,
    type: "",
  });
  const [modalRegulation, setModalRegulation] = useState<ModalDto>({
    index: -1,
    action: false,
    type: "",
  });
  const [modalNewRegulation, setModalNewRegulation] = useState<ModalDto>({
    index: -1,
    action: false,
    type: "",
  });

  const tows = useCardTOWSVM();

  async function getOptionRiskType() {
    const response = await doGetSystemParamByModuleAndName({
      body: {
        module: "RISK",
        name: "RISK_TYPE",
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: GetSysParamsServiceResModel = response.result;
      const paramValue: string[] = JSON.parse(result.value);
      setOptionRiskType(paramValue);
    }
  }

  async function getOptionRO() {
    const response = await doGetRO({
      body: {
        by: exsum.level,
        id: [exsum.ref_id],
        tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: RoDto[] = response.result;

      setOptionRO(result);

      const dataTable = GenerateProjectData(result, year, rpjmn);
      const roOnly = dataTable.filter((x) => x.type == "RO");
      setDataTable(roOnly);
    }
  }

  async function getOptionStakeholder() {
    const response = await doGetMasterListStakeholder({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListStakeholderRes[] = response.result;
      if (result) {
        setOptionStakeholder(result);
      }
    }
  }

  async function getListLocation() {
    const response = await doGetMasterListProvinsi({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result: MiscMasterListProvinsiRes[] = response.result;
      if (result) {
        setListLocation(result);
      }
    }
  }

  async function getListProP() {
    if (exsum.id == 0) {
      setListProP([]);
      return;
    }
    const response = await doGetPROP({
      body: {
        by: exsum.level,
        id: [exsum.ref_id],
      },
      errorModalContext: errorModalContext,
      loadingContext: loadingContext,
    });
    if (response?.code == API_CODE.success) {
      const result: ProPDto[] = response.result;
      setListProP(result);
    }
  }

  async function getListSumberPendanaan() {
    const response = await doGetMasterListSumberPendanaan({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListSumberPendanaanRes[] = response.result;
      if (result) {
        setListSof(result);
      }
    }
  }

  async function getListPerpres() {
    const response = await doGetMasterListPerpres({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListPerpresRes[] = response.result;
      if (result) {
        setListPerpres(result);
      }
    }
  }

  async function getData() {
    const response = await doGetIndication({
      body: {
        exsum_id: exsum.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumIndicationResDto[] =
        response.result == null ? [] : response.result;

      if (result.length > 0) {
        result.map((res, index) => {
          res.perlakuan.map((prl, indexPrl) => {
            let stData: StakeholderResGroupDto = {};
            prl.stakeholder.map((st) => {
              if (stData.hasOwnProperty(st.group.type)) {
                stData[st.group.type].push(st);
              } else {
                stData[st.group.type] = [st];
              }
            });
            result[index].perlakuan[indexPrl].groupStakeholder = stData;
          });
        });

        setData(result);
        setEdited(result[0]?.isEdit ?? false);
      }
    }
  }

  async function getDataRef() {
    const response = await doGetRefIndication({
      body: {
        exsum_id: exsum.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumProfilRisikoOverview[] = response.result.ringkasan == null ? [] : response.result.ringkasan;

      setDataProfilOverview(result);
    }
  }

  async function deleteData() {
    const response = await doDeleteIndication({
      body: { id: state.id },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getData();
      setModalOpen({ index: -1, action: false, type: "" });
    }
  }

  async function deleteRONonROForm(value: ExsumIndicationStateValue) {
    if (value.type == "NON_RO" && value.non_rincian_output?.id != 0) {
      const response = await doDeleteInterventionOnlyRO({
        body: { id: value.non_rincian_output?.id ?? 0 },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
      if (response?.code != API_CODE.success) {
        return;
      }
    }

    if (value.type == "RO" && value.rincian_output != undefined) {
      let ro = value.rincian_output;
      ro.intervention = false;

      const request: ExsumInterventionProjectReqDto = {
        id: 0,
        intervention: false,
        exsum_id: exsum.id,
        type: "RO",
        code: "",
        prop: 0,
        kementrian_id: 0,
        nomenklatur: "",
        indikator: "",
        list: [],
        list_ro: [ro],
        tahun: "",
        lokasi: [],
        src_rincian_output_id: 0,
      };

      const response = await doCreateIntervention({
        body: request,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
      if (response?.code !== API_CODE.success) {
        return;
      }
    }
  }

  async function getListNonRO() {
    const response = await doGetNonRO({
      body: {
        by: exsum.level,
        id: [exsum.ref_id],
        tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: RoDto[] = response.result;
      setOptionNonRO(result);

      const dataTable = GenerateProjectData(result, year, rpjmn);
      setDataTableNonRO(dataTable);
    }
  }

  const handleModalOpen = (idData: number, action: boolean, type: string) => {
    if (idData == 0) {
      if (state.id == 0) {
        state.values.map((value) => {
          deleteRONonROForm(value);
        });
      }

      const initState: ExsumIndicationState = JSON.parse(
        JSON.stringify(initStateExsumIndication)
      );
      setState(initState);
    } else {
      const getIndex = data.findIndex((x) => x.id == idData);
      const dataByIndex = data[getIndex];

      let values: ExsumIndicationStateValue[] = [];
      dataByIndex.perlakuan.map((prl) => {
        let rincian_output: RODataTable | undefined = undefined;
        const roID: number = prl.ro?.id ?? 0;

        if (roID > 0 && prl.ro?.type == "RO") {
          const getIndexOptRO = dataTable.findIndex((x) => x.id == roID);
          rincian_output =
            getIndexOptRO > -1 ? dataTable[getIndexOptRO] : undefined;
        }

        let non_rincian_output: RODataTable | undefined = undefined;
        const nonRoID: number = prl.ro?.id ?? 0;
        if (nonRoID > 0 && prl.ro?.type == "NON_RO") {
          const getIndexOptRO = dataTableNonRO.findIndex(
            (x) => x.id == nonRoID
          );
          non_rincian_output =
            getIndexOptRO > -1 ? dataTableNonRO[getIndexOptRO] : undefined;
        }

        // let non_rincian_output: ExsumInterventionState = {
        //   id: 0,
        //   exsum_id: 0,
        //   type: "",
        //   code: "",
        //   kementrian: undefined,
        //   nomenklatur: "",
        //   indikator: "",
        //   list: [],
        //   intervensi: false,
        //   prop: undefined,
        //   ro: [],
        //   tahun: "",
        //   location: [],
        // };
        // if (roID > 0 && prl.ro?.type == "NON_RO") {
        //   const getIndexOptRO = optionRO.findIndex((x) => x.id == roID);
        //   if (getIndexOptRO > -1) {
        //     const thisData = optionRO[getIndexOptRO];

        //     let propData = undefined;
        //     const getPropIndex = listProP.findIndex(
        //       (y) => y.id == thisData.src_rkp_prop_id
        //     );
        //     if (getPropIndex > -1) {
        //       propData = listProP[getPropIndex];
        //     }

        //     non_rincian_output = {
        //       id: thisData.id,
        //       exsum_id: 0,
        //       type: thisData.type,
        //       code: thisData.code,
        //       kementrian: thisData.kementrian,
        //       nomenklatur: thisData.value,
        //       indikator: thisData.pkkr,
        //       list: [],
        //       intervensi: thisData.intervention,
        //       prop: propData,
        //       ro: [],
        //       location: thisData.lokasi,
        //       tahun: year,
        //     };

        //     thisData.detail.map((d, i) => {
        //       const listItem = {
        //         tahun: d.tahun,
        //         target: d.target,
        //         satuan: d.satuan,
        //         anggaran: d.anggaran,
        //         anggaranString: d.anggaran.toString(),
        //         sumber_anggaran: d.sumber_anggaran,
        //       };
        //       non_rincian_output.list.push(listItem);
        //     });
        //   }
        // }

        const val: ExsumIndicationStateValue = {
          id: prl.id,
          tahun: prl.tahun,
          type: prl.ro?.type ?? "RO",
          rincian_output: rincian_output,
          non_rincian_output: non_rincian_output,
          intervention: prl.ro?.intervention ?? false,
        };
        values.push(val);
      });

      let regulationState: ExsumRegulationDto[] = [];
      dataByIndex.regulasi.map((rg) => {
        const row: ExsumRegulationDto = {
          id: rg.id,
          tahun: rg.tahun,
          exsum_id: rg.exsum_id,
          amanat: rg.amanat,
          // perpres_state: rg.perpres.length > 0 ? rg.perpres[0] : undefined,
          // perpres: rg.perpres.reduce<{ id: number }[]>((a, b) => {
          //   return [...a, { id: b.id }];
          // }, []),
          perpres_state:
            rg.perpres.length > 0 && typeof rg.perpres[0] !== "string"
              ? rg.perpres[0]
              : undefined,
          perpres: Array.isArray(rg.perpres)
            ? rg.perpres.reduce<{ id: number }[]>(
              (a, b) => [...a, { id: b.id }],
              []
            )
            : [],
          stakeholder: rg.entitas,
          stakeholder_id: rg.entitas.reduce<number[]>((a, b) => {
            return [...a, b.id];
          }, []),
        };
        regulationState.push(row);
      });

      const stateData: ExsumIndicationState = {
        id: idData,
        tows: dataByIndex.tows,
        indikasi_risiko: dataByIndex.indikasi_risiko,
        kategori_risiko: dataByIndex.kategori_risiko,
        perlakuan_risiko: dataByIndex.indikasi_perlakuan_risiko,
        values: values,
        regulation: regulationState,
      };
      setState(stateData);
    }
    setModalOpen({ index: -1, action: action, type: type });
  };

  const handleModalOpenSubmit = async () => {
    if (
      // state.tows == undefined ||
      state.indikasi_risiko == "" ||
      state.kategori_risiko == "" ||
      state.perlakuan_risiko == ""
      // || state.values.length == 0
      // || state.regulation.length == 0
    ) {
      alert("indikasi, kategori risiko, perlakuan risiko wajib diisi!");
      return;
    }

    let values: ExsumIndicationValueReqDto[] = [];
    state.values.map((value) => {
      let roID: number =
        value.type == "RO"
          ? value.rincian_output?.id ?? 0
          : value.non_rincian_output?.id ?? 0;

      const val: ExsumIndicationValueReqDto = {
        tahun: value.tahun,
        rincian_output_id: roID,
        perlakuan_risiko: "", // remove
        value: "", // remove
        stakeholder: [],
      };

      if (val.tahun.length > 0) {
        values.push(val);
      }
    });

    const requestDto: ExsumIndicationReqDto = {
      id: state.id,
      exsum_id: exsum.id,
      swot_id: state.tows?.id ?? 0,
      indikasi_risiko: state.indikasi_risiko,
      kategori_risiko: state.kategori_risiko,
      indikasi_perlakuan_risiko: state.perlakuan_risiko,
      values: values,
      regulasi: state.regulation,
    };

    let response;
    if (requestDto.id == 0) {
      response = await doCreateIndication({
        body: requestDto,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    } else {
      response = await doUpdateIndication({
        body: requestDto,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    }

    if (response?.code == API_CODE.success) {
      await getData();
      const initState: ExsumIndicationState = JSON.parse(
        JSON.stringify(initStateExsumIndication)
      );
      setState(initState);

      await getOptionRO();
      setModalOpen({ index: -1, action: false, type: "" });
    }
  };

  const handleModalOutputOpen = async (
    index: number,
    action: boolean,
    type: string
  ) => {
    if (type == "delete") {
      const value = state.values[index];

      await deleteRONonROForm(value);

      setState((prevState) => {
        let values = prevState.values;
        values.splice(modalOutput.index, 1);
        return {
          ...prevState,
          values: values,
        };
      });
      return;
    }

    let initStateValue: ExsumIndicationStateValue = JSON.parse(
      JSON.stringify(initStateExsumIndicationValue)
    );
    initStateValue.type = type;

    if (index > -1) {
      initStateValue = state.values[index];
    }

    if (year > 0) {
      initStateValue.tahun = [year];
    }

    setStateValue(initStateValue);
    setModalOutput({ index, action: action, type: type });
  };

  const handleModalOutputSubmit = async () => {
    if (modalOutput.type == "delete") {
      return;
    }

    if (stateValue.tahun.length == 0) {
      return;
    }

    // ________________________________________________
    let ro = stateValue.rincian_output;
    let nonro = stateValue.non_rincian_output;

    const request: ExsumInterventionProjectReqDto = {
      id: 0,
      intervention: stateValue.intervention ?? false,
      exsum_id: exsum.id,
      type: stateValue.type,
      code: "",
      prop: 0,
      kementrian_id: 0,
      nomenklatur: "",
      indikator: "",
      list: [],
      tahun: year > 0 ? year : rpjmn?.start + "-" + rpjmn?.end,
      lokasi: [],
      src_rincian_output_id: 0,
      list_ro: [],
    };

    if (stateValue.type == "RO" && ro != undefined) {
      request.src_rincian_output_id = ro.id;
      request.id = ro.id;
    } else if (stateValue.type == "NON_RO" && nonro != undefined) {
      request.src_rincian_output_id = nonro.id ?? 0;
      request.id = nonro.id;
    } else {
      return;
    }

    const response = await doCreateIntervention({
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code !== API_CODE.success) {
      return;
    }

    setState((prevState) => {
      let thisState = { ...stateValue };
      // if (thisState.type == "NON_RO") {
      //   thisState.intervention = true;
      // }
      let values = prevState.values;
      if (modalOutput.index > -1) {
        values[modalOutput.index] = thisState;
      } else {
        values.push(thisState);
      }

      return {
        ...prevState,
        values: values,
      };
    });
    // ________________________________________________

    // if (stateValue.type == "RO") {
    //   if (stateValue.rincian_output == undefined) return;

    //   let ro = stateValue.rincian_output;
    //   ro.intervention = stateValue.intervention;

    //   const request: ExsumInterventionProjectReqDto = {
    //     id: 0,
    //     intervention: stateValue.intervention,
    //     exsum_id: exsum.id,
    //     type: "RO",
    //     code: "",
    //     prop: 0,
    //     kementrian_id: 0,
    //     nomenklatur: "",
    //     indikator: "",
    //     list: [],
    //     list_ro: [ro],
    //     tahun: "",
    //     lokasi: [],
    //     src_rincian_output_id: 0
    //   };
    //   const response = await doCreateIntervention({
    //     body: request,
    //     loadingContext: loadingContext,
    //     errorModalContext: errorModalContext,
    //   });
    //   if (response?.code !== API_CODE.success) {
    //     return;
    //   }

    //   setState((prevState) => {
    //     let thisState = { ...stateValue };
    //     if (thisState.type == "NON_RO") {
    //       thisState.intervention = true;
    //     }
    //     let values = prevState.values;
    //     if (modalOutput.index > -1) {
    //       values[modalOutput.index] = thisState;
    //     } else {
    //       values.push(thisState);
    //     }

    //     return {
    //       ...prevState,
    //       values: values,
    //     };
    //   });
    // }

    // if (stateValue.type == "NON_RO") {
    //   if (
    //     stateValue.non_rincian_output?.value == "" ||
    //     stateValue.non_rincian_output?.code == "" ||
    //     stateValue.non_rincian_output?.src_rkp_prop_id == undefined ||
    //     stateValue.non_rincian_output?.kementrian == undefined ||
    //     stateValue.non_rincian_output?.location.length == 0
    //     // || stateValue.non_rincian_output.indikator == ""
    //   ) {
    //     return;
    //   }

    //   const nonRO: ExsumInterventionState = JSON.parse(
    //     JSON.stringify(stateValue.non_rincian_output)
    //   );

    //   let lokasi: any[] = [];
    //   nonRO.location.map((x) => {
    //     lokasi.push({
    //       src_provinsi_id: x.id,
    //     });
    //   });

    //   if (nonRO.id == 0) {
    //     const request: ExsumInterventionProjectReqDto = {
    //       id: nonRO.id,
    //       exsum_id: exsum.id,
    //       type: stateValue.type,
    //       code: nonRO.code,
    //       prop: nonRO.prop?.id ?? 0,
    //       kementrian_id: nonRO.kementrian?.id ?? 0,
    //       nomenklatur: nonRO.nomenklatur,
    //       indikator: nonRO.indikator,
    //       list: nonRO.list,
    //       list_ro: nonRO.ro,
    //       // intervention: year == 0 ? true : nonRO.intervensi,
    //       intervention: nonRO.intervensi,
    //       lokasi: lokasi,
    //       tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
    //     };
    //     const response = await doCreateIntervention({
    //       body: request,
    //       loadingContext: loadingContext,
    //       errorModalContext: errorModalContext,
    //     });
    //     if (response?.code !== API_CODE.success) {
    //       return;
    //     }

    //     const res: RoDto = response?.result;
    //     nonRO.id = res.id;
    //   } else {
    //     const req: UpdateV2ExsumIntervention = {
    //       body: {
    //         id: nonRO.id,
    //         prop: nonRO.prop?.id ?? 0,
    //         code: nonRO.code,
    //         nomenklatur: nonRO.nomenklatur,
    //         kementrian_id: nonRO.kementrian?.id ?? 0,
    //         indikator: nonRO.indikator,
    //         target: nonRO.list[0].target,
    //         satuan: nonRO.list[0].satuan,
    //         anggaran: nonRO.list[0].anggaran,
    //         sumber_anggaran: nonRO.list[0].sumber_anggaran,
    //         type: stateValue.type,
    //         // intervention: year == 0 ? true : nonRO.intervensi,
    //         intervention: nonRO.intervensi,
    //         lokasi: lokasi,
    //         list: nonRO.list,
    //         tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
    //       },
    //       loadingContext: loadingContext,
    //       errorModalContext: errorModalContext,
    //     };
    //     const response = await doUpdateInterventionOnlyRO(req);
    //     if (response?.code !== API_CODE.success) {
    //       return;
    //     }
    //   }

    //   setState((prevState) => {
    //     let thisState = { ...stateValue };
    //     thisState.non_rincian_output = nonRO;

    //     if (thisState.type == "NON_RO") {
    //       thisState.intervention = nonRO.intervensi;
    //     }
    //     let values = prevState.values;
    //     if (modalOutput.index > -1) {
    //       values[modalOutput.index] = thisState;
    //     } else {
    //       values.push(thisState);
    //     }

    //     return {
    //       ...prevState,
    //       values: values,
    //     };
    //   });
    // }

    handleModalOutputOpen(-1, false, "");
  };

  const handleModalRegulationOpen = (
    index: number,
    action: boolean,
    type: string
  ) => {
    if (type == "delete") {
      setState((prevState) => {
        let regulation = prevState.regulation;
        regulation.splice(index, 1);
        return {
          ...prevState,
          regulation: regulation,
        };
      });
      return;
    }

    let initStateValue: ExsumRegulationDto = JSON.parse(
      JSON.stringify(initExsumRegulationDto)
    );

    if (index > -1) {
      initStateValue = state.regulation[index];
    }

    setStateRegulation(initStateValue);

    setModalRegulation({ index: index, action: action, type: type });
  };

  const handleModalRegulationSubmit = () => {
    let req: ExsumRegulationDto = stateRegulation;
    req.exsum_id = exsum.id;
    setState((prevState) => {
      let regulation = prevState.regulation;
      if (modalOutput.index > -1) {
        regulation[modalRegulation.index] = req;
      } else {
        regulation.push(req);
      }

      return {
        ...prevState,
        regulation: regulation,
      };
    });

    setModalRegulation({ index: -1, action: false, type: "" });
  };

  const handleModalNewRegulationOpen = (
    index: number,
    action: boolean,
    type: string
  ) => {
    const initStatePerpres = JSON.parse(
      JSON.stringify(initMiscMasterListPerpres)
    );
    setStateNewRegulation(initStatePerpres);
    setModalNewRegulation({ index: -1, action: action, type: type });
  };

  const handleModalNewRegulationSubmit = async () => {
    if (stateNewRegulation.value == "" || stateNewRegulation.title == "") {
      return;
    }

    const response = await doCreateMasterPerpres({
      body: stateNewRegulation,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getListPerpres();
      handleModalNewRegulationOpen(-1, false, "");
    }
  };

  const handleModalAddNonRoSubmit = async () => {
    if (
      reqNonRo.nomenklatur == "" ||
      reqNonRo.code == "" ||
      reqNonRo.prop == undefined ||
      reqNonRo.kementrian_id == undefined ||
      reqNonRo.lokasi.length == 0
    ) {
      return;
    }

    const payload: ProjectReqDto = {
      ...reqNonRo,
      tahun: year > 0 ? year : rpjmn?.start + "-" + rpjmn?.end,
      exsum_id: exsum.id,
      type: "NON_RO",
    };

    const response = await doCreateInterventionNonRo({
      body: payload,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getListNonRO();
    }

    // const res: RoDto = response?.result;
    // nonRO.id = res.id;

    // setState((prevState) => {
    //   let thisState = { ...stateValue };
    //   thisState.non_rincian_output = nonRO;

    //   if (thisState.type == "NON_RO") {
    //     thisState.intervention = nonRO.intervensi;
    //   }
    //   let values = prevState.values;
    //   if (modalOutput.index > -1) {
    //     values[modalOutput.index] = thisState;
    //   } else {
    //     values.push(thisState);
    //   }

    //   return {
    //     ...prevState,
    //     values: values,
    //   };
    // });

    setModalNomenklatur(false);
  };

  useEffect(() => {
    if (optionRiskType.length == 0) getOptionRiskType();
    if (optionStakeholder.length == 0) getOptionStakeholder();
    if (listLocation.length == 0) getListLocation();
    if (listSof.length == 0) getListSumberPendanaan();
    if (listPerpres.length == 0) getListPerpres();

    if (exsum.id > 0) {
      getOptionRO();
      getListNonRO();
      getListProP();
      getData();
      getDataRef();
    }
  }, [exsum]);

  const conditionEditing =
    year > 0 && !edited ? `${grey[600]} !important` : "inherit";

  const conditionEditingPointerEvent = year > 0 && !edited ? "none" : "auto";

  return {
    data,
    state,
    setState,
    optionRO,
    dataTable,
    optionRiskType,
    optionStakeholder,
    modalOpen,
    setModalOpen,
    handleModalOpen,
    handleModalOutputSubmit,
    modalOutput,
    handleModalOutputOpen,
    modalRegulation,
    handleModalRegulationOpen,
    handleModalRegulationSubmit,
    modalNewRegulation,
    handleModalNewRegulationOpen,
    handleModalNewRegulationSubmit,
    handleModalOpenSubmit,
    deleteData,
    dataTOWS: tows.data.tows,
    stateValue,
    setStateValue,
    listLocation,
    listSof,
    listProP,
    stateRegulation,
    setStateRegulation,
    stateNewRegulation,
    setStateNewRegulation,
    listPerpres,
    exsum,
    conditionEditing,
    conditionEditingPointerEvent,
    modalNomenklatur,
    setModalNomenklatur,
    reqNonRo,
    setReqNonRo,
    handleModalAddNonRoSubmit,
    optionNonRO,
    dataTableNonRO,
    modalReference,
    setModalReference,
    dataProfilOverview,
  };
};

export default useCardIndicationVM;
