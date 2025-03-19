import { useEffect, useState } from "react";
import { doGetCategory } from "./categoryService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import { ResultCategory } from "./categoryModel";

const useCategoryList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState<ResultCategory[]>([]);

  // const searchParams = useSearchParams();

  // const search = searchParams.get("search");

  async function getData() {
    setLoading(true);
    const response = await doGetCategory({
      body: {
        uraian_penetapan_object_id: 78,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ResultCategory[] = response.result;
      // console.log({ result });
      if (result) {
        setDataCategory(result);
        setLoading(false);
      } else {
        setDataCategory([]);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    // if (exsum.id !== 0) {
    // console.log("debug");
    getData();
    // }
  }, []);

  return { listDataCategory: dataCategory, loading };
};

export default useCategoryList;
