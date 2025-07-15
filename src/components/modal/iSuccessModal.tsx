import { useGlobalModalContext } from "@/lib/core/hooks/useHooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import React from "react";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ISuccessModal = () => {
    const { hideModal, store } = useGlobalModalContext();
    const { modalProps } = store || {};
    const { confirmBtn, onConfirm, } = modalProps || {};

    const handleModalConfirm = () => {
        if (onConfirm != null) {
            onConfirm();
        } else {
            hideModal();
        }
    };

    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => hideModal()}
        >
            <DialogContent>
                <DialogContentText>
                    Success!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalConfirm}>
                    {confirmBtn || "OK"}
                </Button>
            </DialogActions>
        </Dialog>
    )
};