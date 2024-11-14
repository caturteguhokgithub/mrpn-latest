import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { ExsumGoalsDto, initExsumGoalsDto } from "./cardGoalsModel";
import { doCreate, doDelete, doGet, doUpdate } from "./cardGoalsService";

const useCardGoalsVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();

  const [data, setData] = useState<ExsumGoalsDto>({ ...initExsumGoalsDto });
  const [request, setRequest] = useState<ExsumGoalsDto>({
    ...initExsumGoalsDto,
  });
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleModalDelete = () => {
    setModalDelete(true);
  };

  async function getData() {
    const response = await doGet({
      body: {
        exsum_id: exsum.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumGoalsDto = response.result;
      if (result) {
        setData(result);
        setRequest(result);
      } else {
        setData({ ...initExsumGoalsDto });
        setRequest({ ...initExsumGoalsDto });
      }
    }
  }

  useEffect(() => {
    if (exsum.id !== 0) {
      getData();
    }
  }, [exsum]);

  async function updateData(param: ExsumGoalsDto) {
    const req: ExsumGoalsDto = {
      ...param,
      exsum_id: exsum.id,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    if (request.id !== 0) {
      const response = await doUpdate(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModal(false);
      }
    } else {
      const response = await doCreate(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModal(false);
      }
    }
  }

  async function deleteData() {
    const params = {
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };
    await doDelete(params);
    getData();
    setModalDelete(false)
  }

  return {
    data,
    setData,
    modal,
    setModal,
    getData,
    request,
    setRequest,
    updateData,
    deleteData,
    modalDelete,
    setModalDelete,
    handleModalDelete,
  };
};

export default useCardGoalsVM;
