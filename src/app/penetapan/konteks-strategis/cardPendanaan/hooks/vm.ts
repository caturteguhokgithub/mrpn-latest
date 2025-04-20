import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
    useGlobalModalContext,
    useLoading,
    useRKPContext,
} from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { PendanaanResDto } from "./model";
import { doGetPendanaan } from "./service";
import { GenerateProjectData } from "@/lib/utils/common";
import { RODataTable } from "@/app/misc/rkp/rkpServiceModel";

const usePendanaanList = () => {
    const loadingContext = useLoading();
    const errorModalContext = useGlobalModalContext();
    const [data, setData] = useState<PendanaanResDto[]>([]);
    const { objectState } = usePenetapanGlobalVM();
    const { year, rpjmn } = useRKPContext((state) => state);
    const [dataTableFund, setDataTableFund] = useState<RODataTable[]>([])

    async function getData() {
        const response = await doGetPendanaan({
            body: {
                uraian_penetapan_object_id: objectState?.id ?? 0,
                tahun: year
            },
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        });

        if (response?.code == API_CODE.success) {
            let result: PendanaanResDto[] = response.result;

            if (result) {
                setData(result);

                const dataTable = GenerateProjectData(result, 0, rpjmn)

                setDataTableFund(dataTable)
            }
        }
    }

    useEffect(() => {
        getData();
    }, [objectState]);

    return {
        data,
        dataTableFund,
        loadingContext,
    };
};

export default usePendanaanList;
