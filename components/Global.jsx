"use client";

import { create } from "zustand";

export const useGlobalStore = create()((set) => ({
  chains: null,
  assets: null,
  itsAssets: null,
  contracts: null,
  configurations: null,
  validators: null,
  verifiers: null,
  verifiersByChain: null,
  inflationData: null,
  networkParameters: null,
  tvl: null,
  stats: null,
  setChains: (data) => set((state) => ({ ...state, chains: data })),
  setAssets: (data) => set((state) => ({ ...state, assets: data })),
  setITSAssets: (data) => set((state) => ({ ...state, itsAssets: data })),
  setContracts: (data) => set((state) => ({ ...state, contracts: data })),
  setConfigurations: (data) =>
    set((state) => ({ ...state, configurations: data })),
  setValidators: (data) => set((state) => ({ ...state, validators: data })),
  setVerifiers: (data) => set((state) => ({ ...state, verifiers: data })),
  setVerifiersByChain: (data) =>
    set((state) => ({ ...state, verifiersByChain: data })),
  setInflationData: (data) =>
    set((state) => ({ ...state, inflationData: data })),
  setNetworkParameters: (data) =>
    set((state) => ({ ...state, networkParameters: data })),
  setTVL: (data) => set((state) => ({ ...state, tvl: data })),
  setStats: (data) => set((state) => ({ ...state, stats: data })),
}));
