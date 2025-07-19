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
// import usePenetapanObjectVM from "@/app/penetapan/objek/pageVM";

const useNotaDinasVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [gambar, setGambar] = useState<BuktiDukungResDto[]>([]);
  const initUploadImage = JSON.parse(JSON.stringify(initUploadBuktiDukung));
  const [gambarState, setGambarState] =
    useState<BuktiDukungReqDto>(initUploadImage);
  const user = useAuthContext((state) => state);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalReject, setModalReject] = useState(false);
  const [modalApproval, setModalApproval] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isApproval, setIsApproval] = useState(false);

  // const { resetBuktiDukungForm, setModalBuktiDukung } = usePenetapanObjectVM();

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
    // if (gambarState == undefined) return;
    if (!objectState?.id || !user.user?.id) {
      throw new Error("Missing required data for upload");
    }

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

    // if (response?.code == API_CODE.success) {
    //   getDataImage();
    // }

    if (response?.code === API_CODE.success) {
      await getDataImage();
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Upload failed"));
    }

    // if (response?.code == API_CODE.success) {
    //   // resetBuktiDukungForm();
    //   getDataImage();
    //   // setModalBuktiDukung(false);
    // }
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

  const getNotaDinasGambar = async (objectId: number) => {
    const response = await doGetBuktiDukung({
      body: { penetapan_object_id: objectId },
    });
    if (response?.code === API_CODE.success) {
      setGambar(response.result);
    } else {
      setGambar([]);
    }
  };

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
    modalConfirm,
    setModalConfirm,
    isReview,
    setIsReview,
    modalReject,
    setModalReject,
    isReject,
    setIsReject,
    modalApproval,
    setModalApproval,
    isApproval,
    setIsApproval,
    getNotaDinasGambar,
    getDataImage,
  };
};
export default useNotaDinasVM;
