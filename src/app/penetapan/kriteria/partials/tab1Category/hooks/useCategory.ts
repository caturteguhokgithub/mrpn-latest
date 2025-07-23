import { useEffect, useState } from "react";
import {
  doCreateCategory,
  doCreateMasterCategory,
  doDeleteSubCategory,
  doGetCategory,
  doGetMasterCategory,
  doUpdateMasterCategory,
  doUpdateSubCategory,
} from "./categoryService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import {
  ResultCategory,
  SubKategoriRisiko,
  doMasterKategori,
  doRequestCategoryDto,
  initCategory,
  initMasterCategory,
  initSubCategory,
} from "./categoryModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { cloneDeep } from "lodash";

const useCategoryList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState<ResultCategory[]>([]);
  const [masterCategory, setMasterCategory] = useState<doMasterKategori[]>([]);
  const [requestMasterCategory, setRequestMasterCategory] =
    useState<doMasterKategori>({ ...initMasterCategory });
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenCategory, setModalOpenCategory] = useState(false);
  const [modalOpenDelete, setModalDelete] = useState(false);
  const [modalOpenAddMasterCategory, setModalOpenAddMasterCategory] =
    useState(false);

  const [requestCategory, setRequestCategory] = useState<doRequestCategoryDto>({
    ...initCategory,
  });

  const [requestSubCategory, setRequestSubCategory] =
    useState<SubKategoriRisiko>({ ...initSubCategory });

  // ini data yang didapat dari local storage
  // let kpPenetapan: any = null;
  // let kpPenetapanObj: any = null;

  // if (typeof window !== "undefined") {
  //   kpPenetapan = localStorage.getItem("kpPenetapan");
  //   kpPenetapanObj = kpPenetapan ? JSON.parse(kpPenetapan) : null;
  // }

  // const kpPenetapanObj = kpPenetapan ? JSON.parse(kpPenetapan) : null;

  // const isEmptyPenetapanObject =
  //   !kpPenetapanObj || Object.keys(kpPenetapanObj).length === 0;

  const resetCategoryState = () => {
    setRequestCategory(cloneDeep({ ...initCategory }));
  };

  async function getData() {
    setLoading(true);
    const response = await doGetCategory({
      body: {
        uraian_penetapan_object_id: objectState?.id,
        // uraian_penetapan_object_id: kpPenetapanObj?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ResultCategory[] = response.result;
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
      // Reset state
      resetCategoryState();
    }
  }

  async function getMasterCategory() {
    setLoading(true);
    const response = await doGetMasterCategory();

    if (response?.code == API_CODE.success) {
      let result: doMasterKategori[] = response.result;
      if (result) {
        setMasterCategory(result);
        setLoading(false);
      } else {
        setMasterCategory([]);
        setLoading(false);
      }
    }
  }

  async function createMasterCategory(param: doMasterKategori) {
    var isNew = param.id == 0 ? true : false;

    const params = {
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = isNew
      ? await doCreateMasterCategory(params)
      : await doUpdateMasterCategory(params);

    if (response?.code == API_CODE.success) {
      getData();
      getMasterCategory();
      setRequestMasterCategory({ ...initMasterCategory });
      setModalOpenAddMasterCategory(false);
    }
  }

  async function updateSubCategory(param: SubKategoriRisiko) {
    const req: SubKategoriRisiko = {
      ...param,
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
      ...param,
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

  // Fungsi digunakan untuk trigger modal & open form add
  const handleAdd = () => {
    setRequestCategory(cloneDeep({ ...initCategory }));
    setModalOpenAdd(true);
  };

  // console.log({ requestCategory });

  return {
    listDataCategory: dataCategory,
    loading,
    requestMasterCategory,
    setRequestMasterCategory,
    createCategory,
    createMasterCategory,
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
    setDataCategory,
    modalOpenAddMasterCategory,
    setModalOpenAddMasterCategory,
    handleAdd,
    getMasterCategory,
    getData,
    resetCategoryState,
  };
};

export default useCategoryList;
