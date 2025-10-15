import { useContext, useEffect } from "react";
import { GlobalModalContext } from "../context/globalmodalContext";
import { LoadingContext } from "../context/loadingContext";
import { RKPContext, RkpStore } from "../context/rkpContext";
import { ExsumContext } from "../context/exsumContext";
import { useStore } from "zustand";
import { AuthContext, AuthStore } from "@/lib/core/context/authContext";
import {
  PenetapanTopicContext,
  PenetapanObjectStore,
} from "@/lib/core/context/penetapanTopicContext";
import {
  PenetapanContext,
  PenetapanStore,
} from "@/lib/core/context/penetapanContext";
import { LockContext, LockStore } from "../context/lockContext";

export const useLoading = () => useContext(LoadingContext);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const useExsumContext = () => useContext(ExsumContext);

export const useRKPContext = <T>(selector: (store: RkpStore) => T): T => {
  const globalStoreContext = useContext(RKPContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export const useAuthContext = <T>(selector: (store: AuthStore) => T): T => {
  const globalStoreContext = useContext(AuthContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export const usePenetapanTopicContext = <T>(
  selector: (store: PenetapanObjectStore) => T
): T => {
  const globalStoreContext = useContext(PenetapanTopicContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export const usePenetapanContext = <T>(
  selector: (store: PenetapanStore) => T
): T => {
  const globalStoreContext = useContext(PenetapanContext);

  if (!globalStoreContext) {
    throw new Error(`useGlobalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export const useLockContext = <T>(selector: (store: LockStore) => T): T => {
  const globalStoreContext = useContext(LockContext);

  if (!globalStoreContext) {
    throw new Error("useLockContext must be use within LockProvider");
  }

  return useStore(globalStoreContext, selector);
};

// export function useOutsideAlerter(
//   ref: any,
//   onClickOutside: (val: boolean) => void
// ) {
//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         console.debug("outside clicked");
//         onClickOutside(true);
//       }
//     }
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   });
// }
