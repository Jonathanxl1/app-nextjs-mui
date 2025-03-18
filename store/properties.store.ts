import { create } from "zustand";

import {
  PropertiesElement,
  typePropertyInput,
} from "@/interfaces/properties.interface";
import {
  createProperties,
  deleteProperties,
  getProperties,
  updateProperties,
} from "@/services/properties.service";
import { setLoading } from "./application.store";

interface PropertiesStore {
  data: Array<PropertiesElement>;
  retrieveProperties: () => Promise<unknown>;
  defaultPropertiesInput: typePropertyInput[];
  selectedProperty: PropertiesElement | null;
  setSelectedProperty: (id: PropertiesElement["id"]) => void;
  updateProperty: (
    value: PropertiesElement["id"],
    payload: Partial<PropertiesElement>
  ) => Promise<unknown>;
  getProperty: (id: PropertiesElement["id"]) => PropertiesElement;
  createProperty: (payload: Partial<PropertiesElement>) => Promise<unknown>;
  deleteProperty: (id: PropertiesElement["id"]) => Promise<unknown>;
  dataFiltered: Array<PropertiesElement>;
  filterProperties: (value: string) => void;
}

export const usePropertiesStore = create<PropertiesStore>((set, get) => ({
  data: [],
  defaultPropertiesInput: ["date", "check", "number", "text"],
  retrieveProperties: () => {
    setLoading(true);
    return getProperties()
      .then((items) => {
        set(() => ({ data: items }));
      })
      .finally(() => setLoading(false));
  },

  updateProperty: (
    idProp: PropertiesElement["id"],
    payload: Partial<PropertiesElement>
  ) => {
    // Mock update property
    setLoading(true);

    return updateProperties(idProp, payload)
      .then(() => {
        get().retrieveProperties();
      })
      .finally(() => setLoading(false));
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
  createProperty: (payload) => {
    setLoading(true);

    return createProperties(payload)
      .then(() => {
        get().retrieveProperties();
      })
      .finally(() => setLoading(false));
  },
  deleteProperty: (id) => {
    setLoading(true);

    return deleteProperties(id)
      .then(() => {
        get().retrieveProperties();
      })
      .finally(() => setLoading(false));
  },
  dataFiltered: [],
  filterProperties: (search) => {
    if (!search || !(search && search.trim())) {
      return;
    }
    const properties = get().data;
    const filtered = properties.filter(({ name, type }) => {
      const nameLowerCase = name.toLowerCase();
      const typeLowerCase = type.toLowerCase();
      return nameLowerCase.includes(search) || typeLowerCase.includes(search);
    });

    set((state) => ({ ...state, dataFiltered: filtered }));
  },
}));
