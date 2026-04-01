import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LibraryState {
  savedIds: Set<string>
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
}

const STORAGE_KEY = 'promptly-library'

// Exported for unit testing
export function safeParseStorage(raw: string | null): Set<string> {
  if (!raw) return new Set()
  try {
    const parsed = JSON.parse(raw) as unknown
    if (
      typeof parsed !== 'object' || parsed === null ||
      !('state' in parsed) ||
      typeof (parsed as Record<string, unknown>).state !== 'object'
    ) {
      return new Set()
    }
    const state = (parsed as { state: Record<string, unknown> }).state
    const ids = Array.isArray(state.savedIds)
      ? (state.savedIds as unknown[]).filter((x): x is string => typeof x === 'string')
      : []
    return new Set(ids)
  } catch {
    return new Set()
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
      name: STORAGE_KEY,
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name)
          if (!raw) return null
          const savedIds = safeParseStorage(raw)
          // Re-read the full persisted object to keep version/other fields intact
          try {
            const parsed = JSON.parse(raw) as Record<string, unknown>
            return { ...parsed, state: { ...(parsed.state as object), savedIds } }
          } catch {
            return null
          }
        },
        setItem: (name, value) => {
          const serializable = {
            ...value,
            state: {
              ...value.state,
              savedIds: Array.from(value.state.savedIds as Set<string>),
            },
          }
          localStorage.setItem(name, JSON.stringify(serializable))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

// --- Multi-tab sync -------------------------------------------------------
// When another tab writes to localStorage, update this tab's in-memory state
// so both tabs stay consistent without requiring a page reload.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY || event.newValue === null) return
    const synced = safeParseStorage(event.newValue)
    useLibraryStore.setState({ savedIds: synced })
  })
}
