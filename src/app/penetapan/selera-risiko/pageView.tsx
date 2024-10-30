"use client";

import ContentPage from "@/app/components/contents/index";
import React, { useEffect } from "react";
import { FormControl } from "@mui/material";
import RiskContent from "./partials/risk";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";

export default function PageSeleraRisikoView({}) {
  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
      getMasterListObject();
  }, [year]);

  const handleModalOpenSave = () => {};

  return (
    <>
      <ContentPage
        title={`Selera Risiko ${year == 0 ? 'RPJMN '+rpjmn?.start+"-"+rpjmn?.end : 'Tahun '+year}`}
        infoToolTip="Jumlah dan jenis risiko yang bersedia diterima oleh suatu entitas atau organisasi pemerintahan
dalam mengejar tujuannya"
        withCard
        chooseObject={
          <FormControl size="small" sx={{ width: "20vw" }}>
            <AutocompleteSelectSingle
              rounded
              value={objectState}
              options={objects}
              getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
              handleChange={(val: MasterListObjectRes) => setObjectState(val)}
              placeHolder={"Pilih RKP"}
            />
          </FormControl>
        }
      >
        {objectState === undefined ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Pilih RKP"
            description="Silahkan pilih rkp terlebih dulu"
          />
        ) : (
          <RiskContent handleSaveButton={handleModalOpenSave} />
        )}
      </ContentPage>
    </>
  );
}
