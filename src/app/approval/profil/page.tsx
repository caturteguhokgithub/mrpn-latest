"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import PageApprovalProfilView from "@/app/approval/profil/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageApprovalProfil() {
  usePermissionChecker("approval.profilRisiko");

  return (
    <DashboardLayout>
      <PageApprovalProfilView />
    </DashboardLayout>
  );
}
