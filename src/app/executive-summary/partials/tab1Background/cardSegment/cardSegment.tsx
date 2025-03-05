import React, { Fragment } from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import dynamic from "next/dynamic";
import DialogComponent from "@/app/components/dialog";
import { dataTema } from "../../../dataTema";
import type ReactQuill from "react-quill";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import DialogDelete from "@/app/components/dialogDelete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardSegment({
  project,
  activeSetting,
}: {
  project?: string;
  activeSetting?: boolean;
}) {
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
  } = useCardSegmentVM();

  const { year } = useRKPContext((state) => state);

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
      title="Segmen Penerima Manfaat"
      setting={year <= 0 || activeSetting}
      settingDeleteOnclick={handleModalDelete}
      settingEditOnclick={() => setModal(true)}
    >
      {data.value == "" ? (
        <EmptyState
          dense
          icon={<IconEmptyData width={100} />}
          title="Data Kosong"
          description="Silahkan isi konten halaman ini"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data.value }}></div>
      )}
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Segmen Penerima Manfaat"
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
