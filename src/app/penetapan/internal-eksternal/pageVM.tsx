import {
    useGlobalModalContext,
    useLoading,
    useRKPContext,
    useAuthContext
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import { API_CODE, ResponseBaseDto } from "@/lib/core/api/apiModel";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { doGetSegmen, doGetSwot, doGetUrgensi } from "./pageService";
import { SegmenResDto, SwotResDto, UrgensiResDto } from "./pageModel";

const useUrgensiVM = () => {

    const loadingContext = useLoading();
    const errorModalContext = useGlobalModalContext();
    const { objectState } = usePenetapanGlobalVM();
    const { year } = useRKPContext((state) => state);

    const [dataUrgensi, setDataUrgensi] = useState<UrgensiResDto>();
    const [dataSegmen, setDataSegmen] = useState<SegmenResDto>();
    const [dataSwot, setDataSwot] = useState<SwotResDto>();

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
            }
        }
    }

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
            }
        }
    }

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
            }
        }
    }

    useEffect(() => {
        getDataUrgensi();
        getDataSegmen();
        getDataSwot();
    }, [objectState?.id]);

    return {
        dataUrgensi,
        dataSegmen,
        dataSwot,
        objectState,
    };
};
export default useUrgensiVM;
