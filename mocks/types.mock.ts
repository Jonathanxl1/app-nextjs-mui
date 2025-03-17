import { mock } from "./mock";

const typeUri = "/types";
const url = new RegExp(`${typeUri}/*`);

export async function MockGetTypes() {
  mock.onGet("/types").reply(200, [
    {
      id: 1,
      name: "Persona",
      description: "Categoria para personas",
      properties: [],
      createdAt: new Date(Date.now()).toDateString(),
    },
    {
      id: 2,
      name: "Organizacion",
      description: "Categoria para Organizaciones",
      properties: [],
      createdAt: new Date(Date.now()).toDateString(),
    },
    {
      id: 3,
      name: "Evento",
      description: "Categoria para Eventos",
      properties: [],
      createdAt: new Date(Date.now()).toDateString(),
    },
  ]);
}

export async function MockCreateType() {
  mock.onPost("/types").reply(204, mock.history.post);
}

export async function MockUpdateType() {
  mock.onPut(url).reply(201);
}

export async function MockDeleteType() {
  mock.onDelete(url).reply(201);
}

export function MockTypes() {
  MockGetTypes();
  MockCreateType();
  MockUpdateType();
  MockDeleteType();
}
