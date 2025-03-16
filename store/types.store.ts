import { getTypes } from "@/services/types.service";
import { create } from "zustand";

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
    getTypes().then((types) => set(() => ({ data: types })));
  },
}));
