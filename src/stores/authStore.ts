import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  // Single source of truth: session. user is derived via selector.
  session: Session | null
  isLoginModalOpen: boolean
  setSession: (session: Session | null) => void
  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isLoginModalOpen: false,
  setSession: (session) => set({ session }),
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}))

// Derived selectors — avoids storing user separately and risking divergence
export const selectUser = (state: AuthState): User | null => state.session?.user ?? null
export const selectIsAuthed = (state: AuthState): boolean => state.session !== null
