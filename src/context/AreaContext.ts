import { create } from "zustand";
import type Area from "../types/area";
import { api } from "../api";

interface AreaState{
    areas: Area[];
    getAllAreas: (userExternalId: string, token: string) => Promise<void>;   
}

export const useAreaStore = create<AreaState>((set) => ({
    areas: [],
    getAllAreas: async (userExternalId, token) => {
        api.get(`/area/${userExternalId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((res: any) => {
            set ({areas: res.data});
        });
    }
}));