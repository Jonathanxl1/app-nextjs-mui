import { create } from "zustand";

import {
  PropertiesElement,
  typePropertyInput,
} from "@/interfaces/properties.interface";
import { getProperties } from "@/services/properties.service";

interface PropertiesStore {
  data: Array<PropertiesElement>;
  retrieveProperties: () => void;
  defaultPropertiesInput: typePropertyInput[];
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
  data: [],
  defaultPropertiesInput: ["date", "check", "number", "text"],
  retrieveProperties: () => {
    getProperties().then((items) => set(() => ({ data: items })));
  },
}));
