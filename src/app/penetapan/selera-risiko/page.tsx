"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import PageSeleraRisikoView from "@/app/penetapan/selera-risiko/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageSeleraRisiko({}) {
  usePermissionChecker("penetapan.kriteriaRisiko");

  return (
    <DashboardLayout>
      <PageSeleraRisikoView />
    </DashboardLayout>
  );
}
