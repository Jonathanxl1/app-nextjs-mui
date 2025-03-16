import { mock } from "./mock";

function MockPropertiesGet() {
  mock.onGet("/properties").reply(200, [
    {
      name: "nombre",
      type: "text",
      date: "2025-04-03",
    },
    {
      name: "Fecha de Nacimiento",
      type: "date",
      date: "2025-04-03",
    },
    {
      name: "Telefono",
      type: "number",
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
