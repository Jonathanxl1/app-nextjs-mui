import { create } from "zustand";

interface ApplicationState {
  loading: boolean;
  setLoading: (value: boolean) => void;
  showDrawer: boolean;
  toggleDrawer: () => void;
}

export const useStoreApp = create<ApplicationState>((set) => ({
  loading: false,
  setLoading: (value: boolean) => {
    set(() => ({ loading: value }));
  },
  showDrawer: false,
  toggleDrawer: () => set((state) => ({ showDrawer: !state.showDrawer })),
}));

export function setLoading(value: boolean) {
  useStoreApp.setState({ loading: value });
}
