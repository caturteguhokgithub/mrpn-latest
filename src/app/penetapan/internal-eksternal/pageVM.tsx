import {
    useGlobalModalContext,
    useLoading,
    useRKPContext,
    useAuthContext,
    useExsumContext
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import { API_CODE, ResponseBaseDto } from "@/lib/core/api/apiModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doCreateSegmen, doCreateSwot, doCreateUrgensi, doGetSegmen, doGetStakeholder, doGetSwot, doGetUrgensi, doUnggahStakeholder, doUpdateSegmen, doUpdateSwot, doUpdateUrgensi } from "./pageService";
import { SegmenResDto, SwotResDto, UrgensiResDto, doRequestSegmenDto, doRequestSwotDto, doRequestUrgensiDto, initUrgensi, initSwot, initSegmen, StakeholderImageReqDto, StakeholderResDto, initStakeholderShow } from "./pageModel";
import useCardUrgentVM from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgentVM";
import { doGetUrgent } from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgentService";
import { ExsumUrgentDto, initExsumUrgentDto } from "@/app/executive-summary/partials/tab1Background/cardUrgent/cardUrgentModel";

const useUrgensiVM = () => {

    const loadingContext = useLoading();
    const errorModalContext = useGlobalModalContext();
    const { exsum } = useExsumContext();
    const { objectState } = usePenetapanGlobalVM();
    const { year } = useRKPContext((state) => state);
    const { setModal } = useCardUrgentVM();

    // Urgensi
    const [dataUrgensi, setDataUrgensi] = useState<UrgensiResDto>();
    const [dataUrgensiExsum, setDataUrgensiExsum] = useState<ExsumUrgentDto>({ ...initExsumUrgentDto });
    const [requestUrgensi, setRequestUrgensi] = useState<doRequestUrgensiDto>({ ...initUrgensi });

    // Segmen
    const [requestSegmen, setRequestSegmen] = useState<doRequestSegmenDto>({ ...initUrgensi });
    const [dataSegmen, setDataSegmen] = useState<SegmenResDto>();

    // Swot
    const [requestSwot, setRequestSwot] = useState<doRequestSwotDto>({ ...initSwot });
    const [dataSwot, setDataSwot] = useState<SwotResDto>();

    // Stakeholder
    const [stakeholderMapping, setStakeholderMapping] = useState<StakeholderResDto>(initStakeholderShow);

    // Urgensi
    async function getDataUrgensi() {
        const response = await doGetUrgensi({
            body: {
                uraian_penetapan_object_id: objectState?.id ?? 0,
                tahun: year
            },
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });
        if (response?.code == API_CODE.success) {
            const result: UrgensiResDto = response.result;
            if (result) {
                setDataUrgensi(result);
                setRequestUrgensi(result);
            } else {
                setDataUrgensi(initUrgensi);
                setRequestUrgensi(initUrgensi);
            }
        }
    }

    async function updateDataUrgensi(param: doRequestUrgensiDto) {
        const req: doRequestUrgensiDto = {
            ...param,
            uraian_penetapan_object_id: objectState?.id ?? 0,
        };

        const params = {
            body: req,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        };

        if (requestUrgensi.id !== 0) {
            const response = await doUpdateUrgensi(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataUrgensi();
            }
        } else {
            const response = await doCreateUrgensi(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataUrgensi();
            }
        }
    }

    // Segmen
    async function getDataSegmen() {
        const response = await doGetSegmen({
            body: {
                uraian_penetapan_object_id: objectState?.id ?? 0,
                tahun: year
            },
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });
        if (response?.code == API_CODE.success) {
            const result: SegmenResDto = response.result;

            if (result) {
                setDataSegmen(result);
                setRequestSegmen(result);
            } else {
                setDataSegmen(initSegmen);
                setRequestSegmen(initSegmen);
            }
        }
    }

    async function uriRequestSegmen(param: doRequestSegmenDto) {
        const req: doRequestSegmenDto = {
            ...param,
            uraian_penetapan_object_id: objectState?.id ?? 0,
        };

        const params = {
            body: req,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        };

        if (requestSegmen.id !== 0) {
            const response = await doUpdateSegmen(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataSegmen();
            }
        } else {
            const response = await doCreateSegmen(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataSegmen();
            }
        }
    }

    // Swot
    async function getDataSwot() {
        const response = await doGetSwot({
            body: {
                uraian_penetapan_object_id: objectState?.id ?? 0,
                tahun: year
            },
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });
        if (response?.code == API_CODE.success) {
            const result: SwotResDto = response.result;
            if (result) {
                setDataSwot(result);
                // setRequestSwot(result);

                let initReqState: doRequestSwotDto = {
                    id: result.id,
                    uraian_penetapan_object_id: objectState?.id ?? 0,
                    tahun: year,
                    values: result.values,
                };

                setRequestSwot(initReqState);
            }
            else {
                setDataSwot(initSwot);
                setRequestSwot(initSwot);
            }
        }
    }

    async function uriRequestSwot() {
        const req: doRequestSwotDto = {
            ...requestSwot,
            uraian_penetapan_object_id: objectState?.id ?? 0,
        };

        const params = {
            body: req,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        };

        if (requestSwot.id !== 0) {
            const response = await doUpdateSwot(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataSwot();
            }
        } else {
            const response = await doCreateSwot(params);
            if (response?.code == API_CODE.success) {
                setModal(false);
                getDataSwot();
            }
        }
    }

    // Stakeholder
    async function getStakeholder() {
        const response = await doGetStakeholder({
            body: { uraian_penetapan_objek_id: objectState?.id ?? 0 },
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });
        if (response?.code == API_CODE.success) {
            const result: StakeholderResDto = response.result;
            if (result) {
                setStakeholderMapping(result);
            } else {
                setStakeholderMapping(initStakeholderShow)
            }
        }
    }

    async function uploadStakeholder(file: string) {
        if (file == undefined) return;

        const req: StakeholderImageReqDto = {
            uraian_penetapan_objek_id: objectState?.id ?? 0,
            file: file ?? "",
        };

        const response = await doUnggahStakeholder({
            body: req,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });
        if (response?.code == API_CODE.success) {
            getStakeholder();
        }
    }

    useEffect(() => {
        getDataUrgensi();
        getDataSegmen();
        getDataSwot();
        getStakeholder();
    }, [objectState?.id]);

    return {
        requestUrgensi,
        updateDataUrgensi,
        dataUrgensi,
        dataUrgensiExsum,
        requestSegmen,
        uriRequestSegmen,
        dataSegmen,
        requestSwot,
        setRequestSwot,
        uriRequestSwot,
        dataSwot,
        objectState,
        uploadStakeholder,
        stakeholderMapping
    };
};
export default useUrgensiVM;
