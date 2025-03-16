import { mock } from "./mock";

const typeUri = "/types";
const url = new RegExp(`${typeUri}/*`);

export async function MockGetTypes() {
  mock
    .onGet("/types")
    .reply(200, [
      { name: "Persona", description: "45", createdAt: new Date(Date.now()) },
    ]);
}

export async function MockCreateType() {
  mock.onPost("/types").reply(204);
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
