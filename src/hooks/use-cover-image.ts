import { create } from "zustand";

type UseCoverImageStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
};

export const useCoverImage = create<UseCoverImageStore>((set) => ({
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
