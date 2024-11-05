import {useAuthContext, useExsumContext, useGlobalModalContext, useLoading} from "@/lib/core/hooks/useHooks";
import {API_CODE, BaseAPIServiceParam, ResponseBaseDto} from "@/lib/core/api/apiModel";
import {post} from "@/lib/core/api/apiBase";
import {ExsumDto} from "@/lib/core/context/exsumContext";
import {doGetExsum} from "@/app/misc/rkp/rkpService";
import React from "react";
import {usePathname} from "next/navigation";
import {hasPrivilege} from "@/lib/core/helpers/authHelpers";

const useApprovalVM = () => {

  const { permission, immutable_permission, setPermission } = useAuthContext((state) => state);
  let pathname = usePathname();

  const canApprove = hasPrivilege(permission, pathname, "approve")
  const canSubmit = hasPrivilege(permission, pathname, "add")

  const loadingContext = useLoading();
  const errorModalContext = useGlobalModalContext();
  const {exsum, setExsum} = useExsumContext()

  const [modalApprove, setModalApprove] = React.useState<ModalApprovalDto>({isOpen:false,action:""})

  async function getExsum() {
    const response = await doGetExsum({
      body: exsum,
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    });
    if (response?.code == API_CODE.success) {
      let result:ExsumDto = response.result
      if (result.approval && (result.approval.status == "approved" || result.approval.status == "review")){
        const perm:string[] = [];
        permission.map(p => {
          if (!p.includes("exsum.add") && !p.includes("exsum.update") && !p.includes("exsum.delete")){
            perm.push(p)
          }
        })
        setPermission(perm)
      }else{
        setPermission(immutable_permission)
      }
      setExsum(result)
    }
  }

  const doApproval = async (status:string) => {
    const response = await doApprovalRequest({
      body: {
        id_exsum:exsum.id,
        status:status
      },
      loadingContext: loadingContext,
      errorModalContext: errorModalContext,
    })

    if (response?.code == API_CODE.success){
      await getExsum()
      setModalApprove({isOpen:false,action:""})
    }
  }

  return {
    exsum,
    doApproval,
    modalApprove,
    setModalApprove,
    canApprove,
    canSubmit
  }

}

export default useApprovalVM;

export interface ModalApprovalDto {
  isOpen:boolean
  action:string
}

export type ApprovalReqDto = BaseAPIServiceParam & {
  body: {
    id_exsum:number
    status:string
  };
};

export async function doApprovalRequest(param: ApprovalReqDto) {
  const resp = await post({
    ...param,
    url: "exsum/approval",
  });
  if (resp) return Object.assign(new ResponseBaseDto(), resp);
}