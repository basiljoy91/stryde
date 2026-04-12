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
  closeCart: () => void;
  openCart: () => void;
  removeItem: (id: string, colorway: string) => void;
  updateQuantity: (id: string, colorway: string, quantity: number) => void;
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
          isOpen: true,
          items: state.items.map((entry) =>
            entry.id === item.id && entry.colorway === item.colorway
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
        isOpen: true,
      };
    }),
  closeCart: () => set({ isOpen: false }),
  openCart: () => set({ isOpen: true }),
  removeItem: (id, colorway) =>
    set((state) => ({
      items: state.items.filter(
        (entry) => !(entry.id === id && entry.colorway === colorway),
      ),
    })),
  updateQuantity: (id, colorway, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter(
              (entry) => !(entry.id === id && entry.colorway === colorway),
            )
          : state.items.map((entry) =>
              entry.id === id && entry.colorway === colorway
                ? { ...entry, quantity }
                : entry,
            ),
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
}));
