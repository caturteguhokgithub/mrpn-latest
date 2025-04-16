import React, { Fragment } from "react";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import type ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import DialogComponent from "@/app/components/dialog";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import { Button, DialogActions } from "@mui/material";
import useInformationList from "./hooks/useInformation";
import { isDeveloping } from "@/app/components/layouts/layout";
import EmptyDevelopingState from "@/app/components/empty/developing";

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
      >
        {isDeveloping ? (
          <EmptyDevelopingState />
        ) : (
          <Fragment>
            {emptyData ? (
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
        )}
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
          key={request.value}
          theme="snow"
          defaultValue={request.value}
          forwardedRef={quillRef}
        />
      </DialogComponent>
    </Fragment>
  );
}
