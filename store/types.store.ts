import { create } from "zustand";

import { getTypes } from "@/services/types.service";
import { setLoading } from "./application.store";
import { TypeElement } from "@/interfaces/types.interface";

interface TypeStore {
  data: Array<TypeElement>;
  retriveTypes: () => void;
}

export const useTypeStore = create<TypeStore>((set) => ({
  data: [],
  retriveTypes: () => {
    setLoading(true);
    getTypes()
      .then((types) => set(() => ({ data: types })))
      .finally(() => {
        setLoading(false);
      });
  },
}));
