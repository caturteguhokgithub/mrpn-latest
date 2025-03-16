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

const useInformationList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const { exsum } = useExsumContext();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  async function getData() {
    const response = await doGetInformation({
      body: {
        exsum_id: 308,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: any = response.result;

      if (result) {
        setData(result);
        // setData(rowData);

        // setRequest(result);
      } else {
        setData([]);
        // setData(rowData);
        // setRequest({ [] });
      }
    }
  }

  useEffect(() => {
    // if (exsum.id !== 0) {
    getData();
    // }
  }, []);

  return { listData: rowData, loadingContext };
};

export default useInformationList;
