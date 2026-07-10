import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, AuthUser } from './types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token: string, user: AuthUser) => {
        set({ token, user })
      },
      logout: () => {
        set({ token: null, user: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
)
