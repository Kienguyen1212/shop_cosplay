import { create } from "zustand";
import type { CharacterListItem } from "./types";

export interface CartItem {
  character: CharacterListItem;
  size: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (character: CharacterListItem, size: string) => void;
  removeItem: (characterId: string) => void;
  clearCart: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (character, size) => {
    set((state) => {
      const exists = state.items.find(
        (item) => item.character.id === character.id
      );
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.character.id === character.id ? { ...item, size } : item
          ),
        };
      }
      return { items: [...state.items, { character, size }] };
    });
  },

  removeItem: (characterId) => {
    set((state) => ({
      items: state.items.filter((item) => item.character.id !== characterId),
    }));
  },

  clearCart: () => set({ items: [] }),

  itemCount: () => get().items.length,
}));
