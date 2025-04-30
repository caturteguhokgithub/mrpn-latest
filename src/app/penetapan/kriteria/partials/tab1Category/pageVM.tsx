import {
  useGlobalModalContext,
  usePenetapanTopicContext,
  useLoading,
  useRKPContext,
  useAuthContext,
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import { API_CODE, ResponseBaseDto } from "@/lib/core/api/apiModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doGetKategoriRisiko } from "./pageService";
import { ResponseGet } from "./pageModel";

const useUrgensiVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM();
  const [list, setList] = useState<ResponseGet[]>([]);

  async function getData() {
    const response = await doGetKategoriRisiko({
      body: {
        uraian_penetapan_object_id: objectState?.id ?? 0,
      },
      loadingContext: loadingContext,
      //   errorModalContext: errorModalContext,
    });
    console.log({ response });
    if (response?.code == API_CODE.success) {
      const result: ResponseGet[] = response.result;
      if (result) {
        setList(result);
      }
    }
  }

  useEffect(() => {
    getData();
  }, [objectState?.id]);

  return {
    list,
    setList,
    objectState,
  };
};
export default useUrgensiVM;
