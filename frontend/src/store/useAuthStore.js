/** useAuthStore.js — Zustand store for authentication state using real backend API */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, register, logout, getSession } from '../services/mockAuth';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async (credentials) => {
        set({ loading: true });
        try {
          // Use mockAuth service
          const user = await login(credentials);
          set({ user, isAuthenticated: true, loading: false });
          return user;
        } catch (error) {
          set({ loading: false });
          throw error.message || 'Login failed';
        }
      },

      register: async (userData) => {
        set({ loading: true });
        try {
          // Use mockAuth service
          const user = await register(userData);
          set({ user, isAuthenticated: true, loading: false });
          return user;
        } catch (error) {
          set({ loading: false });
          throw error.message || 'Registration failed';
        }
      },

      logout: async () => {
        try {
          await logout();
        } catch (error) {
          console.error('Logout error', error);
        } finally {
          set({ user: null, isAuthenticated: false });
        }
      },
      
      checkAuth: async () => {
        try {
          const user = await getSession();
          if (user) {
            set({ user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'mycafe_auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
