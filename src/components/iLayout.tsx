import React, {useEffect} from "react";
import { LoadingProvider } from "@/lib/core/provider/loadingProvider";
import { GlobalModalProvider } from "@/lib/core/provider/globalmodalProvider";
import { ExsumProvider } from "@/lib/core/provider/exsumProvider";
import {usePathname} from "next/navigation";

export const ILayout = ({ children }: {children: React.ReactNode}) =>  {

  const pathname = usePathname();
  useEffect(() => {
    sessionStorage.setItem("last_page", pathname)
  }, []);

 return (
        <ExsumProvider>
            <LoadingProvider>
                <GlobalModalProvider>
                    { children }
                </GlobalModalProvider>
            </LoadingProvider>
        </ExsumProvider>
 );

}
