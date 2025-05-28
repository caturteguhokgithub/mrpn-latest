// // "use client";

// // import { createContext, useContext, useState } from "react";

// // type ToastType = {
// //   open: boolean;
// //   message: string;
// //   type: "success" | "error" | "warning" | "info";
// // };

// // type ToastContextProps = {
// //   toast: ToastType;
// //   showToast: (message: string, type: ToastType["type"]) => void;
// //   hideToast: () => void;
// // };

// // const defaultToast: ToastType = {
// //   open: false,
// //   message: "",
// //   type: "success",
// // };

// // const ToastContext = createContext<ToastContextProps>({
// //   toast: defaultToast,
// //   showToast: () => {},
// //   hideToast: () => {},
// // });

// // export function ToastProvider({ children }: { children: React.ReactNode }) {
// //   const [toast, setToast] = useState<ToastType>(defaultToast);

// //   const showToast = (message: string, type: ToastType["type"]) => {
// //     setToast({ open: true, message, type });
// //   };

// //   const hideToast = () => {
// //     setToast({ ...toast, open: false });
// //   };

// //   return (
// //     <ToastContext.Provider value={{ toast, showToast, hideToast }}>
// //       {children}
// //     </ToastContext.Provider>
// //   );
// // }

// // export const useToast = () => useContext(ToastContext);

// // lib/core/context/toastContext.tsx
// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";

// type ToastType = "success" | "error" | "info" | "warning";

// type ToastContextType = {
//   showToast: (message: string, type: ToastType) => void;
//   hideToast: () => void;
//   toast: {
//     isOpen: boolean;
//     message: string;
//     type: ToastType;
//   };
// };

// const defaultToastContext: ToastContextType = {
//   showToast: () => {},
//   hideToast: () => {},
//   toast: {
//     isOpen: false,
//     message: "",
//     type: "success",
//   },
// };

// export const ToastContext =
//   createContext<ToastContextType>(defaultToastContext);

// export function ToastProvider({ children }: { children: ReactNode }) {
//   const [toast, setToast] = useState(defaultToastContext.toast);

//   const showToast = (message: string, type: ToastType) => {
//     setToast({ isOpen: true, message, type });
//   };

//   const hideToast = () => {
//     setToast((prev) => ({ ...prev, isOpen: false }));
//   };

//   return (
//     <ToastContext.Provider value={{ toast, showToast, hideToast }}>
//       {children}
//     </ToastContext.Provider>
//   );
// }

// export const useToast = () => useContext(ToastContext);

// lib/core/context/toastContext.tsx
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
