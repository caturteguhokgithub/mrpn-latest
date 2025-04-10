/* eslint-disable @next/next/no-img-element */
"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import { FormControl, Stack } from "@mui/material";
import CardIndikasiSasaran from "./cardIndikasiSasaran/cardIndikasiSasaran";
import CardSasaranKinerjaUPR from "./cardSasaranKinerjaUPR/cardSasaranKinerjaUPR";
import CardRegulation from "./cardRegulasi/cardRegulation";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import { IconEmptyData } from "@/components/icons";
import EmptyState from "@/components/empty";
import CardProfileIntervensi from "@/app/penetapan/konteks-strategis/cardProfileIntervensi/cardProfileIntervensi";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";
import CardStakeholderInternal from "@/app/penetapan/konteks-strategis/cardStakeholders/cardStakeholderInternal";
import CardStakeholderEksternal from "@/app/penetapan/konteks-strategis/cardStakeholders/cardStakeholderEksternal";
import CardLevelKebijakan from "./cardLevelKebijakan/cardLevelKebijakan";
import CardPendanaan from "./cardPendanaan/cardPendanaan";
import CardInformation from "./cardInformation/cardInformation";

export default function PageKonteksStrategisView({ }) {
  const { year, rpjmn } = useRKPContext((state) => state);

  const { objects, objectState, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  return (
    <>
      <ContentPage
        // title={`Eksplorasi Konteks Strategis ${
        //   year == 0
        //     ? "RPJMN " + rpjmn?.start + "-" + rpjmn?.end
        //     : "Tahun " + year
        // }`}
        title="Lingkup Objek"
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small" sx={{ width: "20vw" }}>
              <AutocompleteSelectSingle
                key={objects.length}
                rounded
                value={objectState}
                options={objects}
                getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
                handleChange={(val: MasterListObjectRes) => setObjectState(val)}
                placeHolder={"Pilih KP"}
              />
            </FormControl>
          )
        }
        withCard={objectState === undefined}
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
          <Stack gap={1}>
            <CardIndikasiSasaran />
            <CardLevelKebijakan />
            <CardPendanaan project="" />
            {/* <CardSasaranKinerjaUPR />
             <CardRegulation />
            <CardStakeholderInternal />
            <CardStakeholderEksternal /> 
            <CardProfileIntervensi /> */}
            <CardInformation />
          </Stack>
        )}
      </ContentPage>
    </>
  );
}
