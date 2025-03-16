import { getTypes } from "@/services/types.service";
import { create } from "zustand";
import { setLoading } from "./application.store";

interface TypeElement {
  name: string;
  properties: Array<string>;
  descriptions: string;
  createAt: Date;
}

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
