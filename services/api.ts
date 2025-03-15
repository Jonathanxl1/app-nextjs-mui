import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:3000",
});

const abort = new AbortController();

export const abortAction = abort.abort;

api.interceptors.request.use((config) => {
  config.signal = abort.signal;
  return config;
});

export default api;
