import React, { Fragment } from "react";
import {
  Button,
  DialogActions,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import dynamic from "next/dynamic";
import DialogComponent from "@/components/dialog";
import useCardGoalsVM from "./cardGoalsVM";
import type ReactQuill from "react-quill";
import DialogDelete from "@/components/dialogDelete";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardGoals({ project }: { project: string }) {
  const {
    data,
    modal,
    setModal,
    updateData,
    deleteData,
    request,
    setRequest,
    modalDelete,
    setModalDelete,
    handleModalDelete,
    sasaran,
  } = useCardGoalsVM();

  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import("react-quill");

      function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
        return <RQ ref={forwardedRef} {...props} />;
      }

      return QuillJS;
    },
    {
      ssr: false,
    }
  );
  const quillRef = React.useRef<ReactQuill>(null);

  const handleCreateOrUpdateData = async () => {
    const text = quillRef.current?.value;
    if (text) {
      const req = {
        ...request,
        value: text.toString(),
      };
      updateData(req);
    }
  };

  return (
    <CardItem
      title="Tujuan Utama/Goals Proyek"
      // setting
      // settingDeleteOnclick={handleModalDelete}
      // settingEditOnclick={() => setModal(true)}
    >
      {sasaran == undefined ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        // <div dangerouslySetInnerHTML={{ __html: data.value }}></div>
        sasaran?.sasaran_kp.map((ssr, iSsr) => (
          <Typography
            key={`ssr-${iSsr}`}
          >{`${ssr.code} - ${ssr.value}`}</Typography>
        ))
      )}
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Tujuan Utama/Goals Proyek"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleCreateOrUpdateData}
            >
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <ReactQuill
          key={request.value}
          theme="snow"
          defaultValue={request.value}
          forwardedRef={quillRef}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => deleteData()}
      />
    </CardItem>
  );
}
