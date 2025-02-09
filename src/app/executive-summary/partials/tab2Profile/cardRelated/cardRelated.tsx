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
import {
  ExsumRelatedInitState,
  exsumRelatedInitStateData
} from "@/app/executive-summary/partials/tab2Profile/cardRelated/cardRelatedModel";
import { MiscMasterListKebijakanRes } from "@/app/misc/master/masterServiceModel";
import DialogDelete from "@/components/dialogDelete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

export default function CardRelated({ project }: { project: string }) {
  const {
    data,
    modal,
    setModal,
    options,
    state,
    setState,
    updateData,
    deleteData,
    modalDelete,
    setModalDelete
  } = useCardRelatedVM();

  const { year } = useRKPContext((state) => state);
  console.log(year);

  const handleUpdateOrDelete = (index: number, action: string) => {
    if (index == -1) {
      const initState = JSON.parse(JSON.stringify(exsumRelatedInitStateData));
      setState(initState)
    } else {
      const selectedData = data[index]
      let opt: MiscMasterListKebijakanRes[] = []

      selectedData.kebijakan.map(k => {
        options.map(o => {
          if (o.id == k.src_kebijakan_id) {
            const newListKebijakan: MiscMasterListKebijakanRes = JSON.parse(JSON.stringify(o))
            k.list.map(l => {
              newListKebijakan.list.map((n, i) => {
                if (l.src_kebijakan_list_id == n.id) {
                  newListKebijakan.list[i].isCheck = true
                }
              })
            })

            opt.push(newListKebijakan)
          }
        })
      })

      const curState: ExsumRelatedInitState = {
        id: selectedData.id,
        value: selectedData.value,
        options: opt
      }
      setState(curState)
    }

    if (action == "update") {
      setModal(true)
    } else {
      setModalDelete(true)
    }

  }

  return (
    <CardItem
      title={`Keterkaitan Kegiatan Prioritas`}
      addButton={
        year <= 0 ?
          <AddButton
            filled
            small
            title="Tambah Kebijakan"
            onclick={() => handleUpdateOrDelete(-1, "update")}
          /> :
          ""
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
        <TableTagging project={project} data={data} handleUpdateOrDelete={handleUpdateOrDelete} />
      )}
      <DialogComponent
        width={"80%"}
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

      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleDelete={deleteData}
        handleCloseModal={() => setModalDelete(false)}
      />

    </CardItem>
  );
}
