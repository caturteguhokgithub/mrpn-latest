import React, { useEffect } from "react";
import { Button, DialogActions, Grid } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import FormStakeholder from "./form-stakeholder";
import useCardStakeholderInternalVM from "@/app/penetapan/konteks-strategis/cardStakeholders/vm";
import StakeholderChart from "@/app/penetapan/konteks-strategis/cardStakeholders/stakeholder-chart";

export default function CardStakeholderEksternal() {
  const {
    objectState,
    data,
    listStakeholder,
    modalOpenStakeholder,
    setModalOpenStakeholder,
    request,
    updateData,
    handleSelectStakeholder,
    getListStakeholder,
    getDataStakeholder,
    setType,
    type,
  } = useCardStakeholderInternalVM();

  useEffect(() => {
    if (objectState !== undefined) {
      setType("EKSTERNAL");
      getDataStakeholder();
      if (listStakeholder.length == 0) getListStakeholder();
    }
  }, [objectState, type]);

  const handleModalOpenStakeholder = () => {
    setModalOpenStakeholder(true);
  };

  const handleModalClose = () => {
    setModalOpenStakeholder(false);
  };

  return (
    <CardItem
      title="Daftar Pemangku Kepentingan Eksternal (Stakeholder Eksternal)"
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
        title="Ubah Daftar Pemangku Kepentingan Internal (Stakeholder Internal)"
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
              noTitle
              key={index}
              title={req.label}
              listStakeholder={listStakeholder}
              selectedStakeholder={req.stakeholder}
              setSelectedStakeholder={(items: number[]) =>
                handleSelectStakeholder(items, req.type_stakeholder)
              }
              description={req.value}
            />
          ))}
        </Grid>
      </DialogComponent>
    </CardItem>
  );
}
