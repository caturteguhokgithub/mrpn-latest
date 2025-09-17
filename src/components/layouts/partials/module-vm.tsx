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

    // Perlu tambahkan properti redirect_url di tipe response
    interface ResponseBaseDto {
        code: number;
        message: string;
        data?: any;
        redirect_url?: string; // ✅ tambahkan properti redirect_url
    }

    // Fungsi switchApp lengkap
    async function switchApp(param: DtoSwitchApp) {
        const params = {
            body: param,
            loadingContext: loadingContext,
            errorModalContext: errorModalContext,
        };

        if (param.target !== "" && param.tahun !== "") {
            // Buka tab baru kosong dulu supaya redirect Laravel terjadi di tab itu
            const newTab = window.open("", "_blank");

            if (!newTab) {
                alert("Gagal membuka tab baru. Pastikan popup tidak diblokir.");
                return;
            }

            try {
                const response = await doSwitchApp(params);

                if (response?.redirect_url) {
                    newTab.location.href = response.redirect_url;
                } else {
                    newTab.close();
                    alert("Gagal mendapatkan URL redirect dari server.");
                }
            } catch (error) {
                newTab.close();
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