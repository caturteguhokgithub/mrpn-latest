"use client";

import ContentPage from "@/app/components/contents/index";
import React, { Fragment, useEffect } from "react";
import { FormControl } from "@mui/material";
// import RiskContent from "./partials/risk";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
// import CardRegulation from "../konteks-strategis/cardRegulasi/cardRegulation";
// import CardStakeholderInternal from "../konteks-strategis/cardStakeholders/cardStakeholderInternal";
// import CardStakeholderEksternal from "../konteks-strategis/cardStakeholders/cardStakeholderEksternal";
import TabInternalEksternal from "./partials/tab";

export default function PageSeleraRisikoView({}) {
  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const handleSetObjectState = (val: MasterListObjectRes) => {
    // Set to local storage
    localStorage.setItem("kpPenetapan", JSON.stringify(val));
    setObjectState(val);
  };


  return (
    <Fragment>
      <ContentPage
        // title={`Selera Risiko ${
        //   year == 0
        //     ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
        //     : "Tahun " + year
        // }`}
        title="Konteks Internal Eksternal"
        //         infoToolTip="Jumlah dan jenis risiko yang bersedia diterima oleh suatu entitas atau organisasi pemerintahan
        // dalam mengejar tujuannya"
        withCard={objectState === undefined}
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small" sx={{ width: "20vw" }}>
              <AutocompleteSelectSingle
                rounded
                value={objectState}
                options={objects}
                getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
                handleChange={(val: MasterListObjectRes) =>
                  handleSetObjectState(val)
                }
                placeHolder={"Pilih KP"}
              />
            </FormControl>
          )
        }
      >
        {objectState === undefined || year == 0 ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title={year == 0 ? "Tidak ada data yang ditampilkan" : "Pilih KP"}
            description={
              year == 0
                ? "Silahkan pilih RKP terlebih dulu"
                : "Silahkan pilih KP terlebih dulu"
            }
          />
        ) : (
          <Fragment>
            <TabInternalEksternal />
            {/* <CardRegulation />
            <CardStakeholderInternal />
            <CardStakeholderEksternal /> */}
            {/* <RiskContent handleSaveButton={handleModalOpenSave} /> */}
          </Fragment>
        )}
      </ContentPage>
    </Fragment>
  );
}
