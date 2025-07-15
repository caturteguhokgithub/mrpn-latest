import React, { Fragment } from "react";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import type ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import DialogComponent from "@/components/dialog";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import { Button, DialogActions } from "@mui/material";
import useInformationList from "./hooks/useInformation";
import { isDeveloping } from "@/components/layouts/layout";
import EmptyDevelopingState from "@/components/empty/developing";
import DialogDelete from "@/components/dialogDelete";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardInformation({
  activeSetting,
}: {
  activeSetting?: boolean;
}) {
  // const {
  //   // setModal,
  //   // updateData,
  //   // request,
  //   // modalObjectScope,
  //   // setModalObjectScope,
  // } = useCardSegmentVM();

  const {
    data,
    updateData,
    request,
    setRequest,
    modalObjectScope,
    setModalObjectScope,
    modalDelete,
    setModalDelete,
    deleteData,
  } = useInformationList();

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

  const emptyData = false;

  return (
    <Fragment>
      <CardItem
        title="Informasi Lain yang Relevan terkait Lingkup Objek MRPN LS"
        setting={activeSetting}
        settingEditOnclick={() => setModalObjectScope(true)}
        settingDeleteOnclick={() => setModalDelete(true)}
      >
        {/* {isDeveloping ? (
          <EmptyDevelopingState />
        ) : ( */}
        <Fragment>
          {data?.value == null ? (
            <EmptyState
              dense
              icon={<IconEmptyData width={100} />}
              title="Data Kosong"
              description="Silahkan isi konten halaman ini"
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data?.value ?? "" }} />
          )}
        </Fragment>
        {/* )} */}
      </CardItem>
      <DialogComponent
        dialogOpen={modalObjectScope}
        dialogClose={() => setModalObjectScope(false)}
        title="Informasi Lain yang Relevan terkait Lingkup Objek MRPN LS"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button
              variant="outlined"
              onClick={() => setModalObjectScope(false)}
            >
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
          key={request?.value}
          theme="snow"
          defaultValue={request?.value}
          forwardedRef={quillRef}
        />
      </DialogComponent>
      <DialogDelete
        title="Hapus Data"
        handleOpenModal={modalDelete}
        handleCloseModal={() => setModalDelete(false)}
        handleDelete={() => deleteData()}
      />
    </Fragment>
  );
}
