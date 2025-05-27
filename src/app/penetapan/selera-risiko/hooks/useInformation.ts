import { useEffect, useState } from "react";
import {
  doCreateInformation,
  doDeleteListInformation,
  doGetInformation,
  doUpdateInformation,
} from "./informationService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { rowData } from "./mock";
import { useSearchParams } from "next/navigation";
import usePenetapanGlobalVM from "../../penetapanGlobalVM";
import {
  InformasiLainnyaResDto,
  doReqDeleteList,
  doReqInformasiLainnya,
  initAddInformasiLainnyaDto,
} from "./informationModel";

const useInformationList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InformasiLainnyaResDto>();

  const { exsum } = useExsumContext();
  const { objectState } = usePenetapanGlobalVM();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [modal, setModal] = useState(false);
  const [modalViewImage, setModalViewImage] = useState(false);
  const [modalOpenDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [toastDelete, setToastDelete] = useState<boolean>(false);
  const [toastSave, setToastSave] = useState<boolean>(false);

  const [request, setRequest] = useState<doReqInformasiLainnya>({
    ...initAddInformasiLainnyaDto,
  });

  async function getData() {
    const response = await doGetInformation({
      body: {
        uraian_penetapan_object_id: objectState?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: InformasiLainnyaResDto = response.result;

      if (result) {
        setData(result);
      }
    }
  }

  async function createOrUpdateData(param: doReqInformasiLainnya) {
    const req: doReqInformasiLainnya = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    if (req.id == 0) {
      const response = await doCreateInformation(params);
      if (response?.code == API_CODE.success) {
        getData();
        setRequest(initAddInformasiLainnyaDto);
        setModal(false);
      }
    } else {
      const response = await doUpdateInformation(params);
      if (response?.code == API_CODE.success) {
        getData();
        setRequest(initAddInformasiLainnyaDto);
        setModal(false);
        // setToastSave(true);
      }
    }
  }

  async function deleteListData(param: doReqDeleteList) {
    const req: doReqDeleteList = {
      ...param,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteListInformation(params);
    if (response?.code == API_CODE.success) {
      getData();
      setRequest(initAddInformasiLainnyaDto);
      setModalDelete(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    listData: rowData,
    loadingContext,
    modal,
    setModal,
    request,
    setRequest,
    modalViewImage,
    setModalViewImage,
    modalOpenDelete,
    setModalDelete,
    modalEdit,
    setModalEdit,
    createOrUpdateData,
    deleteListData,
    toastDelete,
    setToastDelete,
    toastSave,
    setToastSave,
  };
};

export default useInformationList;
