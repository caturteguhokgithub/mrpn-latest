import { useEffect, useState } from "react";
import { doGetPossibility } from "./possibilityService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import { ResultPossibility } from "./possibilityModel";

const usePossibilityList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataPossibility, setDataPossibility] = useState<ResultPossibility[]>(
    []
  );

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

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
      console.log({ result });
      if (result) {
        setDataPossibility(result);
        setLoading(false);
      } else {
        setDataPossibility([]);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    // if (exsum.id !== 0) {
    console.log("debug");
    getData();
    // }
  }, []);

  return { listDataPossibility: dataPossibility, loading };
};

export default usePossibilityList;
