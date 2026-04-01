import { create } from 'zustand'
import type { Session, User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  isLoginModalOpen: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoginModalOpen: false,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))
