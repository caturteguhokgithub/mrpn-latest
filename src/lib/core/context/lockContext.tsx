"use client"

import { createStore } from "zustand/vanilla";
import { createContext } from "react";
import type { StoreApi } from "zustand";

export type LockState = {
  lockedItems: { [key: string]: boolean };
};

export type LockActions = {
  setLockedItems: (items: { [key: string]: boolean }) => void;
  toggleLock: (item: string) => void;
  isLocked: (item: string) => boolean;
};

export type LockStore = LockState & LockActions;

export const LockContext = createContext<StoreApi<LockStore> | null>(null);

export const createLockStore = (initialState: LockState): StoreApi<LockStore> => {
  return createStore<LockStore>()((set, get) => ({
    ...initialState,
    setLockedItems: (items) => set({ lockedItems: items }),
    toggleLock: (item) => set((state) => ({
      lockedItems: {
        ...state.lockedItems,
        [item]: !state.lockedItems[item]
      }
    })),
    isLocked: (item) => get().lockedItems[item] || false,
  }));
};

export const defaultInitLockState: LockState = {
  lockedItems: {}
};
