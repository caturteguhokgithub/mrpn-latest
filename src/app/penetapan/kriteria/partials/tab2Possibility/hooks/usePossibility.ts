import { useEffect, useMemo, useState } from "react";
import {
  doDeletePossibility,
  doGetPossibility,
  doUpdatePossibility,
} from "./possibilityService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import {
  ResultPossibility,
  doRequestPossibilityDto,
  initPossibility,
} from "./possibilityModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { cloneDeep } from "lodash";

const usePossibilityList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataPossibility, setDataPossibility] = useState<ResultPossibility[]>(
    []
  );
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [requestPossibility, setRequestPossibility] =
    useState<doRequestPossibilityDto>({
      ...initPossibility,
    });
  const [modalOpenDelete, setModalDelete] = useState(false);

  // const searchParams = useSearchParams();

  // const search = searchParams.get("search");
  const kpPenetapan = localStorage.getItem("kpPenetapan");
  const kpPenetapanObj = kpPenetapan ? JSON.parse(kpPenetapan) : null;

  const isEmptyPenetapanObject =
    !kpPenetapanObj || Object.keys(kpPenetapanObj).length === 0;

  async function getData() {
    setLoading(true);
    const response = await doGetPossibility({
      body: {
        // uraian_penetapan_objek_id: 78,
        uraian_penetapan_objek_id: kpPenetapanObj?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ResultPossibility[] = response.result;
      // console.log({ result });
      if (result) {
        setDataPossibility(result);
        // const mappedValues = result.map((item) => ({
        //   level_kemungkinan: item.level_kemungkinan,
        //   probabilitas: item.probabilitas,
        //   jumlah_frekuensi: item.jumlah_frekuensi,
        //   low_frekuensi: item.low_frekuensi,
        // }));

        // setRequestPossibility({
        //   uraian_penetapan_objek_id: result[0]?.uraian_penetapan_objek_id ?? 0,
        //   values: mappedValues,
        // });

        setLoading(false);
      } else {
        setRequestPossibility(initPossibility);
        setDataPossibility([]);
        setLoading(false);
      }
    }
  }

  async function updatePossibility(param: doRequestPossibilityDto) {
    const req: doRequestPossibilityDto = {
      ...param,
      // uraian_penetapan_objek_id: objectState?.id ?? 0,
      uraian_penetapan_objek_id: kpPenetapanObj?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doUpdatePossibility(params);
    if (response?.code == API_CODE.success) {
      setModalOpenAdd(false);
      getData();
    }
  }

  // "uraian_penetapan_objek_id": 302,
  const handleDeleteTables = async () => {
    const response = await doDeletePossibility({
      body: {
        uraian_penetapan_objek_id: kpPenetapanObj?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: any[] = response.result;
      console.log({ result });
      if (result) {
        // setDataPossibility(result);
        // const mappedValues = result.map((item) => ({
        //   level_kemungkinan: item.level_kemungkinan,
        //   probabilitas: item.probabilitas,
        //   jumlah_frekuensi: item.jumlah_frekuensi,
        //   low_frekuensi: item.low_frekuensi,
        // }));

        // setRequestPossibility({
        //   uraian_penetapan_objek_id: result[0]?.uraian_penetapan_objek_id ?? 0,
        //   values: mappedValues,
        // });

        setLoading(false);
      } else {
        setRequestPossibility(initPossibility);
        setDataPossibility([]);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isEmptyPenetapanObject) {
      getData();
    }
  }, [objectState?.id]);

  const defaultDropdownList = [
    "Hampir tidak terjadi (1)",
    "Jarang terjadi (2)",
    "Kadang terjadi (3)",
    "Sering terjadi (4)",
    "Hampir pasti terjadi (5)",
  ];

  const { listDropDown, listSorterPossibility } = useMemo(() => {
    const listDropDown = cloneDeep(defaultDropdownList);
    let filtered: any = [];
    let listSorterPossibility: any = [];

    if (dataPossibility?.length) {
      filtered = defaultDropdownList.filter(
        (level: string) =>
          !dataPossibility.some(
            (item: any) =>
              `${item.level_kemungkinan}`.toLocaleLowerCase() ===
              `${level}`.toLocaleLowerCase()
          )
      );

      listSorterPossibility = dataPossibility.sort((a, b): any => {
        const getNumber = (str: any) => parseInt(str.match(/\((\d+)\)/)?.[1]);
        return getNumber(a.level_kemungkinan) - getNumber(b.level_kemungkinan);
      });
    }

    return {
      listDropDown: filtered,
      listSorterPossibility,
    };
  }, [dataPossibility]);

  return {
    modalOpenAdd,
    setModalOpenAdd,
    updatePossibility,
    requestPossibility,
    setRequestPossibility,
    listDataPossibility: listSorterPossibility,
    loading,
    modalOpenDelete,
    setModalDelete,
    isDisabledAdd: dataPossibility?.length === 5,
    defaultDropdownList: listDropDown,
    handleDeleteTables,
  };
};

export default usePossibilityList;
