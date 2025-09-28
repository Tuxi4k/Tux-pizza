import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { cartItem, cartInterface } from "@/utils/interfaces";

export const useCart = create<cartInterface>()(
  persist(
    (set, get) => ({
      cartItems: [],
      setCount: (item: cartItem, count: number) =>
        set({
          cartItems: get().cartItems.map((existing) =>
            existing.id === item.id &&
            existing.pizzaSize === item.pizzaSize &&
            existing.pizzaType === item.pizzaType
              ? { ...existing, count }
              : existing
          ),
        }),
      addItem: (item: cartItem) => {
        const existingIndex = get().cartItems.findIndex(
          (existing) =>
            existing.id === item.id &&
            existing.pizzaSize === item.pizzaSize &&
            existing.pizzaType === item.pizzaType
        );
        if (existingIndex !== -1) {
          const updatedItems = [...get().cartItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            count: updatedItems[existingIndex].count + 1,
          };
          set({ cartItems: updatedItems });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },
      removeItem: (item: cartItem) =>
        set({
          cartItems: get().cartItems.filter(
            (existing) =>
              !(
                existing.id === item.id &&
                existing.pizzaSize === item.pizzaSize &&
                existing.pizzaType === item.pizzaType
              )
          ),
        }),
      clearItems: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" }
  )
);
