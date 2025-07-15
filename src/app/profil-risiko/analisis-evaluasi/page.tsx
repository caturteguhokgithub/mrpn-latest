"use client";

import DashboardLayout from "@/components/layouts/layout";
import PageAnalisisEvaluasiView from "@/app/profil-risiko/analisis-evaluasi/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageAnalisisEvaluasi({}) {
  usePermissionChecker("profilRisiko.analisisEvaluasiRisiko");
  return (
    <DashboardLayout>
      <PageAnalisisEvaluasiView />
    </DashboardLayout>
  );
}
