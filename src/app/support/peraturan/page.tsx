"use client";

import ContentPage from "@/components/contents";
import React from "react";
import DashboardLayout from "@/components/layouts/layout";
import { SelectChangeEvent } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyPage } from "@/components/icons";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PagePeraturan() {
  usePermissionChecker("support.peraturan");

  const [project, setProject] = React.useState("");

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <DashboardLayout>
      <ContentPage
        title="Peraturan"
        withCard
        project={project}
        // handleChangeProject={handleChangeProject}
      >
        <EmptyState
          icon={<IconEmptyPage />}
          title="Halaman Peraturan Kosong"
          description="Silahkan isi konten halaman ini"
        />
      </ContentPage>
    </DashboardLayout>
  );
}
