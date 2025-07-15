"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import PageIdentifikasiView from "@/app/profil-risiko/identifikasi/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageIdentifikasi({}) {
  usePermissionChecker("profilRisiko.identifikasiRisiko");
  return (
    <DashboardLayout>
      <PageIdentifikasiView />
    </DashboardLayout>
  );
}
