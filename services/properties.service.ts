import { MockPropierties } from "@/mocks/properties.mocks";
import api from "./api";
import { PropertiesElement } from "@/interfaces/properties.interface";

MockPropierties();

export async function getProperties() {
  const { data } = await api.get<PropertiesElement[]>("/properties");
  return data;
}

export async function createProperties(payload: PropertiesElement) {
  const { data } = await api.post("/properties", payload);
  return data;
}

export async function updateProperties(
  id: PropertiesElement["id"],
  payload: PropertiesElement
) {
  const { data } = await api.put(`/properties/${id}`, payload);
  return data;
}

export async function deleteProperties(id: PropertiesElement) {
  const { data } = await api.delete(`/properties/${id}`);
  return data;
}
