"use client"

import React, { ReactNode, useRef } from 'react';
import { createLockStore, LockContext, LockState, LockStore } from '../context/lockContext';
import { StoreApi } from "zustand";

export const LockProvider = (
    {
        children,
        state
    }: {
        children: ReactNode,
        state: LockState
    }
) => {

    const storeRef = useRef<StoreApi<LockStore>>()
    if (!storeRef.current) {
        storeRef.current = createLockStore(state)
    }

    return (
        <LockContext.Provider value={storeRef.current}>
            {children}
        </LockContext.Provider>
    );
}
