import { create } from "zustand";

import { createType, getTypes, updateType } from "@/services/types.service";
import { setLoading } from "./application.store";
import { TypeElement } from "@/interfaces/types.interface";

interface TypeStore {
  data: Array<TypeElement>;
  retriveTypes: () => void;
  selectedType: TypeElement | null;
  setSelectedType: (id: TypeElement["id"]) => void;
  updateType: (
    id: TypeElement["id"],
    payload: Partial<TypeElement>
  ) => Promise<unknown>;
  getType: (id: TypeElement["id"]) => TypeElement;
  createType: (payload: Partial<TypeElement>) => Promise<unknown>;
}

export const useTypeStore = create<TypeStore>((set, get) => ({
  data: [],
  retriveTypes: () => {
    setLoading(true);
    getTypes()
      .then((types) => set(() => ({ data: types })))
      .finally(() => {
        setLoading(false);
      });
  },
  updateType: (id, payload) => {
    return updateType(id, payload).then(() => {
      get().retriveTypes();
    });
  },
  getType: (idType) => {
    const [selectedObjectType] = get().data.filter(({ id }) => idType == id);
    return selectedObjectType;
  },
  selectedType: null,
  setSelectedType: (id) => {
    const selectedType = get().getType(id);
    set((state) => ({ ...state, selectedType }));
  },
  createType: (payload) => {
    setLoading(true);
    return createType(payload)
      .then(() => {
        get().retriveTypes();
      })
      .finally(() => {
        setLoading(false);
      });
  },
}));
