import { useGlobalModalContext, useLoading } from "@/lib/core/hooks/useHooks";
import { useEffect, useState } from "react";
import {
  doGetManagementRoleData,
  doGetAllAvailableMenu,
  doCreateManagementRole,
  doUpdateManagementRole,
} from "@/app/manajemen-role/pageService";
import { API_CODE } from "@/lib/core/api/apiModel";
import {
  ManagementRoleDto,
  ManagementRoleReqDto,
  MenuConfigDto,
} from "@/app/manajemen-role/pageModel";

const useManagementRoleVM = () => {
  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [managementRoleData, setManagementRoleData] = useState<
    ManagementRoleDto[]
  >([]);
  const [menuConfig, setMenuConfig] = useState<MenuConfigDto[]>([]);

  const [stateRoleId, setStateRoleId] = useState<number>(0);
  const [stateRoleName, setStateRoleName] = useState<string>("");
  const [stateRolePermission, setStateRolePermission] = useState<number[]>([]);

  const [modal, setModal] = useState<boolean>(false);

  async function getAllAvailableMenu() {
    const response = await doGetAllAvailableMenu({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code === API_CODE.success) {
      let result: MenuConfigDto[] = response.result;
      setMenuConfig(result);
    }
  }

  async function getManagementRoleData() {
    setLoading(true);
    const response = await doGetManagementRoleData({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code === API_CODE.success) {
      let result: ManagementRoleDto[] = response.result;
      setManagementRoleData(result);
    }
    setLoading(false);
  }

  async function createManagementRoleData() {
    const request: ManagementRoleReqDto = {
      id: stateRoleId,
      name: stateRoleName,
      permission_list: stateRolePermission,
    };
    const response = await doCreateManagementRole({
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code === API_CODE.success) {
      getManagementRoleData();
      setModal(false);
    }
  }

  async function updateManagementRoleData() {
    const request: ManagementRoleReqDto = {
      id: stateRoleId,
      name: stateRoleName,
      permission_list: stateRolePermission,
    };
    const response = await doUpdateManagementRole({
      body: request,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code === API_CODE.success) {
      getManagementRoleData();
      setModal(false);
    }
  }

  const handleOpenModal = (id: number) => {
    if (id == 0) {
      setStateRoleId(0);
      setStateRoleName("");
      setStateRolePermission([]);
    } else {
      const index = managementRoleData.findIndex((x) => x.id == id);
      if (index > -1) {
        setStateRoleId(managementRoleData[index].id);
        const roleName = managementRoleData[index].name;
        setStateRoleName(roleName);
        setStateRolePermission(managementRoleData[index].permission);
      }
    }
    setModal(true);
  };

  async function createData() {
    if (stateRoleId == 0) {
      createManagementRoleData();
    } else {
      updateManagementRoleData();
    }
  }

  useEffect(() => {
    if (managementRoleData.length == 0) getManagementRoleData();
    if (menuConfig.length == 0) getAllAvailableMenu();
  }, []);

  return {
    managementRoleData,
    menuConfig,
    stateRoleName,
    setStateRoleName,
    stateRolePermission,
    setStateRolePermission,
    modal,
    setModal,
    handleOpenModal,
    createData,
    loading,
  };
};

export default useManagementRoleVM;
