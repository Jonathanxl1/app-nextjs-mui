import { mockLogin } from "@/mocks/authentication.mock";
import api from "./api";

mockLogin();

export async function login(payload: unknown) {
  try {
    const { data } = await api.post("/login", payload);
    return data;
  } catch (err) {
    Promise.reject(err);
  }
}
