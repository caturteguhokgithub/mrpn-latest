import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthContext, useGlobalModalContext} from "@/lib/core/hooks/useHooks";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import {API_CONSTANT} from "@/lib/core/api/apiModel";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const IErrorModal = () => {
  const router = useRouter()
  const {
    setUser,
    setToken,
    setMenu,
    setPermission
  } = useAuthContext(state => state)
  const {hideModal, store,} = useGlobalModalContext();
  const {modalProps} = store || {};
  const {code, message,} = modalProps || {};

  const handleModalToggle = () => {
    if (code != 400) {
      setUser(undefined);
      setToken(undefined);
      setMenu([]);
      setPermission([]);
      sessionStorage.removeItem(API_CONSTANT.token)
      return router.replace("/login");
    }
    return hideModal();
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleModalToggle}
    >
      <DialogContent>
        {(code == 400) ?
          <DialogContentText>
            {`${message} (${code})`}
          </DialogContentText>
          :
          <DialogContentText>
            Sesi Anda telah berakhir, silahkan login kembali
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalToggle}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
};