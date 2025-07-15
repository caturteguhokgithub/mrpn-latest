import React from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import InstitutionOrgChart from "./partials/org-chart";

export default function CardInstitution({ project }: { project: string }) {
  const isEmpty = false;

  return (
    <CardItem title="Instansi Pelaksana">
      {isEmpty || project === "4" ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <InstitutionOrgChart />
      )}
    </CardItem>
  );
}
