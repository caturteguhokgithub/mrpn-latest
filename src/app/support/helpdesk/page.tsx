"use client";

import ContentPage from "@/app/components/contents";
import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import { SelectChangeEvent } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyPage } from "@/app/components/icons";
import { usePermissionChecker } from "@/lib/core/helpers/authHelpers";

export default function PageHelpdesk() {
  usePermissionChecker("support.helpdesk");

  const [project, setProject] = React.useState("");

  const handleChangeProject = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <DashboardLayout>
      <ContentPage
        title="Helpdesk"
        withCard
        project={project}
        // handleChangeProject={handleChangeProject}
      >
        <EmptyState
          icon={<IconEmptyPage />}
          title="Halaman Helpdesk Kosong"
          description="Silahkan isi konten halaman ini"
        />
      </ContentPage>
    </DashboardLayout>
  );
}
