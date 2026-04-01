import { describe, it, expect } from 'vitest'
import { filterPrompts, filterSavedPrompts } from '@/services/prompts'
import { SAMPLE_PROMPTS } from '@/data/prompts'

// ---------------------------------------------------------------------------
// filterPrompts
// ---------------------------------------------------------------------------
describe('filterPrompts', () => {
  it('returns all prompts when called with no filters', () => {
    expect(filterPrompts()).toHaveLength(SAMPLE_PROMPTS.length)
  })

  it('returns all prompts with empty filter values', () => {
    expect(filterPrompts({ search: '', category: 'all', language: 'all' }))
      .toHaveLength(SAMPLE_PROMPTS.length)
  })

  // --- search ---
  it('matches by title (case-insensitive)', () => {
    const result = filterPrompts({ search: 'code review' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p =>
      expect(
        p.title.toLowerCase().includes('code review') ||
        p.content.toLowerCase().includes('code review') ||
        p.description.toLowerCase().includes('code review') ||
        p.tags.some(t => t.toLowerCase().includes('code review'))
      ).toBe(true)
    )
  })

  it('matches by tag', () => {
    const result = filterPrompts({ search: 'SEO' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p =>
      expect(p.tags.some(t => t.toLowerCase().includes('seo'))).toBe(true)
    )
  })

  it('returns empty array for a search with no matches', () => {
    expect(filterPrompts({ search: 'xyzzy_no_match_12345' })).toHaveLength(0)
  })

  // --- category ---
  it('filters by category — only matching prompts returned', () => {
    const result = filterPrompts({ category: 'coding' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => expect(p.category).toBe('coding'))
  })

  it('"all" category returns everything', () => {
    expect(filterPrompts({ category: 'all' })).toHaveLength(SAMPLE_PROMPTS.length)
  })

  it('unknown category returns empty array', () => {
    expect(filterPrompts({ category: 'does_not_exist' })).toHaveLength(0)
  })

  // --- language ---
  it('filters by "es" — includes es and both', () => {
    const result = filterPrompts({ language: 'es' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => expect(['es', 'both']).toContain(p.language))
  })

  it('filters by "en" — includes en and both', () => {
    const result = filterPrompts({ language: 'en' })
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p => expect(['en', 'both']).toContain(p.language))
  })

  it('"all" language returns everything', () => {
    expect(filterPrompts({ language: 'all' })).toHaveLength(SAMPLE_PROMPTS.length)
  })

  // --- combined filters ---
  it('applies search + category together', () => {
    const result = filterPrompts({ search: 'code', category: 'coding' })
    result.forEach(p => {
      expect(p.category).toBe('coding')
      const q = 'code'
      expect(
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      ).toBe(true)
    })
  })

  it('returns subset when category + language narrow the results', () => {
    const all = filterPrompts()
    const narrowed = filterPrompts({ category: 'coding', language: 'en' })
    expect(narrowed.length).toBeLessThanOrEqual(all.length)
    narrowed.forEach(p => {
      expect(p.category).toBe('coding')
      expect(['en', 'both']).toContain(p.language)
    })
  })
})

// ---------------------------------------------------------------------------
// filterSavedPrompts
// ---------------------------------------------------------------------------
describe('filterSavedPrompts', () => {
  it('returns empty array for empty Set', () => {
    expect(filterSavedPrompts(new Set())).toHaveLength(0)
  })

  it('returns only prompts whose ids are in the set', () => {
    const ids = new Set(['1', '2'])
    const result = filterSavedPrompts(ids)
    expect(result.length).toBe(2)
    result.forEach(p => expect(ids.has(p.id)).toBe(true))
  })

  it('ignores ids not present in SAMPLE_PROMPTS', () => {
    const ids = new Set(['1', 'fake-id-9999'])
    const result = filterSavedPrompts(ids)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('1')
  })

  it('applies search filter within saved prompts', () => {
    const ids = new Set(SAMPLE_PROMPTS.map(p => p.id))
    const result = filterSavedPrompts(ids, 'email')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(p =>
      expect(
        p.title.toLowerCase().includes('email') ||
        p.description.toLowerCase().includes('email') ||
        p.tags.some(t => t.toLowerCase().includes('email'))
      ).toBe(true)
    )
  })

  it('returns empty array when search matches nothing in the saved set', () => {
    const ids = new Set(['1'])
    expect(filterSavedPrompts(ids, 'xyzzy_nomatch')).toHaveLength(0)
  })
})
