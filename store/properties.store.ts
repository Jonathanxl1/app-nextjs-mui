import { create } from "zustand";

import {
  PropertiesElement,
  typePropertyInput,
} from "@/interfaces/properties.interface";
import { getProperties, updateProperties } from "@/services/properties.service";

interface PropertiesStore {
  data: Array<PropertiesElement>;
  retrieveProperties: () => void;
  defaultPropertiesInput: typePropertyInput[];
  selectedProperty: PropertiesElement | null;
  setSelectedProperty: (id: PropertiesElement["id"]) => void;
  updateProperty: (
    value: PropertiesElement["id"],
    payload: PropertiesElement
  ) => void;
  getProperty: (id: PropertiesElement["id"]) => PropertiesElement;
}

export const usePropertiesStore = create<PropertiesStore>((set, get) => ({
  data: [],
  defaultPropertiesInput: ["date", "check", "number", "text"],
  retrieveProperties: () => {
    getProperties().then((items) => set(() => ({ data: items })));
  },

  updateProperty: (
    idProp: PropertiesElement["id"],
    payload: PropertiesElement
  ) => {
    // Mock update property
    updateProperties(idProp, payload).then(() => {
      get().retrieveProperties();
    });
  },
  getProperty: (idProp: PropertiesElement["id"]) => {
    const [propertyObject] = get().data.filter(({ id }) => idProp == id);
    return propertyObject;
  },

  selectedProperty: null,
  setSelectedProperty: (id: PropertiesElement["id"]) => {
    const selectedProperty = get().getProperty(id);
    set((state) => ({ ...state, selectedProperty }));
  },
}));
