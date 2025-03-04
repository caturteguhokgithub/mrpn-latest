import React from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";

export default function CardInformation() {
  const emptyData = false;

  return (
    <CardItem title="Informasi Lain" setting>
      {!emptyData ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
          eveniet quos nisi hic consequatur repudiandae expedita quas quasi
          sequi minima laudantium nobis cum similique rerum odio incidunt,
          aliquam nesciunt. Neque!
        </>
      )}
    </CardItem>
  );
}
