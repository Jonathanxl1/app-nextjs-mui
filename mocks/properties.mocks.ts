import { mock } from "./mock";

function MockPropertiesGet() {
  mock.onGet("/properties").reply(200, [
    {
      id: 1,
      name: "nombre",
      type: "text",
      date: "2025-04-03",
    },
    {
      id: 2,
      name: "Fecha de Nacimiento",
      type: "date",
      date: "2025-04-03",
    },
    {
      id: 3,
      name: "Telefono",
      type: "number",
      date: "2025-04-03",
    },
    {
      id: 4,
      name: "Termino y Condiciones",
      type: "check",
      date: "2025-04-03",
    },
  ]);
}
function MockPropertiesPost() {}
function MockPropertiesPut() {}
function MockPropertiesDelete() {}

export function MockPropierties() {
  MockPropertiesGet();
  MockPropertiesPost();
  MockPropertiesPut();
  MockPropertiesDelete();
}
