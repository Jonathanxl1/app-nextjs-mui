import AxiosMockAdapter from "axios-mock-adapter";

import api from "../services/api";

export const mockApi = new AxiosMockAdapter(api);
