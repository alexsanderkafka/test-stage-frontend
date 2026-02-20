import { create } from "zustand";
import { api } from "../api";
import type Process from "../types/process";

interface ProcessState{
    processes: Process[];
    getAllProcess: (userExternalId: string, token: string) => Promise<void>;
    process: Process | null;
    getProcess: (externalId: string, token: string) => Promise<void>;
}

export const useProcessStore = create<ProcessState>((set) => ({
    processes: [],
    process: null,
    getAllProcess: async (userExternalId, token) => {
      api.get(`/process/${userExternalId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res: any) => {
        set({processes: res.data});
      });
    },
    getProcess: async (externalId, token) => {
      api.get(`/process/one/${externalId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res: any) => {
        set({process: res.data});
      });
    }
}));