import { useEffect, useState } from "react";
import {
  doCreateInformation,
  doDeleteInformation,
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
import {
  InformasiLainnyaResDto,
  doAddInformasiLainnyaDto,
  initAddInformasiLainnyaDto,
} from "./informationModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";

const useInformationList = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<InformasiLainnyaResDto>();
  const [modalDelete, setModalDelete] = useState(false);

  const { exsum } = useExsumContext();
  const { objectState } = usePenetapanGlobalVM();

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [request, setRequest] = useState<doAddInformasiLainnyaDto>({
    ...initAddInformasiLainnyaDto,
  });

  const [modalObjectScope, setModalObjectScope] = useState(false);

  async function getData() {
    const response = await doGetInformation({
      body: {
        uraian_penetapan_object_id: objectState?.id ?? 0,
        // uraian_penetapan_object_id: objectState?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: InformasiLainnyaResDto = response.result;

      setData(result);
      setRequest(result);
      // if (result) {
      //   setData(result);
      //   setRequest(result);
      // }
    }
  }

  async function updateData(param: doAddInformasiLainnyaDto) {
    const req: doAddInformasiLainnyaDto = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    if (request.id !== 0) {
      const response = await doUpdateInformation(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModalObjectScope(false);
      }
    } else {
      const response = await doCreateInformation(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModalObjectScope(false);
      }
    }
  }

  // async function deleteData(param: doAddInformasiLainnyaDto) {
  //   const req: doAddInformasiLainnyaDto = {
  //     ...param,
  //     uraian_penetapan_object_id: objectState?.id ?? 0,
  //   };

  //   const params = {
  //     body: req,
  //     loadingContext: loadingContext,
  //     errorModalContext: errorModalContext,
  //   };

  //   const response = await doDeleteInformation(params);
  //   if (response?.code == API_CODE.success) {
  //     getData();
  //     setModalObjectScope(false);
  //   }
  // }

  async function deleteData() {
    const params = {
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };
    await doDeleteInformation(params);
    getData();
    setModalDelete(false);
  }

  useEffect(() => {
    getData();
  }, [objectState?.id]);

  return {
    data,
    updateData,
    listData: rowData,
    loadingContext,
    request,
    setRequest,
    modalObjectScope,
    setModalObjectScope,
    modalDelete,
    setModalDelete,
    deleteData,
  };
};

export default useInformationList;
