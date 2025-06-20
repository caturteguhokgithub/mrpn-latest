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
  DataCPType,
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
  doCreateCriticalPath,
  doCreateCriticalRKPPath,
  doDeleteCriticalPath,
  doGetCriticalPath,
  doUpdateCriticalPath,
  doUpdateCriticalRKPPath,
} from "@/app/executive-summary/partials/tab6Critical/cardCriticalService";
import { Task } from "gantt-task-react";
import dayjs from "dayjs";
import { GetColor, GetColorCriticalPathIndex } from "@/utils/color";
import useCardRoadmapVM from "@/app/executive-summary/partials/tab5Roadmap/cardRoadmap/cardRoadmapVM";
import { SelectChangeEvent } from "@mui/material";

const useCardCriticalVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();
  const { year, rpjmn } = useRKPContext((store) => store);

  const useCardTows = useCardTOWSVM();
  const useCardRoadmap = useCardRoadmapVM();

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
  const [dataCP, setDataCP] = useState<DataCPType[]>([]);
  const [ganChart, setGanChart] = useState<Task[]>([]);

  const [tasksRKP, setTaskRKP] = React.useState<Task[]>([]);
  const [selectMonth, setSelectMonth] = React.useState("");

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setSelectMonth(event.target.value);
  };

  async function getListRO() {
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
      // let finalResult: RoDto[] = result.filter((x) => x.intervention);
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
      // console.log(result);

      const mappedDataCP: DataCPType[] = result.map((item) => ({
        id: item.id.toString(),
        ro: item.ro?.value || "-",
        code_ro: item.ro.code || "-",
        code_pkkr: item.ro?.pkkr || "-",
        tagging: item.tagging_list.map((tag) => tag.value),
        category: item.kategori_proyek?.name || "-",
        kategori_proyek_id: item.kategori_proyek_id,
        responsible: item.ro?.kementrian?.value || "-",
        fundSource: "APBN",
        startYear: new Date(item.start_date).getFullYear().toString(),
        endYear: new Date(item.end_date).getFullYear().toString(),
        color: item.color,
        children: (item.kegiatan ?? []).map((keg) => ({
          id: keg.id,
          kegiatan: keg.kegiatan,
          target: "",
          satuan: "",
          color: keg.color,
          months: Array.from({ length: 12 }).map((_, index) => {
            const monthNames = [
              "jan",
              "feb",
              "mar",
              "apr",
              "may",
              "jun",
              "jul",
              "aug",
              "sep",
              "oct",
              "nov",
              "dec",
            ];
            const monthData = keg.months?.find(
              (m) => m?.name.toLowerCase() === monthNames[index]
            );
            return monthData
              ? {
                  id: monthData.id,
                  name: monthData.name,
                  aktivitas: monthData.aktivitas,
                  target: monthData.target,
                  satuan: monthData.satuan,
                }
              : null;
          }),
        })),
      }));

      setData(result);
      setDataCP(mappedDataCP);
    }
  }

  const handleSubmit = async () => {
    if (
      state.ro == undefined
      // state.start_date == "" ||
      // state.end_date == "" ||
      // state.kategori_proyek_id == 0 ||
      // state.strategy.length == 0 ||
      // (state.keterangan_kegiatan == "" && year > 0)
    ) {
      return;
    }

    let value: { tagging: string }[] = [];
    state.strategy.map((x) => {
      value.push({
        tagging: x,
      });
    });

    // state.kegiatan.map((kgt, iKgt) => {
    //   let startDate = kgt.target[0].bulan;
    //   let endDate = kgt.target[kgt.target.length - 1].bulan;
    //   state.kegiatan[iKgt].start_date = dayjs(
    //     year + "-" + (startDate < 10 ? "0" + startDate : startDate) + "-01"
    //   ).format("YYYY-MM-DD");
    //   state.kegiatan[iKgt].end_date = dayjs(
    //     year + "-" + (endDate < 10 ? "0" + endDate : endDate) + "-28"
    //   ).format("YYYY-MM-DD");
    // });

    const request: ExsumCriticalReqDto = {
      id: state.id,
      exsum_id: exsum.id,
      ro_id: state.ro.id,
      start_date: year > 0 ? `${year}-01-01` : state.start_date,
      end_date: year > 0 ? `${year}-12-30` : state.end_date,
      kategori_proyek_id: state.kategori_proyek_id,
      keterangan_kegiatan: state.keterangan_kegiatan,
      values: value,
      depedencies: state.dependency?.id ?? 0,
      kegiatan: state.kegiatan,
      color: state.color ?? "",
    };

    // console.log(request);

    let response;
    if (request.id == 0) {
      if (year == 0) {
        response = await doCreateCriticalPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      } else {
        response = await doCreateCriticalRKPPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      }
    } else {
      if (year == 0) {
        response = await doUpdateCriticalPath({
          body: request,
          loadingContext: loadingContext,
          errorModalContext: errorModalContext,
        });
      } else {
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
      depedencies: 0,
      kegiatan: [],
      color: state.color ?? "",
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
    if (data.length == 0 && year > 0) {
      initState.keterangan_kegiatan = "Finish to Start";
    }
    setState(initState);
    setModalAdd(true);
  };

  const handleModalUpdate = (index: number) => {
    const curData = data[index];

    let selectedStrategy: string[] = [];
    curData.tagging_list.map((t) => {
      selectedStrategy.push(t.value);
    });

    let dep = undefined;
    data.map((x) => {
      if (x.id == curData.dependency?.id) {
        dep = x;
      }
    });

    const state: ExsumCriticalState = {
      id: curData.id,
      exsum_id: exsum.id,
      ro: curData.ro,
      start_date: curData.start_date,
      end_date: curData.end_date,
      kategori_proyek_id: curData.kategori_proyek_id,
      strategy: selectedStrategy,
      keterangan_kegiatan: curData.keterangan_kegiatan,
      dependency: dep,
      kegiatan: curData.kegiatan,
      color: curData.color,
    };

    setState(state);
    setModalAdd(true);
  };

  useEffect(() => {
    const data = useCardRoadmap.dataBusiness;
    if (data != undefined) {
      let options: string[] = [];
      data.map((t) => {
        if (options.findIndex((x) => x == t.output) == -1) {
          options.push(t.output);
        }
      });
      setOptionStrategy(options);
    }
  }, [useCardRoadmap.dataBusiness]);

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
    handleChangeMonth,
    selectMonth,
    dataCP,
  };
};

export default useCardCriticalVM;
