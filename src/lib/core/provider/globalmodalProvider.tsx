import React, { useState } from "react";
import { GlobalModalContext } from "../context/globalmodalContext";
import { IErrorModal } from "@/components/modal/iErrorModal";
import { ISuccessModal } from "@/components/modal/iSuccessModal";
// import { IConfirmModal } from '@/app/components/modal/IConfirmModal';
// import { IApprovalModal } from '@/app/components/modal/iApprovalModal';
// import { IFailModal } from '@/app/components/modal/iFailModal';

export const MODAL_TYPES = {
  CONFIRM_MODAL: "CONFIRM_MODAL",
  APPROVAL_MODAL: "APPROVAL_MODAL",
  ERROR_MODAL: "ERROR_MODAL",
  SUCCESS_MODAL: "SUCCESS_MODAL",
  FAIL_MODAL: "FAIL_MODAL",
};

const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.ERROR_MODAL]: IErrorModal,
  [MODAL_TYPES.SUCCESS_MODAL]: ISuccessModal,
  // [MODAL_TYPES.CONFIRM_MODAL]: IConfirmModal,
  // [MODAL_TYPES.APPROVAL_MODAL]: IApprovalModal,
  // [MODAL_TYPES.FAIL_MODAL]: IFailModal,
};

export const GlobalModalProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [store, setStore] = useState<any>();
  const { modalType, modalProps } = store || {};

  const showModal = (modalType: string, modalProps: any = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
