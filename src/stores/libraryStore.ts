import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LibraryState {
  savedIds: Set<string>
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      savedIds: new Set<string>(),
      toggleSaved: (id: string) =>
        set((state) => {
          const newSet = new Set(state.savedIds)
          if (newSet.has(id)) {
            newSet.delete(id)
          } else {
            newSet.add(id)
          }
          return { savedIds: newSet }
        }),
      isSaved: (id: string) => get().savedIds.has(id),
    }),
    {
      name: 'promptly-library',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const parsed = JSON.parse(str) as { state: { savedIds: string[] } }
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
