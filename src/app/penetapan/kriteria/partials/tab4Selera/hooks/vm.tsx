import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {
  doGetSeleraDto,
  doReqSeleraApprovalDto,
  doReqSeleraDto,
  initApprovalSelera,
  initSelera,
} from "./model";
import useAuthorizationVM from "@/app/authorizationVM";
import {
  doCreateSelera,
  doGetApprovalSelera,
  doGetSelera,
  doReqApprovalSelera,
} from "./service";

const usePenetapanSelera = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const { objectState } = usePenetapanGlobalVM();
  const { user } = useAuthorizationVM();
  const [openModalConfirmApproval, setOpenModalConfirmApproval] =
    useState<boolean>(false);
  const [stateSelera, setStateSelera] = useState<doGetSeleraDto>();
  const [requestSelera, setRequestSelera] = useState<doReqSeleraDto>({
    ...initSelera,
  });
  const [stateApproval, setStateApproval] = useState<doReqSeleraApprovalDto>({
    ...initApprovalSelera,
  });
  const [isEditSeleraRisiko, setEditSeleraRisiko] = useState(false);

  async function createSelera(param: doReqSeleraDto) {
    const req: doReqSeleraDto = {
      ...param,
      type_user: user?.type || "",
      uraian_penetapan_objek_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doCreateSelera(params);
    if (response?.code == API_CODE.success) {
      getSelera();
      // getData();
      // setModalOpenAdd(false);
    }
  }

  async function getSelera() {
    const req: doReqSeleraDto = {
      ...initSelera,
      type_user: user?.type || "",
      uraian_penetapan_objek_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doGetSelera(params);
    if (response?.code == API_CODE.success) {
      let result: doGetSeleraDto = response.result;

      if (result) {
        const seleraRisikoList = Array.isArray(response.result?.seleraRisiko)
          ? response.result.seleraRisiko
          : [];

        const finalResult: doGetSeleraDto = {
          referensi: response.result.referensi,
          seleraRisiko: seleraRisikoList,
        };

        setStateSelera(finalResult);
        setRequestSelera(seleraRisikoList[0] ?? {});
      }
    }
  }

  async function getApprovalSelera() {
    if (objectState !== undefined) {
      const req: doReqSeleraApprovalDto = {
        ...initApprovalSelera,
        id: requestSelera?.id ?? 0,
      };

      const params = {
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      };

      const response = await doGetApprovalSelera(params);

      if (response?.code == API_CODE.success) {
        let result: doReqSeleraApprovalDto[] = response.result;
        if (result) {
          setStateApproval(result[0]);
        }
      }
    }
  }

  async function updateApproval(param: doReqSeleraApprovalDto) {
    if (objectState !== undefined && objectState !== null) {
      const response = await doReqApprovalSelera({
        body: param,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });

      if (response?.code == API_CODE.success) {
        getApprovalSelera();
      }
    }
  }

  const handleEditSeleraRisiko = () => {
    setEditSeleraRisiko(!isEditSeleraRisiko);
  };

  return {
    loading,
    createSelera,
    requestSelera,
    setRequestSelera,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
    getApprovalSelera,
    stateApproval,
    setStateApproval,
    stateSelera,
    getSelera,
    updateApproval,
    isEditSeleraRisiko,
    handleEditSeleraRisiko,
  };
};

export default usePenetapanSelera;
