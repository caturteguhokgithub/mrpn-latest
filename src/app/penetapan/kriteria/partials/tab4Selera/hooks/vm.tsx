import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doReqSeleraApprovalDto, doReqSeleraDto, initApprovalSelera, initSelera } from "./model";
import useAuthorizationVM from "@/app/authorizationVM";
import { doCreateSelera, doGetApprovalSelera } from "./service";

const usePenetapanSelera = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const { objectState } = usePenetapanGlobalVM();
  const { user } = useAuthorizationVM();

  const [requestSelera, setRequestSelera] = useState<doReqSeleraDto>({
    ...initSelera,
  });

  const [stateApproval, setStateApproval] = useState<doReqSeleraApprovalDto>({
    ...initApprovalSelera,
  });

  const [openModalConfirmApproval, setOpenModalConfirmApproval] =
    useState<boolean>(false);

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
      // getData();
      // setModalOpenAdd(false);
    }
  }

  async function getApprovalSelera() {
    if (objectState !== undefined) {
      const req: doReqSeleraApprovalDto = {
        ...initApprovalSelera,
        id: objectState?.id ?? 0,
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

  return {
    loading,
    createSelera,
    requestSelera,
    setRequestSelera,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
    getApprovalSelera,
    stateApproval,
  };
};

export default usePenetapanSelera;
