import { useEffect, useState } from "react";
import { doGetInformation } from "./informationService";
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
  };
};

export default useInformationList;
