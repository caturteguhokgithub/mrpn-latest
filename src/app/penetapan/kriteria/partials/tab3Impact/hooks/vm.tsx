import { useEffect, useState } from "react";
import { API_CODE } from "@/lib/core/api/apiModel";
import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import usePenetapanGlobalVM from "@/app/penetapan/penetapanGlobalVM";
import {
  AreasShowMatDamKomite,
  List,
  ReqAddMatDamKomite,
  ReqAddMatDamUpr,
  ResShowMatDamKomite,
  ValuesShowMatDamKomite,
  initReqAddMatDamKomite,
  initReqAddMatDamUpr,
} from "./model";
import {
  doCreateMatDamKomite,
  doCreateMatDamUpr,
  doDeleteMatDamKomite,
  doDeleteMatDamUpr,
  doShowMatDamKomite,
  doUpdateMatDamKomite,
  doUpdateMatDamUpr,
} from "./service";

const useKriteriaDampakVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const [loading, setLoading] = useState(false);
  const { objectState } = usePenetapanGlobalVM();
  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalOpenDelete, setModalDelete] = useState(false);
  const [modalOpenDeleteArea, setModalDeleteArea] = useState(false);
  const [modalOpenAddKomite, setModalOpenAddKomite] = useState(false);
  const [modalOpenEditKomite, setModalOpenEditKomite] = useState(false);

  const [dataMatDamKomite, setDataMatDamKomite] = useState<
    ValuesShowMatDamKomite[]
  >([]);
  const [requestMatDamKomite, setRequestMatDamKomite] =
    useState<ReqAddMatDamKomite>({ ...initReqAddMatDamKomite });
  const [requestMatDamUpr, setRequestMatDamUpr] = useState<ReqAddMatDamUpr>({
    ...initReqAddMatDamUpr,
  });
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [modalOpenRef, setModalOpenRef] = useState(false);

  const [stateUpr, setStateUpr] = useState<ReqAddMatDamUpr>({
    ...initReqAddMatDamUpr,
  });
  const [stateKom, setStateKom] = useState<ReqAddMatDamKomite>({
    ...initReqAddMatDamKomite,
  });

  async function showMatDamKomite() {
    const params = {
      body: {
        uraian_penetapan_object_id: objectState?.id,
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doShowMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      setDataMatDamKomite(response.result?.values ?? []);
    }
  }

  async function createMatDamKomite(param: ReqAddMatDamKomite) {
    const req: ReqAddMatDamKomite = {
      ...param,
      uraian_penetapan_object_id: objectState?.id ?? 0,
    };

    const params = {
      body: req,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response =
      param.id == 0
        ? await doCreateMatDamKomite(params)
        : await doUpdateMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      showMatDamKomite();
      setModalOpenAddKomite(false);
      setModalOpenEditKomite(false);
      setRequestMatDamKomite({ ...initReqAddMatDamKomite });
    }
  }

  async function deleteMatDamKomite(param: ReqAddMatDamKomite) {
    const params = {
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteMatDamKomite(params);
    if (response?.code == API_CODE.success) {
      showMatDamKomite();
      setModalDeleteArea(false);
      setRequestMatDamKomite({ ...initReqAddMatDamKomite });
    }
  }

  async function createMatDamUpr(param: ReqAddMatDamUpr) {
    const isNew = param.id === 0;

    if (isNew) {
      const params = {
        body: param,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      };

      const response = await doCreateMatDamUpr(params);

      if (response?.code == API_CODE.success) {
        setModalOpenAdd(false);
        showMatDamKomite();
      }
    } else {
      const params = {
        body: param.lists[0],
        loadingContext: loadingContext,
        errorModalContext: errorModalContext,
      };

      const response = await doUpdateMatDamUpr(params);
      if (response?.code == API_CODE.success) {
        setModalOpenAdd(false);
        showMatDamKomite();
      }
    }
  }

  async function deleteMatDamUpr(param: ReqAddMatDamUpr) {
    const params = {
      body: param,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    };

    const response = await doDeleteMatDamUpr(params);
    if (response?.code == API_CODE.success) {
      setModalDelete(false);
      showMatDamKomite();
    }
  }

  const [openCollapse, setOpenCollapse] = useState(true);

  const handleEdit = () => {
    setModalOpenEdit(true);
  };

  const handleDelete = () => {
    setModalDelete(true);
  };

  const handleEditArea = () => {
    setModalOpenEditKomite(true);
  };

  const handleDeleteArea = () => {
    setModalDeleteArea(true);
  };

  const prosesBtnEdit = (
    komite: ValuesShowMatDamKomite,
    upr: AreasShowMatDamKomite
  ) => {
    if (setRequestMatDamUpr) {
      setRequestMatDamUpr((prevState) => ({
        ...prevState,
        id: upr.id,
        matrix_id: upr.id,
        lists: [
          {
            id: upr.id,
            value: upr.value,
            area: upr.area_levels,
          },
        ],
      }));
    }

    if (setRequestMatDamKomite) {
      setRequestMatDamKomite((prevState) => ({
        ...prevState,
        dampak: komite.dampak,
      }));
    }

    handleEdit();
  };

  const prosesBtnDelete = (upr: AreasShowMatDamKomite) => {
    if (setRequestMatDamUpr) {
      setRequestMatDamUpr((prevState) => ({
        ...prevState,
        id: upr.id,
        matrix_id: upr.id,
      }));
    }

    handleDelete();
  };

  const prosesBtnEditArea = (komite: ValuesShowMatDamKomite, act: string) => {
    if (setRequestMatDamKomite) {
      setRequestMatDamKomite((prevState) => ({
        ...prevState,
        id: komite.id,
        dampak: komite.dampak,
        prioritas: Number(komite.prioritas),
      }));
    }

    if (act === "edit") {
      handleEditArea();
    } else {
      handleDeleteArea();
    }
  };
  const [itemsDampak, setItemDampak] = useState([{ id: 0 }]);

  // const addDampak = () => {
  //   let arr = [...itemsDampak];
  //   if (arr.length >= 10) {
  //     return;
  //   } else {
  //     arr.push({ id: Math.floor(Math.random() * 1000) });
  //   }
  //   const newItem = arr;
  //   setItemDampak(newItem);

  //   if (setStateUpr) {
  //     setStateUpr((prev) => ({
  //       ...prev,
  //       lists: [...(prev?.lists || []), { id: 0, value: "", area: [] }],
  //     }));
  //   }
  // };

  const addDampak = () => {
    // Generate a new unique ID for the new field
    const newId = Math.floor(Math.random() * 1000);

    // Create a new empty field item
    const newField = { id: newId, value: "", area: [] };

    // Update the itemsDampak state to track all fields
    setItemDampak((prevItems) => [...prevItems, { id: newId }]);

    // Update the stateUpr to include the new empty field while keeping existing values
    setStateUpr((prevState) => ({
      ...prevState,
      lists: [...prevState.lists, newField],
    }));
  };

  const minusDampak = (nowId: any) => {
    let arr = [...itemsDampak];
    let newArr = arr.filter((val) => {
      if (nowId === val.id) {
        return false;
      } else {
        return true;
      }
    });
    setItemDampak(newArr);
  };

  const handleChangeAD = async (id: number) => {
    // console.log(id);
    setStateUpr &&
      setStateUpr((prevState) => ({
        ...prevState,
        matrix_id: id,
      }));
  };

  const handleSubChange = (index: number, value: string) => {
    if (setStateUpr) {
      setStateUpr((prevState) => {
        const updatedLists = [...prevState.lists];
        updatedLists[index] = {
          ...updatedLists[index],
          value, // hanya ubah value dampak
        };
        return {
          ...prevState,
          lists: updatedLists,
        };
      });
    }
  };

  const handleAreaChange = (
    listIndex: number,
    level: number,
    value: string
  ) => {
    if (setStateUpr) {
      setStateUpr((prevState) => {
        const updatedLists = [...prevState.lists];
        const list = updatedLists[listIndex] || {};
        const updatedArea = [...(list.area || [])];

        const existingAreaIndex = updatedArea.findIndex(
          (a) => a.level == level
        );

        if (existingAreaIndex !== -1) {
          updatedArea[existingAreaIndex] = {
            ...updatedArea[existingAreaIndex],
            value,
          };
        } else {
          updatedArea.push({ id: 0, level, value });
        }

        updatedLists[listIndex] = {
          ...list,
          area: updatedArea,
        };

        return {
          ...prevState,
          lists: updatedLists,
        };
      });
    }
  };

  const handleResetRequestMatDamUpr = () => {
    setRequestMatDamUpr({ ...initReqAddMatDamUpr, matrix_id: -1 });
  };

  return {
    dataMatDamKomite,
    loading,
    modalOpenAdd,
    setModalOpenAdd,
    modalOpenAddKomite,
    setModalOpenAddKomite,
    modalOpenDelete,
    setModalDelete,
    requestMatDamKomite,
    setRequestMatDamKomite,
    requestMatDamUpr,
    setRequestMatDamUpr,
    createMatDamKomite,
    createMatDamUpr,
    deleteMatDamUpr,
    modalOpenEdit,
    setModalOpenEdit,
    modalOpenRef,
    setModalOpenRef,
    showMatDamKomite,
    objectState,
    modalOpenEditKomite,
    setModalOpenEditKomite,
    deleteMatDamKomite,
    modalOpenDeleteArea,
    setModalDeleteArea,
    openCollapse,
    setOpenCollapse,
    prosesBtnEdit,
    prosesBtnDelete,
    prosesBtnEditArea,
    addDampak,
    minusDampak,
    handleChangeAD,
    handleSubChange,
    handleAreaChange,
    itemsDampak,
    stateUpr,
    setStateUpr,
    stateKom,
    setStateKom,
    handleResetRequestMatDamUpr,
  };
};

export default useKriteriaDampakVM;
