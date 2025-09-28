import { create } from "zustand";
import axios from "axios";
import type { itemsState } from "@/utils/interfaces";

export const useItems = create<itemsState>((set) => ({
  items: [],
  fetchJson: async (apiUrl: string): Promise<void> => {
    const response = await axios.get(apiUrl);
    set({ items: response.data });
  },
}));
