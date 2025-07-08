import {
  useGlobalModalContext,
  useLoading,
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { useState } from "react";
import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";
import {
  dtoGetApproval,
  dtoReqBuktiDukungPengesahan,
  dtoUraian,
  initLogActivity,
  initPenetapanObjectState,
  initReqBuktiDukungPengesahan,
  initReqUpr,
  initShorlist,
  LogActivityDto,
  NotaDinasReqDto,
  PenetapanObjectEntityReqDto,
  PenetapanObjectLongListAssignObjectReqDto,
  PenetapanObjectLongListReqDto,
  PenetapanObjectLongListReqValueDto,
  PenetapanObjectReqDto,
  PenetapanObjectShortListDto,
  PenetapanObjectStateEntityDto,
  PenetapanObjectVMState,
  ResRankingItem,
  RKPCascadingDto,
} from "@/app/penetapan/objek/pageModel";
import {
  doCratePenetapanObjectLongList,
  doCratePenetapanObjectLongListAssignObject,
  doCreatePenetapanObjectTopic,
  doDeletePenetapanObjectTopic,
  doGetApproval,
  doGetPenetapanObject,
  doGetPenetapanObjectCascading,
  doGetPenetapanObjectEntity,
  doGetPenetapanObjectEntityUsulan,
  doGetPenetapanObjectNotaDinas,
  doGetPenetapanObjectShortList,
  doGetRanking,
  doLogActivity,
  doUpdateOrCreateGetPenetapanObjectNotaDinas,
  doUpdateOrCreatePenetapanObjectEntityUsulan,
  doUpdatePenetapanObjectTopic,
} from "@/app/penetapan/objek/pageService";
import { API_CODE } from "@/lib/core/api/apiModel";
import useRkpVM from "@/components/dropdown/rkpVM";
import {
  PenetapanObjectDto,
  PenetapanObjectNotaDto,
  PenetapanObjectUraianDto,
} from "@/lib/core/context/penetapanTopicContext";
import useNotaDinasVM from "@/app/approval/nota-dinas/notaDinasVM";
import { useToast } from "@/lib/core/context/toastContext";

const usePenetapanObjectVM = () => {
  const loadingContext = useLoading();
  const [loading, setLoading] = useState(false);
  const errorModalContext = useGlobalModalContext();
  const { rkp, year, rpjmn } = useRKPContext((state) => state);
  const { getData } = useRkpVM();
  const {
    objects,
    setObjects,
    objectState,
    setObjectState,
    uraianState,
    setUraianState,
    nota,
    setNota,
  } = usePenetapanTopicContext((state) => state);
  const { uploadImage } = useNotaDinasVM();
  const { showToast } = useToast();

  const initState = JSON.parse(JSON.stringify(initPenetapanObjectState));
  const [stateTopic, setStateTopic] =
    useState<PenetapanObjectVMState>(initState);
  const [stateShorList, setStateShortList] = useState<
    PenetapanObjectShortListDto[]
  >([]);
  const [stateCascading, setStateCascading] = useState<RKPCascadingDto[]>([]);
  const [stateEntity, setStateEntity] = useState<
    PenetapanObjectStateEntityDto[]
  >([]);
  const [stateUpr, setStateUpr] = useState<dtoUraian[]>([]);

  const [getStateLogActivity, setLogActivity] = useState<LogActivityDto[]>([
    initLogActivity,
  ]);
  const [optionPN, setOptionPN] = useState<ProjectDefaultDto[]>([]);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalLog, setModalLog] = useState<boolean>(false);
  const [modalUpr, setModalUpr] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<boolean>(false);
  const [modalObjek, setModalObjek] = useState<boolean>(false);
  const [modalBuktiDukung, setModalBuktiDukung] = useState<boolean>(false);
  const [reqBuktiDukungPengesahan, setReqBuktiDukungPengesahan] =
    useState<dtoReqBuktiDukungPengesahan>({ ...initReqBuktiDukungPengesahan });

  const [stateCreateUpr, setStateCreateUpr] =
    useState<PenetapanObjectEntityReqDto>({ ...initReqUpr });
  const [stateUprSingle, setStateUprSingle] = useState<dtoUraian>({
    ...initShorlist,
  });

  const [stateApproval, setStateApproval] = useState<dtoGetApproval>();

  const [modalDeleteObject, setModalDeleteObject] = useState<boolean>(false);
  const [modalEditEntitas, setModalEditEntitas] = useState<boolean>(false);
  const [modalDeleteEntitas, setModalDeleteEntitas] = useState<boolean>(false);

  const generateOptionPN = () => {
    let opt: ProjectDefaultDto[] = [];
    rkp.map((pn) => {
      // opt.push({
      //   id: pn.id,
      //   level: "PN",
      //   code: pn.code,
      //   value: pn.value
      // })
      pn.pp.map((pp) => {
        opt.push({
          id: pp.id,
          level: "PP",
          code: pp.code,
          value: pp.value,
        });

        pp.kp.map((kp) => {
          opt.push({
            id: kp.id,
            level: "KP",
            code: kp.code,
            value: kp.value,
          });
        });
      });
    });

    setOptionPN(opt);
  };

  async function getPenetapanObjectTopic() {
    const response = await doGetPenetapanObject({
      body: {
        tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result: PenetapanObjectDto[] = response.result;
      setObjects(result);
    } else {
      setObjects([]);
    }
  }

  async function updateOrCreateTopic() {
    const req: PenetapanObjectReqDto = {
      id: stateTopic.id,
      code: stateTopic.code,
      topik: stateTopic.topik,
      tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      values: stateTopic.values,
    };

    let response;
    if (stateTopic.id == 0) {
      response = await doCreatePenetapanObjectTopic({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    } else {
      response = await doUpdatePenetapanObjectTopic({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    }
    if (response?.code == API_CODE.success) {
      getPenetapanObjectTopic();
      const initState = JSON.parse(JSON.stringify(initPenetapanObjectState));
      setModalAdd(false);
      setStateTopic(initState);
    }
  }

  async function deleteTopic() {
    const req: PenetapanObjectReqDto = {
      id: stateTopic.id,
      code: stateTopic.code,
      topik: stateTopic.topik,
      tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      values: stateTopic.values,
    };

    const response = await doDeletePenetapanObjectTopic({
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getPenetapanObjectTopic();
      const initState = JSON.parse(JSON.stringify(initPenetapanObjectState));
      setModalAdd(false);
      setStateTopic(initState);
    }
  }

  async function updateOrCreateLongList() {
    let reqLongList: PenetapanObjectLongListReqDto = {
      values: [],
    };

    let reqLongListAssignObject: PenetapanObjectLongListAssignObjectReqDto = {
      values: [],
    };

    uraianState.map((u) => {
      const values: PenetapanObjectLongListReqValueDto = {
        uraian_id: u.id,
        prioritas: [],
      };
      u.prioritas.map((p) => {
        if (p.value) {
          values.prioritas.push(p.value);
        }
      });
      reqLongList.values.push(values);

      reqLongListAssignObject.values.push({
        uraian_id: u.id,
        assignObjek: u.objek == null ? false : u.objek,
      });
    });

    const responseLongList = await doCratePenetapanObjectLongList({
      body: reqLongList,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (responseLongList?.code != API_CODE.success) {
      return false;
    }

    const responseLongListAssignObject =
      await doCratePenetapanObjectLongListAssignObject({
        body: reqLongListAssignObject,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    if (responseLongListAssignObject?.code != API_CODE.success) {
      return false;
    }

    getPenetapanObjectTopic();
    return true;
  }

  async function getPenetapanObjectShortList() {
    if (objectState !== undefined) {
      const response = await doGetPenetapanObjectShortList({
        body: { id: objectState.id },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
      if (response?.code == API_CODE.success) {
        let result: PenetapanObjectShortListDto[] = response.result;
        setStateShortList(result);
      }
    }
  }

  async function getPenetapanObjectCascading() {
    if (objectState !== undefined) {
      const response = await doGetPenetapanObjectCascading({
        body: { id: objectState.id },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
      if (response?.code == API_CODE.success) {
        let result: RKPCascadingDto[] = response.result;
        setStateCascading(result);
      }
    }
  }

  async function getPenetapanObjectEntity() {
    if (objectState !== undefined) {
      setLoading(true);
      const response = await doGetPenetapanObjectEntity({
        body: { id: objectState.id },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
      if (response?.code != API_CODE.success) {
        return;
      }

      const response2 = await doGetPenetapanObjectEntityUsulan({
        body: {
          id: objectState.id,
        },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });

      if (response2?.code == API_CODE.success) {
        let result: dtoUraian[] = response2.result;
        if (result) {
          setStateUpr(result);
          setLoading(false);

          // let allEntity: PenetapanObjectEntityDto[] = response.result;
          // let checkedEntity: PenetapanObjectEntityCheckedDto[] = response2.result;

          // let state: PenetapanObjectStateEntityDto[] = [];

          // allEntity.map((x) => {
          //   if (x.type == "SUPPORT") {
          //     x.stakeholder.map((y) => {
          //       let row: PenetapanObjectStateEntityDto = Object.assign(
          //         { items: [] },
          //         y
          //       );

          //       const getIndex = checkedEntity.findIndex(
          //         (checked) => checked.entitas.id == y.id
          //       );
          //       if (getIndex > -1) {
          //         row.items = [...row.items, ...checkedEntity[getIndex].items];
          //       }

          //       state.push(row);
          //     });
          //   }
          // });

          // setStateEntity(state);
        } else {
          setLoading(true);
        }
      }
    }
  }

  async function updateOrCreateEntity(param: PenetapanObjectEntityReqDto) {
    const response = await doUpdateOrCreatePenetapanObjectEntityUsulan({
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getPenetapanObjectEntity();
    }
    // if (objectState !== undefined) {
    //   console.log(stateEntity)
    //   let req: PenetapanObjectEntityReqDto = {
    //     id_objek: objectState.id,
    //     values: [],
    //   };
    //   stateEntity.map((st) => {
    //     const val: PenetapanObjectEntityValueReqDto = {
    //       entitas: st.id,
    //       kriteria: [],
    //     };
    //     st.items.map((s) => {
    //       val.kriteria.push(s.value);
    //     });
    //     req.values.push(val);
    //   });
    //   const response = await doUpdateOrCreatePenetapanObjectEntityUsulan({
    //     body: req,
    //     loadingContext: loadingContext,
    //     errorModalContext: errorModalContext,
    //   });
    //   if (response?.code == API_CODE.success) {
    //     getPenetapanObjectEntity();
    //   }
    // }
  }

  async function getRanking() {
    let reqLongList: PenetapanObjectLongListReqDto = { values: [] };

    uraianState.forEach((u) => {
      const values: PenetapanObjectLongListReqValueDto = {
        uraian_id: u.id,
        prioritas: u.prioritas
          .filter((p) => p.value)
          .map((p) => p.value as string), // pastikan tipe
      };

      reqLongList.values.push(values);
    });

    const response = await doGetRanking({
      body: reqLongList,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code === API_CODE.success) {
      const rankingData = response.result as ResRankingItem[];

      const updated = uraianState.map((item) => {
        const match = rankingData.find((r) => r.uraian_id === item.id);
        return {
          ...item,
          ranking:
            match && match["ranking-prioritas"] !== "-"
              ? Number(match["ranking-prioritas"])
              : 0,
        };
      });

      setUraianState(updated);
    }
  }

  async function getPenetapanObjectNotaDinas() {
    if (objectState !== undefined) {
      const response = await doGetPenetapanObjectNotaDinas({
        body: { id_topik: objectState.id },
        errorModalContext: errorModalContext,
        loadingContext: loadingContext,
      });
      if (response?.code === API_CODE.success) {
        let result: PenetapanObjectNotaDto = response.result;
        setNota(result);
      }
    }
  }

  async function updateOrCreateNotaDinas() {
    if (nota != undefined) {
      const request: NotaDinasReqDto = {
        penetapan_object_id: objectState?.id ?? 0,
        penjelasan_objek_mrpn: nota.penjelasan_objek_mrpn,
        penjelasan_usulan_upr: nota.penjelasan_usulan_upr,
        lokasi: nota.lokasi,
        tanggal: nota.tanggal,
        direktorat: nota.direktorat,
        dibuat: nota.dibuat,
        disetujui: nota.disetujui,
        ttd_pembuat: nota.ttd_pembuat_base64,
        ttd_pembuat_filename: nota.ttd_pembuat_filename,
        ttd_penyetuju: nota.ttd_penyetuju_base64,
        ttd_penyetuju_filename: nota.ttd_penyetuju_filename,
      };

      if (objectState !== undefined) {
        const response = await doUpdateOrCreateGetPenetapanObjectNotaDinas({
          body: request,
          errorModalContext: errorModalContext,
          loadingContext: loadingContext,
        });
        if (response?.code === API_CODE.success) {
          getPenetapanObjectNotaDinas();
          return true;
        }
      }
    }

    return false;
  }

  async function getApproval() {
    if (objectState !== undefined) {
      setLoading(true);
      const response = await doGetApproval({
        body: { id: objectState.id },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });

      if (response?.code == API_CODE.success) {
        let result: dtoGetApproval[] = response.result;
        if (result) {
          setStateApproval(result[0]);
          setLoading(false);
        } else {
          setLoading(true);
        }
      }
    }
  }

  async function getLogActivity() {
    const response = await doLogActivity({
      body: {
        tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result: LogActivityDto[] = response.result;
      setLogActivity(result);
    } else {
      setLogActivity([]);
    }
  }

  const useEffectGenerateOption = () => {
    setObjectState(undefined);
    getData();
    getPenetapanObjectTopic();
  };

  const manipulateStateUraianPriority = (data: PenetapanObjectUraianDto[]) => {
    const calculatePriorityCount: PenetapanObjectUraianDto[] = data.reduce<
      PenetapanObjectUraianDto[]
    >((a, b) => {
      b.priotitas_count = b.prioritas.length;
      return [...a, b];
    }, []);

    const sortedData: PenetapanObjectUraianDto[] = data.sort((a, b) => {
      const n1 = a.prioritas.length;
      const n2 = b.prioritas.length;
      if (n1 > n2) {
        return -1;
      }
      if (n1 < n2) {
        return 1;
      }
      return 0;
    });

    const objGroupBy = Object.groupBy(
      sortedData,
      ({ priotitas_count }) => priotitas_count
    );

    const sorted = Object.keys(objGroupBy).sort((a, b) =>
      parseInt(a) < parseInt(b) ? 1 : -1
    );

    return sortedData.reduce<PenetapanObjectUraianDto[]>((a, b) => {
      let prior: number = 1;
      const getIndex = sorted.findIndex(
        (x) => parseInt(x) == b.priotitas_count
      );
      if (getIndex > -1) {
        prior = getIndex + 1;
      }
      b.priotitas_order = prior;
      return [...a, b];
    }, []);
  };

  const useEffectObjectState = () => {
    if (objectState !== undefined) {
      const uraianDt: PenetapanObjectUraianDto[] =
        objectState.penetapan_object_list.reduce<PenetapanObjectUraianDto[]>(
          (acc, b) => {
            b.uraian.map((x, index) => {
              b.uraian[index].priotitas_count = x.prioritas.length;
            });
            return [...acc, ...b.uraian];
          },
          []
        );

      const finalData = manipulateStateUraianPriority(uraianDt);

      setUraianState(finalData);

      getPenetapanObjectEntity();
      getPenetapanObjectNotaDinas();
      getApproval();
    }
  };

  const useEffectLogActivity = () => {
    getLogActivity();
  };

  async function handleUnggahBuktiDukung(param: dtoReqBuktiDukungPengesahan) {
    uploadImage(param.file, param.filename);
  }

  // const handleUnggahBuktiDukung = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const files = e.target.files?.[0];

  //   if (files) {
  //     const fileName = files.name;
  //     const reader = new FileReader();

  //     reader.readAsDataURL(files);
  //     reader.onload = () => {
  //       const res = reader.result as string;

  //       uploadImage(res, fileName);
  //     };

  //     reader.onerror = (error) => {
  //       console.error("Error: ", error);
  //     };

  //     showToast("Data berhasil disimpan", "success");
  //   }
  // };

  return {
    useEffectGenerateOption,
    useEffectObjectState,
    objects,
    objectState,
    setObjectState,
    modalAdd,
    setModalAdd,
    optionPN,
    stateTopic,
    setStateTopic,
    stateShorList,
    stateCascading,
    stateEntity,
    setStateEntity,
    generateOptionPN,
    updateOrCreateTopic,
    deleteTopic,
    updateOrCreateLongList,
    updateOrCreateEntity,
    getPenetapanObjectShortList,
    getPenetapanObjectCascading,
    getPenetapanObjectEntity,
    getPenetapanObjectNotaDinas,
    updateOrCreateNotaDinas,
    manipulateStateUraianPriority,
    modalLog,
    setModalLog,
    useEffectLogActivity,
    getStateLogActivity,
    modalUpr,
    setModalUpr,
    showSave,
    setShowSave,
    modalObjek,
    setModalObjek,
    stateUpr,
    stateCreateUpr,
    setStateCreateUpr,
    stateUprSingle,
    setStateUprSingle,
    getRanking,
    stateApproval,
    modalBuktiDukung,
    setModalBuktiDukung,
    handleUnggahBuktiDukung,
    reqBuktiDukungPengesahan,
    setReqBuktiDukungPengesahan,
    modalDeleteObject,
    setModalDeleteObject,
    modalEditEntitas,
    setModalEditEntitas,
    modalDeleteEntitas,
    setModalDeleteEntitas,
  };
};

export default usePenetapanObjectVM;
