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
  ManagementUserResDto, ManagementUserReqDto
} from "@/app/manajemen-user/pageModel";
import useManagementRoleVM from "@/app/manajemen-role/pageVM";

const useManagementUserVM = () => {

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();

  const [users, setUsers] = useState<ManagementUserDataDto[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [request, setRequest] = useState<ManagementUserStateDto>(Object.assign({}, initManagementUserReqDto))


  const {
    managementRoleData,
  } = useManagementRoleVM()

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
          type: x.type
        }
        if(d.name !== "admin"){
          data.push(d)
        }
      })

      setUsers(data)
    }
  }

  async function createOrUpdateUser(){

    if (request.role_id == undefined
      || request.type == ""
      || request.name == ""
      || request.email == ""
    ){
      return
    }
    const req:ManagementUserReqDto = {
      id:request.id,
      type: request.type,
      name: request.name,
      email: request.email,
      password: request.type == "BAPPENAS" ? request.password : "",
      role_id: request.role_id?.id ?? 0
    }

    let response
    if(req.id == 0){
      response = await doCreateUser({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext
      })
    }else{
      response = await doUpdateUser({
        body: req,
        loadingContext: loadingContext,
        errorModalContext: errorModalContext
      })
    }

    if (response?.code === API_CODE.success) {
      getUsers()
      setModal(false)
    }
  }

  const handleOpenModal = (id:number) => {
    if (id == 0){
      setRequest(Object.assign({}, initManagementUserReqDto))
    }else{
      const index = users.findIndex(x => x.id == id)
      if (index > -1) {
        const findIndexRole = managementRoleData.findIndex(x => x.id == users[index].role_id)
        const req:ManagementUserStateDto = {
          id: users[index].id,
          type: users[index].type,
          name: users[index].name,
          email: users[index].email,
          password: "",
          role_id: managementRoleData[findIndexRole]
        }
        setRequest(req)
      }
    }
    setModal(true)
  }
  const createData = () => {
      createOrUpdateUser()
  }

  useEffect(() => {
    if (users.length == 0) getUsers()
  }, []);

  return {
    users,
    handleOpenModal,
    modal,
    setModal,
    createData,
    request,
    setRequest,
    managementRoleData
  }
}

export default useManagementUserVM;