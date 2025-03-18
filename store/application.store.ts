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
}));

export function setLoading(value: boolean) {
  useStoreApp.setState({ loading: value });
}
