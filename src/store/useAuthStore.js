/** useAuthStore.js — Zustand store for authentication state */
import { create } from 'zustand';
import { getSession, login as authLogin, register as authRegister, logout as authLogout } from '../services/mockAuth';

const useAuthStore = create((set) => ({
  user: getSession(),
  isAuthenticated: !!getSession(),

  login: async (credentials) => {
    const user = authLogin(credentials);
    set({ user, isAuthenticated: true });
    return user;
  },

  register: async (data) => {
    const user = authRegister(data);
    set({ user, isAuthenticated: true });
    return user;
  },

  logout: () => {
    authLogout();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
