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
import { doCreateRegulasi, doGetRegulasi, doUpdateRegulasi } from "@/app/penetapan/konteks-strategis/cardRegulasi/service";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { MiscMasterListPerpresRes } from "@/app/misc/master/masterServiceModel";
import { ExsumRegulationResDto } from "@/app/executive-summary/partials/tab7Regulation/cardRegulation/cardRegulationModel";

const useCardRegulasi = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { objectState } = usePenetapanGlobalVM();
  const { year } = useRKPContext((state) => state);

  const [data, setData] = useState<ExsumRegulationResDto[]>([]);
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
        setData(result);
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

    if (requestRegulasi.id !== 0) {
      const response = await doUpdateRegulasi(params);
      if (response?.code == API_CODE.success) {
        setModal(false);
        getData();
      }
    } else {
      const response = await doCreateRegulasi(params);
      if (response?.code == API_CODE.success) {
        setModal(false);
        getData();
      }
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
    data,
    modal,
    setModal,
    modalDelete,
    setModalDelete,
    modalEdit,
    setModalEdit,
    requestRegulasi,
    setRequestRegulasi,
    uriRequestRegulasi
  };
};

export default useCardRegulasi;
