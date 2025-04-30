import { useEffect, useState } from "react";
import { doCreateCategory, doDeleteSubCategory, doGetCategory, doGetMasterCategory, doUpdateSubCategory } from "./categoryService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useSearchParams } from "next/navigation";
import {
  ResultCategory,
  SubKategoriRisiko,
  doMasterKategori,
  doRequestCategoryDto,
  initCategory,
  initSubCategory,
} from "./categoryModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

const useCategoryList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState<ResultCategory[]>([]);
  const [masterCategory, setMasterCategory] = useState<doMasterKategori[]>([]);
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenCategory, setModalOpenCategory] = useState(false);
  const [modalOpenDelete, setModalDelete] = useState(false);

  const [requestCategory, setRequestCategory] = useState<doRequestCategoryDto>({
    ...initCategory,
  });

  const [requestSubCategory, setRequestSubCategory] = useState<SubKategoriRisiko>({
    ...initSubCategory,
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

  async function getMasterCategory() {
    setLoading(true);
    const response = await doGetMasterCategory();

    if (response?.code == API_CODE.success) {
      let result: doMasterKategori[] = response.result;
      // console.log({ result });
      if (result) {
        setMasterCategory(result);
        setLoading(false);
      } else {
        setMasterCategory([]);
        setLoading(false);
      }
    }
  }

  async function updateSubCategory(param: SubKategoriRisiko) {
    const req: SubKategoriRisiko = {
      ...param
    };

    const request = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doUpdateSubCategory(request);
    if (response?.code == API_CODE.success) {
      getData();
      setModalOpenCategory(false);
    }
  }

  async function deleteSubCategory(param: SubKategoriRisiko) {
    const req: SubKategoriRisiko = {
      ...param
    };

    const request = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteSubCategory(request);
    if (response?.code == API_CODE.success) {
      getData();
      setModalDelete(false);
    }
  }

  useEffect(() => {
    getData();
    getMasterCategory();
  }, [objectState?.id]);

  return {
    listDataCategory: dataCategory,
    loading,
    createCategory,
    requestCategory,
    setRequestCategory,
    modalOpenAdd,
    setModalOpenAdd,
    masterCategory,
    modalOpenCategory,
    setModalOpenCategory,
    updateSubCategory,
    requestSubCategory,
    setRequestSubCategory,
    modalOpenDelete,
    setModalDelete,
    deleteSubCategory,
  };
};

export default useCategoryList;
