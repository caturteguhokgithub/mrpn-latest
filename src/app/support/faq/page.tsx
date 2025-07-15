"use client";

import ContentPage from "@/components/contents";
import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import { SelectChangeEvent } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageFAQ() {
  usePermissionChecker("support.faq");

  const [project, setProject] = React.useState("");

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <DashboardLayout>
      <ContentPage
        title="FAQ (Frequently Asked Question)"
        withCard
        project={project}
        // handleChangeProject={handleChangeProject}
      >
        <EmptyState
          icon={<IconEmptyPage />}
          title="Halaman FAQ (Frequently Asked Question) Kosong"
          description="Silahkan isi konten halaman ini"
        />
      </ContentPage>
    </DashboardLayout>
  );
}
