import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import {
  useGlobalModalContext,
  useLoading,
  useRKPContext,
} from "@/lib/core/hooks/useHooks";
import { doGetMasterListObject } from "@/app/misc/master/masterService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { usePenetapanContext } from "@/lib/core/hooks/useHooks";
import useRkpVM from "../../components/dropdown/rkpVM";
import { useEffect } from "react";

const usePenetapanGlobalVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const { year, rpjmn } = useRKPContext((state) => state);

  const { handleChangeOptions, triggerChange } = useRkpVM();

  const { objects, setObjects, objectState, setObjectState } =
    usePenetapanContext((store) => store);

  const getMasterListObject = async () => {
    const response = await doGetMasterListObject({
      body: {
        tahun: year == 0 ? rpjmn?.start + "-" + rpjmn?.end : year,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MasterListObjectRes[] = response.result;
      setObjects(result);

      const getIndex = result.findIndex((x) => x.id == objectState?.id);

      if (getIndex == -1) {
        setObjectState(undefined);
      }
    } else {
      setObjects([]);
      setObjectState(undefined);
    }
  };

  useEffect(() => {
    if (objectState != undefined) {
      objectState.rkp.level = "KP";
      triggerChange(objectState.rkp, "penetapan");
      handleChangeOptions(objectState.rkp);
    }
  }, [objectState?.id]);

  return {
    objects,
    setObjects,
    objectState,
    setObjectState,
    getMasterListObject,
  };
};

export default usePenetapanGlobalVM;
