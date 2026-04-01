import { describe, it, expect, beforeEach } from 'vitest'
import { useLibraryStore, safeParseStorage } from '@/stores/libraryStore'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
beforeEach(() => {
  localStorage.clear()
  // Merge reset — do NOT pass true (replace mode) as it wipes the action functions
  useLibraryStore.setState({ savedIds: new Set() })
})

// ---------------------------------------------------------------------------
// toggleSaved / isSaved
// ---------------------------------------------------------------------------
describe('toggleSaved', () => {
  it('adds an id when not present', () => {
    useLibraryStore.getState().toggleSaved('p-1')
    expect(useLibraryStore.getState().isSaved('p-1')).toBe(true)
  })

  it('removes an id when already present', () => {
    useLibraryStore.setState({ savedIds: new Set(['p-1']) })
    useLibraryStore.getState().toggleSaved('p-1')
    expect(useLibraryStore.getState().isSaved('p-1')).toBe(false)
  })

  it('toggling twice restores original state', () => {
    useLibraryStore.getState().toggleSaved('p-1')
    useLibraryStore.getState().toggleSaved('p-1')
    expect(useLibraryStore.getState().savedIds.size).toBe(0)
  })

  it('does not affect other ids when toggling one', () => {
    useLibraryStore.setState({ savedIds: new Set(['p-1', 'p-2']) })
    useLibraryStore.getState().toggleSaved('p-1')
    expect(useLibraryStore.getState().isSaved('p-2')).toBe(true)
  })
})

describe('isSaved', () => {
  it('returns false for unknown ids', () => {
    expect(useLibraryStore.getState().isSaved('nonexistent')).toBe(false)
  })

  it('returns true for a saved id', () => {
    useLibraryStore.setState({ savedIds: new Set(['p-99']) })
    expect(useLibraryStore.getState().isSaved('p-99')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// safeParseStorage — pure parsing utility
// ---------------------------------------------------------------------------
describe('safeParseStorage', () => {
  it('returns empty Set for null input', () => {
    expect(safeParseStorage(null).size).toBe(0)
  })

  it('returns empty Set for empty string', () => {
    expect(safeParseStorage('').size).toBe(0)
  })

  it('returns empty Set for malformed JSON', () => {
    expect(safeParseStorage('not json {{{').size).toBe(0)
  })

  it('returns empty Set when state.savedIds is missing', () => {
    const raw = JSON.stringify({ state: {} })
    expect(safeParseStorage(raw).size).toBe(0)
  })

  it('returns empty Set when state.savedIds contains non-strings', () => {
    const raw = JSON.stringify({ state: { savedIds: [1, null, true] } })
    expect(safeParseStorage(raw).size).toBe(0)
  })

  it('filters out non-string values from mixed array', () => {
    const raw = JSON.stringify({ state: { savedIds: ['p-1', 42, 'p-2', null] } })
    const result = safeParseStorage(raw)
    expect(result.size).toBe(2)
    expect(result.has('p-1')).toBe(true)
    expect(result.has('p-2')).toBe(true)
  })

  it('correctly deserializes a valid persisted payload', () => {
    const raw = JSON.stringify({ state: { savedIds: ['a', 'b', 'c'] }, version: 0 })
    const result = safeParseStorage(raw)
    expect(result.size).toBe(3)
    expect(result.has('a')).toBe(true)
  })
})
