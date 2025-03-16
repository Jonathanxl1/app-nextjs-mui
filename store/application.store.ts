import { create } from "zustand";

export type ViewOptions = "viewFormProperties" | "viewFormType" | null;

export type RolePermissions = "create" | "update" | "read" | "delete";


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
}

export const useStoreApp = create<ApplicationState>((set) => ({
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
}));

export function setLoading(value: boolean) {
  useStoreApp.setState({ loading: value });
}
