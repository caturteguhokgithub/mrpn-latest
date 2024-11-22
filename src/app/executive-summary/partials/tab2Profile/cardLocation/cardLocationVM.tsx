import {
  useExsumContext,
  useGlobalModalContext,
  useLoading,
} from "@/lib/core/hooks/useHooks";
import { useEffect, useState } from "react";
import {
  ExsumLocationDto,
  ExsumLocationUpdateDto,
  initExsumLocationUpdateDto,
} from "@/app/executive-summary/partials/tab2Profile/cardLocation/cardLocationModel";
import {
  doCreate,
  doGet,
  doUpdate,
} from "@/app/executive-summary/partials/tab2Profile/cardLocation/cardLocationService";
import { API_CODE } from "@/lib/core/api/apiModel";
import { doGetMasterListProvinsi } from "@/app/misc/master/masterService";
import { MiscMasterListProvinsiRes } from "@/app/misc/master/masterServiceModel";
import { doGetRkpLocation } from "@/app/misc/rkp/rkpService";
import {
  RkpDefaultReqV1Dto,
  RkpLocationReqDto,
} from "@/app/misc/rkp/rkpServiceModel";

const useCardLocationVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const { exsum } = useExsumContext();

  const [columns, setColumns] = useState<MiscMasterListProvinsiRes[]>([]);

  const [listProvinsi, setListProvinsi] = useState<MiscMasterListProvinsiRes[]>(
    []
  );

  const [locationExsum, setLocationExsum] = useState<
    MiscMasterListProvinsiRes[]
  >([]);
  const [data, setData] = useState<ExsumLocationDto[]>([]);
  const [request, setRequest] = useState<ExsumLocationUpdateDto>({
    ...initExsumLocationUpdateDto,
  });
  const [modal, setModal] = useState(false);

  async function getLocationByExsumTOWSDiagram() {
    const params: RkpLocationReqDto = {
      action: "exsum_only",
      exsum_id: exsum.id,
    };
    const response = await doGetRkpLocation({
      body: params,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      const result: MiscMasterListProvinsiRes[] = response.result;
      setLocationExsum(result);
    }
  }

  async function getData() {
    const response = await doGet({
      body: {
        exsum_id: exsum.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });

    if (response?.code == API_CODE.success) {
      let result: ExsumLocationDto[] = response.result;
      if (result.length > 0) {
        setData(result);
        // setRequest(result[0]);
      } else {
        setData([]);
        setRequest({ ...initExsumLocationUpdateDto });
      }
    }
    getLocationByExsumTOWSDiagram();
  }

  useEffect(() => {
    if (exsum.id !== 0) {
      getListProvinsi();
      getData();
      getLocationByExsumTOWSDiagram();
    }
  }, [exsum]);

  async function updateData(req: ExsumLocationUpdateDto) {
    req.exsum_id = exsum.id;
    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    if (request.id !== 0) {
      const response = await doUpdate(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModal(false);
      }
    } else {
      const response = await doCreate(params);
      if (response?.code == API_CODE.success) {
        getData();
        setModal(false);
      }
    }
  }

  async function getListProvinsi() {
    const response = await doGetMasterListProvinsi({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result: MiscMasterListProvinsiRes[] = response.result;
      if (result) {
        setListProvinsi(result);
      }
    }
  }

  const handleChangeLocation = (value: MiscMasterListProvinsiRes[]) => {
    setRequest((prev) => {
      return {
        ...prev,
        lokasi: value,
      };
    });
  };

  return {
    data,
    request,
    setRequest,
    modal,
    setModal,
    locationExsum,
    updateData,
    columns,
    setColumns,
    listProvinsi,
    getListProvinsi,
    handleChangeLocation,
  };
};

export default useCardLocationVM;
