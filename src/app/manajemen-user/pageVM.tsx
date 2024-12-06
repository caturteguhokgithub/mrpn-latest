import {useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import {useEffect, useState} from "react";
import {doGetAllAvailableMenu} from "@/app/manajemen-role/pageService";
import {API_CODE} from "@/lib/core/api/apiModel";
import {MenuConfigDto} from "@/app/manajemen-role/pageModel";
import {doCreateUser, doGetUser, doUpdateUser} from "@/app/manajemen-user/pageService";
import {
  initManagementUserReqDto,
  ManagementUserDataDto,
  ManagementUserStateDto,
  ManagementUserResDto, ManagementUserReqDto, OptionKP
} from "@/app/manajemen-user/pageModel";
import useManagementRoleVM from "@/app/manajemen-role/pageVM";
import {doGetKP} from "@/app/misc/rkp/rkpService";

interface ModalDto {
  action: boolean
  type: string
}

const initModalDto: ModalDto = {
  action: false,
  type: ""
}

const useManagementUserVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const [users, setUsers] = useState<ManagementUserDataDto[]>([])
  const [modal, setModal] = useState<ModalDto>(initModalDto)
  const [request, setRequest] = useState<ManagementUserStateDto>(Object.assign({}, initManagementUserReqDto))
  const [optionKP, setOptionKP] = useState<OptionKP[]>([])

  const {
    managementRoleData,
  } = useManagementRoleVM()

  const getOptionKP = async () => {
    const response = await doGetKP()
    if (response?.code === API_CODE.success) {
      let result: OptionKP[] = response.result
      setOptionKP(result)
    }
  }

  async function getUsers() {
    const response = await doGetUser({
      body: {},
      loadingContext: loadingContext,
      errorModalContext: errorModalContext
    })
    if (response?.code === API_CODE.success) {
      let result: ManagementUserResDto[] = response.result
      let data: ManagementUserDataDto[] = []
      result.map(x => {
        const d: ManagementUserDataDto = {
          id: x.id,
          name: x.name,
          email: x.email,
          role: x.role?.name ?? "",
          role_id: x.role?.id ?? 0,
          type: x.type,
          list_kp_id: x.list_kp_id
        }
        // if (d.name !== "admin") {
          data.push(d)
        // }
      })

      setUsers(data)
    }
  }

  async function createOrUpdateUser() {

    if (request.role_id == undefined
      || request.type == ""
      || request.name == ""
      || request.email == ""
    ) {
      return
    }
    const req: ManagementUserReqDto = {
      id: request.id,
      type: request.type,
      name: request.name,
      email: request.email,
      password: request.type == "BAPPENAS" ? request.password : "",
      role_id: request.role_id?.id ?? 0,
      list_kp_id: request.options.reduce<number[]>((a, b) => {
        return [...a, b.id]
      }, [])
    }

    let response
    if (req.id == 0) {
      response = await doCreateUser({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext
      })
    } else {
      response = await doUpdateUser({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext
      })
    }

    if (response?.code === API_CODE.success) {
      getUsers()
      setModal({action: false, type: ""})
    }
  }

  const handleOpenModal = (id: number, type: string) => {
    if (id == 0) {
      setRequest(Object.assign({}, initManagementUserReqDto))
    } else {
      const index = users.findIndex(x => x.id == id)
      if (index > -1) {
        const findIndexRole = managementRoleData.findIndex(x => x.id == users[index].role_id)
        const opt:OptionKP[] = optionKP.filter(x => users[index].list_kp_id.find(y => y == x.id))
        const req: ManagementUserStateDto = {
          id: users[index].id,
          type: users[index].type,
          name: users[index].name,
          email: users[index].email,
          password: "",
          role_id: managementRoleData[findIndexRole],
          options: opt
        }
        setRequest(req)
      }
    }
    setModal({action: true, type: type})
  }
  const createData = () => {
    createOrUpdateUser()
  }

  useEffect(() => {
    getUsers()
    getOptionKP()
  }, []);

  return {
    users,
    handleOpenModal,
    modal,
    setModal,
    createData,
    request,
    setRequest,
    managementRoleData,
    optionKP
  }
}

export default useManagementUserVM;