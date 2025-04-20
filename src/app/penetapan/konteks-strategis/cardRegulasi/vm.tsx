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
} from "@/app/penetapan/konteks-strategis/cardRegulasi/model";
import { doGetRegulasi } from "@/app/penetapan/konteks-strategis/cardRegulasi/service";
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

  useEffect(() => {
    if (objectState !== undefined) {
      getData();
    }
  }, [objectState]);

  return {
    objectState,
    getData,
    data,
    modal,
    setModal,
    modalDelete,
    setModalDelete,
  };
};

export default useCardRegulasi;
