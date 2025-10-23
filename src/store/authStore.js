import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      
      login: (userData, token) => set({ 
        user: userData, 
        token, 
        isLoggedIn: true 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isLoggedIn: false 
      }),
      
      updateUser: (userData) => set({ user: userData }),
      
      isAuthenticated: () => get().isLoggedIn && get().token,
    }),
    {
      name: 'soothe-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isLoggedIn: state.isLoggedIn 
      }),
    }
  )
);
