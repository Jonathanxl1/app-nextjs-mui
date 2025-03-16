import { create } from "zustand";

interface ApplicationState {
  lodging: boolean;
  showDrawer: boolean;
  toggleDrawer: () => void;
}

export const useStoreApp = create<ApplicationState>((set) => ({
  lodging: false,
  setLodging: (value: boolean) => {
    set(() => ({ lodging: value }));
  },
  showDrawer: false,
  toggleDrawer: () => set((state) => ({ showDrawer: !state.showDrawer })),
}));

export function setLodging(value: boolean) {
  useStoreApp.setState({ lodging: value });
}
