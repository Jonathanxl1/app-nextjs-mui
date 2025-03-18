"use client";

import { MockTypes } from "@/mocks/types.mock";
import api from "./api";
import { TypeElement } from "@/interfaces/types.interface";

MockTypes();

export async function getTypes() {
  const { data } = await api.get<TypeElement[]>("/types");
  return data;
}

export async function createType(
  payload: Omit<TypeElement, "id" | "createdAt">
) {
  const { data } = await api.post("/types", payload);
  console.log("Called Post");
  return data;
}

export async function updateType(
  id: TypeElement["id"],
  payload: Partial<TypeElement>
) {
  const { data } = await api.put(`/types/${id}`, payload);
  return data;
}

export async function deleteType(id: TypeElement["id"]) {
  const { data } = await api.delete(`/types/${id}`);
  return data;
}
