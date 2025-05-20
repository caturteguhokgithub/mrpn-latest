import {
  useGlobalModalContext,
  useLoading,
  usePenetapanTopicContext,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  RegulasiData,
  RegulasiResDto,
  RegulasiValueDto,
  doRequestRegulasiDto,
  initRegulasi
} from "@/app/penetapan/konteks-strategis/cardRegulasi/model";
import { doCreateRegulasi, doDeleteRegulasi, doGetRegulasi, doUpdateRegulasi } from "@/app/penetapan/konteks-strategis/cardRegulasi/service";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { MiscMasterListPerpresRes } from "@/app/misc/master/masterServiceModel";
import { ExsumRegulationResDto } from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";

const useCardRegulasi = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM();
  const { year } = useRKPContext((state) => state);

  const [dataRegulasi, setDataRegulasi] = useState<ExsumRegulationResDto[]>([]);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  // Regulasi
  const [requestRegulasi, setRequestRegulasi] = useState<doRequestRegulasiDto>({ ...initRegulasi });

  async function getData() {
    const response = await doGetRegulasi({
      body: {
        uraian_penetapan_object_id: objectState?.id ?? 0,
        tahun: year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      const result: ExsumRegulationResDto[] = response.result;
      if (result) {
        setDataRegulasi(result);
      }
    }
  }

  async function uriRequestRegulasi(param: doRequestRegulasiDto) {
    const req: doRequestRegulasiDto = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const isUpdate = Number(params.body.id) > 0;

    const response = isUpdate
      ? await doUpdateRegulasi(params)
      : await doCreateRegulasi(params);

    if (response?.code === API_CODE.success) {
      isUpdate ? setModalEdit(false) : setModal(false);
      getData();
    }
  }

  async function uriDeleteRegulasi(param: doRequestRegulasiDto) {
    const req: doRequestRegulasiDto = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };
    const response = await doDeleteRegulasi(params)

    if (response?.code === API_CODE.success) {
      setModalDelete(false)
      getData();
    }
  }

  useEffect(() => {
    if (objectState !== undefined) {
      getData();
    }
  }, [objectState?.id]);

  return {
    objectState,
    getData,
    dataRegulasi,
    setDataRegulasi,
    modal,
    setModal,
    modalDelete,
    setModalDelete,
    modalEdit,
    setModalEdit,
    requestRegulasi,
    setRequestRegulasi,
    uriRequestRegulasi,
    uriDeleteRegulasi
  };
};

export default useCardRegulasi;
