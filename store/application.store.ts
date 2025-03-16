import { create } from "zustand";

interface ApplicationState {
  loading: boolean;
  setLoading: (value: boolean) => void;
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

export const useStoreApp = create<ApplicationState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => {
    set(() => ({ loading: value }));
  },
  showDrawer: false,
  setShowDrawer: (value: boolean) => set(() => ({ showDrawer: value })),
}));

export function setLoading(value: boolean) {
  useStoreApp.setState({ loading: value });
}
