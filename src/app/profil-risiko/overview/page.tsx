"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import PageOverviewView from "@/app/profil-risiko/overview/pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageOverview() {
  usePermissionChecker("profilRisiko.overviewProfil");

  return (
    <DashboardLayout>
      <PageOverviewView />
    </DashboardLayout>
  );
}
