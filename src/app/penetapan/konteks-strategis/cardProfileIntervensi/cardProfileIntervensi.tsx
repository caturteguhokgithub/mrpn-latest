import React, { useEffect } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import TableProfilIntervensi from "@/app/executive-summary/partials/tab4Cascading/table-profil-intervensi";
import useProfileKunciVM from "@/app/penetapan/konteks-strategis/cardProfileIntervensi/vm";

export default function CardProfileIntervensi() {
  const { objectState, data, getDataProfileKunci } = useProfileKunciVM();

  useEffect(() => {
    if (objectState != undefined) getDataProfileKunci();
  }, [objectState]);

  return (
    <CardItem title="Profil Intervensi Kunci">
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi profil intervensi pada halaman executive summary"
        />
      ) : (
        <TableProfilIntervensi
          data={data}
          noActionColumn
          page="konteks-strategis"
        />
      )}
    </CardItem>
  );
}
