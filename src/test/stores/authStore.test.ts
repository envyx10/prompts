import { describe, it, expect, beforeEach } from 'vitest'
import type { Session, User } from '@supabase/supabase-js'
import { useAuthStore, selectUser, selectIsAuthed } from '@/stores/authStore'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const mockUser = { id: 'user-123', email: 'test@example.com' } as User

const mockSession = {
  user: mockUser,
  access_token: 'tok_abc',
  refresh_token: 'ref_abc',
  expires_in: 3600,
  token_type: 'bearer',
} as Session

beforeEach(() => {
  // Merge reset — do NOT pass true (replace mode) as it wipes the action functions
  useAuthStore.setState({ session: null, isLoginModalOpen: false })
})

// ---------------------------------------------------------------------------
// selectUser selector
// ---------------------------------------------------------------------------
describe('selectUser', () => {
  it('returns null when session is null', () => {
    expect(selectUser(useAuthStore.getState())).toBeNull()
  })

  it('derives user from session — single source of truth', () => {
    useAuthStore.setState({ session: mockSession })
    expect(selectUser(useAuthStore.getState())).toEqual(mockUser)
  })

  it('returns null after session is cleared', () => {
    useAuthStore.setState({ session: mockSession })
    useAuthStore.setState({ session: null })
    expect(selectUser(useAuthStore.getState())).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// selectIsAuthed selector
// ---------------------------------------------------------------------------
describe('selectIsAuthed', () => {
  it('returns false when session is null', () => {
    expect(selectIsAuthed(useAuthStore.getState())).toBe(false)
  })

  it('returns true when a session is present', () => {
    useAuthStore.setState({ session: mockSession })
    expect(selectIsAuthed(useAuthStore.getState())).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// setSession action
// ---------------------------------------------------------------------------
describe('setSession', () => {
  it('stores the session', () => {
    useAuthStore.getState().setSession(mockSession)
    expect(useAuthStore.getState().session).toEqual(mockSession)
  })

  it('clears the session when called with null', () => {
    useAuthStore.setState({ session: mockSession })
    useAuthStore.getState().setSession(null)
    expect(useAuthStore.getState().session).toBeNull()
  })
})

// ---------------------------------------------------------------------------
// Modal actions
// ---------------------------------------------------------------------------
describe('modal', () => {
  it('openLoginModal sets isLoginModalOpen to true', () => {
    useAuthStore.getState().openLoginModal()
    expect(useAuthStore.getState().isLoginModalOpen).toBe(true)
  })

  it('closeLoginModal sets isLoginModalOpen to false', () => {
    useAuthStore.setState({ isLoginModalOpen: true })
    useAuthStore.getState().closeLoginModal()
    expect(useAuthStore.getState().isLoginModalOpen).toBe(false)
  })

  it('opening twice does not break state', () => {
    useAuthStore.getState().openLoginModal()
    useAuthStore.getState().openLoginModal()
    expect(useAuthStore.getState().isLoginModalOpen).toBe(true)
  })
})
