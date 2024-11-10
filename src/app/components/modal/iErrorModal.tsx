import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAuthContext,
  useGlobalModalContext,
} from "@/lib/core/hooks/useHooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { API_CONSTANT } from "@/lib/core/api/apiModel";
import { IconTimeout } from "../icons";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const IErrorModal = () => {
  const router = useRouter();
  const { setUser, setToken, setMenu, setPermission } = useAuthContext(
    (state) => state
  );
  const { hideModal, store } = useGlobalModalContext();
  const { modalProps } = store || {};
  const { code, message } = modalProps || {};

  const handleModalToggle = () => {
    if (code != 400) {
      setUser(undefined);
      setToken(undefined);
      setMenu([]);
      setPermission([]);
      sessionStorage.removeItem(API_CONSTANT.token);
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
      sx={{
        ".MuiPaper-root": {
          borderRadius: 4,
          p: 4,
        },
      }}
    >
      <DialogContent>
        {code == 400 ? (
          <DialogContentText>{`${message} (${code})`}</DialogContentText>
        ) : (
          <>
            <Stack
              alignItems="center"
              mb={3}
              sx={{
                svg: {
                  width: 200,
                  height: "auto",
                },
              }}
            >
              <IconTimeout />
            </Stack>
            <DialogContentText sx={{ textAlign: "center" }}>
              <Typography component="h3" fontWeight={600} fontSize={"1.3em"}>
                Session Timeout
              </Typography>
              <Typography>
                Sesi Anda telah berakhir, silahkan login kembali.
              </Typography>
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleModalToggle}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 50,
            minWidth: 150,
            margin: "0 auto",
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
