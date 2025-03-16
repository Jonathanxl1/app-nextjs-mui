import { create } from "zustand";

interface ApplicationState {
  showDrawer: boolean;
  toggleDrawer: () => void;
}

export const useStoreApp = create<ApplicationState>((set) => ({
  showDrawer: false,
  toggleDrawer: () => set((state) => ({ showDrawer: !state.showDrawer })),
}));
