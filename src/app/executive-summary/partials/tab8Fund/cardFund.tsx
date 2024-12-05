import React, { useEffect } from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import TableFund from "./tableFund";
import useCardFundVM from "@/app/executive-summary/partials/tab8Fund/cardFundVM";

export default function CardFund({ project }: { project: string }) {
  const isEmpty = false;

  const { exsum, dataFund, dataTableFund, getDataFund } = useCardFundVM(project);

  useEffect(() => {
    if (exsum != undefined) getDataFund();
  }, [exsum]);

  return (
    <CardItem
      title={`Pendanaan & Investasi ${exsum.level}`}
      infoTooltip="Menampilkan informasi lengkap terkait dengan target dan alokasi tahunan, sumber pendanaan, instansi pelaksana, serta lokasi dari Proyek/RO kunci"
      contentNoPadding
    >
      {dataFund.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TableFund project={project} data={dataTableFund} />
      )}
    </CardItem>
  );
}
