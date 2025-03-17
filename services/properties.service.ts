import { MockPropierties } from "@/mocks/properties.mocks";
import api from "./api";

MockPropierties();

export async function getProperties() {
  const { data } = await api.get("/properties");
  return data;
}

export async function createProperties(payload: unknown) {
  const { data } = await api.post("/properties", payload);
  return data;
}

export async function updateProperties(id: number, payload: unknown) {
  const { data } = await api.put(`/properties/${id}`, payload);
  return data;
}

export async function deleteProperties(id: number) {
  const { data } = await api.delete(`/properties/${id}`);
  return data;
}
