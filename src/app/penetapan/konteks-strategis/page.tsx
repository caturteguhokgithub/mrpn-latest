"use client";

import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import PageKonteksStrategisView from "@/app/penetapan/konteks-strategis/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageKonteksStrategis({}) {
  usePermissionChecker("penetapan.kriteriaRisiko");

  return (
    <DashboardLayout>
      <PageKonteksStrategisView />
    </DashboardLayout>
  );
}
