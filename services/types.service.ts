"use client";

import { MockTypes } from "@/mocks/types.mock";
import api from "./api";

MockTypes();

export async function getTypes() {
  const { data } = await api.get("/types");
  return data;
}

export async function createType(payload: unknown) {
  const { data } = await api.post("/types", payload);
  console.log("Called Post");
  return data;
}

export async function updateType(id: number, payload: unknown) {
  const { data } = await api.put(`/types/${id}`, payload);
  return data;
}

export async function deleteType(id: number) {
  const { data } = await api.delete(`/types/${id}`);
  return data;
}
