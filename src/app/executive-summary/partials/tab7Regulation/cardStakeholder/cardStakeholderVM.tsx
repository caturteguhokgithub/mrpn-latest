import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
  useRKPContext
} from "@/lib/core/hooks/useHooks";
import React, { useEffect, useState } from "react";
import {
  initUpdateLogoStakeholderDto,
  MiscMasterListStakeholderRes,
  UpdateLogoStakeholderDto,
  UpdateLogoStakeholderReq,
} from "@/app/misc/master/masterServiceModel";
import {
  doGetMasterListStakeholder,
  doUpdateLogoStakeholder,
} from "@/app/misc/master/masterService";
import { API_CODE, ResponseBaseDto } from "@/lib/core/api/apiModel";
import {
  ExsumStakeholderImageReqDto,
  ExsumStakeholderImageResDto,
  ExsumStakeholderReqDto,
  ExsumStakeholderResDto,
  ExsumStakeholderValueDto,
  initExsumStakeholderReqDto,
  initUploadImageStakeholderDto,
} from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderModel";
import {
  doCreate,
  doGet,
  doLihatGambar,
  doUnggahGambar,
  doUpdate,
} from "@/app/executive-summary/partials/tab7Regulation/cardStakeholder/cardStakeholderService";
import { grey } from "@mui/material/colors";

const useCardStakeholderVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();
  const { year } = useRKPContext((state) => state);

  const [listStakeholder, setListStakeholder] = useState<
    MiscMasterListStakeholderRes[]
  >([]);
  const [modalOpenStakeholder, setModalOpenStakeholder] = React.useState(false);
  const [data, setData] = useState<ExsumStakeholderResDto[]>([]);
  const [gambar, setGambar] = useState<ExsumStakeholderImageResDto>();
  const [request, setRequest] = useState<ExsumStakeholderReqDto>(
    initExsumStakeholderReqDto
  );
  const [modalListLogo, setModalListLogo] = useState<boolean>(false);
  const [modalLogo, setModalLogo] = useState<boolean>(false);
  const initUploadLogo = JSON.parse(
    JSON.stringify(initUpdateLogoStakeholderDto)
  );
  const [logoState, setLogoState] =
    useState<UpdateLogoStakeholderDto>(initUploadLogo);
  const [modalViewImage, setModalViewImage] = useState<boolean>(false);

  const initUploadImage = JSON.parse(JSON.stringify(initUploadImageStakeholderDto));
  const [gambarState, setGambarState] = useState<ExsumStakeholderImageReqDto>(initUploadImage);

  const [edited, setEdited] = useState(false);

  async function getListStakeholder() {
    const response = await doGetMasterListStakeholder({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListStakeholderRes[] = response.result;
      if (result) {
        setListStakeholder(result);
      }
    }
  }

  async function getData() {
    const response = await doGet({
      body: { exsum_id: exsum.id },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: ExsumStakeholderResDto[] = response.result;
      setData(result);

      const genereteReq: ExsumStakeholderReqDto = {
        ...request,
      };
      result.map((res) => {
        const indexReq = genereteReq.values.findIndex(
          (x) => x.type == res.type
        );
        if (indexReq > -1) {
          genereteReq.values[indexReq].stakeholder = res.stakeholder;
          genereteReq.values[indexReq].value = res.value;
        }
      });
      genereteReq.id = 1;
      setRequest(genereteReq);

      setEdited(result[0]?.isEdit ?? true);
    }
  }

  async function updateData() {
    const req: ExsumStakeholderReqDto = {
      ...request,
      exsum_id: exsum.id,
    };

    let response: ResponseBaseDto | undefined;
    if (req.id > 0) {
      response = await doUpdate({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    } else {
      response = await doCreate({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      });
    }

    if (response?.code == API_CODE.success) {
      getData().then((r) => {
        setModalOpenStakeholder(false);
      });
    }
  }

  async function updateLogo() {
    if (logoState == undefined) return;
    const response = await doUpdateLogoStakeholder({
      body: logoState,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getData();
      const initUploadLogo = JSON.parse(
        JSON.stringify(initUpdateLogoStakeholderDto)
      );
      setLogoState(initUploadLogo);
      setModalLogo(false);
    }
  }

  async function getDataImage() {
    const response = await doLihatGambar({
      body: { exsum_id: exsum.id },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: ExsumStakeholderImageResDto = response.result;
      if (result) {
        setGambar(result);
      }
    }
  }

  async function uploadImage(gambar: string) {
    if (gambarState == undefined) return;

    const req: ExsumStakeholderImageReqDto = {
      exsum_id: exsum.id ?? 0,
      file: gambar ?? "",
    };

    const response = await doUnggahGambar({
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      getDataImage()
    }
  }

  const handleSelectStakeholder = (selectedItems: number[], type: string) => {
    const itemSelected: MiscMasterListStakeholderRes[] = [];
    selectedItems.map((x) => {
      const getId = listStakeholder.find((i) => i.id == x);
      if (getId) itemSelected.push(getId);
    });

    setRequest((prev) => {
      const newVal = { ...prev };
      const stakeholderTypeIndex = newVal.values.findIndex(
        (item) => item.type == type
      );

      if (stakeholderTypeIndex > -1) {
        newVal.values[stakeholderTypeIndex].stakeholder = itemSelected;
      }
      return newVal;
    });
  };

  const handleChangeDescription = (value: string, type: string) => {
    setRequest((prev) => {
      const newVal = { ...prev };
      const stakeholderTypeIndex = newVal.values.findIndex(
        (item) => item.type == type
      );

      if (stakeholderTypeIndex > -1) {
        newVal.values[stakeholderTypeIndex].value = value;
      }
      return newVal;
    });
  };

  useEffect(() => {
    if (listStakeholder.length == 0) getListStakeholder();
    if (exsum.id != 0) {
      getData();
      getDataImage();
    }
  }, [exsum]);

  const handleEdited = () => {
    setEdited(true);
  };

  const conditionEditing =
    year > 0 && !edited ? `${grey[600]} !important` : "inherit";

  const conditionEditingImg =
    year > 0 && !edited ? "grayscale(1)" : "grayscale(0)";

  return {
    data,
    gambar,
    listStakeholder,
    modalOpenStakeholder,
    setModalOpenStakeholder,
    request,
    setRequest,
    updateData,
    handleSelectStakeholder,
    handleChangeDescription,
    logoState,
    setLogoState,
    gambarState,
    setGambarState,
    updateLogo,
    uploadImage,
    modalListLogo,
    setModalListLogo,
    modalLogo,
    setModalLogo,
    modalViewImage,
    setModalViewImage,
    handleEdited,
    conditionEditing,
    conditionEditingImg,
  };
};
export default useCardStakeholderVM;
