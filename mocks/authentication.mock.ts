import { RolePermissions } from "@/interfaces/application.interface";
import { mock } from "./mock";

interface resposeLogin {
  accessToken: string;
  user: {
    name: string;
    permissions: RolePermissions[];
  };
}

const responseObjectLogin: Record<string, resposeLogin> = {
  "admin@fortexdesign.com": {
    accessToken: "12323",
    user: {
      name: "Admin",
      permissions: ["read", "create", "update", "delete"],
    },
  },
  "viewer@fortexdesign.com": {
    accessToken: "12323",
    user: {
      name: "Viewer",
      permissions: ["read"],
    },
  },
  "editorOrAporter@fortexdesign.com": {
    accessToken: "12323",
    user: {
      name: "Editor/Aporter",
      permissions: ["read", "create", "update"],
    },
  },
};

export function mockLogin() {
  //Success login
  mock.onPost("/login").reply((config): [number, string] => {
    const { data } = config;
    const { email } = JSON.parse(data);
    if (email) {
      if (responseObjectLogin[email]) {
        return [200, JSON.stringify(responseObjectLogin[email])];
      } else {
        return [401, JSON.stringify({ message: "Invalid Credentials" })];
      }
    } else {
      return [400, JSON.stringify({ message: "Bad Request" })];
    }
  });
}
