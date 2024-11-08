import React from "react";
import { Button, DialogActions, Grid } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormStakeholder from "./form-stakeholder";
import StakeholderChart from "@/components/cardStakeholder/stakeholder-chart";
import useCardStakeholderVM from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderVM";

export default function CardStakeholder({ project }: { project: string }) {
  const {
    data,
    listStakeholder,
    modalOpenStakeholder,
    setModalOpenStakeholder,
    request,
    updateData,
    handleSelectStakeholder,
    handleChangeDescription,
  } = useCardStakeholderVM();

  const handleModalOpenStakeholder = () => {
    setModalOpenStakeholder(true);
  };

  const handleModalClose = () => {
    setModalOpenStakeholder(false);
  };

  const isEmpty = false;

  return (
    <CardItem
      title="Instansi Pelaksana"
      setting
      settingEditOnclick={handleModalOpenStakeholder}
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <StakeholderChart data={data} />
      )}

      <DialogComponent
        width="800px"
        dialogOpen={modalOpenStakeholder}
        dialogClose={handleModalClose}
        title="Ubah Instansi Pelaksana"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={handleModalClose}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => updateData()}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <Grid container spacing={2}>
          {request.values.map((req, index) => (
            <FormStakeholder
              key={index}
              title={req.label}
              listStakeholder={listStakeholder}
              selectedStakeholder={req.stakeholder}
              setSelectedStakeholder={(items: number[]) =>
                handleSelectStakeholder(items, req.type)
              }
            />
          ))}
        </Grid>
      </DialogComponent>
    </CardItem>
  );
}
