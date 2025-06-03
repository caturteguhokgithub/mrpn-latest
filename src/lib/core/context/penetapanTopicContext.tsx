import { ProjectDefaultDto } from "@/lib/core/context/rkpContext";
import { createStore } from "zustand/vanilla";
import { createContext } from "react";
import type { StoreApi } from "zustand";

export interface PenetapanObjectDto {
  id: number
  code: string
  topik: string
  tahun: number
  penetapan_object_list: PenetapanObjectListDto[]
}

export interface PenetapanObjectListDto {
  id: number
  penetapan_object_id: number
  level: string
  ref_id: number
  uraian: PenetapanObjectUraianDto[]
}

export interface PenetapanObjectUraianDto {
  id: number
  penetapan_object_rkp_id: number
  level: string
  ref_id: number
  objek: boolean
  approve_profil_risiko: boolean
  rkp: ProjectDefaultDto
  prioritas: PenetapanObjectPrioritas[]
  priotitas_count: number
  priotitas_order: number
  ranking: number;
}

export interface PenetapanObjectPrioritas {
  id: number
  uraian_penetapan_objek_id: number
  value: string
}

export interface PenetapanObjectNotaDto {
  id: number
  topik: string
  periode: number
  usulan_objek_ls: string[]
  kementerian_koordinasi: string[]
  entitas_sektor_utama: string[]
  entitas_pendukung: string[]
  penjelasan_objek_mrpn: string
  penjelasan_usulan_upr: string
  lokasi: string
  tanggal: string
  direktorat: string
  dibuat: string
  disetujui: string
  ttd_pembuat: string
  ttd_pembuat_base64: string
  ttd_pembuat_filename: string
  ttd_penyetuju: string
  ttd_penyetuju_base64: string
  ttd_penyetuju_filename: string
  approve_ttd_pembuat: string
  approve_ttd_pembuat_base64: string
  approve_ttd_pembuat_filename: string
  approve_ttd_penyetuju: string
  approve_ttd_penyetuju_base64: string
  approve_ttd_penyetuju_filename: string
  alasan_ttd_pembuat: string
  alasan_ttd_penyetuju: string
}

export type PenetapanObjectState = {
  objects: PenetapanObjectDto[]
  objectState: PenetapanObjectDto | undefined
  uraianState: PenetapanObjectUraianDto[]
  nota: PenetapanObjectNotaDto | undefined
}

export type PenetapanObjectActions = {
  setObjects: (value: PenetapanObjectDto[]) => void
  setObjectState: (value: PenetapanObjectDto | undefined) => void
  setUraianState: (value: PenetapanObjectUraianDto[]) => void
  setNota: (value: PenetapanObjectNotaDto) => void
}

export type PenetapanObjectStore = PenetapanObjectState & PenetapanObjectActions

export const defaultPenetapanObjectState: PenetapanObjectState = {
  objects: [],
  objectState: undefined,
  uraianState: [],
  nota: undefined
}

export const createPenetapanObjectStore = (
  initState: PenetapanObjectState = defaultPenetapanObjectState,
) => {
  return createStore<PenetapanObjectStore>()((set) => ({
    ...initState,
    setObjects: (params: PenetapanObjectDto[]) => set((state) => state = { ...state, objects: params }),
    setObjectState: (params: PenetapanObjectDto | undefined) => set((state) => state = { ...state, objectState: params }),
    setUraianState: (params: PenetapanObjectUraianDto[]) => set((state) => state = { ...state, uraianState: params }),
    setNota: (params: PenetapanObjectNotaDto) => set((state) => state = { ...state, nota: params }),
  }))
}

export const PenetapanTopicContext = createContext<StoreApi<PenetapanObjectStore> | null>(null);