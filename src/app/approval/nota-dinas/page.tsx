"use client";

import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import PageApprovalNotaDinasView from "@/app/approval/nota-dinas/pageView";
import { defaultPenetapanObjectState } from "@/lib/core/context/penetapanTopicContext";
import { PenetapanTopicProvider } from "@/lib/core/provider/penetapanTopicProvider";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageApprovalNotaDinas({}) {
  usePermissionChecker("approval.notaDinas");

  return (
    <PenetapanTopicProvider state={defaultPenetapanObjectState}>
      <DashboardLayout>
        <PageApprovalNotaDinasView />
      </DashboardLayout>
    </PenetapanTopicProvider>
  );
}
