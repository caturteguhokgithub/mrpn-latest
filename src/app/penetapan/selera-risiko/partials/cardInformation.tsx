import React, { Fragment } from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import type ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import DialogComponent from "@/app/components/dialog";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import { Button, DialogActions } from "@mui/material";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardInformation({
  activeSetting,
}: {
  activeSetting?: boolean;
}) {
  const emptyData = false;
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
    <Fragment>
      <CardItem
        title="Informasi Lain"
        setting={activeSetting}
        settingEditOnclick={() => setModal(true)}
      >
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
      <DialogComponent
        dialogOpen={modal}
        dialogClose={() => setModal(false)}
        title="Informasi Lain"
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
    </Fragment>
  );
}
