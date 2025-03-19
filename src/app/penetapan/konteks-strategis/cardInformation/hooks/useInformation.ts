import { useEffect, useState } from "react";
import { doGetInformation } from "./informationService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { rowData } from "./mock";
import { useSearchParams } from "next/navigation";
import {
  InformasiLainnyaResDto,
  initInformasiLainnyaShow,
} from "./informationModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

const useInformationList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InformasiLainnyaResDto>();

  const { exsum } = useExsumContext();
  const { objectState } = usePenetapanGlobalVM();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  async function getData() {
    const response = await doGetInformation({
      body: {
        uraian_penetapan_object_id: objectState?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: InformasiLainnyaResDto = response.result;

      if (result) {
        setData(result);
      }
    }
  }

  useEffect(() => {
    // if (exsum.id !== 0) {
    getData();
    // }
  }, []);

  return { data, listData: rowData, loadingContext };
};

export default useInformationList;
