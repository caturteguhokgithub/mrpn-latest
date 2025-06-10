"use client";

import DashboardLayout, { isDeveloping } from "@/app/components/layouts/layout";
// import PagePerlakuanView from "@/app/profil-risiko/perlakuan/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";
import PagePerlakuanViewNew from "./pageViewNew";

export default function PagePerlakuan({}) {
  usePermissionChecker("profilRisiko.perlakuanRisiko");
  return (
    <DashboardLayout>
      {/* {isDeveloping ? <PagePerlakuanView /> : <PagePerlakuanViewNew />} */}
      <PagePerlakuanViewNew />
    </DashboardLayout>
  );
}
