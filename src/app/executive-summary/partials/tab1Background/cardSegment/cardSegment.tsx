import React, { Fragment } from "react";
import { Box, Button, DialogActions } from "@mui/material";
import EmptyState from "@/components/empty";
import { IconEmptyData } from "@/components/icons";
import CardItem from "@/components/cardTabItem";
import dynamic from "next/dynamic";
import DialogComponent from "@/components/dialog";
import type ReactQuill from "react-quill";
import useCardSegmentVM from "@/app/executive-summary/partials/tab1Background/cardSegment/cardSegmentVM";
import DialogDelete from "@/components/dialogDelete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import useUrgensiVM from "@/app/penetapan/internal-eksternal/pageVM";
import { DividerIntExt } from "../cardUrgent/cardUrgent";
import AddButton from "@/components/buttonAdd";
import Iconify from "@/components/icons/iconify";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardSegment({
  project,
  activeSetting,
  penetapan,
}: {
  project?: string;
  activeSetting?: boolean;
  penetapan?: boolean;
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

  const { dataSegmen, requestSegmen, uriRequestSegmen } = useUrgensiVM();

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
      if (penetapan) {
        const req = {
          ...requestSegmen,
          value: text.toString(),
        };

        uriRequestSegmen(req);
        setModal(false);
      } else {
        const req = {
          ...request,
          value: text.toString(),
        };

        updateData(req);
        setModal(false);
      }
    }

    // if (text) {
    //   const req = {
    //     ...request,
    //     value: text.toString(),
    //   };
    //   updateData(req);
    // }
  };

  return (
    <CardItem
      title="Segmen Penerima Manfaat"
      // setting={year <= 0 || activeSetting}
      settingDeleteOnclick={handleModalDelete}
      settingEditOnclick={() => setModal(true)}
      setting={penetapan ? false : true}
    // addButton={
    //   <>
    //     {penetapan && (
    //       <AddButton
    //         filled
    //         startIcon={<Iconify name="mdi:pencil" />}
    //         title="Ubah Segmen"
    //         onclick={() => setModal(true)}
    //       />
    //     )}
    //   </>
    // }
    >
      {penetapan ? (
        <Fragment>
          <Box sx={{ opacity: 0.8 }}>
            <DividerIntExt label="Data ini merupakan referensi dari Executive Summary" />
            <div dangerouslySetInnerHTML={{ __html: data.value }}></div>
          </Box>
          <>
            <DividerIntExt />
            {dataSegmen?.value == "" ? (
              <EmptyState
                dense
                icon={<IconEmptyData width={100} />}
                title="Data Kosong"
                description="Silahkan isi konten halaman ini"
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: dataSegmen?.value ?? "" }}
              ></div>
            )}
          </>
        </Fragment>
      ) : data.value == "" ? (
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
          key={penetapan ? dataSegmen?.value : request.value}
          theme="snow"
          defaultValue={penetapan ? dataSegmen?.value : request.value}
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
