"use client";

import ContentPage from "@/app/components/contents";
import React from "react";
import DashboardLayout from "@/app/components/layouts/layout";
import { SelectChangeEvent } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyPage } from "@/app/components/icons";

export default function PageFAQ() {
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
