/** useThemeStore.js — Zustand store for dark/light mode */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,

      toggle: () => {
        const next = !get().isDark;
        document.documentElement.classList.toggle('dark', next);
        set({ isDark: next });
      },

      init: () => {
        const { isDark } = get();
        document.documentElement.classList.toggle('dark', isDark);
      },
    }),
    { name: 'mycafe_theme' }
  )
);

export default useThemeStore;
