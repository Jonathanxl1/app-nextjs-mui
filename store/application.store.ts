import { RolePermissions } from "@/interfaces/application.interface";
import { ViewOptions } from "@/interfaces/entity.interface";
import { create } from "zustand";

interface User {
  name: string;
  permissions: RolePermissions[];
}
interface ApplicationState {
  loading: boolean;
  setLoading: (value: boolean) => void;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
  view: ViewOptions;
  setView: (value: ViewOptions) => void;
  closeView: () => void;
  action: RolePermissions;
  setAction: (value: RolePermissions) => void;
  logged: boolean;
  user: User | null;
  setUser: (user: User) => void;
  restoreUser: () => void;
  hasPermission: (permission: RolePermissions) => boolean;
  confirmMethod: (() => void) | null;
  setConfirmMethod: (fn: () => void | null) => void;
  callConfirmMethod: () => Promise<unknown>;
  search: string;
  setSearch: (value: string) => void;
  isSearching: boolean;
}

export const useStoreApp = create<ApplicationState>((set, get) => ({
  loading: false,
  setLoading: (value: boolean) => {
    set(() => ({ loading: value }));
  },
  showDrawer: false,
  setShowDrawer: (value: boolean) => set(() => ({ showDrawer: value })),
  view: null,
  setView(value: ViewOptions) {
    set((state) => ({ ...state, view: value, showDrawer: true }));
  },
  closeView: function () {
    set((state) => ({ ...state, view: null, showDrawer: false }));
  },
  action: "read",
  setAction: (action: RolePermissions) => {
    set((state) => ({ ...state, action }));
  },
  logged: false,
  user: null,
  setUser: (user) => {
    set((state) => ({ ...state, user, logged: true }));
  },
  restoreUser: () => {
    set((state) => ({ ...state, user: null, logged: false }));
  },
  hasPermission: (permission) => {
    const user = get().user;
    if (!user) {
      return false;
    }
    return user.permissions.includes(permission);
  },
  confirmMethod: null,
  setConfirmMethod: (confirmMethod) => {
    set((state) => ({ ...state, confirmMethod }));
  },
  callConfirmMethod: () => {
    const method = get().confirmMethod;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject();
      } else {
        resolve(method());
      }
    });
  },
  search: "",
  setSearch: (value) => {
    if (value) {
      set((state) => ({ ...state, search: value, isSearching: true }));
    } else {
      set((state) => ({ ...state, search: "", isSearching: false }));
    }
  },
  isSearching: false,
}));

export function setLoading(value: boolean) {
  useStoreApp.setState({ loading: value });
}
