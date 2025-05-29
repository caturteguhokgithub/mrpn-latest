"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  toast: {
    isOpen: boolean;
    message: string;
    type: ToastType;
  };
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
    type: "success" as ToastType,
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ isOpen: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
