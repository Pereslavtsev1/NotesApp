import { create } from "zustand";

type UseIconPickerDrawerStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
};

export const useIconPickerDrawer = create<UseIconPickerDrawerStore>((set) => ({
  open: false,
  setOpen: (value) =>
    set(() => ({
      open: value,
    })),
  toggle: () =>
    set((state) => ({
      open: !state.open,
    })),
}));
