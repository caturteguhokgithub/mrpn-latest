import { useEffect, useState } from "react";
import {
  doCreateUrgent,
  doDeleteUrgent,
  doGetUrgent,
  doUpdateUrgent,
} from "./cardUrgentService";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { API_CODE } from "@/lib/core/api/apiModel";
import { ExsumUrgentDto, initExsumUrgentDto } from "./cardUrgentModel";
import { functions } from "lodash";

const useCardUrgentVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();

  const [data, setData] = useState<ExsumUrgentDto>({ ...initExsumUrgentDto });
  const [request, setRequest] = useState<ExsumUrgentDto>({
    ...initExsumUrgentDto,
  });
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [modalKonteksIntExt, setModalKonteksIntExt] = useState(false);

  const handleModalDelete = () => {
    setModalDelete(true);
  };

  async function getData() {
    const response = await doGetUrgent({
      body: {
        exsum_id: exsum.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumUrgentDto = response.result;
      if (result) {
        setData(result);
        setRequest(result);
      } else {
        setData({ ...initExsumUrgentDto });
        setRequest({ ...initExsumUrgentDto });
      }
    }
  }

  useEffect(() => {
    if (exsum.id !== 0) {
      getData();
    }
  }, [exsum]);

  async function updateData(param: ExsumUrgentDto) {
    const req: ExsumUrgentDto = {
      ...param,
      exsum_id: exsum.id,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    if (request.id !== 0) {
      const response = await doUpdateUrgent(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModal(false);
      }
    } else {
      const response = await doCreateUrgent(params);
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
    await doDeleteUrgent(params);
    getData();
    setModalDelete(false);
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
    modalKonteksIntExt,
    setModalKonteksIntExt,
  };
};

export default useCardUrgentVM;
