import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LibraryState {
  savedIds: Set<string>
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
}

function safeParseStorage(name: string): { state: { savedIds: string[] } } | null {
  try {
    const str = localStorage.getItem(name)
    if (!str) return null
    const parsed = JSON.parse(str) as unknown
    // Validate shape before trusting it
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('state' in parsed) ||
      typeof (parsed as Record<string, unknown>).state !== 'object'
    ) {
      return null
    }
    const state = (parsed as { state: unknown }).state as Record<string, unknown>
    const savedIds = Array.isArray(state.savedIds)
      ? (state.savedIds as unknown[]).filter((x): x is string => typeof x === 'string')
      : []
    return { state: { ...state, savedIds } } as { state: { savedIds: string[] } }
  } catch {
    // Corrupted data — discard and start fresh
    localStorage.removeItem(name)
    return null
  }
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      savedIds: new Set<string>(),
      toggleSaved: (id: string) =>
        set((state) => {
          const next = new Set(state.savedIds)
          if (next.has(id)) {
            next.delete(id)
          } else {
            next.add(id)
          }
          return { savedIds: next }
        }),
      isSaved: (id: string) => get().savedIds.has(id),
    }),
    {
      name: 'promptly-library',
      storage: {
        getItem: (name) => {
          const parsed = safeParseStorage(name)
          if (!parsed) return null
          return {
            ...parsed,
            state: {
              ...parsed.state,
              savedIds: new Set(parsed.state.savedIds),
            },
          }
        },
        setItem: (name, value) => {
          const toStore = {
            ...value,
            state: {
              ...value.state,
              savedIds: Array.from(value.state.savedIds as Set<string>),
            },
          }
          localStorage.setItem(name, JSON.stringify(toStore))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
