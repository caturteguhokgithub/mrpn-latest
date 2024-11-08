import React from "react";
import { Button, DialogActions } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import AddButton from "@/components/buttonAdd";
import DialogComponent from "@/components/dialog";
import TableTagging from "./table-tagging";
import FormRelated from "./form-related";
import useCardRelatedVM from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedVM";

export default function CardRelated({ project }: { project: string }) {
  const {
    data,
    modal,
    setModal,
    options,
    request,
    setRequest,
    state,
    setState,
    updateData,
    deleteData,
  } = useCardRelatedVM();

  return (
    <CardItem
      title={`Keterkaitan Kegiatan Prioritas`}
      addButton={
        <AddButton
          filled
          small
          title="Tambah Kebijakan"
          onclick={() => setModal(true)}
        />
      }
    >
      {data.length == 0 ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <TableTagging project={project} data={data} handleDelete={deleteData} />
      )}
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Tambah Kebijakan"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
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
        <FormRelated
          mode="add"
          options={options}
          state={state}
          setState={setState}
        />
      </DialogComponent>
    </CardItem>
  );
}
