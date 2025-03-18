import { mock } from "./mock";

const storeMockProperties = [
  {
    id: 1,
    name: "nombre",
    type: "text",
    date: new Date(Date.now()).toDateString(),
  },
  {
    id: 2,
    name: "Fecha de Nacimiento",
    type: "date",
    date: new Date(Date.now()).toDateString(),
  },
  {
    id: 3,
    name: "Telefono",
    type: "number",
    date: new Date(Date.now()).toDateString(),
  },
  {
    id: 4,
    name: "Termino y Condiciones",
    type: "check",
    date: new Date(Date.now()).toDateString(),
  },
];

function MockPropertiesGet() {
  mock.onGet("/properties").reply(200, storeMockProperties);
}
function MockPropertiesPost() {
  mock.onPost("/properties").reply(({ data }) => {
    const propertyObject = JSON.parse(data);
    propertyObject.id = storeMockProperties.length + 1;
    propertyObject.createdAt = new Date(Date.now()).toDateString();
    storeMockProperties.push(propertyObject);
    return [201, {}];
  });
}
function MockPropertiesPut() {
  const propertiesUri = "/properties";
  const url = new RegExp(`${propertiesUri}/*`);
  mock.onPut(url).reply(({ data }) => {
    const propertyObject = JSON.parse(data);
    const indexProp = storeMockProperties
      .map(({ id }) => id)
      .indexOf(propertyObject.id);
    storeMockProperties[indexProp] = {
      ...storeMockProperties[indexProp],
      ...propertyObject,
    };
    return [201, {}];
  });
}
function MockPropertiesDelete() {
  const propertiesUri = "/properties";
  const url = new RegExp(`${propertiesUri}/*`);
  const matchIdRegex = new RegExp(/(\d+)/);
  mock.onDelete(url).reply((config) => {
    const { url: uri } = config;
    const match = uri?.match(matchIdRegex);
    let idMatch = "-1";
    if (match && match.length) {
      idMatch = match[1];
    }
    const indexProp = storeMockProperties
      .map(({ id }) => id)
      .indexOf(parseInt(idMatch));
    if (indexProp >= 0) {
      storeMockProperties.splice(indexProp, 1);
    }
    return [200, {}];
  });
}

export function MockPropierties() {
  MockPropertiesGet();
  MockPropertiesPost();
  MockPropertiesPut();
  MockPropertiesDelete();
}
