import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { useState } from "react";
import { RiskTreatmentResDto } from "@/app/profil-risiko/perlakuan/pageModel";
import { doGetRiskTreatment } from "@/app/profil-risiko/perlakuan/pageService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  RiskOverview,
  RiskOverviewData,
} from "@/app/profil-risiko/overview/pageModel";
import { doGetApproval, doGetRiskOverview, doUpdateApproval } from "@/app/profil-risiko/overview/pageService";
import { dtoGetApproval, initApprovalObjek } from "@/app/penetapan/objek/pageModel";

const useRiskOverviewVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);

  const { objectState } = usePenetapanGlobalVM();
  const [stateApproval, setStateApproval] = useState<dtoGetApproval>({ ...initApprovalObjek });

  const [dataRiskOverview, setDataRiskOverview] = useState<
    RiskOverview | undefined
  >(undefined);
  const [valueOverview, setValueOverview] = useState(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalConfirmApproval, setOpenModalConfirmApproval] =
    useState<boolean>(false);

  const handleChangeOverview = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueOverview(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const getRiskOverviewData = async () => {
    const response = await doGetRiskOverview({
      body: {
        uraian_penetapan_objek_id: objectState?.id ?? 0,
      },
      loadingContext,
      errorModalContext,
    });

    if (response?.code === API_CODE.success) {
      const result: RiskOverview = response.result;

      if (result) {
        let finalOverviewData: RiskOverviewData[] = [];
        let finalOverviewDataSekre: RiskOverviewData[] = [];

        if (result.overviews && result.overviews.length > 0) {
          const obj = Object.groupBy(result.overviews, (risk) =>
            risk.analisis_br == null ? 0 : risk.analisis_br
          );
          const sorted = Object.keys(obj).sort((a, b) => parseInt(b) - parseInt(a));

          finalOverviewData = result.overviews.reduce<RiskOverviewData[]>((acc, curr) => {
            let prior = 0;
            const index = sorted.findIndex((x) => parseInt(x) == curr.analisis_br);
            if (index > -1) prior = index + 1;
            curr.prioritas = prior;
            return [...acc, curr];
          }, []);
        }

        if (result.overviews_sekre && result.overviews_sekre.length > 0) {
          const objSekre = Object.groupBy(result.overviews_sekre, (risk) =>
            risk.analisis_br == null ? 0 : risk.analisis_br
          );
          const sortedSekre = Object.keys(objSekre).sort((a, b) => parseInt(b) - parseInt(a));

          finalOverviewDataSekre = result.overviews_sekre.reduce<RiskOverviewData[]>((acc, curr) => {
            let prior = 0;
            const index = sortedSekre.findIndex((x) => parseInt(x) == curr.analisis_br);
            if (index > -1) prior = index + 1;
            curr.prioritas = prior;
            return [...acc, curr];
          }, []);
        }

        setDataRiskOverview({
          object: result.object,
          overviews: finalOverviewData,
          overviews_sekre: finalOverviewDataSekre,
        });
      }
    }
  };

  async function getApproval() {
    if (objectState !== undefined && objectState !== null) {
      setLoading(true);
      const response = await doGetApproval({
        body: { id: objectState.id },
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });

      if (response?.code == API_CODE.success) {
        let result: dtoGetApproval[] = response.result;
        if (result) {
          setStateApproval(result[0]);
          setLoading(false);
        } else {
          setLoading(true);
        }
      }
    }
  }

  async function updateApproval(param: dtoGetApproval) {
    if (objectState !== undefined && objectState !== null) {
      const response = await doUpdateApproval({
        body: param,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });

      if (response?.code == API_CODE.success) {
        getApproval();
      }
    }
  }


  return {
    dataRiskOverview,
    getRiskOverviewData,
    valueOverview,
    handleChangeOverview,
    a11yProps,
    openModal,
    setOpenModal,
    openModalConfirmApproval,
    setOpenModalConfirmApproval,
    getApproval,
    updateApproval,
    stateApproval,
    setStateApproval,
  };
};

export default useRiskOverviewVM;
