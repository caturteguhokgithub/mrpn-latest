import { useEffect, useState } from "react";
import { doGetPossibility, doUpdatePossibility } from "./possibilityService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import { ResultPossibility, doRequestPossibilityDto, initPossibility } from "./possibilityModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

const usePossibilityList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataPossibility, setDataPossibility] = useState<ResultPossibility[]>([]);
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [requestPossibility, setRequestPossibility] = useState<doRequestPossibilityDto>({
    ...initPossibility,
  });

  // const searchParams = useSearchParams();

  // const search = searchParams.get("search");

  async function getData() {
    setLoading(true);
    const response = await doGetPossibility({
      body: {
        uraian_penetapan_objek_id: 78,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ResultPossibility[] = response.result;
      // console.log({ result });
      if (result) {
        setDataPossibility(result);
        const mappedValues = result.map((item) => ({
          level_kemungkinan: item.level_kemungkinan,
          probabilitas: item.probabilitas,
          jumlah_frekuensi: item.jumlah_frekuensi,
          low_frekuensi: item.low_frekuensi
        }));

        setRequestPossibility({
          uraian_penetapan_objek_id: result[0]?.uraian_penetapan_objek_id ?? 0,
          values: mappedValues
        });

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
      uraian_penetapan_objek_id: objectState?.id ?? 0,
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

  useEffect(() => {
    // if (exsum.id !== 0) {
    // console.log("debug");
    getData();
    // }
  }, [objectState?.id]);

  return {
    modalOpenAdd,
    setModalOpenAdd,
    updatePossibility,
    requestPossibility,
    setRequestPossibility,
    listDataPossibility: dataPossibility,
    loading
  };
};

export default usePossibilityList;
