import { useState } from "react";
import { ILoading } from "@/components/iLoading";
import { LoadingContext } from "../context/loadingContext";

type LoadingProviderProps = {
  children?: JSX.Element | JSX.Element[] | any;
};

export const LoadingProvider = (children: LoadingProviderProps) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <ILoading isLoading={isLoading} />
      {children.children}
    </LoadingContext.Provider>
  );
};
