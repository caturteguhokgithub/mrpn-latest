import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { doGetRO } from "@/app/misc/rkp/rkpService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { RoDto } from "@/app/misc/rkp/rkpServiceModel";
import React, { useEffect, useState } from "react";
import {
  ExsumCriticalData,
  ExsumCriticalReqDto,
  ExsumCriticalState,
  initExsumCriticalReqDto,
  TaskAdditionalData,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalModel";
import useCardTOWSVM from "@/app/executive-summary/partials/tab3Fot/cardTows/cardTowsVM";
import {
  MiscMasterListKategoriProyekReq,
  MiscMasterListKategoriProyekRes,
} from "@/app/misc/master/masterServiceModel";
import { doGetMasterListlistKategoriProyek } from "@/app/misc/master/masterService";
import {
  doCreateCriticalPath, doCreateCriticalRKPPath,
  doDeleteCriticalPath,
  doGetCriticalPath,
  doUpdateCriticalPath, doUpdateCriticalRKPPath,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalService";
import { Task } from "gantt-task-react";
import dayjs from "dayjs";
import { GetColor } from "@/utils/color";

const useCardCriticalVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();
  const { year, rpjmn } = useRKPContext((store) => store);

  const useCardTows = useCardTOWSVM();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [optionRO, setOptionRO] = useState<RoDto[]>([]);
  const [optionProjectCategory, setOptionProjectCategory] = useState<
    MiscMasterListKategoriProyekRes[]
  >([]);
  const initState: ExsumCriticalState = JSON.parse(
    JSON.stringify(initExsumCriticalReqDto)
  );
  const [state, setState] = useState<ExsumCriticalState>(initState);
  const [optionStrategy, setOptionStrategy] = useState<string[]>([]);
  const [data, setData] = useState<ExsumCriticalData[]>([]);
  const [ganChart, setGanChart] = useState<Task[]>([]);

  const [tasksRKP, setTaskRKP] = React.useState<Task[]>([]);

  async function getListRO() {
    const response = await doGetRO({
      body: {
        by: exsum.level,
        id: [exsum.ref_id],
        tahun: year == 0 ? rpjmn?.start+"-"+rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: RoDto[] = response.result;
      setOptionRO(result);
    }
  }

  async function getListProjectCategory() {
    const response = await doGetMasterListlistKategoriProyek({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: MiscMasterListKategoriProyekRes[] = response.result;
      setOptionProjectCategory(result);
    }
  }

  async function getData() {
    const response = await doGetCriticalPath({
      body: { exsum_id: exsum.id },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      const result: ExsumCriticalData[] = response.result;
      setData(result);

      const tasks: Task[] = [];
      result.map((res) => {
        let startDay = dayjs(res.start_date);
        let endDay = dayjs(res.end_date);

        if (endDay.isBefore(startDay) || endDay.isSame(startDay)) {
          endDay = startDay.add(1, "hour");
        }

        const taskAdditionalData: TaskAdditionalData = {
          penanggungjawab: res.ro?.kementrian.value ?? "",
          sumber_anggaran: res.ro?.sumber_anggaran ?? "",
          keterangan_kegiatan: res.keterangan_kegiatan,
        };

        const t: Task = {
          id: res.id.toString(),
          type: year == 0 ? 'task' : 'project',
          name: res.ro?.value ?? "",
          start: startDay.toDate(),
          end: endDay.toDate(),
          progress: 0,
          styles: {
            backgroundColor: GetColor(res.kategori_proyek.id),
          },
          dependencies: [(res.dependency?.id ?? 0).toString()],
          hideChildren: false,
          project: JSON.stringify(taskAdditionalData),
        };

        tasks.push(t);

        if (res.kegiatan.length > 0){

          res.kegiatan.map(kgt => {

            let startDay = dayjs(kgt.start_date);
            let endDay = dayjs(kgt.end_date);

            if (endDay.isBefore(startDay) || endDay.isSame(startDay)) {
              endDay = startDay.add(1, "hour");
            }

            const t: Task = {
              id: kgt.id.toString(),
              type: "task",
              name: kgt.value,
              start: startDay.toDate(),
              end: endDay.toDate(),
              progress: 0,
              styles: {
                backgroundColor: GetColor(res.kategori_proyek.id),
              },
              dependencies: [],
              project: JSON.stringify(kgt.target),
            };

            tasks.push(t);
          })

        }

      });

      setGanChart(tasks);
      setTaskRKP(tasks)
    }
  }

  const handleSubmit = async () => {
    if (
      state.ro == undefined ||
      state.start_date == "" ||
      state.end_date == "" ||
      state.kategori_proyek_id == 0 ||
      state.strategy.length == 0 ||
      state.keterangan_kegiatan == ""
    ) {
      return;
    }

    let value: { tagging: string }[] = [];
    state.strategy.map((x) => {
      value.push({
        tagging: x,
      });
    });

    const request: ExsumCriticalReqDto = {
      id: state.id,
      exsum_id: exsum.id,
      ro_id: state.ro.id,
      start_date: state.start_date,
      end_date: state.end_date,
      kategori_proyek_id: state.kategori_proyek_id,
      keterangan_kegiatan: state.keterangan_kegiatan,
      values: value,
      depedencies:state.dependency?.id ?? 0,
      kegiatan:state.kegiatan
    };

    let response;
    if (request.id == 0) {
      if (year == 0){
        response = await doCreateCriticalPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      }else{
        response = await doCreateCriticalRKPPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      }
    } else {
      if (year == 0){
        response = await doUpdateCriticalPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      }else{
        response = await doUpdateCriticalRKPPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      }
    }

    if (response?.code == API_CODE.success) {
      getData();
      const initState: ExsumCriticalState = JSON.parse(
        JSON.stringify(initExsumCriticalReqDto)
      );
      setState(initState);
      setModalOpen(false);
      setModalAdd(false);
    }
  };

  const handleDelete = async () => {
    const request: ExsumCriticalReqDto = {
      id: state.id,
      exsum_id: 0,
      ro_id: 0,
      start_date: "",
      end_date: "",
      kategori_proyek_id: 0,
      keterangan_kegiatan: "",
      values: [],
      depedencies:0,
      kegiatan:[]
    };

    const response = await doDeleteCriticalPath({
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      getData();
      const initState: ExsumCriticalState = JSON.parse(
        JSON.stringify(initExsumCriticalReqDto)
      );
      setState(initState);
      setModalOpen(false);
      setModalAdd(false);
      setModalDelete(false);
    }
  };

  const handleModalAdd = () => {
    const initState: ExsumCriticalState = JSON.parse(
      JSON.stringify(initExsumCriticalReqDto)
    );
    setState(initState)
    setModalAdd(true);
  };

  const handleModalUpdate = (index: number) => {
    const curData = data[index];

    let selectedStrategy: string[] = [];
    curData.tagging_list.map((t) => {
      selectedStrategy.push(t.value);
    });

    let dep = undefined
    data.map(x => {
      if (x.id == curData.dependency?.id){
        dep = x
      }
    })

    const state: ExsumCriticalState = {
      id: curData.id,
      exsum_id: exsum.id,
      ro: curData.ro,
      start_date: curData.start_date,
      end_date: curData.end_date,
      kategori_proyek_id: curData.kategori_proyek_id,
      strategy: selectedStrategy,
      keterangan_kegiatan: curData.keterangan_kegiatan,
      dependency:dep,
      kegiatan:curData.kegiatan
    };

    console.log(state)
    setState(state);
    setModalAdd(true);
  };

  useEffect(() => {
    const data = useCardTows.data;
    if (data != undefined && data.tows != undefined) {
      let options: string[] = [];
      data.tows.map((t) => {
        options.push(t.value);
      });
      setOptionStrategy(options);
    }
  }, [useCardTows.data]);

  useEffect(() => {
    if (exsum.id > 0) {
      getListRO();
      getData();
    }
    if (optionProjectCategory.length == 0) getListProjectCategory();
  }, [exsum]);

  return {
    optionRO,
    optionStrategy,
    optionProjectCategory,
    state,
    setState,
    modalOpen,
    setModalOpen,
    handleSubmit,
    data,
    ganChart,
    tasksRKP,
    setTaskRKP,
    handleModalAdd,
    handleModalUpdate,
    handleDelete,
    modalAdd,
    setModalAdd,
    modalDelete,
    setModalDelete,
  };
};

export default useCardCriticalVM;
