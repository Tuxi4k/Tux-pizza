import type { sortTypes } from "@/utils/interfaces";
import { create } from "zustand";

export const useSort = create<sortTypes>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index: number): void => set({ activeIndex: index }),
  open: false,
  setOpen: (state: boolean): void => set({ open: state }),
  selected: 0,
  setSelected: (index: number): void => set({ selected: index }),
}));
