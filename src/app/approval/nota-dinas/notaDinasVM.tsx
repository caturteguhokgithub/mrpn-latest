import {
  useGlobalModalContext,
  usePenetapanTopicContext,
  useLoading,
  useRKPContext,
  useAuthContext,
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import { API_CODE, ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  doDeleteNodin,
  doGetBuktiDukung,
  doUnggahBuktiDukung,
} from "./notaDinasService";
import {
  BuktiDukungReqDto,
  BuktiDukungResDto,
  initUploadBuktiDukung,
} from "./notaDinasModel";

const useNotaDinasVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [gambar, setGambar] = useState<BuktiDukungResDto[]>([]);
  const initUploadImage = JSON.parse(JSON.stringify(initUploadBuktiDukung));
  const [gambarState, setGambarState] =
    useState<BuktiDukungReqDto>(initUploadImage);
  const user = useAuthContext((state) => state);
  const [modalDelete, setModalDelete] = useState(false);

  // const { year } = useRKPContext((state) => state);

  const { objectState, setObjectState } = usePenetapanTopicContext(
    (state) => state
  );

  async function getDataImage() {
    const response = await doGetBuktiDukung({
      body: { penetapan_object_id: objectState?.id ?? 0 },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: BuktiDukungResDto | BuktiDukungResDto[] = response.result;
      if (result) {
        setGambar(Array.isArray(result) ? result : [result]);
      }
    }
  }

  async function uploadImage(gambar: string, fileName: string) {
    if (gambarState == undefined) return;

    const req: BuktiDukungReqDto = {
      filename: fileName ?? "file",
      file: gambar ?? "",
      penetapan_object_id: objectState?.id ?? 0,
      user_id: user.user?.id ?? 0,
    };

    const response = await doUnggahBuktiDukung({
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getDataImage();
    }
  }

  async function deleteNodin(id: number) {
    const params = {
      body: {
        id: id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteNodin(params);
    if (response?.code == API_CODE.success) {
      getDataImage();
    }
  }

  useEffect(() => {
    getDataImage();
  }, [objectState?.id]);

  return {
    gambar,
    gambarState,
    setGambarState,
    uploadImage,
    objectState,
    setObjectState,
    modalDelete,
    setModalDelete,
    deleteNodin,
  };
};
export default useNotaDinasVM;
