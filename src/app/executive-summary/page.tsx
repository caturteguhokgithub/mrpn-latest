"use client";

import DashboardLayout from "@/components/layouts/layout";
import PageExecutiveSummaryView from "./pageView";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageExecutiveSummary({}) {
  usePermissionChecker();

  return (
    <DashboardLayout>
      <PageExecutiveSummaryView />
    </DashboardLayout>
  );
}
