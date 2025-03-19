import React from "react";
import { Button, DialogActions, Typography } from "@mui/material";
import EmptyState from "@/app/components/empty";
import { IconEmptyData } from "@/app/components/icons";
import CardItem from "@/app/components/cardTabItem";
import DialogComponent from "@/app/components/dialog";
import useCardUrgentVM from "./cardUrgentVM";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import DialogDelete from "@/app/components/dialogDelete";
import { useRKPContext } from "@/lib/core/hooks/useHooks";
import useUrgensiVM from "@/app/penetapan/internal-eksternal/pageVM";

interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: React.LegacyRef<ReactQuill>;
}

export default function CardUrgent({
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
  } = useCardUrgentVM();

<<<<<<< Updated upstream
  const {
    requestUrgensi,
    updateDataUrgensi,
    dataUrgensi,
  } = useUrgensiVM();
=======
  const { requestUrgensi, updateDataUrgensi, dataUrgensi } = useUrgensiVM();
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
      const req = {
        ...request,
        value: text.toString(),
      };
      updateData(req);
=======
>>>>>>> Stashed changes
      if (penetapan) {
        const req = {
          ...requestUrgensi,
          value: text.toString(),
        };

<<<<<<< Updated upstream
        updateDataUrgensi(req)
=======
        updateDataUrgensi(req);
        setModal(false);
>>>>>>> Stashed changes
      } else {
        const req = {
          ...request,
          value: text.toString(),
        };

        updateData(req);
<<<<<<< Updated upstream
      }
=======
        setModal(false);
      }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    }
  };

  return (
    <CardItem
      title="Urgensi Proyek"
      setting={year <= 0 || activeSetting}
      settingDeleteOnclick={handleModalDelete}
      settingEditOnclick={() => setModal(true)}
    >
      {penetapan ? (
        dataUrgensi?.value == "" ? (
          <EmptyState
            dense
            icon={<IconEmptyData width={100} />}
            title="Data Kosong"
            description="Silahkan isi konten halaman ini"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: dataUrgensi?.value ?? "" }}
          ></div>
        )
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
        title="Urgensi Proyek"
        dialogFooter={
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button variant="outlined" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button variant="contained" onClick={handleCreateOrUpdateData}>
              Simpan
            </Button>
          </DialogActions>
        }
      >
        <ReactQuill
          key={penetapan ? dataUrgensi?.value : request.value}
          theme="snow"
          defaultValue={penetapan ? dataUrgensi?.value : request.value}
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
