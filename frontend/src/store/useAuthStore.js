/** 
 * useAuthStore.js — Zustand store for authentication state using Supabase 
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/supabase';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: async ({ email, password }) => {
        set({ loading: true });
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
          set({ loading: false });
          throw error;
        }

        const user = {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
          email: data.user.email
        };

        set({ user, isAuthenticated: true, loading: false });
        return user;
      },

      register: async ({ name, email, password }) => {
        set({ loading: true });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        });

        if (error) {
          set({ loading: false });
          throw error;
        }

        const user = {
          id: data.user.id,
          name: name,
          email: data.user.email
        };

        set({ user, isAuthenticated: true, loading: false });
        return user;
      },

      logout: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Logout error', error);
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const user = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            email: session.user.email
          };
          set({ user, isAuthenticated: true });
        } else {
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
