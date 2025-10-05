"use client";

import ContentPage from "@/components/contents";
import React, { useEffect } from "react";
import DashboardLayout from "@/components/layouts/layout";
import { FormControl } from "@mui/material";
// import { SelectChangeEvent } from "@mui/material";
import TabCriteria from "./partials/tab";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import { AutocompleteSelectSingle } from "@/components/autocomplete";
import { MasterListObjectRes } from "@/app/misc/master/masterServiceModel";

export default function PageKriteria({}) {
  usePermissionChecker("penetapan.kriteriaRisiko");

  const [project, setProject] = React.useState("");
  const { year, rpjmn } = useRKPContext((state) => state);
  const { objectState, objects, setObjectState, getMasterListObject } =
    usePenetapanGlobalVM();

  useEffect(() => {
    getMasterListObject();
  }, [year]);

  const handleSetObjectState = (val: MasterListObjectRes | null) => {
    if (val === null) {
      localStorage.removeItem("kpPenetapan");
      setObjectState(undefined);
    } else {
      localStorage.setItem("kpPenetapan", JSON.stringify(val));
      setObjectState(val);
    }
  };

  //  const handleChangeProject = (event: SelectChangeEvent) => {
  //   setProject(event.target.value);
  //  };

  return (
    <DashboardLayout>
      <ContentPage
        noMinusMargin
        title="Kriteria Kemungkinan & Dampak Risiko"
        infoToolTip="Serangkaian parameter atau standar yang digunakan sebagai acuan untuk menilai dan menentukan
signifikansi risiko relatif terhadap sasaran dan tujuan pembangunan nasional. Rerangka acuan atau
referensi yang digunakan untuk mengevaluasi jenis risiko tertentu, serta menentukan signifikansi
risiko untuk mendukung pengambilan keputusan"
        withCard={false}
        // chipKp
        project={project}
        chooseObject={
          year == 0 ? (
            ""
          ) : (
            <FormControl size="small" sx={{ minWidth: "20vw" }}>
              <AutocompleteSelectSingle
                rounded
                value={objectState}
                options={objects}
                getOptionLabel={(opt) => `${opt.rkp.code} - ${opt.rkp.value}`}
                handleChange={(val: MasterListObjectRes | null) =>
                  handleSetObjectState(val)
                }
                placeHolder={"Pilih KP"}
              />
            </FormControl>
          )
        }
      >
        <TabCriteria />
      </ContentPage>
    </DashboardLayout>
  );
}
