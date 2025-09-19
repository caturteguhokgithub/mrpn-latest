import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { DtoSwitchApp, initModuleResDto, initSwitchApp, ModuleResDto } from "./module-model";
import { doGetListApp, doSwitchApp } from "./module-service";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";

const useModuleVM = () => {

    const loadingContext = useLoading();
    const errorModalContext = useGlobalModalContext();

    const [dataListApp, setListApp] = useState<ModuleResDto[]>([{ ...initModuleResDto }])

    async function getData() {
        const response = await doGetListApp()
        if (response?.code === API_CODE.success) {
            let result: ModuleResDto[] = response.result
            setListApp(result)
        } else {
            setListApp([{ ...initModuleResDto }])
        }
    }

    async function switchApp(param: DtoSwitchApp) {
        const params = {
            body: param,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        };

        if (param.target !== "" && param.tahun !== "") {
            try {
                const response = await doSwitchApp(params);

                if (response?.code === API_CODE.success) {
                    const redirectUrl = response?.result?.url_redirect;
                    const ticket = response?.result?.ticket;

                    if (redirectUrl && ticket) {
                        const form = document.createElement("form");
                        form.method = "POST";
                        form.action = redirectUrl;
                        form.target = "_blank";

                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "ticket";
                        input.value = ticket;
                        form.appendChild(input);

                        document.body.appendChild(form);
                        form.submit();
                        document.body.removeChild(form);
                    } else {
                        alert("URL redirect atau ticket tidak ditemukan.");
                    }
                }
            } catch (error) {
                console.error(error);
                alert("Terjadi kesalahan saat melakukan switch app.");
            }
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return {
        dataListApp,
        switchApp,
    }

}

export default useModuleVM;