import React, { Fragment } from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import AddButton from "@/app/components/buttonAdd";
import DialogComponent from "@/app/components/dialog";
// import TableDampak from "./table-dampak";
// import FormSasaran from "./form-sasaran";
import { dataTema } from "../../dataTema";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

export default function CardNomenklatur({ project }: { project: string }) {
  const { rkpState } = useRKPContext((state) => state);

  return (
    <CardItem title="Nomenklatur Kegiatan Prioritas">
      {rkpState === undefined ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <Typography variant="body1">{rkpState.value}</Typography>
      )}
    </CardItem>
  );
}
