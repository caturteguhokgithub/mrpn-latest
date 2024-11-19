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
import { IconErrorBadRequest, IconTimeout } from "../icons";
import { red } from "@mui/material/colors";

const ErrorModal = ({
  icon,
  title,
  message,
  errorTitle,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  errorTitle?: boolean;
}) => {
  return (
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
        {icon}
      </Stack>
      <DialogContentText sx={{ textAlign: "center" }}>
        <Typography
          component="h3"
          fontWeight={600}
          fontSize={"1.3em"}
          mb={1}
          color={errorTitle ? red[600] : "inherit"}
        >
          {title}
        </Typography>
        <Typography>{message}</Typography>
      </DialogContentText>
    </>
  );
};

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
          p: 3,
        },
      }}
    >
      <DialogContent>
        {code == 400 ? (
          <ErrorModal
            errorTitle
            icon={<IconErrorBadRequest />}
            title={`Error ${code}`}
            message={message}
          />
        ) : (
          <ErrorModal
            icon={<IconTimeout />}
            title="Session Timeout"
            message="Sesi Anda telah berakhir, silahkan login kembali."
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 0 }}>
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
