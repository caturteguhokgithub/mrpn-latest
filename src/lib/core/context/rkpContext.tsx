"use client";

import { createContext } from "react";
import { createStore } from "zustand/vanilla";
import { type StoreApi, useStore } from "zustand";
import { MiscMasterRPJMNRes } from "@/app/misc/master/masterServiceModel";

export interface ProjectDefaultDto {
  id: number;
  level: string;
  code: string;
  value: string;
}

export type RODto = ProjectDefaultDto & {
  ro: ProjectDefaultDto[];
};

export type KPDto = ProjectDefaultDto & {
  prop: RODto[];
};

export type PPDto = ProjectDefaultDto & {
  kp: KPDto[];
};

export type PNDto = ProjectDefaultDto & {
  pp: PPDto[];
};

export type RKPDto = PNDto[];

export type RkpState = {
  rpjmn: MiscMasterRPJMNRes | undefined;
  year: number;
  rkp: RKPDto;
  rkpOption: ProjectDefaultDto[];
  rkpState: ProjectDefaultDto | undefined;
};

export type RkpActions = {
  setRpjmn: (value: MiscMasterRPJMNRes) => void;
  setYear: (value: number) => void;
  setRkp: (value: RKPDto) => void;
  setRkpOption: (value: ProjectDefaultDto[]) => void;
  setRkpState: (value: ProjectDefaultDto | undefined) => void;
};

export type RkpStore = RkpState & RkpActions;

export const defaultInitRkpState: RkpState = {
  rpjmn: undefined,
  rkp: [],
  rkpOption: [],
  rkpState: undefined,
  year: 0,
};

export const createRkpStore = (initState: RkpState = defaultInitRkpState) => {
  return createStore<RkpStore>()((set) => ({
    ...initState,
    setRpjmn: (params: MiscMasterRPJMNRes) =>
      set((state) => (state = { ...state, rpjmn: params })),
    setYear: (params: number) =>
      set((state) => (state = { ...state, year: params })),
    setRkp: (params: RKPDto) =>
      set((state) => (state = { ...state, rkp: params })),
    setRkpOption: (params: ProjectDefaultDto[]) =>
      set((state) => (state = { ...state, rkpOption: params })),
    setRkpState: (params: ProjectDefaultDto | undefined) =>
      set((state) => (state = { ...state, rkpState: params })),
  }));
};

export const RKPContext = createContext<StoreApi<RkpStore> | null>(null);
