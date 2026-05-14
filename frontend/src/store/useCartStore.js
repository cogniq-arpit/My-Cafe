/** useCartStore.js — Zustand store for shopping cart */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // [{ ...menuItem, quantity }]
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => {
        const items = get().items;
        const existing = items.find(i => i.id === item.id);
        if (existing) {
          set({ items: items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
        set({ isOpen: true }); // Automatically open cart when item is added
      },

      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) { get().removeItem(id); return; }
        set({ items: get().items.map(i => i.id === id ? { ...i, quantity } : i) });
      },

      clearCart: () => set({ items: [] }),
    }),
    { 
      name: 'mycafe_cart',
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state like isOpen
    }
  )
);

export default useCartStore;
