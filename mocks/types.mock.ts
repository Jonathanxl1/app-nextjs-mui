import { mock } from "./mock";

const typeUri = "/types";
const url = new RegExp(`${typeUri}/*`);

const storeMockTypes = [
  {
    id: 1,
    name: "Persona",
    description: "Categoria para personas",
    properties: [1, 2],
    createdAt: new Date(Date.now()).toDateString(),
  },
  {
    id: 2,
    name: "Organizacion",
    description: "Categoria para Organizaciones",
    properties: [3],
    createdAt: new Date(Date.now()).toDateString(),
  },
  {
    id: 3,
    name: "Evento",
    description: "Categoria para Eventos",
    properties: [4],
    createdAt: new Date(Date.now()).toDateString(),
  },
];

export async function MockGetTypes() {
  mock.onGet("/types").reply(200, storeMockTypes);
}

export async function MockCreateType() {
  mock.onPost("/types").reply((config) => {
    const { data } = config;
    const objectType = JSON.parse(data);
    objectType.id = storeMockTypes.length + 1;
    objectType.createdAt = new Date(Date.now()).toDateString();
    storeMockTypes.push(objectType);
    return [201, {}];
  });
}

export async function MockUpdateType() {
  mock.onPut(url).reply((config) => {
    const { data } = config;
    const objectType = JSON.parse(data);

    const indexType = storeMockTypes.map(({ id }) => id).indexOf(objectType.id);

    storeMockTypes[indexType] = { ...storeMockTypes[indexType], ...objectType };
    return [204, {}];
  });
}

export async function MockDeleteType() {
  const matchIdRegex = new RegExp(/(\d+)/);

  mock.onDelete(url).reply((config) => {
    const { url: uri } = config;
    const match = uri?.match(matchIdRegex);
    let idMatch = "-1";
    if (match && match.length) {
      idMatch = match[1];
    }
    const indexProp = storeMockTypes
      .map(({ id }) => id)
      .indexOf(parseInt(idMatch));
    if (indexProp >= 0) {
      storeMockTypes.splice(indexProp, 1);
    }

    return [200, {}];
  });
}

export function MockTypes() {
  MockGetTypes();
  MockCreateType();
  MockUpdateType();
  MockDeleteType();
}
