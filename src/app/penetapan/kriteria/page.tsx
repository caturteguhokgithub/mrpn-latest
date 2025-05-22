"use client";

import ContentPage from "@/app/components/contents";
import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
// import { SelectChangeEvent } from "@mui/material";
import TabCriteria from "./partials/tab";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageKriteria({}) {
  usePermissionChecker("penetapan.kriteriaRisiko");

  const [project, setProject] = React.useState("");
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
        chipKp
        project={project}
        // handleChangeProject={handleChangeProject}
      >
        <TabCriteria />
      </ContentPage>
    </DashboardLayout>
  );
}
