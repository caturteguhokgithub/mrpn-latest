import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {
  List,
  ReqAddMatDamKomite,
  ReqAddMatDamUpr,
  ResShowMatDamKomite,
  ValuesShowMatDamKomite,
  initReqAddMatDamKomite,
  initReqAddMatDamUpr,
} from "./model";
import {
  doCreateMatDamKomite,
  doCreateMatDamUpr,
  doDeleteMatDamKomite,
  doDeleteMatDamUpr,
  doShowMatDamKomite,
  doUpdateMatDamKomite,
  doUpdateMatDamUpr,
} from "./service";

const useKriteriaDampakVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenDelete, setModalDelete] = useState(false);
  const [modalOpenDeleteArea, setModalDeleteArea] = useState(false);
  const [modalOpenAddKomite, setModalOpenAddKomite] = useState(false);
  const [modalOpenEditKomite, setModalOpenEditKomite] = useState(false);

  const [dataMatDamKomite, setDataMatDamKomite] = useState<
    ValuesShowMatDamKomite[]
  >([]);
  const [requestMatDamKomite, setRequestMatDamKomite] = useState<ReqAddMatDamKomite>({ ...initReqAddMatDamKomite });
  const [requestMatDamUpr, setRequestMatDamUpr] = useState<ReqAddMatDamUpr>({
    ...initReqAddMatDamUpr,
  });
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenRef, setModalOpenRef] = useState(false);

  async function showMatDamKomite() {
    const params = {
      body: {
        uraian_penetapan_object_id: objectState?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doShowMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      setDataMatDamKomite(response.result?.values ?? []);
    }
  }

  async function createMatDamKomite(param: ReqAddMatDamKomite) {
    const req: ReqAddMatDamKomite = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = param.id == 0 ? await doCreateMatDamKomite(params) : await doUpdateMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      showMatDamKomite();
      setModalOpenAddKomite(false);
      setModalOpenEditKomite(false);
      setRequestMatDamKomite({ ...initReqAddMatDamKomite })
    }
  }

  async function deleteMatDamKomite(param: ReqAddMatDamKomite) {
    const params = {
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      showMatDamKomite();
      setModalDeleteArea(false);
      setRequestMatDamKomite({ ...initReqAddMatDamKomite })
    }
  }

  async function createMatDamUpr(param: ReqAddMatDamUpr) {
    const isNew = param.id === 0;

    if (isNew) {
      const params = {
        body: param,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      };

      const response = await doCreateMatDamUpr(params);

      if (response?.code == API_CODE.success) {
        setModalOpenAdd(false);
      }
    } else {
      const params = {
        body: param.lists[0],
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      };

      const response = await doUpdateMatDamUpr(params);
      if (response?.code == API_CODE.success) {
        setModalOpenAdd(false);
      }
    }
  }

  async function deleteMatDamUpr(param: ReqAddMatDamUpr) {
    const params = {
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteMatDamUpr(params);
    if (response?.code == API_CODE.success) {
      setModalDelete(false);
    }
  }

  return {
    dataMatDamKomite,
    loading,
    modalOpenAdd,
    setModalOpenAdd,
    modalOpenAddKomite,
    setModalOpenAddKomite,
    modalOpenDelete,
    setModalDelete,
    requestMatDamKomite,
    setRequestMatDamKomite,
    requestMatDamUpr,
    setRequestMatDamUpr,
    createMatDamKomite,
    createMatDamUpr,
    deleteMatDamUpr,
    modalOpenEdit,
    setModalOpenEdit,
    modalOpenRef,
    setModalOpenRef,
    showMatDamKomite,
    objectState,
    modalOpenEditKomite,
    setModalOpenEditKomite,
    deleteMatDamKomite,
    modalOpenDeleteArea,
    setModalDeleteArea,
  };
};

export default useKriteriaDampakVM;
