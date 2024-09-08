"use client"

import {createContext} from 'react';
import {createStore} from 'zustand/vanilla'
import {type StoreApi} from 'zustand'

export interface UserDto {
    id: number
    name: string
    email: string
}
export interface TokenPayload {
    token: string
}
export interface Menu {
    id:number
    parent:number|null
    name:string
    short_name:string
    route:string
    icon:string
    submenu:Menu[]
}

export type AuthResDto = {
    user: UserDto
    access_token: TokenPayload
}

export type AuthState = {
    user: UserDto|undefined
    token: TokenPayload|undefined
    menu:Menu[]
};

export type AuthActions = {
    setUser: (value: UserDto|undefined) => void;
    setToken: (value: TokenPayload|undefined) => void;
    setMenu: (value: Menu[]) => void;
}

export type AuthStore = AuthState & AuthActions

export const defaultInitAuthState: AuthState = {
    user: undefined,
    token: undefined,
    menu: []
};

export const createAuthStore = (
    initState: AuthState = defaultInitAuthState,
) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        setUser: (params: UserDto|undefined) => set((state) => state = {...state, user:params}),
        setToken: (params: TokenPayload|undefined) => set((state) => state = {...state, token:params}),
        setMenu: (params: Menu[]) => set((state) => state = {...state, menu:params}),
    }))
}

export const AuthContext = createContext<StoreApi<AuthStore> | null>(null);
