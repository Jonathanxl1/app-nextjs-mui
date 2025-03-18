import { mock } from "./mock";

const typeUri = "/types";
const url = new RegExp(`${typeUri}/*`);

const storeMockProperties = [
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
];

export async function MockGetTypes() {
  mock.onGet("/types").reply(200, storeMockProperties);
}

export async function MockCreateType() {
  mock.onPost("/types").reply((config) => {
    const { data } = config;
    const objectType = JSON.parse(data);
    objectType.id = storeMockProperties.length + 1;
    objectType.createdAt = new Date(Date.now()).toDateString();
    storeMockProperties.push(objectType);
    return [204, {}];
  });
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
