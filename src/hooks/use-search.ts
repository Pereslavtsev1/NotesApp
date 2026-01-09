import { create } from "zustand";

type UseSearchStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
};

export const useSearch = create<UseSearchStore>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
  toggle: () => set((state) => ({ open: !state.open })),
}));
