"use client";

import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  colorway: string;
  quantity: number;
  image: string;
};

type CartState = {
  isOpen: boolean;
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, colorway: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

export const useCart = create<CartState>((set) => ({
  isOpen: false,
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (entry) => entry.id === item.id && entry.colorway === item.colorway,
      );

      if (existingItem) {
        return {
          items: state.items.map((entry) =>
            entry.id === item.id && entry.colorway === item.colorway
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),
  removeItem: (id, colorway) =>
    set((state) => ({
      items: state.items.filter(
        (entry) => !(entry.id === id && entry.colorway === colorway),
      ),
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
}));
