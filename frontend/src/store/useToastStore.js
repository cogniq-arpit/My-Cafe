/**
 * useToastStore.js — Lightweight global toast notification system
 */
import { create } from 'zustand';

let toastId = 0;

const useToastStore = create((set, get) => ({
  toasts: [],

  /**
   * Show a toast notification
   * @param {string} message  — The message to display
   * @param {'success'|'error'|'info'|'warning'} type — Toast variant
   * @param {number} duration — Auto-dismiss in ms (default 3500)
   */
  show: (message, type = 'info', duration = 3500) => {
    const id = ++toastId;
    set(s => ({ toasts: [...s.toasts, { id, message, type }] }));

    if (duration > 0) {
      setTimeout(() => get().dismiss(id), duration);
    }
    return id;
  },

  success: (message, duration)  => get().show(message, 'success', duration),
  error:   (message, duration)  => get().show(message, 'error',   duration),
  info:    (message, duration)  => get().show(message, 'info',    duration),
  warning: (message, duration)  => get().show(message, 'warning', duration),

  dismiss: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
  dismissAll: () => set({ toasts: [] }),
}));

export default useToastStore;
