import { getProperties } from "@/services/properties.service";
import { create } from "zustand";

interface PropertiesElement {
  name: string;
  type: string;
  createAt: Date;
}

interface PropertiesStore {
  data: Array<PropertiesElement>;
  retrieveProperties: () => void;
}

export const usePropertiesStore = create<PropertiesStore>((set) => ({
  data: [],
  retrieveProperties: () => {
    getProperties().then((items) => set(() => ({ data: items })));
  },
}));
