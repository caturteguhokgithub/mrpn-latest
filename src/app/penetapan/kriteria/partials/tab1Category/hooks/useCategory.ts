import { useEffect, useState } from "react";
import { doCreateCategory, doGetCategory } from "./categoryService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import {
  ResultCategory,
  doRequestCategoryDto,
  initCategory,
} from "./categoryModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

const useCategoryList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState<ResultCategory[]>([]);
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);

  const [requestCategory, setRequestCategory] = useState<doRequestCategoryDto>({
    ...initCategory,
  });

  // const searchParams = useSearchParams();

  // const search = searchParams.get("search");

  async function getData() {
    setLoading(true);
    const response = await doGetCategory({
      body: {
        uraian_penetapan_object_id: objectState?.id,
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

  async function createCategory(param: doRequestCategoryDto) {
    const req: doRequestCategoryDto = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doCreateCategory(params);
    if (response?.code == API_CODE.success) {
      getData();
      setModalOpenAdd(false);
    }
  }

  useEffect(() => {
    // if (exsum.id !== 0) {
    // console.log("debug");
    getData();
    // }
  }, []);

  return {
    listDataCategory: dataCategory,
    loading,
    createCategory,
    requestCategory,
    setRequestCategory,
    modalOpenAdd,
    setModalOpenAdd,
  };
};

export default useCategoryList;
